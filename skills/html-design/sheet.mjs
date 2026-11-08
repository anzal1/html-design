// Breakpoint contact sheet: full-page shots at every width, tiled into one image.
// Fails (exit 1) on sideways overflow, console errors, page errors or failed requests.
// node sheet.mjs <page.html|url> <out-dir> [--dark]
import { launch } from "./browser.mjs";
import fs from "node:fs";
import path from "node:path";

const WIDTHS = [
	[375, 812], [390, 844], [768, 1024], [1024, 768],
	[1280, 800], [1440, 900], [1920, 1080], [2560, 1440],
];
const [, , page, outDir, ...flags] = process.argv;
if (!page || !outDir) {
	console.error("usage: node sheet.mjs <page.html|url> <out-dir> [--dark]");
	process.exit(2);
}
const dark = flags.includes("--dark");
const url = /^https?:|^file:/.test(page) ? page : "file://" + path.resolve(page);
const name = path.basename(page).replace(/\.[a-z]+$/i, "") + (dark ? "-dark" : "");
fs.mkdirSync(outDir, { recursive: true });

const browser = await launch();
const results = [];
for (const [width, height] of WIDTHS) {
	const ctx = await browser.newContext({
		viewport: { width, height },
		deviceScaleFactor: 1,
		colorScheme: dark ? "dark" : "light",
		reducedMotion: "reduce",
	});
	const p = await ctx.newPage();
	const errors = [];
	p.on("console", (m) => m.type() === "error" && errors.push(m.text()));
	p.on("pageerror", (e) => errors.push(String(e)));
	p.on("requestfailed", (r) => errors.push(`request failed: ${r.url()}`));
	await p.goto(url, { waitUntil: "networkidle" });
	await p.evaluate(() => document.fonts.ready);
	const overflow = await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
	const file = path.join(outDir, `${name}-${width}.png`);
	// Grow the viewport to the page height so fixed bars render where a user sees them.
	const full = await p.evaluate(() => document.documentElement.scrollHeight);
	if (full > height) await p.setViewportSize({ width, height: full });
	await p.screenshot({ path: file });
	results.push({ width, height, file, overflow, errors });
	await ctx.close();
}

// Tile the shots into one sheet, each scaled to a 360px-wide column.
const tiles = results
	.map((r) => {
		const data = fs.readFileSync(r.file).toString("base64");
		const bad = r.overflow || r.errors.length;
		return `<figure><figcaption class="${bad ? "fail" : ""}">${r.width}×${r.height}${bad ? " · FAIL" : ""}</figcaption><img src="data:image/png;base64,${data}"></figure>`;
	})
	.join("");
const sheetHtml = `<!doctype html><meta charset="utf-8"><style>
body{margin:0;padding:24px;background:#d9d4c8;font:600 14px system-ui;display:flex;gap:20px;align-items:flex-start;width:max-content}
figure{margin:0;width:360px;display:flex;flex-direction:column;gap:8px}
figcaption{color:#1e2420}.fail{color:#b42318}
img{width:360px;display:block;box-shadow:0 1px 3px rgba(0,0,0,.15)}</style>${tiles}`;
const sp = await browser.newPage({ viewport: { width: 400, height: 400 }, deviceScaleFactor: 1 });
await sp.setContent(sheetHtml, { waitUntil: "load" });
const sheet = path.join(outDir, `${name}-sheet.png`);
await sp.screenshot({ path: sheet, fullPage: true });
await browser.close();

const failed = results.filter((r) => r.overflow || r.errors.length);
for (const r of results) {
	console.log(`${r.width}x${r.height} ${r.overflow || r.errors.length ? "FAIL" : "ok"}${r.overflow ? " overflow" : ""}${r.errors.length ? " " + r.errors.join(" | ") : ""}`);
}
console.log(`sheet: ${sheet}`);
process.exit(failed.length ? 1 : 0);
