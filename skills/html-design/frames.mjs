// Capture timed frames with motion ON, to review animation the way a person sees it.
// node frames.mjs <page.html|url> <out-dir> [--width=1280] [--height=800] [--dark] [--times=0,250,500,1000,2000]
// Optional --click=<selector> or --hover=<selector> fires before the clock starts.
import { launch } from "./browser.mjs";
import fs from "node:fs";
import path from "node:path";

const [, , page, outDir, ...flags] = process.argv;
if (!page || !outDir) {
	console.error("usage: node frames.mjs <page.html|url> <out-dir> [--width] [--height] [--dark] [--times=ms,...] [--click=sel] [--hover=sel]");
	process.exit(2);
}
const opt = Object.fromEntries(flags.map((f) => f.replace(/^--/, "").split("=")).map(([k, v]) => [k, v ?? true]));
const url = /^https?:|^file:/.test(page) ? page : "file://" + path.resolve(page);
const times = String(opt.times ?? "0,250,500,1000,2000,4000").split(",").map(Number);
fs.mkdirSync(outDir, { recursive: true });

const browser = await launch();
const ctx = await browser.newContext({
	viewport: { width: Number(opt.width ?? 1280), height: Number(opt.height ?? 800) },
	deviceScaleFactor: 1,
	colorScheme: opt.dark ? "dark" : "light",
	reducedMotion: "no-preference",
});
const p = await ctx.newPage();
const errors = [];
p.on("pageerror", (e) => errors.push(String(e)));
p.on("console", (m) => m.type() === "error" && errors.push(m.text()));
await p.goto(url, { waitUntil: "networkidle" });
await p.evaluate(() => document.fonts.ready);
if (opt.hover) await p.hover(opt.hover);
if (opt.click) await p.click(opt.click);
const start = Date.now();
for (const t of times) {
	const wait = t - (Date.now() - start);
	if (wait > 0) await p.waitForTimeout(wait);
	await p.screenshot({ path: path.join(outDir, `t${String(t).padStart(5, "0")}ms.png`) });
}
await browser.close();
console.log(JSON.stringify({ outDir, frames: times.length, errors }));
process.exit(errors.length ? 1 : 0);
