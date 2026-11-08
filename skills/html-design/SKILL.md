---
name: html-design
description: Design app and web UI as real HTML/CSS prototypes with design-tool quality - brief first, tokens as CSS variables, build in small pieces, screenshot-review every piece, then a breakpoint contact sheet. Use when asked to design screens, a UI kit, a redesign, mockups or prototypes, or when a canvas tool (Paper, Figma, Pencil) is unavailable or rate limited. Not for building production code inside an app (translate the approved prototype there instead).
---

# HTML design

A browser renders HTML and CSS the same way canvas design tools do, so the canvas is
not what makes their AI output good. The process is. Follow it every time.

## 1. Before any markup: context and brief

- Look for an existing kit first (a `tokens.css`, a design-system folder, a design file
  the user named). If one exists, use only its tokens and components and skip the brief.
  Never invent a colour, size or radius outside the kit; add a token and say so.
- No kit: post a short brief in chat before writing any file. Wait for approval only if
  the user asked to approve it.
  - **Register:** clarity (tools, dashboards, forms) or expressive (consumer apps,
    brand, marketing, or any brief that says expressive, fun, playful or bold). Decide
    this first; it changes the taste rules below.
  - **Moods considered:** 3 to 5 physical settings the product could live in, some
    expected and some surprising.
  - **Mood picked:** the one that will look best for this brief, with one sentence on
    why. For a familiar genre the obvious mood is often right; go less obvious only
    when it clearly looks better, not just because it is less obvious.
  - **Palette:** 5 or 6 hex values with roles. Name the real object each one comes from
    (a "harbour at dawn" mood: wet rope, fog, signal-buoy red). A colour with no object
    behind it is guesswork. Then judge the palette by eye, not by its story: put the
    swatches side by side and check that they look good together, that the ink is not
    heavier than the content, and that nothing reads childish or muddy by accident.
  - **Type:** families, weights and a size scale.
  - **Direction:** one sentence.
- Pairings that work, because both colours share one scene (ground x accent). Treat
  them as families and pick your own hex values:

  | Mood | Ground | Accent |
  |---|---|---|
  | mineral | bone | oxidised copper |
  | maritime | fog grey | deep navy |
  | rusted | graphite | rust |
  | industrial | concrete | safety orange |
  | bookish | plaster | ink |
  | chapel | slate | amethyst |
  | candlelit | warm amber | oxblood |
  | botanical | bone | moss |
  | tropical | palm shadow | hibiscus |
  | alpine | snow | evergreen |
  | nocturnal | wet asphalt | hot pink |
  | terminal | CRT black | phosphor green |
  | dashboard | instrument black | amber LED |
  | signage | ink | chrome yellow |
  | gallery | pure white | cadmium red |
  | editorial | pure white | cobalt |
  | hypertext | pure white | link blue |
  | highlighter | pure white | fluorescent yellow |
  | brutalist | pure white | pure black, nothing else |

  Other good moods to draw from: sun-bleached, overcast, inky, arid, foggy, subterranean,
  tidal, pastoral, chalky.
- Default to a light theme unless the user asks otherwise; still ship dark tokens.
- Check fonts exist (Google Fonts or local) before using them.

## 2. Taste rules

- Clarity register: remove before you add. Fewer, better elements and real space around
  them, plus one warm, human detail so it does not feel sterile.
- Expressive register: the playful style is the first choice, not an afterthought. Use
  several of: a duo or trio of accents and tinted surfaces from one scene, tilted or
  sticker-like pieces, hard offset shadows, hand-drawn marks (squiggles, circles, tape,
  doodles), a wordmark or mascot with character, and witty copy. Keep one primary colour
  anchoring the brand and keep saturation calm. Restraint here means every flourish fits
  the world, not that the world is empty. A design that looks like a tidy wireframe has
  failed an expressive brief.
- Spacing has intent: tight inside a group, open around the main moment.
- Build hierarchy from contrast in size and weight, Swiss editorial style: a big, heavy
  display line beside small, light or regular labels. Push the gap between display and
  label weights as far as it goes. Pull tracking in slightly on large type; leave small
  caps and tiny labels loose.
- Prefer asymmetry and scale contrast (one very large element next to small muted text)
  over evenly weighted grids.
- It should look like a designer with a strong point of view made it, not like parts
  pulled from a component library. Invest in hierarchy, spacing and contrast, not decoration.
- Know the goal. Clarity screens are judged on how fast they read; expressive ones on
  whether people would screenshot them.
- When a request is vague or open ("design something cool"), pick one small deliverable
  and execute it exceptionally well so it lands at first look.
- Colour (clarity register): one strong accent used in one or two places beats many. Extra colours only
  carry meaning (status, categories, data series, people) and come from the same
  setting. A playful brand can use a duo or trio of accents, but keep one primary, keep
  overall saturation calm and spend less on other decoration.
