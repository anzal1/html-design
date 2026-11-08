// Tiny behaviours shared by all three pages.
(function () {
  var root = document.documentElement;
  try { var t = localStorage.getItem("meniscus-theme"); if (t) root.setAttribute("data-theme", t); } catch (e) {}
  document.querySelectorAll("[data-theme-toggle]").forEach(function (b) {
    function label() {
      var dark = root.getAttribute("data-theme") === "dark" || (!root.getAttribute("data-theme") && matchMedia("(prefers-color-scheme: dark)").matches);
      b.setAttribute("aria-pressed", dark ? "true" : "false");
      b.querySelector("span").textContent = dark ? "Dark" : "Light";
    }
    label();
    b.addEventListener("click", function () {
      var dark = b.getAttribute("aria-pressed") === "true";
      var next = dark ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("meniscus-theme", next); } catch (e) {}
      label(); document.dispatchEvent(new Event("themechange"));
    });
  });
  document.querySelectorAll(".toggle").forEach(function (b) {
    var st = b.querySelector(".toggle__state");
    function sync() { if (st) st.textContent = b.getAttribute("aria-checked") === "true" ? "On" : "Off"; }
    sync();
    b.addEventListener("click", function () { b.setAttribute("aria-checked", b.getAttribute("aria-checked") === "true" ? "false" : "true"); sync(); });
  });
  document.querySelectorAll(".slider").forEach(function (s) {
    var out = s.closest(".field") && s.closest(".field").querySelector("[data-out]");
    function upd() {
      var p = (s.value - s.min) / (s.max - s.min) * 100;
      s.style.setProperty("--val", p + "%");
      if (out) out.textContent = (s.dataset.format || "{v}").replace("{v}", Number(s.value).toLocaleString("en"));
      s.setAttribute("aria-valuetext", out ? out.textContent : s.value);
      document.dispatchEvent(new CustomEvent("sliderinput", { detail: s }));
    }
    s.addEventListener("input", upd); upd();
  });
  document.querySelectorAll("[data-validate]").forEach(function (i) {
    i.addEventListener("blur", function () { i.setAttribute("aria-invalid", i.value.trim().length < 2 ? "true" : "false"); });
  });
  document.querySelectorAll("[data-load]").forEach(function (b) {
    b.addEventListener("click", function () {
      var txt = b.querySelector(".t"), old = txt.textContent;
      b.classList.add("is-loading"); b.setAttribute("aria-busy", "true"); b.insertAdjacentHTML("afterbegin", '<span class="spin" aria-hidden="true"></span>'); txt.textContent = "Syncing";
      setTimeout(function () { b.classList.remove("is-loading"); b.removeAttribute("aria-busy"); b.querySelector(".spin").remove(); txt.textContent = old; }, 1600);
    });
  });
})();
