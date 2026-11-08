---
name: html-design
description: Design app and web UI as real HTML/CSS prototypes with design-tool quality - brief first, tokens as CSS variables, build in small pieces, screenshot-review every piece, then a breakpoint contact sheet. Use when asked to design screens, a UI kit, a redesign, mockups or prototypes, or when a canvas tool (Paper, Figma, Pencil) is unavailable or rate limited. Not for building production code inside an app (translate the approved prototype there instead).
---

# HTML design

A browser renders HTML and CSS exactly the way canvas tools like Paper do, so tool
quality is not the gap. Quality comes from the discipline below. Follow it every time.

## 1. Before any markup: context and brief

- Look for an existing kit first (a `tokens.css`, a design-system folder, a Paper or
  Figma file the user named). If one exists, use only its tokens and components and
  skip the brief. Never invent a colour, size or radius outside the kit; add a token
  to the kit instead and say so.
- No kit: post a short brief in chat before writing any file, and wait only if the
  user asked to approve it:
  - **Mood candidates:** 3 to 5, mixing obvious and less obvious ones.
  - **Mood chosen:** one, and one sentence on why it is not the first instinct.
  - **Palette:** 5 or 6 hex values with roles, each taken from a real object in the
    mood's scene (a "mineral" mood: limestone, slate, oxidised copper). If a role has
    no object, the palette is abstract and will feel glued together.
  - **Type:** families, weights and a size scale.
  - **Direction:** one sentence.
- Check fonts exist (Google Fonts or local) before using them.

## 2. Taste rules

- Restraint. Fewer elements, more space. When torn between adding and removing, remove.
  Add one warm human touch so minimal does not feel cold.
- Vary spacing on purpose: tight inside a group, generous around the hero.
- Hierarchy through scale and weight contrast: a large, heavy display face next to
  small regular labels. Slightly tighter tracking on big type, normal or open on small
  caps and tiny labels.
- Colour is deliberate. One intense colour moment beats five. Secondary colours only
  for meaning (status, categories, people), taken from the same scene.
- Neutrals: pure white is the normal ground for product UI. Off-white, cream or bone is
  a mood choice, not a default. Greys come from the scene or stay truly neutral.
- Pairings to avoid: warm off-white with red, orange or terracotta (overused);
  off-white with fluorescent; dark navy or charcoal with electric purple, lime or teal;
  pure white with muted earth tones; a tinted warm ground with a high-chroma accent.
- Text contrast is non-negotiable: readable at a glance. Use muted text sparingly.
  Nothing under 12px, and for products used by older people nothing under 14px.
- Put information on surfaces; do not box everything in cards.
- Avoid dated tricks: heavy gradients, stacked shadows, glossy effects.
- Clarity beats style for product screens. Style can lead for marketing and brand.
- When asked for several directions, make them truly different in personality.
- Realistic placeholder content (real-sounding names, values, dates). Fake data only.
- Icons are SVG from one set; never emoji. Every icon in navigation or actions has a
  visible text label.

## 3. Markup rules

- Tokens live in one `tokens.css` as CSS variables (light, plus dark under
  `prefers-color-scheme` and `[data-theme]`). Shared pieces live in `base.css`.
  Screens use `var(--token)`, never raw values, except one-off illustration colours.
- Layout with flex, gap and padding. Use grid where columns must align across rows.
- Repeated rows (lists, nav, tables): fixed-width slots for icons and trailing actions
  (`width` plus `flex-shrink: 0`) so elements form vertical lanes. Never rely on gap alone.
- Units: px for font sizes and line heights, em for letter spacing.
- Real states in the markup: hover, pressed, focus-visible, disabled, loading, error,
  empty. Wire small interactions with plain JS so the prototype behaves.
- Respect `prefers-reduced-motion`. Motion is short and ease-out; no bounce.
- Accessible by default: real labels, buttons that are buttons, alt text, 44 to 48px
  targets, visible focus.

## 4. Build in small pieces, review each piece

Write one visual group at a time (a header, a card, a row, a button bar), then look
at it. After every meaningful step, screenshot and check:

- **Spacing:** uneven gaps, cramped groups, accidental empty areas. Clear rhythm?
- **Typography:** too small, poor line height, weak heading/body/caption hierarchy.
- **Contrast:** low-contrast text, elements melting into the background, flat colour use.
- **Alignment:** shared lanes across repeated rows; icons and trailing actions line up.
- **Fit:** nothing clipped, no sideways scroll, no text breaking mid-word.
- **Repetition:** grid-like sameness; vary scale, weight or spacing for interest.

Write a one-line verdict per checkpoint, then make targeted fixes. Never throw the
whole screen away to restart unless nothing else works.

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
