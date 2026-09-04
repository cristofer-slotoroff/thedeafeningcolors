// Static build for thedeafeningcolors.com. No dependencies. `node build.mjs` writes dist/.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  site, links, iconRow, announcement, featuredRelease, releases, singles, shows, press, videos, about, bandcampQuote,
} from './data.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(ROOT, 'dist');
const BUILD_DATE = new Date().toISOString().slice(0, 10);

// ---------- helpers ----------
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Title Case, Cris's rule (2026-09-04): every word capitalized, articles and prepositions included.
const tc = (s) => String(s).replace(/(^|[\s(\u00a0/-])([a-z])/g, (m, pre, ch) => pre + ch.toUpperCase());

// No orphans: join the last three words of a block with non-breaking spaces, skipping anything inside tags.
function nw(html) {
  const parts = String(html).split(/(<[^>]+>)/);
  let joins = 2;
  for (let i = parts.length - 1; i >= 0 && joins > 0; i--) {
    if (parts[i].startsWith('<')) continue;
    let t = parts[i];
    while (joins > 0) {
      const m = t.match(/^(.*\S)\s+(\S+)(\s*)$/s);
      if (!m) break;
      t = m[1] + '\u00a0' + m[2] + m[3];
      joins--;
    }
    parts[i] = t;
  }
  return parts.join('');
}

// Tiny markdown: paragraphs, links, images, bold, italic, headings. Enough for the news archive and the bio.
function inline(md) {
  let s = esc(md);
  s = s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (m, alt, src) => `<img src="${src}" alt="${alt}" loading="lazy">`);
  // Old Wix hashtag links become plain text.
  s = s.replace(/\[(#[^\]]+)\]\(https?:\/\/www\.thedeafeningcolors\.com\/social\/hashtags\/[^)]+\)/g, '$1');
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (m, t, u) => `<a href="${u}"${/^https?:/.test(u) && !u.includes('thedeafeningcolors.com/') ? ' rel="noopener"' : ''}>${t}</a>`);
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[\s(])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  s = s.replace(/&lt;--/g, '&larr;');
  return s;
}
function md(text) {
  const blocks = String(text).replace(/\r/g, '').split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  return blocks
    .map((b) => {
      if (/^#{1,3}\s/.test(b)) {
        const level = b.match(/^#+/)[0].length + 1;
        return `<h${level}>${nw(inline(b.replace(/^#+\s*/, '')))}</h${level}>`;
      }
      if (/^!\[[^\]]*\]\([^)]+\)$/.test(b)) return `<figure>${inline(b)}</figure>`;
      if (/^\[!\[[^\]]*\]\([^)]+\)\]\([^)]+\)$/.test(b)) {
        const m = b.match(/^\[(!\[[^\]]*\]\([^)]+\))\]\(([^)]+)\)$/);
        return `<figure><a href="${esc(m[2])}" rel="noopener">${inline(m[1])}</a></figure>`;
      }
      if (/^\[EMBED: /.test(b)) return '';
      return `<p>${nw(inline(b).replace(/\n/g, '<br>'))}</p>`;
    })
    .join('\n');
}

const icons = {};
for (const f of fs.readdirSync(path.join(ROOT, 'img/icons'))) {
  if (!f.endsWith('.svg')) continue;
  const svg = fs.readFileSync(path.join(ROOT, 'img/icons', f), 'utf8')
    .replace(/<title>.*?<\/title>/, '')
    .replace('<svg ', '<svg class="ico" fill="currentColor" aria-hidden="true" focusable="false" ');
  icons[f.replace('.svg', '')] = svg;
}

const fmtDate = (iso) => new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
const fmtShort = (iso) => new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

