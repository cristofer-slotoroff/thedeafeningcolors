# thedeafeningcolors.com: status

_Updated 2026-09-04. Static site, no dependencies. `node build.mjs` writes `dist/`. Netlify project "thedeafeningcolors" (id 8ebea7d9-849d-47fb-838b-20e847077337), manual CLI deploys, NOT wired to git. Custom domain not yet attached (still on Wix)._

## Where this stands (read first)

**2026-09-04: site rebuilt off Wix, draft-deployed to Netlify for review. Not live on the domain yet.** The old Wix site (2015 to 2019 content, last post February 2019) is still what thedeafeningcolors.com serves.

- Draft preview (verified 200 on 2026-09-04): https://6a9b123aece5062f34bdc637--thedeafeningcolors.netlify.app. The stable https://thedeafeningcolors.netlify.app URL fills in with the first `--prod` deploy. The domain still points at Wix.
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

1. Cris reviews the preview and signs off on the hero copy.
2. Production deploy to the Netlify site (`--prod`).
3. Point the domain at Netlify. Two options: (a) keep the domain registered at Wix and change the DNS records there to Netlify (fast, reversible), or (b) transfer the registration away from Wix (slower, needs the Wix unlock and auth code, keeps everything out of Wix). Recommend (a) first, (b) later.
4. Add the custom domain to the Netlify site, wait for HTTPS.
5. Export Wix contacts (the old mailing list) before the plan lapses.
6. Cancel the Wix Premium plan auto-renew (next charge March 9, 2027). Cris only.
7. Turn on Netlify form detection for the mailing-list form and add an email notification (as done on cristoferslotoroff.com).

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

1. Cris reviews the draft preview and confirms the hero copy.
2. Production deploy, then DNS cut-over at Wix.
3. Export Wix contacts, cancel the Wix plan renewal.
4. Banked ideas: GoatCounter analytics, a release-day landing page for the new record, Bandcamp "follow" count on the home page.
