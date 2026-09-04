# thedeafeningcolors.com: status

_Updated 2026-09-04. Static site, no dependencies. `node build.mjs` writes `dist/`. Netlify project "thedeafeningcolors" (id 8ebea7d9-849d-47fb-838b-20e847077337), manual CLI deploys, NOT wired to git. Custom domain not yet attached (still on Wix)._

## Where this stands (read first)

**2026-09-04: Cris approved the rebuild ("this looks amazing"). Production is deployed at https://thedeafeningcolors.netlify.app (verified 200). Custom domain thedeafeningcolors.com plus www alias are attached on the Netlify side. The DNS switch at Wix is the last step and Cris does it by hand: the browser-automation classifier blocked me from editing DNS records.** Until then the domain still serves the old Wix site.

- Title Case rule clarified by Cris 2026-09-04: EVERY word capitalized ("New Music Is On The Way"). `tc()` in build.mjs does it for section titles; labels in data.mjs are written that way by hand. Old post titles stay verbatim.
- Netlify Forms: detection on (`ignore_html_forms: false`), email hook `submission_created` to thedeafeningcolors@gmail.com (hook 6a9b19c4e3323175dc771fdc). Untested until the first real submission on the live domain.
- Content pulled from the live Wix pages and Bandcamp on 2026-09-04: bio, credits, press quotes, video notes, and all ten blog posts are reproduced VERBATIM in `data.mjs` and `news/*.md`. Do not reword them; layout only.
- PLACEHOLDER: home hero copy ("New Music Is on the Way" plus two sentences) is mine, not the band's. Cris to confirm or replace in `data.mjs` (`announcement`) once the new release has a name and date.
- Bandcamp is home base by design (Cris: Bandcamp has far more plays than Spotify or Apple). Bandcamp is first in every icon row and button row, the home page embeds the Run Pass Option player, the Music page embeds a player per release, and the singles get track players.
- Palette: near-black ground, slate cards, old gold (from the Wix header) for the top stripe, primary buttons, and the pull-quote band with black type. Never a lighter shade on the same hue.
- Fonts: Libre Caslon Text for the tracked wordmark (the Wix site used Adobe Caslon), Barlow for everything else (the Wix site used DIN Next and Futura).

## Pages

- `/` hero, latest release with Bandcamp player, listen-everywhere row, records grid, WFMU pull quote, Parkway South video, mailing list form.
- `/music/` every release with cover, buttons, tracklist, collapsible credits, Bandcamp player; singles at the bottom.
- `/shows/` upcoming (empty state until `shows.upcoming` has entries) and past shows with two posters.
- `/video/` the four YouTube videos with the original notes.
- `/press/` reviews grouped by album, verbatim.
- `/about/` band photo, bio verbatim, Bandcamp sidebar quote.
- `/news/` archive of the ten Wix blog posts at their old paths (`/news/YYYY/MM/DD/slug/`), plus `/feed.xml`.
- `/contact/` email plus Netlify mailing-list form (`mailing-list`, posts to `/thanks/`).
- Old Wix URLs redirect in `netlify.toml` (`/single-post/*` to `/news/*`, `/social` to `/news/`, `/store` and `/shop` to `/music/`).

## Wix facts (verified in the dashboard 2026-09-04)

- Account login: thedeafeningcolors@gmail.com. Gmail is NOT run through Wix; nothing to detach on the email side. The domain's MX records point at GoDaddy mail servers (secureserver.net), a leftover from wherever the domain lived before Wix. No Wix business email exists.
- Premium plan "Core", yearly, paid March 9, 2026, next charge March 9, 2027 (card ending 6002).
- Domain thedeafeningcolors.com is REGISTERED AT WIX (registrar Wix.com Ltd.), 3-year cycle paid March 21, 2026, renews April 19, 2029. Nameservers ns6/ns7.wixdns.net.
- Dead links on the old site: Square store (404), Google Play Music, Google+. Not carried over.

## Cut-over plan (in order)

1. DONE 2026-09-04: sign-off, production deploy, custom domain attached on Netlify, forms on.
2. Cris edits DNS at Wix (Account > Domains > ... > Manage DNS records). Wix DNS records as found on 2026-09-04: A @ 185.230.63.171 / .186 / .107 (three Wix IPs, TTL 1 hour); CNAME www -> Wix; CNAME calendar/email -> secureserver.net; MX -> secureserver.net. Change: A @ -> 75.2.60.5 (one record, delete the other two), CNAME www -> thedeafeningcolors.netlify.app. Leave MX and the secureserver CNAMEs alone.
3. After propagation (TTL is 1 hour): verify with `dig`, then `netlify api provisionSiteTLSCertificate --data '{"site_id":"8ebea7d9-849d-47fb-838b-20e847077337"}'`, then confirm https://thedeafeningcolors.com serves the new site and www redirects.
4. Export Wix contacts (the old mailing list) before the plan lapses. Cris (it is a download).
5. Cancel the Wix Premium plan auto-renew (next charge March 9, 2027). Cris only. Keep the domain registration at Wix for now (paid through April 2029); transferring the registrar is a later, optional step.

## Deploy

- Preview (does not touch production): `node build.mjs && netlify deploy --dir dist --site 8ebea7d9-849d-47fb-838b-20e847077337`
- Production: same with `--prod`. ALWAYS pass `--site`; this folder inherits a stray link to "sjta-shuttle" from the home folder.
- `.netlify/state.json` here is pinned to the right site (gitignored).

## How to update

- New release: add an entry to `releases` in `data.mjs` (Bandcamp album id is in the page source of the album, `item_id`), drop cover art in `img/covers/`, set `featuredRelease`.
- New show: add to `shows.upcoming` in `data.mjs`.
- News post: add `news/YYYY_MM_DD_slug.md` with `title` and `date` frontmatter.
- Then `node build.mjs`, check `dist/` locally, deploy.

## Priority queue

1. Cris changes the three DNS records at Wix (see cut-over plan step 2), then I verify and provision HTTPS.
2. Export Wix contacts, cancel the Wix plan renewal.
3. Replace the placeholder hero copy when the new record has a name and date.
4. Banked ideas: GoatCounter analytics, a release-day landing page for the new record, Bandcamp "follow" count on the home page.
