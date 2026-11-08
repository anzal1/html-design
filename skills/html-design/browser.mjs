// Launch headless Chromium: Playwright's own build if installed, else the system Chrome.
import { chromium } from "playwright-core";

export async function launch() {
	for (const opts of [{}, { channel: "chrome" }, { channel: "msedge" }]) {
		try {
			return await chromium.launch({ headless: true, ...opts });
		} catch {}
	}
	console.error("No browser found. Install Google Chrome, or run: npx playwright-core install chromium");
	process.exit(2);
}
