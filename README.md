# html-design

An agent skill for designing app and web UI as plain HTML and CSS, at the quality you get from a canvas design tool.

Canvas tools like Paper render HTML and CSS too. What makes their AI output look good is the process around it, not the canvas. This skill gives any coding agent that process, so you can design without a canvas subscription and keep everything as files you own.

## What it makes the agent do

1. Grill the design before building, in rounds, like a design lead: ground truth, then the unknowns (style, palette, type, system), then harmony, the signature idea and the stitching. Taste comes from you; there is no house style.
2. Keep every colour, size and radius in one `tokens.css`, with light and dark themes.
3. Build one visual group at a time, screenshot it, and check it against strict, evidence-based usability rules (WCAG 2.2 contrast and focus, target sizes, readable type, state never colour alone).
4. Plan motion as micro (one element), macro (choreography) and gestures, then check it with timed frames, not frozen screenshots.
5. Run a contact sheet at 8 widths from 375 to 2560, light and dark. It fails on sideways scroll, console errors and failed requests.
6. Hand the approved prototype to builders as a reference, not code to paste.

## Install

```bash
npx skills add anzal1/html-design
```

Or copy `skills/html-design` into your agent's skills folder (for Claude Code, `~/.claude/skills/`). Then run `npm install` inside it once. The screenshot scripts use Playwright's Chromium if you have it, otherwise your installed Chrome.

## Use

Ask your agent to design something: "design the settings screen for a budgeting app", "make three directions for a landing page", "build a small UI kit for this product". To build on an existing design system, point it at your tokens file and it will only use those values.

## Credit

The brief format and the review checklist are adapted, in our own words, from the design guide that [Paper](https://paper.design) serves to agents through its MCP server. If you have Paper, use it; this is for working in plain files.

Motion guidance follows [Emil Kowalski's skills](https://github.com/emilkowalski/skills) (MIT): `animate`, `choreograph` and `gestures`. Install them for the full depth:

```bash
npx skills add emilkowalski/skills
```

## License

MIT
