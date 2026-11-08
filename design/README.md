# design/

The brand and design system for notshant.xyz. This folder is excluded from the Jekyll build (`_config.yml`), so nothing here is published.

| Read | For |
|---|---|
| [brand.md](brand.md) | Name, logo, the glider, colour, type, voice and copy, photography, what never to publish. |
| [system.md](system.md) | Principles, tokens, layout, pages, components, motion, accessibility, content structure, how the site is built, decision log. |
| [styleguide.html](styleguide.html) | Every token and component rendered. Open it in a browser straight from disk. |
| [tokens.css](tokens.css) | Source of truth for every value. |
| [components.css](components.css) | `ns-` component classes. |
| [tailwind.tokens.js](tailwind.tokens.js) | The tokens for Tailwind, already wired into `tailwind.config.js` as `theme.extend`. |

Code that lives outside this folder:
- `_includes/ns/`: `head.html`, `logo.html`, `glider.html`, `row.html`, `elsewhere.html`, `footer.html`.
- `assets/js/`: `ns-logo.js`, `ns-glider.js`, `ns-toc.js`, `ns-photos.js`.

## The short version

1. White page, ink text, one mint accent that is never used for text. Inter only.
2. One 600px text column with everything on its left edge. The right column holds one quiet thing, or nothing. Posts run wider: a narrow on-this-page list, or full width when there is none.
3. The ¬shant logo always includes the ¬ bar. It draws in once per visit and redraws on hover.
4. The glider appears on the home page only, with its story in the "why a glider?" note.
5. Each page gets one slow motion at most, and every motion respects reduced motion.
6. Plain first-person copy. Never pitch consulting or availability, never embed X, and never publish private details.

## Changing the system

1. Change the value in `tokens.css`, and in `tailwind.tokens.js` if it's there.
2. Update `system.md` or `brand.md`, and add a row to the decision log in `system.md`.
3. Check `styleguide.html` in a browser.

Direction N was chosen on 8 Nov 2026 from the design canvas at claude.ai/artifact/TmQS6NPTRLee6zT2PeYnWr (Round 5).
