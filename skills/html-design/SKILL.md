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
  - **Moods considered:** 3 to 5 physical settings the product could live in, some
    expected and some surprising.
  - **Mood picked:** one that was not your first idea, with one sentence on why. First
    ideas converge on the same few looks.
  - **Palette:** 5 or 6 hex values with roles. Name the real object each one comes from
    (a "harbour at dawn" mood: wet rope, fog, signal-buoy red). A colour with no object
    behind it is guesswork.
  - **Type:** families, weights and a size scale.
  - **Direction:** one sentence.
- Default to a light theme unless the user asks otherwise; still ship dark tokens.
- Check fonts exist (Google Fonts or local) before using them.

## 2. Taste rules

- Remove before you add. Fewer, better elements and real space around them, plus one
  warm, human detail so it does not feel sterile.
- Spacing has intent: tight inside a group, open around the main moment.
- Build hierarchy from contrast in size and weight: a big, heavy headline beside small,
  plain labels. Pull tracking in slightly on large type; leave small caps loose.
- Know the goal. Product screens are judged on clarity; brand and marketing pages can
  lead with personality. For a fun or bold brand, pick one or two playful moves (a
  second accent, a hand-drawn mark, a sticker-like tilt, witty copy), never all of them.
- Colour: one strong accent used in one or two places beats many. Extra colours only
  carry meaning (status, categories, people) and come from the same setting.
- Grounds: plain white suits most product UI. Cream, ivory and bone belong to specific
  moods, not to "neutral". Greys come from the setting or stay truly neutral. Pure black
  pairs with a vivid accent; otherwise tint dark grounds toward the mood.
- Combinations that read as tired or muddy, so skip them unless asked: cream with
  terracotta-family reds and oranges; cream with neon; navy or charcoal with electric
  purple, lime or teal; plain white with dusty earth tones (give those a tinted ground);
  a tinted ground with a very saturated accent (use white or black instead).
- Legibility comes first. Muted and translucent text is for hierarchy, used sparingly;
  check contrast twice below 16px. Nothing under 12px, and for older users nothing under 14px.
- Let content sit on the page; not everything needs a card.
- Skip dated effects: heavy gradients, layered shadows, gloss.
- Several directions means several personalities, not one layout recoloured.
- Placeholder content looks real (plausible names, numbers, dates) and is always fake.
- Icons are SVG from one set, never emoji. Icons in navigation or actions get a visible label.

## 3. Markup rules

- Tokens live in one `tokens.css` as CSS variables, grouped by kind: `--color-*`,
  `--font-*`, `--text-*` (sizes), `--leading-*`, `--tracking-*`, `--space-*`,
  `--radius-*`, `--breakpoint-*`. Light by default, dark under `prefers-color-scheme`
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

Write one visual group at a time (a header, one row, a button bar), then look at it.
After each one, screenshot and ask:

- **Rhythm:** do the gaps feel chosen? Anything crowded, or empty by accident?
- **Type:** is every size readable, and are heading, body and caption clearly distinct?
- **Contrast:** does any text or control fade into its background? Is colour doing work?
- **Lanes:** after three or more similar rows, do icons and trailing items line up?
- **Fit:** anything cut off, scrolling sideways or breaking mid-word?
- **Monotony:** if it looks like a uniform grid, change scale, weight or spacing somewhere.

Note a one-line verdict, then fix just what is wrong. Rebuilding the whole screen is a
last resort; an overflow is a fix, not a restart.

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
