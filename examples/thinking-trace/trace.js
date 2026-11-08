for (const head of document.querySelectorAll(".head")) {
	head.addEventListener("click", () => {
		const open = head.getAttribute("aria-expanded") === "true";
		head.setAttribute("aria-expanded", String(!open));
		document.getElementById(head.getAttribute("aria-controls")).hidden = open;
	});
}

// Live turn: stream the thought, grow the bar and tick the clock.
const stream = document.querySelector("[data-stream]");
if (stream && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
	const clock = document.querySelector("[data-clock]");
	const row = document.querySelector("[data-live-row]");
	const rowT = document.querySelector("[data-live-t]");
	const full = stream.textContent;
	let t = 0;
	const tick = () => {
		t = (t + 0.1) % 9;
		const shown = Math.min(1, t / 6);
		stream.textContent = full.slice(0, Math.round(full.length * shown));
		row.style.setProperty("--d", Math.min(t, 6.8).toFixed(2));
		rowT.textContent = `${Math.min(t, 6.8).toFixed(1)}s`;
		clock.firstChild.textContent = (2.2 + Math.min(t, 6.8)).toFixed(1);
	};
	setInterval(tick, 100);
}
