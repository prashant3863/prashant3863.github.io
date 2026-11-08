# notshant design system

These are the rules for building notshant.xyz pages: tokens, layout, components and motion. The code lives in:

| File | What |
|---|---|
| `design/tokens.css` | Every colour, size, space and timing, as CSS custom properties. **Source of truth.** |
| `design/components.css` | Component classes, all prefixed `ns-`. |
| `design/tailwind.tokens.js` | The same tokens for Tailwind (`text-ns-muted`, `max-w-ns-measure`, …). |
| `_includes/ns/head.html` | `html.ns-js` flag and the Inter font. |
| `_includes/ns/logo.html` | The logo, both shapes. |
| `_includes/ns/glider.html` | The glider panel and its note. |
| `assets/js/ns-logo.js` | Logo draw-on and hover redraw. |
| `assets/js/ns-glider.js` | The glider animation. |
| `assets/js/ns-toc.js` | Active-section tracking for the timeline / on-this-page list. |
| `assets/js/ns-photos.js` | Photo viewer. |
| `design/styleguide.html` | Every token and component on one page. Open it locally in a browser. |

The brand rules (name, logo, glider, voice, photography) are in [brand.md](brand.md).

## Principles

1. **Unassuming.** A plain text column, the way ajeygore.in and leerob.com do it. No cards, pills, bento grids, heroes or gradients.
2. **Everything starts from one left edge.** The text column is 600px wide and every page's content starts on its left edge.
3. **The right column holds one quiet thing:**
   - Home: the glider.
   - About: the timeline.
   - Long posts: on-this-page.
   - Other pages: nothing.
4. **Only one thing moves on each page.** The logo draws in once per visit; apart from that, each page gets one ambient motion at most, and it's slow.
5. **White, ink and grey, with one mint accent**, which marks state and is never used for text.
6. **Fast and plain.** No third-party widgets or embeds. Images are lazy-loaded and the JS is a few small files.

## Tokens

### Colour

| Token | Value | Use |
|---|---|---|
| `--ns-bg` | #FFFFFF | Page background. Always white. |
| `--ns-ink` | #1C1C1C | Text, headings, logo. |
| `--ns-ink-2` | #4A4A4A | Secondary prose: the glider note. |
| `--ns-muted` | #6B6B6B | Nav, dates, meta, captions. **The lightest colour allowed for text** (5.3:1 on white). |
| `--ns-faint` | #9AA5A2 | List markers only. **Never text** (2.5:1). |
| `--ns-rule` | #ECECEC | Hairlines between rows. |
| `--ns-surface` | #F5F8F7 | Glider panel, code blocks. |
| `--ns-surface-photo` | #EEF1F0 | Image placeholder. |
| `--ns-dot` / `--ns-dot-line` | #C9D4D1 / #E3E8E6 | Grid dots, timeline dots and spine. |
| `--ns-accent` | #2E9C83 | Mint: focus ring, active marker. Not text (3.4:1, fine for UI marks). |
| `--ns-accent-soft` | mint at 14% | Halo around the active timeline dot. |
| `--ns-mint-light` | #9EDDCB | The glider's lit cube face. Post accents: quote bars, pull-quote rules, the key-idea border, labels on the dark callout. Never text on white. |
| `--ns-mint-wash` | #D9F5EC | The glider's pale cube face. Background of a post's key idea. |
| `--ns-underline` / `-hover` | ink at 25% / 75% | Link underline. |
| `--ns-cube-*` | see tokens.css | The glider's faces and shadow. |

### Type

Inter 400, 500 and 600, plus the system mono stack.

| Token | Size / weight | Use |
|---|---|---|
| `--ns-text-intro` | 20px / 500, line-height 1.45, -0.012em | The single h1 at the top of a page. |
| `--ns-text-prose` | 17px / 400, line-height 1.7 | Post body. |
| `--ns-text-body` | 16px / 400, line-height 1.65 | Home, about, notes and photos. |
| `--ns-text-h2` | 15px / 600 | Section headings. |
| `--ns-text-meta` | 14px | Nav, dates, row meta, "All photographs →". |
| `--ns-text-sm` | 13px | Footer. |
| `--ns-text-xs` | 12px mono | Years, glider caption. |

- Headings use sentence case.
- Numbers in lists use tabular figures.
- Nothing is bolder than 600.
- Nothing uses all caps or letter-spaced labels.

### Space, layout and radius

