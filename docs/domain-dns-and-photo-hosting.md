# Domain, DNS and photo hosting plan

Written 8 Nov 2026. To do on 9 Nov 2026. This folder is excluded from the Jekyll build, so nothing here is published.

## Decision

- **Keep the domain registered at Squarespace.** It was just renewed, and moving the registration isn't needed.
- **Move only the DNS to Cloudflare (free plan).** This doesn't touch the registration or its renewal, and costs nothing.
- **Why:** photos will live in Cloudflare R2. R2 only caches at the edge (works as a CDN) through a custom domain like `photos.notshant.xyz`, and that domain's DNS has to be on Cloudflare. R2's own `r2.dev` address is rate-limited, isn't cached, and Cloudflare says it isn't for production.
- **Don't transfer the registration to Cloudflare Registrar now.** A transfer charges one year, which is added to the current expiry. But if a domain is transferred within 45 days of a renewal, the registry may not add that year, so you'd pay twice. If a transfer is ever wanted, do it 45+ days after the renewal date.

## Current state (checked 8 Nov 2026)

| Record | Value |
|---|---|
| Nameservers | `ns-cloud-c1…c4.googledomains.com` (Squarespace's DNS, inherited from Google Domains) |
| `A` notshant.xyz | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (GitHub Pages) |
| `www`, `AAAA`, `MX`, `TXT` | none |
| `DS` (DNSSEC) | none at the .xyz registry, so DNSSEC looks already off. Confirm in Squarespace. |

The repo's `CNAME` file holds `notshant.xyz`; GitHub Pages serves the site from it.

## Checklist

**Status, 10 Nov 2026:** steps 1–3 are done.
- Cloudflare had found no records, so the four `A` records and `www` were added by hand, all DNS only.
- The nameservers are `coraline.ns.cloudflare.com` and `rodney.ns.cloudflare.com`. The registry switched at 08:30.
- Verified: the site returns 200 with GitHub's Let's Encrypt certificate (valid to Jan 2027), and `www` redirects to the apex.
- Step 4 (R2) is also done:
  - The bucket is `notshant-photos` (APAC), served from `photos.notshant.xyz`. `r2.dev` is disabled.
  - The upload token is in the `r2` AWS CLI profile. The first token was deleted after it was pasted into a chat.
  - Verified: photos return 200, the second request is a cache `HIT`, and the header is `Cache-Control: public, max-age=31536000, immutable`.
  - All three series are uploaded (228 files, about 119 MB), and the site reads from `photos_url`. `assets/photos/` is gone from the repo.
- Still open: one page per series, and a row-based grid.

### 1. Before switching

- [ ] In Squarespace → Domains → notshant.xyz → DNS: screenshot every record, for rollback.
- [ ] In Squarespace's domain settings: make sure **DNSSEC is off**.
  - If it was on and you just turned it off, wait until the DS record is gone before step 3. Check with `dig DS notshant.xyz @1.1.1.1 +short`; it should print nothing. Then wait a few more hours for caches.
  - As of 8 Nov there's already no DS record, so this may be instant.
  - Rechecked 10 Nov: still no DS record, so it's safe to switch. The Cloudflare account exists.

### 2. Set up Cloudflare

- [ ] Create a free Cloudflare account and add `notshant.xyz` (Free plan).
- [ ] Check the imported DNS records. You need the four GitHub Pages `A` records above.
  - Set them to **DNS only** (grey cloud), so GitHub keeps issuing the site's HTTPS certificate.
  - Optional: add `CNAME www → prashant3863.github.io` (DNS only) so www works too.
- [ ] Note the two nameservers Cloudflare assigns.

### 3. Switch nameservers

- [ ] In Squarespace's domain settings, use **custom nameservers** and enter Cloudflare's two. Squarespace's own help page has the exact steps; third-party guides call it "Use custom nameservers".
- [ ] Wait for Cloudflare to show the site as **Active**. It usually takes minutes and can take up to a day.
- [ ] Verify:
  - `dig NS notshant.xyz +short` shows Cloudflare's nameservers.
  - `dig A notshant.xyz +short` shows the four GitHub IPs.
  - https://notshant.xyz loads with a valid certificate.
  - GitHub repo → Settings → Pages shows the custom domain check passing and "Enforce HTTPS" still on.
- [ ] Optional: turn DNSSEC on in Cloudflare, then add the DS record it gives you in Squarespace.

**Rollback:** in Squarespace, switch back to its default nameservers. Recreate any records from the screenshot if they're missing.

### 4. Photos on R2 (after DNS is active)

You do these in the Cloudflare dashboard:

- [ ] **Turn on R2.** Cloudflare → R2 Object Storage. It asks for a payment method even on the free tier. The free tier is 10 GB of storage, 1M writes and 10M reads a month, and **no bandwidth charges**. The Italian Summer at three sizes is about 130 MB.
- [ ] **Create the bucket** `notshant-photos`. Use location Automatic and the Standard storage class.
- [ ] **Connect the domain.** Bucket → Settings → Custom Domains → Connect → `photos.notshant.xyz`.
  - This only works once the zone is Active (step 3). Cloudflare adds the DNS record and the certificate itself.
  - Leave the "Public Development URL" (`r2.dev`) **disabled**.
- [ ] **Create an API token.** R2 → Manage API tokens → Create token. Give it **Object Read & Write**, applied to the `notshant-photos` bucket only.
  - The token page shows an Access Key ID, a Secret Access Key and an S3 endpoint (`https://<account-id>.r2.cloudflarestorage.com`).
  - The secret is shown only once.
- [ ] **Save the keys on your Mac.** In your own Terminal (not in the chat with Claude), run `aws configure --profile r2`.
  - Paste the key ID and the secret, set the region to `auto`, and press Enter for the output format.
  - This stores them in `~/.aws/credentials`, outside the repo. Never paste the secret into the chat or the repo.
- [ ] **Tell Claude the endpoint URL.** The account ID in it isn't secret.

Then Claude does the rest:

- [ ] **Test the bucket.** Upload one test file, read it back through `photos.notshant.xyz`, and check that Cloudflare caches it (`cf-cache-status: HIT`). Every file is uploaded with `Cache-Control: public, max-age=31536000, immutable`, because a file's name never gets reused for different content.
- [ ] **Build the photo command.**
  - It takes the hearted export folder and strips all metadata, including GPS.
  - It makes three sizes: 720px for the grid, 1600px, and 3200px for big and high-resolution screens.
  - It uploads them to R2 and writes the entries into `_data/photos.yml`.
- [ ] **Change the site to use R2.**
  - Add `photos_url: https://photos.notshant.xyz` in `_config.yml`.
  - The grid gets `srcset`, so high-resolution screens get the sharper size.
  - The viewer loads 3200px on large or high-resolution screens and 1600px otherwise.
- [ ] **Move The Italian Summer to R2** and delete its copy from `assets/photos/`. If it was never committed, it never enters git history.
  - Optionally, move the two older series (about 5 MB) as well, so every photo comes from one place.
- [ ] **Later:** one page per series, and a row-based grid.

## Also pending: lab notes from Roam

The plan: no copying by hand and nothing committed. Roam stays the source, and the site rebuilds from it.

- Tag pages `#notshant` in Roam to publish them, and tag blocks `#private` to keep them out.
- You create a **read-only** Roam API token and save it as a GitHub Actions secret.
  - Third-party docs say it's under Settings → Graph → API Tokens, and the token starts `roam-graph-token-`.
- The deploy workflow gets a step before the Jekyll build that pulls the tagged pages and turns them into notes. It runs on push, nightly, and on demand ("Run workflow").
- Still to decide:
  - The note-page look on the canvas (A outline, recommended, or B notebook).
  - Whether to keep the link map on the notes index.
  - Which pages to publish first.

## Sources

- [Cloudflare R2: public buckets](https://developers.cloudflare.com/r2/buckets/public-buckets/index.md)
- [Cloudflare R2: limits](https://developers.cloudflare.com/r2/platform/limits/index.md)
- [Cloudflare: updating nameservers](https://developers.cloudflare.com/dns/nameservers/update-nameservers/index.md)
- [Cloudflare: DNSSEC](https://developers.cloudflare.com/dns/dnssec/index.md)
- [Cloudflare Registrar: transfer to Cloudflare](https://developers.cloudflare.com/registrar/domain-transfers/transfer-to-cloudflare)
- [Cloudflare Registrar FAQ](https://developers.cloudflare.com/registrar/faq/)
- [How to change nameservers on Squarespace](https://www.snagged.com/guides/how-to-change-nameservers-on-squarespace) (third party)
- [Roam API tokens (Raycast Roam extension)](https://raycast.com/roamresearch/roam-research) (third party)
