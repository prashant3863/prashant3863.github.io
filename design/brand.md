# notshant brand guidelines

notshant.xyz is Prashant Mittal's personal site: long-form writing, lab notes and photographs. The brand should feel unassuming. It's a person's notebook, not a product or a consultancy.

Pair this with [system.md](system.md), which covers tokens, layout, components and motion. You can see both in [styleguide.html](styleguide.html).

## The name

**notshant** is written with the logical-not symbol: **¬shant**. The ¬ is part of the name, not decoration. It appears in the logo as the bar joined to the stem of the h.

- In running text, write `notshant` (lowercase, one word) or the domain `notshant.xyz`.
- Use the full name **Prashant Mittal** wherever a reader needs to know who wrote something, such as page titles, SEO and the about page.

## Logo

The logo is the source file `assets/shant_logo.svg`. It has **two shapes**:

1. The letters "shant".
2. The bar `<rect y="8" width="29" height="5"/>` across the top of the s. Together with the h's stem it forms ¬.

**Never drop the bar.** Inline the logo with `{% include ns/logo.html %}`, which already contains both shapes.

| | |
|---|---|
| Colour | `--ns-ink` (#1C1C1C) on white. Use #E7E7E4 on #0E0E0F only if a dark surface is ever needed. |
| Size | 96px wide in the header. Never smaller than 64px wide. |
| Clear space | At least the height of the ¬ bar × 2 on every side. |
| Placement | Top left of every page. It links home. |

**Don't**
- Recolour it, including in mint.
- Outline it statically.
- Stretch it, rotate it, or add a shadow.
- Pair it with a tagline lockup.
- Set "notshant" in a typeface as a stand-in for the logo.

### Logo motion

The logo draws itself in. It's the brand's signature moment, so the timing is fixed:

- **First page view of a visit:** the outline draws in over 4.8s, then the fill fades in over 0.9s, starting at 3.7s. It's solid by about 4.6s.
- **Later pages in the same visit:** the logo is already drawn.
- **Hover or keyboard focus:** the logo vanishes, then redraws the same way, with the outline over 4.8s and then the fill. A hover while it's still drawing is ignored.
- **Reduced motion:** the logo is always drawn and never animates.
- The two shapes draw at the **same speed**. The bar has `pathLength="0.1088"`, its 68-unit outline divided by the letters' 624.85, so it doesn't crawl.

Don't swap this for a fade, a slide or an "unravel and redraw". Each of those was tried and rejected.

## The glider

The site's one motif is a **glider from Conway's Game of Life**. It's drawn as five soft white cubes with mint sides, from Prashant's 2022 Figma animation ([X post](https://x.com/prashant_mit/status/1518889653801132033)).

**What it means.** Game of Life was the first problem Prashant was asked to solve at the C42 bootcamp. They solved it again every day after that, each time with new limitations. The glider changes shape every generation and keeps moving forward. To him it stands for metamorphosis, adaptability, agility and progress.

**Rules**
- **Home page only**, in the side column. It doesn't appear on About, Notes, Photos or posts.
- **One at a time.** Never tile it, and never use it as a bullet, divider or loading spinner.
- **Show only the interesting part:** the four shapes as it walks. Don't show the whole board, wrap-around, or births across a field.
- **Where the story goes.** The meaning and the C42 story live in the small "why a glider?" note under it, and only there. Not in the bio.
- **Colours** come from the `--ns-cube-*` tokens. The mint is the right-hand face. The top stays white.

## Colour

The palette is white, ink and greys, with mint as the only accent. See the tokens in [system.md](system.md#colour).

- The background is always white. No cream, paper or dark mode. Prashant rejected the cream, serif, "Claude-looking" palette.
- **Mint (#2E9C83) is never used for text.** It marks state: focus rings, the active timeline dot and the glider. Links are ink with a soft underline.
- **Posts take their accent from the glider's light green** (#9EDDCB, with #D9F5EC as a wash). It marks quote bars, pull-quote rules and the key-idea block, and labels on the dark callout. It is never text on white (1.6:1). In figures, where light green is too faint for thin lines and small labels, use mint (#2E9C83).
- No red. The old post accent #e3120b is gone from the site; the estimation talk's slide deck (`assets/estimates/deck.html`) keeps it, since it's the talk as given.

## Type

The only typeface is **Inter** (400, 500 and 600). Mono uses the system stack and is only for small labels: years, glider captions and dates in lists. No serifs, no display faces, and no bold above 600.

## Voice and copy

Write the way Prashant talks:

- Plain, first person, short sentences.
- Concrete over clever, and numbers when they matter, e.g. "40 hours to 30 minutes", "2M samples a second".
- **Intro:** "Hi, I'm Prashant. I build software and the teams that build it." No taglines.
- **Never advertise availability or consulting.** No "work with me", "open to", "hire me", pricing or booking links.
- **No marketing words:** passionate, world-class, leverage, cutting-edge, innovative, journey.
- **Navigation is lowercase:** writing, notes, photos, about.
- **Headings and titles use sentence case.** Keep a talk's or post's own capitalisation only in quotes.
- **Dates:**
  - `Oct 2026` in lists.
  - `2016–2021` for ranges, with an en dash and no spaces.
  - `2024–now` for an open range.
- **Separators:** a middle dot with spaces (`Ladakh · July 2021`). Arrows `→` only on "more" links, and `↗` only on rows that leave the site (the archive).
- **Typography:** curly quotes and apostrophes (’ “ ”). One space after full stops.
- **Links that leave the site open in a new tab** (`_includes/new-tab-links.html` does it for every page). Links within the site stay in the same tab, except inside posts, where every link opens a new tab.
- **X posts and talks get plain text links, not embeds.** Links to Prashant's own X posts, YouTube talks and GitHub should send traffic there.

**Never publish**
- His phone number or personal email (from the résumé).
- realfast revenue, team size, client or internal project names (ExoHelp, Grimoire), unless Prashant clears them.
- Anything from the private parts of his Roam graph: runway, money, or people's names from "Status Check" pages.

## Photography

- Prashant's own photographs only. Show them as shot, with no added filters, frames or watermarks.
- **Group by series** (a trip or a post), newest first. Each series has a title and a meta line, e.g. "The Greatest Gig in the Sky · Ladakh · July 2021".
- **Crop only on the home strip** (four at 4:5). The photographs page keeps every photo's real proportions.
- **Captions:** `Place, Year`.
- **Alt text** says what is in the frame in one plain sentence, e.g. "A whitewashed chorten beside a dirt road".
- **Sizes:** 720px for thumbnails (`-s.jpg`) and 1600px for the viewer, JPEG at about 80% quality.