| Token | Value |
|---|---|
| `--ns-container` | 1120px (whole page, header included) |
| `--ns-measure` | 600px (text column) |
| `--ns-measure-post` | 100% (a post with no on-this-page list spans the container) |
| `--ns-toc-width` / `--ns-toc-gap` | 220px / 56px (the on-this-page list beside a post) |
| `--ns-gutter` | clamp(20px, 4vw, 48px) page side padding |
| `--ns-col-gap` | clamp(48px, 7vw, 96px) between text and side column |
| `--ns-header-gap` | clamp(36px, 7vw, 72px) under the header |
| `--ns-section` / `--ns-section-tight` | 56px home / 44px about and notes |
| `--ns-row-y` | 11px row padding |
| `--ns-sticky-top` | 32px |
| `--ns-split-break` | 880px, where the side column stacks |
| `--ns-radius-sm` / `-md` / `-lg` | 6px thumbnails / 12px single photo / 20px glider panel |

## Layout

```
┌──────────────────────────── 1120px ────────────────────────────┐
│ [¬shant logo]                         writing  notes  photos  about │
│                                                                  │
│ ┌──── 600px text column ────┐  gap  ┌──── side column ────┐      │
│ │ Hi, I’m Prashant. …        │       │  sticky, top 32px    │      │
│ │                            │       │  glider / timeline   │      │
│ │ Writing                    │       │  / on-this-page      │      │
│ │ ─────────────────────────  │       └──────────────────────┘      │
└──────────────────────────────────────────────────────────────────┘
```

- **Header:** logo on the left, nav on the right, across the full container.
- **Body:** `.ns-split`, with `.ns-split__main` holding the text and `.ns-split__side` the side column.
- **Below 880px** it becomes one column:
  - The glider moves above the text (`.ns-split__side--first`).
  - The about timeline is hidden (`.ns-split__side--hide`).
- **Pages with no side content** (notes, photos) still use the same container and left edge. Photos can use the full 1120px width for the grid.

### Pages

| Page | Side column | Sections |
|---|---|---|
| Home `/` | Glider + "why a glider?" note | Intro (h1 + one paragraph) → Writing (latest posts, with "Archive, 2015–2018 →" beside the heading) → Photographs (4-photo strip, "All photographs →") → Elsewhere → footer. **No lab notes on home.** |
| About `/about/` | Career timeline (`ns-tl`) + more links, active section in mint | Intro → Now → Shovel Company → Gojek → Where I started → Things I’ve built → Talks → Off the clock → Elsewhere. **Text only, no photo, no glider.** |
| Archive `/posts/past-life` (keep this URL; it is linked from elsewhere) | none | Intro (one line) → one list of older writing and talks on other platforms, newest first. Reached from the Writing heading on home, **not from the nav**; "writing" shows as current. |
| Notes `/notes/` | none | Intro → groups: Identity, Networks, Data, Cryptography and Web3. **Unpublished until the first note exists** (`published: false` in `notes.html`); the nav item appears by itself. |
| Photos `/photos/` | none (grid spans the container) | Intro → one section per series, newest first → viewer |
| Post | On-this-page list for long posts (`toc: true`; same `ns-tl` look, no years, 14px labels). **Posts run wider than other pages:** with the list, the text takes everything but a 220px list column (`.ns-split--post`); with no list, it spans the whole container (`.ns-post--wide`). | Date line (`3 Oct 2026`) → title (intro size; skipped when the post writes its own `# h1`) → `.ns-prose` |

## Components

All markup snippets assume they sit inside `<body class="ns-page">`.

**Header**
```html
<header class="ns-header">
  {% include ns/logo.html %}
  <nav class="ns-nav" aria-label="Primary">
    <a href="/#writing">writing</a><a href="/notes/">notes</a><a href="/photos/">photos</a><a href="/about/" aria-current="page">about</a>
  </nav>
</header>
```

**Intro.** One `h1.ns-intro`, then plain paragraphs. Don't repeat the name in a separate heading.

**Section heading.** `h2.ns-h2`. When the heading has a date range or link beside it, wrap both in `.ns-h2-row`, with the extra in `span.ns-meta`.

**Rows** (writing, things built, talks):
```html
<div class="ns-rows">
  <a class="ns-row" href="…"><span><span class="ns-row__title">Title</span> <span class="ns-row__sub">· short descriptor</span></span><time class="ns-row__meta" datetime="2026-10">Oct 2026</time></a>
</div>
```
Rows sit at 82% opacity and go to 100% on hover. A linked row underlines its title (the soft link underline); a row without a link has none. Use `_includes/ns/row.html` rather than writing rows by hand.

**Links are always underlined** (ink at 25%, 75% on hover), except the nav, the logo and the timeline / on-this-page list. Unpublished posts show `Soon` in the meta slot.

Rows that leave the site (archive) use the platform and year as meta, open in a new tab with `rel="noopener"`, and end with an `aria-hidden` ↗:
```html
<a class="ns-row" href="https://medium.com/…" target="_blank" rel="noopener"><span><span class="ns-row__title">Title</span></span><span class="ns-row__meta">Medium · <time datetime="2018">2018</time> <span aria-hidden="true">↗</span></span></a>
```