function write(rel, html) {
  const out = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
}
function copyDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const f of fs.readdirSync(src)) {
    const s = path.join(src, f), d = path.join(dst, f);
    if (fs.statSync(s).isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

// ---------- Bandcamp embeds ----------
// Colors match the slate card so the player sits flush. Bandcamp wants hex without the #.
const BC_BG = '1d2836', BC_LINK = 'e6c76a';
function bcPlayer(rel, { artwork = 'none', tracklist = true } = {}) {
  const b = rel.bandcamp;
  if (!b) return '';
  const n = rel.tracks ? rel.tracks.length : 1;
  const h = b.type === 'track' ? 120 : Math.min(120 + 33 * n + 10, 472);
  const src = `https://bandcamp.com/EmbeddedPlayer/${b.type}=${b.id}/size=large/bgcol=${BC_BG}/linkcol=${BC_LINK}/tracklist=${tracklist}/artwork=${artwork}/transparent=true/`;
  return `<iframe class="bc-player" style="height:${h}px" loading="lazy" title="${esc(rel.title)} on Bandcamp" src="${src}" seamless><a href="${b.url}">${esc(rel.title)} by ${site.name}</a></iframe>`;
}

// ---------- shared shell ----------
const NAV = [
  ['/music/', 'Music'], ['/shows/', 'Shows'], ['/video/', 'Video'], ['/press/', 'Press'], ['/about/', 'About'], ['/news/', 'News'], ['/contact/', 'Contact'],
];

function iconLinks(cls) {
  return `<ul class="${cls}">${iconRow.map((i) => `<li><a href="${links[i.key]}" rel="noopener" aria-label="${esc(i.label)}" title="${esc(i.label)}">${icons[i.icon]}</a></li>`).join('')}</ul>`;
}

function shell({ title, description, path: p, body, og, jsonld, bodyClass = '' }) {
  const fullTitle = p === '/' ? site.name : `${title} | ${site.name}`;
  const url = site.url + p;
  const ogImg = site.url + (og || '/img/og-home.jpg');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description || site.description)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="${p === '/' ? 'website' : 'article'}">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description || site.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${ogImg}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#101318">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="alternate" type="application/rss+xml" title="${esc(site.name)} News" href="/feed.xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/style.css?v=${BUILD_DATE}">
${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : ''}
</head>
<body class="${bodyClass}">
<a class="skip" href="#main">Skip To Content</a>
<header class="site-head">
  <a class="wordmark" href="/">The Deafening Colors</a>
  <nav class="site-nav" aria-label="Site">
    ${NAV.map(([href, label]) => `<a href="${href}"${p.startsWith(href) ? ' aria-current="page"' : ''}>${label}</a>`).join('')}
  </nav>
  ${iconLinks('icon-row')}
</header>
<main id="main">
${body}
</main>
<footer class="site-foot">
  ${iconLinks('icon-row')}
  <p class="foot-links"><a href="${links.bandcamp}" rel="noopener">Bandcamp</a> <span aria-hidden="true">·</span> <a href="${links.spotify}" rel="noopener">Spotify</a> <span aria-hidden="true">·</span> <a href="${links.apple}" rel="noopener">Apple Music</a> <span aria-hidden="true">·</span> <a href="${links.youtube}" rel="noopener">YouTube</a> <span aria-hidden="true">·</span> <a href="${links.soundcloud}" rel="noopener">SoundCloud</a></p>
  <p class="foot-contact">Press, booking, licensing: <a href="mailto:${site.email}">${site.email}</a></p>
  <p class="foot-copy">Copyright &copy; ${site.foundedYear}&ndash;${new Date().getFullYear()} ${site.name}. All rights reserved.</p>
</footer>
</body>
</html>
`;
}

const bandJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MusicGroup',
  name: site.name,
  url: site.url,
  email: site.email,
  genre: 'Rock',
  foundingDate: String(site.foundedYear),
  foundingLocation: { '@type': 'Place', name: 'New Jersey' },
  image: site.url + '/img/band-live.jpg',
  sameAs: [links.bandcamp, links.spotify, links.apple, links.youtube, links.instagram, links.facebook, links.x, links.soundcloud],
  album: releases.filter((r) => r.bandcamp).map((r) => ({ '@type': 'MusicAlbum', name: r.title, datePublished: r.date, url: site.url + '/music/#' + r.slug, image: site.url + (r.coverLarge || r.cover) })),
};

// ---------- shared blocks ----------
function listenButtons(rel, { primaryLabel } = {}) {
  const out = [];
  if (rel.bandcamp) out.push(`<a class="btn btn-primary" href="${rel.bandcamp.url}" rel="noopener">${icons.bandcamp} ${primaryLabel || 'Buy Or Stream On Bandcamp'}</a>`);
  if (rel.fma) out.push(`<a class="btn btn-primary" href="${rel.fma}" rel="noopener">Free Download On The Free Music Archive</a>`);
  if (rel.spotify) out.push(`<a class="btn" href="${rel.spotify}" rel="noopener">${icons.spotify} Spotify</a>`);
  if (rel.apple) out.push(`<a class="btn" href="${rel.apple}" rel="noopener">${icons.applemusic} Apple Music</a>`);
  if (rel.soundcloud) out.push(`<a class="btn" href="${rel.soundcloud}" rel="noopener">${icons.soundcloud} SoundCloud</a>`);
  return `<div class="btn-row">${out.join('')}</div>`;
}

function trackList(rel) {
  if (!rel.tracks) return '';
  return `<ol class="tracks">${rel.tracks.map(([t, d]) => `<li><span class="t">${esc(t)}</span>${d ? `<span class="d">${d}</span>` : ''}</li>`).join('')}</ol>`;
}

function releaseCard(rel, { player = true } = {}) {
  return `<article class="release card" id="${rel.slug}">
  <div class="release-art"><img src="${rel.cover}" alt="${esc(rel.title)} cover art" width="800" height="800" loading="lazy"></div>
  <div class="release-body">
    <p class="eyebrow">${esc(rel.kind)} &middot; ${fmtDate(rel.date)}</p>
    <h2 class="release-title">${nw(esc(rel.title))}</h2>
    ${rel.about ? `<p class="release-about">${nw(esc(rel.about))}</p>` : ''}
    ${listenButtons(rel)}
    ${trackList(rel)}
    <details class="credits">
      <summary>Credits</summary>
      ${(rel.credits || []).map((c) => `<p>${nw(esc(c))}</p>`).join('')}
      ${rel.personnel ? `<ul class="personnel">${rel.personnel.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
    </details>
    ${player ? bcPlayer(rel) : ''}
  </div>
</article>`;
}

function mailingListForm(id = 'list') {
  return `<form id="${id}" class="list-form" name="mailing-list" method="POST" action="/thanks/" data-netlify="true" netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="mailing-list">
  <p class="hp"><label>Leave this empty <input name="bot-field"></label></p>
  <label class="field"><span>Name</span><input type="text" name="name" autocomplete="name"></label>
  <label class="field"><span>Email</span><input type="email" name="email" required autocomplete="email" placeholder="you@example.com"></label>
  <button class="btn btn-primary" type="submit">Subscribe</button>
</form>`;
}

function section(title, inner, { cls = '', id = '' } = {}) {
  return `<section class="section ${cls}"${id ? ` id="${id}"` : ''}>${title ? `<h2 class="section-title">${nw(esc(tc(title)))}</h2>` : ''}${inner}</section>`;
}

// ---------- pages ----------
function homePage() {
  const featured = releases.find((r) => r.slug === featuredRelease);
  const featuredQuote = press.flatMap((p) => p.quotes).find((q) => q.featured);
  const hero = `<section class="hero">
  <div class="hero-inner">
    <p class="eyebrow">${esc(announcement.eyebrow)}</p>
    <h1>${nw(esc(announcement.title))}</h1>
    <p class="lede">${nw(esc(announcement.body))}</p>
    <div class="btn-row">
      <a class="btn btn-primary btn-lg" href="${announcement.primary.href}" rel="noopener">${icons.bandcamp} ${esc(announcement.primary.label)}</a>
      <a class="btn btn-ghost btn-lg" href="${announcement.secondary.href}">${esc(announcement.secondary.label)}</a>
    </div>
  </div>
</section>`;

  const latest = section('Latest Release', `<article class="release card featured" id="${featured.slug}">
  <div class="release-art"><img src="${featured.cover}" alt="${esc(featured.title)} cover art" width="800" height="800" fetchpriority="high"></div>
  <div class="release-body">
    <p class="eyebrow">${esc(featured.kind)} &middot; ${featured.year}</p>
    <h3 class="release-title">${nw(esc(featured.title))}</h3>
    <p class="release-about">${nw(esc(featured.about))}</p>
    ${listenButtons(featured)}
    ${bcPlayer(featured, { artwork: 'none' })}
  </div>
</article>`, { cls: 'latest' });

  const listen = section('Listen Everywhere', `<p class="section-lede">${nw('Bandcamp is home base: every release, lossless downloads, and the direct route to supporting the band. The rest of the usual places carry the records too.')}</p>
<div class="tile-row listen-row">
  <a class="tile tile-primary" href="${links.bandcamp}" rel="noopener">${icons.bandcamp}<span>Bandcamp</span></a>
  <a class="tile" href="${links.spotify}" rel="noopener">${icons.spotify}<span>Spotify</span></a>
  <a class="tile" href="${links.apple}" rel="noopener">${icons.applemusic}<span>Apple Music</span></a>
  <a class="tile" href="${links.youtube}" rel="noopener">${icons.youtube}<span>YouTube</span></a>
  <a class="tile" href="${links.soundcloud}" rel="noopener">${icons.soundcloud}<span>SoundCloud</span></a>
</div>`);

  const disco = section('Records', `<div class="tile-row cover-grid">${releases.map((r) => `<a class="cover-tile" href="/music/#${r.slug}"><img src="${r.cover}" alt="${esc(r.title)} cover art" width="800" height="800" loading="lazy"><span class="cover-caption"><strong>${esc(r.title)}</strong><em>${r.year}</em></span></a>`).join('')}</div>
<p class="more"><a href="/music/">All Releases, Tracklists, And Credits</a></p>`);

  const quote = `<section class="pull band-gold"><blockquote><p>&ldquo;${nw(esc(featuredQuote.text))}&rdquo;</p><footer>${esc(featuredQuote.who)}</footer></blockquote></section>`;

  const vid = section('Watch', `<div class="video-wrap"><iframe loading="lazy" src="https://www.youtube-nocookie.com/embed/${videos[0].id}" title="${esc(videos[0].title)} ${esc(videos[0].sub)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
<p class="more"><a href="/video/">More Videos</a></p>`);

  const list = section('Stay In The Loop', `<div class="card list-card"><p class="section-lede">${nw('New songs and show dates, straight to your inbox. Nothing else, ever.')}</p>${mailingListForm('list')}</div>`, { id: 'list' });

  return shell({ title: site.name, path: '/', body: hero + latest + listen + disco + quote + vid + list, jsonld: bandJsonLd, bodyClass: 'home' });
}

function musicPage() {
  const body = `<header class="page-head"><h1>Music</h1><p class="lede">${nw('Three albums, one live EP, and a handful of singles. Everything is on Bandcamp, most of it is on the streaming services too.')}</p></header>
<nav class="jump" aria-label="Releases">${releases.map((r) => `<a href="#${r.slug}">${esc(r.title)}</a>`).join('')}<a href="#singles">Singles</a></nav>
${releases.map((r) => releaseCard(r)).join('\n')}
${section('Singles', `<div class="tile-row single-grid">${singles.map((s) => `<article class="single card" id="${s.slug}">
  <img src="${s.cover}" alt="${esc(s.title)} cover art" width="800" height="800" loading="lazy">
  <div class="single-body">
    <p class="eyebrow">Single &middot; ${s.year}</p>
    <h3>${nw(esc(s.title))}</h3>
    <p>${nw(esc(s.note))}</p>
    ${bcPlayer(s)}
    <a class="btn btn-primary" href="${s.bandcamp.url}" rel="noopener">${icons.bandcamp} Bandcamp</a>
  </div>
</article>`).join('')}</div>`, { id: 'singles' })}`;
  return shell({ title: 'Music', description: 'Run Pass Option, Carousel Season, Upstairs, the Live at WFMU EP, and singles by The Deafening Colors, with tracklists, credits, and Bandcamp players.', path: '/music/', body, og: '/img/covers/run-pass-option-1200.jpg' });
}

function showsPage() {
  const up = shows.upcoming.slice().sort((a, b) => a.date.localeCompare(b.date));
  const past = shows.past.slice().sort((a, b) => b.date.localeCompare(a.date));
  const row = (s) => `<li class="show">
  <time datetime="${s.date}">${fmtShort(s.date)}</time>
  <div class="show-body"><strong>${esc(s.venue)}</strong><span>${esc(s.city)}</span>${s.time ? `<span>${esc(s.time)}</span>` : ''}${s.with ? `<span>with ${esc(s.with)}</span>` : ''}${s.note ? `<span>${esc(s.note)}</span>` : ''}</div>
  ${s.tickets ? `<a class="btn btn-primary" href="${s.tickets}" rel="noopener">Tickets</a>` : ''}
</li>`;
  const body = `<header class="page-head"><h1>Shows</h1></header>
${section('Upcoming', up.length ? `<ul class="show-list">${up.map(row).join('')}</ul>` : `<div class="card empty"><p>${nw('No dates on the calendar right now. Join the mailing list and you will hear about the next one first.')}</p><p><a class="btn btn-primary" href="/contact/#list">Join The Mailing List</a></p></div>`)}
${section('Past Shows', `<ul class="show-list past">${past.map(row).join('')}</ul>
<div class="tile-row poster-row">${past.filter((s) => s.poster).map((s) => `<figure class="poster"><img src="${s.poster}" alt="Poster for ${esc(s.venue)}, ${fmtShort(s.date)}" loading="lazy"><figcaption>${esc(s.venue)}, ${fmtShort(s.date)}</figcaption></figure>`).join('')}</div>`)}`;
  return shell({ title: 'Shows', description: 'Upcoming and past live shows by The Deafening Colors.', path: '/shows/', body });
}

function videoPage() {
  const body = `<header class="page-head"><h1>Video</h1><p class="lede"><a href="${links.youtube}" rel="noopener">The Deafening Colors on YouTube</a></p></header>
<div class="video-list">${videos.map((v) => `<article class="video card">
  <div class="video-wrap"><iframe loading="lazy" src="https://www.youtube-nocookie.com/embed/${v.id}" title="${esc(v.title)} ${esc(v.sub)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
  <div class="video-body"><h2>${esc(v.title)}</h2><p class="eyebrow">${esc(v.sub)}</p>${v.notes.map((n) => `<p>${nw(esc(n))}</p>`).join('')}</div>
</article>`).join('')}</div>`;
  return shell({ title: 'Video', description: 'Music videos and live footage from The Deafening Colors.', path: '/video/', body });
}

function pressPage() {
  const body = `<header class="page-head"><h1>Press</h1><p class="lede">Press, booking, licensing: <a href="mailto:${site.email}">${site.email}</a></p></header>
${press.map((g) => section(`${g.album} Reviews`, `<div class="quote-list">${g.quotes.map((q) => `<blockquote class="card quote">
  <p>&ldquo;${nw(esc(q.text))}&rdquo;</p>
  <footer>${q.who ? `<span class="who">${esc(q.who)}</span>` : ''}${q.outlet ? `<span class="outlet">${esc(q.outlet)}</span>` : ''}${q.url ? `<a href="${q.url}" rel="noopener">${esc(q.linkLabel || 'Full Article')}</a>` : ''}</footer>
</blockquote>`).join('')}</div>`)).join('')}`;
  return shell({ title: 'Press', description: 'Reviews of Run Pass Option and Carousel Season by The Deafening Colors.', path: '/press/', body });
}

function aboutPage() {
  const body = `<header class="page-head"><h1>About</h1></header>
<figure class="band-photo"><img src="/img/band-live.jpg" alt="The Deafening Colors on stage" width="1200" height="801"></figure>
<div class="prose">${about.map((p) => `<p>${nw(inline(p))}</p>`).join('\n')}</div>
<section class="pull band-gold"><blockquote><p>&ldquo;${nw(esc(bandcampQuote.text))}&rdquo;</p><footer>${esc(bandcampQuote.who)}</footer></blockquote></section>`;
  return shell({ title: 'About', description: 'The Deafening Colors: John Paul Arthur and Cristofer Slotoroff, a rock band founded in New Jersey in 2009.', path: '/about/', body, og: '/img/band-live.jpg' });
}

// News archive from news/*.md (the old Wix blog, reproduced verbatim).
function loadPosts() {
  const dir = path.join(ROOT, 'news');
  return fs.readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => {
    const raw = fs.readFileSync(path.join(dir, f), 'utf8');
    const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    const fm = {};
    for (const line of m[1].split('\n')) {
      const k = line.slice(0, line.indexOf(':')).trim();
      let v = line.slice(line.indexOf(':') + 1).trim();
      if (/^".*"$/.test(v)) v = JSON.parse(v);
      fm[k] = v;
    }
    const base = f.replace(/\.md$/, '');
    const slug = base.slice(0, 10).replace(/_/g, '/') + '/' + base.slice(11);
    return { ...fm, body: m[2].trim(), slug, url: `/news/${slug}/` };
  }).sort((a, b) => b.date.localeCompare(a.date));
}
function excerpt(body) {
  const p = body.split(/\n\s*\n/).map((b) => b.trim()).find((b) => b && !b.startsWith('![') && !b.startsWith('[![') && !b.startsWith('[EMBED'));
  const t = (p || '').replace(/!\[[^\]]*\]\([^)]+\)/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\s+/g, ' ');
  return t.length > 180 ? t.slice(0, 177).replace(/\s+\S*$/, '') + '…' : t;
}
function newsPages(posts) {
  const index = `<header class="page-head"><h1>News</h1><p class="lede">${nw('Updates from the band, going back to 2016. New posts land here first.')}</p></header>
<ul class="post-list">${posts.map((p) => `<li class="card post-item"><time datetime="${p.date}">${fmtDate(p.date)}</time><h2><a href="${p.url}">${esc(p.title)}</a></h2><p>${nw(esc(excerpt(p.body)))}</p></li>`).join('')}</ul>`;
  write('news/index.html', shell({ title: 'News', description: 'News and updates from The Deafening Colors.', path: '/news/', body: index }));
  for (const p of posts) {
    const body = `<article class="post"><header class="page-head"><p class="eyebrow"><time datetime="${p.date}">${fmtDate(p.date)}</time></p><h1>${esc(p.title)}</h1></header>
<div class="prose">${md(p.body)}</div>
<p class="more"><a href="/news/">All News</a></p></article>`;
    write(`news/${p.slug}/index.html`, shell({ title: p.title, description: excerpt(p.body), path: p.url, body, jsonld: { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: p.title, datePublished: p.date, author: { '@type': 'MusicGroup', name: site.name }, url: site.url + p.url } }));
  }
  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel><title>${esc(site.name)} News</title><link>${site.url}/news/</link><description>${esc(site.description)}</description>
${posts.map((p) => `<item><title>${esc(p.title)}</title><link>${site.url}${p.url}</link><guid>${site.url}${p.url}</guid><pubDate>${new Date(p.date + 'T12:00:00Z').toUTCString()}</pubDate><description>${esc(excerpt(p.body))}</description></item>`).join('\n')}
</channel></rss>
`;
  write('feed.xml', feed);
}

function contactPage() {
  const body = `<header class="page-head"><h1>Contact</h1></header>
<div class="contact-grid">
  <div class="card"><h2>Press, Booking, Licensing</h2><p class="big"><a href="mailto:${site.email}">${site.email}</a></p><p>${nw('Also on ' + iconRow.map((i) => `<a href="${links[i.key]}" rel="noopener">${i.label}</a>`).join(', ').replace(/, ([^,]*)$/, ', and $1') + '.')}</p></div>
  <div class="card list-card" id="list-card"><h2>Mailing List</h2><p>${nw('To receive updates from The Deafening Colors, subscribe below. New songs and show dates only.')}</p>${mailingListForm('list')}</div>
</div>`;
  return shell({ title: 'Contact', description: 'Contact The Deafening Colors for press, booking, and licensing, or join the mailing list.', path: '/contact/', body });
}

function thanksPage() {
  const body = `<header class="page-head"><h1>Thanks</h1><p class="lede">${nw('You are on the list. We will only write when there is a new song or a show.')}</p><p><a class="btn btn-primary" href="${links.bandcamp}" rel="noopener">${icons.bandcamp} Listen On Bandcamp</a> <a class="btn" href="/">Back Home</a></p></header>`;
  return shell({ title: 'Thanks', description: 'Subscribed.', path: '/thanks/', body });
}

function notFound() {
  const body = `<header class="page-head"><h1>Page Not Found</h1><p class="lede">${nw('That page moved when the site left Wix. Try the music, or head home.')}</p><p><a class="btn btn-primary" href="/music/">Music</a> <a class="btn" href="/">Home</a></p></header>`;
  return shell({ title: 'Page Not Found', description: 'Page not found.', path: '/404.html', body });
}

// ---------- build ----------
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });
copyDir(path.join(ROOT, 'img'), path.join(DIST, 'img'));
copyDir(path.join(ROOT, 'css'), path.join(DIST, 'css'));
copyDir(path.join(ROOT, 'static'), DIST);

write('index.html', homePage());
write('music/index.html', musicPage());
write('shows/index.html', showsPage());
write('video/index.html', videoPage());
write('press/index.html', pressPage());
write('about/index.html', aboutPage());
write('contact/index.html', contactPage());
write('thanks/index.html', thanksPage());
write('404.html', notFound());
const posts = loadPosts();
newsPages(posts);

const pages = ['/', '/music/', '/shows/', '/video/', '/press/', '/about/', '/news/', '/contact/', ...posts.map((p) => p.url)];
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((p) => `<url><loc>${site.url}${p}</loc></url>`).join('\n')}\n</urlset>\n`);
write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n`);

console.log(`Built ${pages.length} pages into dist/ (${BUILD_DATE}).`);
