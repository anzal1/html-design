---
name: html-design
description: Design app and web UI as real HTML/CSS prototypes - taste taken from the user's ask, tokens as CSS variables, build in small pieces, screenshot-review every piece against evidence-based UI/UX rules, then a breakpoint contact sheet. Use when asked to design screens, a UI kit, a design system, a redesign, mockups or prototypes, or when a canvas tool (Paper, Figma, Pencil) is unavailable or rate limited. Not for building production code inside an app (translate the approved prototype there instead).
---

# HTML design

A browser renders HTML and CSS the same way canvas design tools do, so the canvas is
not what makes AI design good. The process is: understand what the person wants, build
in small pieces, look at every piece, and verify it on every screen.

Two kinds of guidance live here, and they are treated differently:

- **Taste is the user's.** Style, mood, colour, type, density, how bold or quiet it is:
  all of it comes from the ask. This skill has no house style and never overrides the
  brief with its own preferences.
- **Usability rules are strict.** The rules in section 3 come from standards and
  research (WCAG 2.2, Apple and Material guidelines, Fitts's and Hick's laws,
  readability studies). They apply to every style, and a style is executed fully
  *within* them, never flattened by them.

## 1. Grill the design before any markup

A designer settles the unknowns before drawing: who it is for, the style, the palette,
the type, the system. Only then do harmony, the new idea and the stitching between
parts make sense. Interview the user until that tree is settled, the way a design lead
would. `grill.md` in this folder has the full question tree for each layer.

**How to run it**

- Map the work as a **design tree**: every decision branches into the decisions that
  hang off it. The layers, in dependency order:
  1. **Ground truth:** what it is, who uses it and where, what surfaces (screens,
     components, widths, themes), the taste signals (words, references, brands, things
     they dislike), and any existing kit.
  2. **Unknowns:** the style commitment, then palette, type, and the system (spacing,
     radius, elevation or shadow language, density, grid, icons, motion).
  3. **Harmony:** how those foundations work together (contrast rhythm, one shape and
     shadow language, how dark mode maps, where density changes).
  4. **Innovation:** the one signature move people will remember or screenshot, where
     it lives, and what stays quiet so it can be seen.
  5. **Stitching:** how the parts connect: states, transitions, spacing between
     sections, navigation, empty, loading and error, how components compose into the
     page.
- Work in **rounds**. The frontier is every decision whose prerequisites are settled.
  Ask the whole frontier at once, numbered, each with your recommended answer, worded
  so "yes" accepts it. Wait for answers, recompute, ask the next round. A question that
  depends on another open question waits for a later round.

  ```
  ❓ **Q1** - **<title>**: <question, with options where useful>

  ➡️ <recommended answer>
  ```

- **Show, don't describe** for anything visual. For palette and type questions, render
  2 or 3 options as a quick specimen (swatches with real text on them, type scale with
  real content), screenshot it with `shot.mjs`, and ask by option.
- **Facts are your job.** Existing tokens, installed fonts, a brand's colours from its
  site, what a reference looks like: look them up (dispatch a sub-agent if slow), never
  ask. Decisions are the user's.
- **Taste is the user's.** Recommendations follow their signals, not a house style. A
  named style is a commitment, executed fully and then made usable within it.
- **Done when the frontier is empty** and the user confirms the shared understanding.
  Write the settled tree to `BRIEF.md` (one line per decision) before any markup.
- **Speed:** if the user already gave a full brief or says "just build", collapse the
  grill to one round of recommendations covering every layer and proceed on "yes". If
  no human is available (you are a sub-agent), decide every node yourself from the
  signals in the ask, mark each as assumed in `BRIEF.md`, and build.
- Look for an existing kit first. If one exists, its tokens and components settle the
  unknowns layer; never invent a colour, size or radius outside it (add a token and
  say so).
- Default to a light theme unless the user asks otherwise; always ship dark tokens.

## 2. Craft that serves any style

These are techniques, not taste. Use them in whatever style the user asked for.

- Hierarchy comes from contrast in size, weight and space. Each screen has one clear
  first thing to look at.
- Spacing is intentional: tighter within a group than between groups (proximity).
- Dark mode is the same design at night, not an inversion. Keep each colour's chroma
  and lower its lightness; a colour that turns olive, brown, grey or salmon is a bug.
- A layout fills its frame on purpose: no accidental dead zones, floating buttons
  anchored to content or a clear bar.
- Placeholder content looks real (plausible names, numbers, dates) and is always fake.
  Images are plain placeholders unless the user asks for generated ones.