**List.** `ul.ns-list` (square, faint markers). Add `.ns-list--cols` for two columns. Use it for short link lists inside prose sections.

**Photo strip** (home). `.ns-strip` holding four `a.ns-thumb` (4:5, cover crop, 6px radius). The thumbnails zoom 3.5% on hover.

**Photographs page.**
- Masonry grid: `.ns-photos[data-ns-photos]` with CSS columns (3 × 240px min). It holds `button.ns-shot`, each with `data-full`, `data-caption` and an `img` thumbnail at its real aspect ratio.
- The viewer is created by `ns-photos.js`:
  - Counter and Close at the top; Previous, the caption and Next at the bottom.
  - Keys: ← →, and Esc to close.
  - Focus moves to Close when it opens and returns to the photo when it closes.

**Glider.** `{% include ns/glider.html %}` inside `<aside class="ns-split__side ns-split__side--first">`.

**Timeline / on-this-page:**
```html
<aside class="ns-split__side ns-split__side--hide">
  <nav data-ns-toc aria-label="On this page">
    <ol class="ns-tl">
      <li><a href="#now"><span class="ns-tl__years">2024–now</span><span class="ns-tl__name">realfast</span></a></li>
      …
    </ol>
    <ul class="ns-toc-more"><li><a href="#built">Things I’ve built</a></li>…</ul>
  </nav>
</aside>
```
- Each target is a `<section id="…" class="ns-section--tight">`.
- `ns-toc.js` marks the section in view with `li.is-active`: a mint dot with a soft halo, and the label turns ink.

**Prose.** Posts render inside `<article class="ns-prose">`:
- H2s at 20px and h3s at 17px.
- Square bullets in faint grey.
- Blockquotes with a grey rule.
- Code on `--ns-surface`.
- Images with 6px corners, and captions in muted 13px.

**Footer.** `© 2026 · notshant.xyz · Bengaluru` in `.ns-footer`.

## Motion

Use only these. Anything new must be this slow and this quiet, and must stop under `prefers-reduced-motion`.

| What | Spec |
|---|---|
| **Logo, first view of a visit** | Outline `stroke-dashoffset` 1→0 over 4.8s with cubic-bezier(.4,0,.2,1) after a .15s delay, then `fill-opacity` 0→1 over .9s starting at 3.7s. |
| **Logo, hover/focus** | Vanish, then the same draw with no delay; the fill starts at 3.55s. Ignored while drawing. |
| **Logo, later pages** | Already drawn (sessionStorage `ns-logo-drawn`). |
| **Glider** | 1.5s per generation. Changes happen in the first 40% of each step, then it holds. Born cubes grow with easeOutBack (overshoot 1.5); dying cubes shrink with easeIn (cubic). The camera eases ¼ cell to the right each generation, so the glider stays centred and the dot grid slides past. The dot grid fades out at the edges. It pauses off screen. |
| **Timeline dot** | background, border and halo over .45s. |
| **Glider note** | Fades in and drops 3px over .45s when opened. |
| **Links** | Underline colour over .25s. |
| **Rows** | Opacity .82→1. |
| **Photos** | Scale 1.035 (strip) or 1.025 (grid) over .6s with cubic-bezier(.2,.7,.2,1). |
| **Viewer** | Fades in over .25s. |
| **Anchor jumps** | Smooth scroll. |

