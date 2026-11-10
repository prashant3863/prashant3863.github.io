# notshant.xyz

Prashant Mittal's personal site: a Jekyll 4 site with a Tailwind 2 CSS build (parcel → `dist/index.css`). It deploys to GitHub Pages on push to `master` (`.github/workflows/pages.yml`).

## Design system: read before any UI, layout or copy change

The brand and design system live in `design/`. Start with `design/README.md`, then `design/brand.md` and `design/system.md`. In short:

- **Values:** use the tokens in `design/tokens.css` (or the `ns-*` Tailwind classes). Never hard-code a new colour, size or timing: hard-coded colours break dark mode, which works by swapping the tokens under `html.dark`.
- **Components:** use the `ns-` classes in `design/components.css` and the includes in `_includes/ns/`.
- **Logo:** `{% include ns/logo.html %}`. It has two shapes, and the ¬ bar must never be dropped.
- **Layout:** one 600px text column, left-aligned. The right column holds one quiet thing: the glider on home, the timeline on about, on-this-page on long posts. Posts run wider: the on-this-page list is a narrow 220px column, and posts without one span the full width.
- **Motion:** slow and singular. Every motion respects `prefers-reduced-motion`. The logo and glider timings in `system.md` are deliberate; don't "improve" them.
- **Copy:** plain first person. No consulting or availability pitch, ever. Link to X posts; don't embed them.
- **Never publish:** Prashant's phone or personal email, realfast revenue, team size or internal project names, or anything private from his Roam graph.
- **After changing the system:** update `tokens.css` first, then the docs, and add a decision-log row.

## Where things live

- Pages: `index.html` (home), `about.html`, `photos.html`, `archive.html` (`/posts/past-life`), `notes.html` (unpublished until there are notes).
- Posts: `_posts/`, rendered by `_layouts/post.html`. Lab notes go in `_notes/`.
- Lists: `_data/photos.yml`, `archive.yml`, `built.yml`, `talks.yml`. `photos.yml` is a list of collections (Italy, Ladakh, Others…); each gets its own page at `/photos/<slug>/`, made by `_plugins/photo_collections.rb`. Photos are **not in the repo**: they live in the Cloudflare R2 bucket `notshant-photos`, served from `photos.notshant.xyz` (`site.photos_url`). They're made and uploaded with `scripts/photos.py`, and file names are never reused (see `design/system.md` → Photographs).
- Front matter keys (`nav`, `ns_js`, `toc`, `list_title`, `listed`, `soon`) are listed in `design/system.md` → How the site is built.

## Plans and runbooks

`docs/` (not published) holds working plans, e.g. `docs/domain-dns-and-photo-hosting.md` for the DNS move to Cloudflare and photos on R2.

## Commands

- `npm run start`: CSS watch + `jekyll serve`.
- `npm run build`: production CSS + `jekyll build`.
- Open `design/styleguide.html` directly in a browser to check components.
- Photos: `.venv/bin/python scripts/photos.py make <series-folder> <photos or folders…>`, then `… upload <series-folder>`. Uploads use the `r2` AWS CLI profile (Cloudflare R2 keys in `~/.aws/credentials`, never in the repo). Prashant picks photos by hearting them in Photos; export them through Photos with osascript, JPEGs only (each photo is RAW+JPEG).
