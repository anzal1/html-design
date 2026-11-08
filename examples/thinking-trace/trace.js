for (const head of document.querySelectorAll(".trace-head")) {
	head.addEventListener("click", () => {
		const open = head.getAttribute("aria-expanded") === "true";
		head.setAttribute("aria-expanded", String(!open));
		document.getElementById(head.getAttribute("aria-controls")).hidden = open;
	});
}

// Stream the live step and tick its timer, unless the viewer prefers less motion.
const stream = document.querySelector("[data-stream]");
const elapsed = document.querySelector("[data-elapsed]");
if (stream && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
	const full = stream.textContent;
	let i = 0;
	let secs = 6;
	const type = () => {
		i = (i + 1) % (full.length + 40);
		stream.textContent = full.slice(0, Math.min(i, full.length));
		setTimeout(type, i > full.length ? 60 : 28 + Math.random() * 40);
	};
	type();
	setInterval(() => (elapsed.textContent = `, ${++secs}s`), 1000);
}