- Several directions means several personalities, not one layout recoloured.

## 3. Usability rules (strict, every style)

- **Contrast (WCAG 2.2 AA):** body text 4.5:1, large text (24px, or 19px bold) 3:1,
  UI component edges and meaningful icons 3:1 against what they sit on.
- **Focus:** every interactive element has a visible focus indicator with 3:1 contrast
  that is not hidden by other content (WCAG 2.4.7, 2.4.11).
- **Targets:** 44 x 44px for touch (Apple HIG; Material uses 48dp); never below the
  WCAG 2.5.8 minimum of 24px. Frequent and primary actions are large and close to
  where attention already is (Fitts's law).
- **Choices:** keep the options shown at once small and grouped; more choices means
  slower decisions (Hick's law). Put progressive detail behind disclosure.
- **Reading:** body text 16px or more on screens meant for reading (never under 12px;
  14px minimum for older audiences), line length about 45 to 75 characters, line
  height about 1.4 to 1.6 for body.
- **State is never colour alone (WCAG 1.4.1):** pair colour with text, an icon, a shape
  or a position change.
- **Real states in markup:** hover, pressed, focus-visible, disabled, loading, error,
  empty. Wire small interactions with plain JS so the prototype behaves.
- **Semantics:** real labels, buttons that are buttons, links that are links, alt text,
  headings in order, icons in navigation and actions carry a visible label.
- **Motion:** respect `prefers-reduced-motion`; nothing flashes more than 3 times a
  second (WCAG 2.3.1).
- **Fit:** nothing clipped, no sideways scroll, no text breaking mid-word, at every
  width from 375 to 2560.
- **Alignment:** repeated rows give icons and trailing actions a fixed slot (`width`
  plus `flex-shrink: 0`), even when empty, so they line up in columns.

## 4. Markup conventions

- Tokens live in one `tokens.css` as CSS variables, grouped by kind: `--color-*`,
  `--font-*`, `--text-*`, `--leading-*`, `--tracking-*`, `--space-*`, `--radius-*`,
  `--shadow-*`, `--opacity-*`, `--container-*`, `--breakpoint-*`. Light by default,
  dark under `prefers-color-scheme` and `[data-theme]`. Shared pieces live in
  `base.css`. Screens use `var(--token)`, never raw values, except one-off
  illustration colours. Tints via `color-mix(in srgb, var(--color-accent) 40%, transparent)`.
- Layout with flex, gap and padding. Use grid where columns must align across rows.
- Units: px for font sizes and line heights, em for letter spacing.

## 5. Build in small pieces, review each piece

Write one visual group at a time (a header, one row, a button bar), about 15 lines of
markup at most, then look at it. A card with a header, four rows and a footer is six
steps, not one.
After each one, screenshot and ask:

- **Rhythm:** do the gaps feel chosen? Anything crowded, or empty by accident?
- **Type:** is every size readable, and are heading, body and caption clearly distinct?
- **Contrast:** does any text or control fade into its background? Is colour doing work?
- **Lanes:** after three or more similar rows, do icons and trailing items line up?
- **Fit:** anything cut off, scrolling sideways or breaking mid-word?
- **The ask:** does it still read as what the user asked for (style, mood, boldness)?
  A named style rendered timidly has failed, even if it is tidy.
- **Rules:** contrast, focus, targets and state signals from section 3 hold here.

Note a one-line verdict, then fix just what is wrong. Rebuilding the whole screen is a
last resort; an overflow is a fix, not a restart.

`<skill-dir>` is the folder this file lives in. First use only: run `npm install`
there. The scripts use Playwright's Chromium if present, else the installed Chrome.

Screenshot a single page (2x, optional dark and focus):

```bash
node <skill-dir>/shot.mjs <page.html> <out.png> [--dark] [--focus=#id] [--width=390] [--height=844]
```

## 6. Breakpoint pass before showing anyone

Run the contact sheet at every width, light and dark. It fails on sideways overflow,
console errors and failed requests:

```bash
node <skill-dir>/sheet.mjs <page.html> <out-dir> [--dark]
```

Then look at every width yourself (zoom where text is small) for balance, clipping,
overlap, alignment and spacing. A FAIL blocks. Only then show the user, with the
contact sheet image.

## 7. Hand-off

- Keep the prototype outside the product repo unless the user wants it there.
- When it is approved, builders translate markup into the app's own components and
  conventions; the prototype is the reference, not code to paste.
