// Screenshot one prototype page at 2x.
// node shot.mjs <page.html|url> <out.png> [--dark] [--focus=#id] [--width=390] [--height=844] [--full]
import { launch } from "./browser.mjs";
import path from "node:path";

const [, , page, out, ...flags] = process.argv;
if (!page || !out) {
	console.error("usage: node shot.mjs <page.html|url> <out.png> [--dark] [--focus=#id] [--width=390] [--height=844] [--full]");
	process.exit(2);
}
const opt = Object.fromEntries(flags.map((f) => f.replace(/^--/, "").split("=")).map(([k, v]) => [k, v ?? true]));
const url = /^https?:|^file:/.test(page) ? page : "file://" + path.resolve(page);

const browser = await launch();
const ctx = await browser.newContext({
	viewport: { width: Number(opt.width ?? 390), height: Number(opt.height ?? 844) },
	deviceScaleFactor: 2,
	colorScheme: opt.dark ? "dark" : "light",
	reducedMotion: "reduce",
});
const p = await ctx.newPage();
const errors = [];
p.on("console", (m) => m.type() === "error" && errors.push(m.text()));
p.on("pageerror", (e) => errors.push(String(e)));
p.on("requestfailed", (r) => errors.push(`request failed: ${r.url()}`));
await p.goto(url, { waitUntil: "networkidle" });
await p.evaluate(() => document.fonts.ready);
if (opt.focus) await p.focus(opt.focus);
const overflow = await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
if (opt.full) {
	// Grow the viewport to the page height so fixed bars render where a user sees them.
	const h = await p.evaluate(() => document.documentElement.scrollHeight);
	await p.setViewportSize({ width: Number(opt.width ?? 390), height: Math.max(h, Number(opt.height ?? 844)) });
	await p.waitForTimeout(50);
}
await p.screenshot({ path: out });
await browser.close();
console.log(JSON.stringify({ out, overflow, errors }));
process.exit(overflow || errors.length ? 1 : 0);
