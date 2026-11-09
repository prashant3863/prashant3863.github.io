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

### 1. Before switching

- [ ] In Squarespace → Domains → notshant.xyz → DNS: screenshot every record, for rollback.
- [ ] In Squarespace's domain settings: make sure **DNSSEC is off**.
  - If it was on and you just turned it off, wait until the DS record is gone before step 3. Check with `dig DS notshant.xyz @1.1.1.1 +short`; it should print nothing. Then wait a few more hours for caches.
  - As of 8 Nov there's already no DS record, so this may be instant.

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

- [ ] Cloudflare → R2: create a bucket, e.g. `notshant-photos`. R2 may ask for a payment method even on the free tier (10 GB storage, no bandwidth charges).
- [ ] Bucket → Settings → connect the custom domain `photos.notshant.xyz`. Keep the `r2.dev` address **disabled**.
- [ ] Create an R2 API token scoped to that bucket. Keep it on your machine only, never in the repo.
- [ ] Then, with Claude: build the photo command.
  - It takes a folder of originals and strips all metadata, including GPS.
  - It makes a thumbnail, a mid size and a ~3200px long-edge version.
  - It uploads them to R2 and writes the entries into `_data/photos.yml`.
  - After that, Claude changes the Photos page to one page per series and a row-based grid.

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
