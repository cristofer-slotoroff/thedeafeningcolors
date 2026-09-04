# thedeafeningcolors.com: status

_Updated 2026-09-04. Static site, no dependencies. `node build.mjs` writes `dist/`. Netlify project "thedeafeningcolors" (id 8ebea7d9-849d-47fb-838b-20e847077337), custom domain thedeafeningcolors.com (www redirects to apex), HTTPS forced, manual CLI deploys, NOT wired to git._

## Where this stands (read first)

**LIVE at https://thedeafeningcolors.com since 2026-09-04 (Cris: "this looks amazing. let's go with it").** Cris edited the DNS records at Wix by hand (the browser-automation classifier blocked me from doing it). Verified the same day: Wix nameservers answer A 75.2.60.5 and www CNAME thedeafeningcolors.netlify.app, Let's Encrypt certificate issued for both names, http redirects to https, www redirects to the apex, old Wix post URLs 301 to /news/. Chrome loaded https://thedeafeningcolors.com/ and showed the new home page. The domain stays REGISTERED at Wix (paid through April 2029); only the records changed. MX and the secureserver CNAMEs were left alone.

- Title Case rule clarified by Cris 2026-09-04: EVERY word capitalized ("New Music Is On The Way"). `tc()` in build.mjs does it for section titles; labels in data.mjs are written that way by hand. Old post titles stay verbatim.
- Mailing list = Netlify Forms, form `mailing-list` (name, email, honeypot). Verified 2026-09-04 on the live domain: form registered, a test POST landed as a submission, then deleted. Email hook `submission_created` to thedeafeningcolors@gmail.com (hook 6a9b19c4e3323175dc771fdc). Signups live at https://app.netlify.com/projects/thedeafeningcolors/forms (CSV export there). Free tier: 100 submissions a month. Sending a newsletter needs a sender tool (Buttondown or Mailchimp); banked.
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
2. DONE 2026-09-04 by Cris: DNS edited at Wix (Account > Domains > ... > Manage DNS records). First attempt put the IP in the Host name box, which left the apex with no A record for a few minutes; fixed on the second pass. Wix DNS records as found on 2026-09-04: A @ 185.230.63.171 / .186 / .107 (three Wix IPs, TTL 1 hour); CNAME www -> Wix; CNAME calendar/email -> secureserver.net; MX -> secureserver.net. Change: A @ -> 75.2.60.5 (one record, delete the other two), CNAME www -> thedeafeningcolors.netlify.app. Leave MX and the secureserver CNAMEs alone.
3. DONE 2026-09-04: certificate provisioned via `netlify api provisionSiteTLSCertificate`, `force_ssl` set, apex and www verified.
4. DONE 2026-09-04: checked Wix Contacts. 7 entries total: 2 Wix demo contacts, the band's own two accounts, 2 spam site-member signups from 2022, and 1 "subscribed" entry from 2024 with a malformed spam address. No real mailing list ever accumulated on Wix; nothing exported. The new list starts from zero on Netlify Forms.
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

1. Cris cancelled the Wix Core plan on 2026-09-04; premium features end March 28, 2027. Wix said the domain will "disconnect from your site" then. INFERRED, not verified: our custom A and CNAME records survive because they live on the separate Domain subscription (paid to April 2029). Re-verify with `dig @ns6.wixdns.net thedeafeningcolors.com A` in early March 2027; if unsure, move DNS to Netlify DNS or transfer the registrar before the 28th.
2. Replace the placeholder hero copy when the new record has a name and date.
3. Wire a newsletter sender (Buttondown or Mailchimp) when there is something to send.
4. Banked ideas: GoatCounter analytics, a release-day landing page for the new record, Bandcamp "follow" count on the home page.

## Session log

### 2026-09-04: rebuilt off Wix, launched on Netlify, domain cut over

**Work completed**

- Pulled every page of the old Wix site and the Bandcamp catalog (album ids, tracklists, credits, art) into `data.mjs`, `news/*.md`, and `img/`. Band copy reproduced verbatim.
- Wrote the static build (`build.mjs`, `css/style.css`): 18 pages, Bandcamp players per release, Netlify mailing-list form, old Wix URL redirects, RSS, sitemap, JSON-LD.
- Created Netlify project `thedeafeningcolors`, deployed, attached the custom domain and www alias, forced HTTPS, turned on form detection, added the email hook.
- Cris switched the DNS records at Wix by hand. Certificate issued, apex and www verified, old post links verified redirecting.
- Checked Wix Contacts: nothing real to export. Cris cancelled the Wix Core plan (ends March 28, 2027).
- Title Case rule clarified by Cris: every word capitalized. Saved to memory and applied site-wide.

**Where it falls in the plan**

- The de-Wix is done. The site is the band's home again, editable from this folder. The next milestone is the new record: hero copy, featured release, and a news post on release day.

**Roadblocks**

- The browser-automation classifier blocked editing DNS records in Wix, so Cris did that step. His first pass put the IP in the Host name box, which left the bare domain with no A record for a few minutes; caught by checking Wix's nameservers directly and fixed on the second pass.
- This Mac's DNS cache held the empty answer for a while, so verification used `--resolve` and Cloudflare and Google resolvers instead.
- The Free Music Archive refused image downloads without a browser referer; solved with headers.
- The folder inherits a stray Netlify link to `sjta-shuttle`; every deploy passes `--site`.

**Successes and new understanding**

- Gmail never ran through Wix; nothing to detach. The domain registration and the Premium plan are separate Wix subscriptions, which is what made the record-only cut-over possible.
- Bandcamp album ids are in each album page's `bc-page-properties` meta tag; the embedded player takes them directly.
- The domain's MX rows still point at old GoDaddy mail servers; harmless, left alone.

**Pick up next session**

1. When the new record has a name and date: edit `announcement` and add the release in `data.mjs`, drop the cover in `img/covers/`, set `featuredRelease`, write a news post, build, deploy with `--prod --site 8ebea7d9-849d-47fb-838b-20e847077337`.
2. Early March 2027: re-verify DNS at Wix (see cut-over plan step 1) before the Wix plan ends on the 28th.
3. Banked: newsletter sender, GoatCounter analytics, Bandcamp follow count on the home page.