- Grounds: plain white suits most product UI. Cream, ivory and bone belong to specific
  moods, not to "neutral". Greys come from the setting or stay truly neutral. Pure black
  pairs with a vivid accent or an inky, nocturnal or subterranean mood; otherwise tint
  dark grounds toward the mood (warm charcoal for candlelit, graphite for maritime).
  Neutral greys when there is no scene reason: #EEEEEE, #CCCCCC, #888888, #444444.
- Combinations that read as tired or muddy, so skip them unless asked: cream with
  terracotta-family reds and oranges; cream with neon; navy or charcoal with electric
  purple, lime or teal; plain white with dusty earth tones (give those a tinted ground);
  a tinted ground with a very saturated accent (use white or black instead).
- Legibility comes first. Muted and translucent text is for hierarchy, used sparingly;
  check contrast twice below 16px. Nothing under 12px, and for older users nothing under 14px.
- Let content sit on the page; not everything needs a card.
- Skip dated effects: heavy gradients, layered shadows, gloss.
- Fill the frame on purpose. A layout must not end in a dead zone: balance column
  heights, and anchor floating buttons to content or a clear bar.
- One metaphor per screen (graph paper or ruled paper, not both). Ruled lines sit on the
  text baseline: line-height equals rule spacing.
- Dark mode re-tints every colour into the same world at night (paper becomes darker
  stock, tape stays tape); it is never a plain inversion and never loses its warmth.
  Keep each colour's chroma and lower only its lightness; a colour that turns olive,
  brown, grey or salmon in dark mode is a bug. Accents may need to get lighter, never duller.
- On phones, rows of chips or filters scroll sideways instead of wrapping one orphan.
- Several directions means several personalities, not one layout recoloured.
- Placeholder content looks real (plausible names, numbers, dates) and is always fake.
  Images are plain placeholders (solid fills, SVG shapes) unless the user asks for generated ones.
- Icons are SVG from one set, never emoji. Icons in navigation or actions get a visible label.

## 3. Markup rules

- Tokens live in one `tokens.css` as CSS variables, grouped by kind: `--color-*`,
  `--font-*`, `--text-*` (sizes), `--leading-*`, `--tracking-*`, `--space-*`,
  `--radius-*`, `--opacity-*`, `--container-*`, `--breakpoint-*`. Define a small set in
  every namespace even if some go unused. Light by default, dark under `prefers-color-scheme`
  and `[data-theme]`. Shared pieces live in `base.css`. Screens use `var(--token)`,
  never raw values, except one-off illustration colours. Tints via
  `color-mix(in srgb, var(--color-accent) 40%, transparent)`.
- Layout with flex, gap and padding. Use grid where columns must align across rows.
- Repeated rows (lists, nav, tables): give icons and trailing actions a fixed slot
  (`width` plus `flex-shrink: 0`), even when a row leaves it empty, so they line up in
  columns. Gap alone drifts when content length varies.
- Units: px for font sizes and line heights, em for letter spacing.
- Real states in the markup: hover, pressed, focus-visible, disabled, loading, error,
  empty. Wire small interactions with plain JS so the prototype behaves.
- Respect `prefers-reduced-motion`. Motion is short and ease-out; no bounce.
- Accessible by default: real labels, buttons that are buttons, alt text, 44 to 48px
  targets, visible focus.

## 4. Build in small pieces, review each piece

Write one visual group at a time (a header, one row, a button bar), about 15 lines of
markup at most, then look at it. A card with a header, four rows and a footer is six
steps, not one.
After each one, screenshot and ask:

- **Rhythm:** do the gaps feel chosen? Anything crowded, or empty by accident?
- **Type:** is every size readable, and are heading, body and caption clearly distinct?
- **Contrast:** does any text or control fade into its background? Is colour doing work?
- **Lanes:** after three or more similar rows, do icons and trailing items line up?
- **Fit:** anything cut off, scrolling sideways or breaking mid-word?
- **Monotony:** if it looks like a uniform grid, change scale, weight or spacing somewhere.

Note a one-line verdict, then fix just what is wrong. Rebuilding the whole screen is a
last resort; an overflow is a fix, not a restart.

`<skill-dir>` is the folder this file lives in. First use only: run `npm install`
there. The scripts use Playwright's Chromium if present, else the installed Chrome.

Screenshot a single page (2x, optional dark and focus):

```bash
node <skill-dir>/shot.mjs <page.html> <out.png> [--dark] [--focus=#id] [--width=390] [--height=844]
```

## 5. Breakpoint pass before showing anyone

Run the contact sheet at every width, light and dark. It fails on sideways overflow,
console errors and failed requests:

```bash
node <skill-dir>/sheet.mjs <page.html> <out-dir> [--dark]
```

Then look at every width yourself (zoom where text is small) for balance, clipping,
overlap, alignment and spacing. A FAIL blocks. Only then show the user, with the
contact sheet image.

## 6. Hand-off

- Keep the prototype outside the product repo unless the user wants it there.
- When it is approved, builders translate markup into the app's own components and
  conventions; the prototype is the reference, not code to paste.
