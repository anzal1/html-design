# Design grill: the question tree

Ask these in rounds, frontier first, each with a recommended answer. Skip any node the
ask or the codebase already settles (and say what settled it). Facts are looked up,
never asked.

## Layer 1: ground truth (no prerequisites)

- What is it, and what is the one job this screen or component must do well?
- Who uses it, on what device, in what moment (rushed, relaxed, focused, older eyes)?
- Surfaces in scope: which screens or components, which widths, light and dark?
- Taste signals: words they used, references or brands they like, things they dislike.
- Is there an existing kit, brand or codebase to match? (look it up)

## Layer 2: the unknowns (needs layer 1)

- **Style commitment:** which named style or none (neumorphic, glass, brutalist,
  hand-drawn, editorial, isometric...), and how far to push it?
- **Palette:** ground, surface, ink, muted text, one or more accents, semantic colours
  (success, warning, error, info). How many accents? Show 2 or 3 specimens.
- **Type:** display and text families, weights, a size scale, numerals (tabular?).
  Show 2 or 3 specimens with real content.
- **System:** spacing scale, radius family, elevation or shadow language, border use,
  density (compact or roomy), grid and container widths.
- **Icons and imagery:** one icon set and stroke weight; illustration or none.
- **Motion:** none, subtle, or expressive; durations and easing family.

## Layer 3: harmony (needs layer 2)

- Does every foundation speak the same language (corners, shadows, stroke weights,
  type personality)? Where would one of them clash?
- Contrast rhythm: what is loudest on each screen, and what steps down from it?
- Dark mode mapping: each colour at night, same chroma, lower lightness.
- Where does density change (dense data versus calm reading), and how is it signalled?

## Layer 4: innovation (needs layer 3)

- What is the one signature move: a component, an interaction, a visual idea people
  will remember or screenshot?
- Where does it live, and what stays quiet around it so it reads?
- What is the risk (usability, performance, accessibility), and how is it contained?

## Layer 5: stitching (needs layers 2 to 4)

- States for every component: hover, pressed, focus, disabled, loading, error, empty.
- How components compose into sections; spacing between sections versus within them.
- Navigation and wayfinding; how the user gets in, around and back.
- Transitions between states and screens.
- Responsive behaviour: what reflows, what hides behind disclosure, what stays fixed.
- Hand-off: what the builder needs (tokens file, component list, the prototype).