**Rejected (don't bring back)**
- A fast full-screen Life field: distracting.
- An "unravel then redraw" logo hover: janky.
- Cycling headline words, contour maps and walking dots.

## Accessibility

- Text is never lighter than `--ns-muted`.
- Mint is used for marks only.
- **Focus ring:** 2px mint, offset 3px, on links, buttons and summaries.
- **Tap targets:** nav and footer links have 10–12px vertical padding.
- **Canvases** have `role="img"` and a sentence-long `aria-label`.
- **The logo link** has `aria-label="notshant, home"`; the SVG is `aria-hidden`.
- **The viewer** is a `role="dialog"` with `aria-modal`, works by keyboard, and restores focus.
- **The timeline** uses `aria-current="true"` on the active link.
- **Reduced motion:** the logo is drawn, the glider shows one still frame, scrolling is instant, and nothing fades.

## Content structure (for the build)

- **Writing:** `_posts/` as today. Home lists the latest six or so, plus `Soon` for one announced draft if wanted.
- **Archive:** `_data/archive.yml`, one entry per piece (`title`, `url`, `where`, `year`), newest first. It replaces the hand-written list in `_posts/2023-01-01-past-life.md`; the page keeps `permalink: /posts/past-life`.
- **Lab notes:** a `_notes/` collection, with front matter `title`, `group` (Identity / Networks / Data / Cryptography and Web3), `date` and `summary`. Notes stay rough: "Rough, and kept that way."
- **Photographs:**
  - Files go in `assets/photos/<yyyy>-<series-slug>/NN.jpg` (1600px) and `NN-s.jpg` (720px).
  - Metadata goes in `_data/photos.yml`, one entry per series:
    ```yaml
    - title: The Greatest Gig in the Sky
      meta: Ladakh · July 2021
      folder: 2021-greatest-gig-in-the-sky
      photos:
        - { file: "01", ratio: "4 / 5", alt: "A single long cloud over poplars and a brown ridge", place: "Ladakh, 2021" }
        - { file: "02", ratio: "3 / 4", alt: "…", place: "Ladakh, 2021", home: true }   # home: true = in the home strip (four in total)
    ```
- **Things built and talks:** `_data/built.yml` and `_data/talks.yml` (`title`, `sub`, `meta`, optional `url`). A row without a `url` isn't a link.

## How the site is built

Direction N is wired into the Jekyll site. Where things live:

| What | File |
|---|---|
| Page shell: head, header, container, scripts | `_layouts/default.html`, `_includes/head.html`, `_includes/header.html` |
| Posts and notes | `_layouts/post.html` (+ `_includes/post-components.html`, `lightbox.html`, `new-tab-links.html`) |
| Home, about, photos, archive, notes | `index.html`, `about.html`, `photos.html`, `archive.html`, `notes.html` |
| Shared bits | `_includes/ns/`: `logo.html`, `glider.html`, `row.html`, `elsewhere.html`, `footer.html`, `head.html` |
| Styles | `styles/index.css` imports `design/tokens.css` and `design/components.css` (outside the Tailwind layers) → `dist/index.css` |

Front matter the layouts read:

| Key | Where | Does |
|---|---|---|
| `nav` | any page | Marks the nav item: `writing`, `notes`, `photos` or `about`. Posts get `writing` and notes get `notes` from `_config.yml` defaults. |
| `ns_js` | any page | Extra scripts, e.g. `[glider]`, `[toc]`, `[photos]`. `ns-logo.js` loads on every page. |
| `toc` | post | `true` adds the on-this-page list, built from the post's h2s (or h3s). |
| `list_title` | post | The title used in the Writing list when it should differ from the post's own. |
| `listed` | post | `false` keeps a post out of the Writing list (the old Tailwind demo). |
| `soon` | `index.html` | One announced, unpublished post shown with `Soon`. Delete the line to hide it. |

Post components (`.c-key`, `.fact`, `.pull`, `.c-card`, `.c-callout`, numbered sections and so on) use the tokens: the glider's light green for rules and the key-idea block (`--c-accent`, `--c-tint` in `_includes/post-components.html`), muted labels, and weights up to 600. Figures in `assets/estimates/` use mint where they used red.

## Decision log

| Round | Tried | Outcome |
|---|---|---|
| 1 | Editorial cream + serif, terminal notebook, Swiss index, advisory practice | Rejected: "Claude-looking", square, and no consulting pitch wanted. |
| 2 | Soft shapes, night mode, bento | Rejected: not unassuming enough. |
| 3 | H plain, I margin sketch, J statement, K wordmark | Kept: H's simplicity, I's split layout (not its graphic), K's logo draw-on. |
| 4 | L glider, M Life field | Kept: L's glider. M's strip was too fast. |
| 5 | **N split** (chosen, 8 Nov 2026), O drift | N finalised. The canvas is at claude.ai/artifact/TmQS6NPTRLee6zT2PeYnWr (Round 5). |
| 5 | Archive page (8 Nov 2026) | N had dropped the archive. Restored as its own page at the old URL, linked from the Writing heading; the nav stays at four items. |
| 6 | Built into the site (8 Nov 2026) | Every page moved to N. URLs unchanged (`/about`, `/posts/…`, `/posts/past-life`); `/photos/` is new. Post components moved from red to the tokens. |
| 7 | Wider posts (8 Nov 2026) | 600px felt cramped for posts. The on-this-page list narrowed to 220px so the text gets the room, and posts without a list stretch to the full width. |
| 8 | Post accent (8 Nov 2026) | The estimation post’s red became the glider’s light green: quote bars, pull rules, key-idea block, callout label. Figures moved from red to mint. |
| 9 | Favicon (8 Nov 2026) | The logo’s opening (s + ¬) as a square mark: SVG with a dark-mode colour, a root `favicon.ico` and an Apple touch icon. Replaced the missing `/assets/favicon.ico`. |

When you change the system, update `tokens.css` first, then this file, and add a row here.
