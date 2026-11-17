// Theme, light/dark mode and page search. Preferences are remembered in the browser.
(function () {
  var root = document.documentElement;
  var pick = document.getElementById("themePick");
  var modeBtn = document.getElementById("modeToggle");
  var searchBtn = document.getElementById("searchToggle");
  var bar = document.getElementById("searchbar");
  var input = document.getElementById("q");
  var count = document.getElementById("count");

  function load(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
  function save(key, value) { try { localStorage.setItem(key, value); } catch (e) { /* storage may be blocked */ } }

  var theme = load("theme");
  if (["navy", "coffee", "indigo", "forest"].indexOf(theme) === -1) theme = "navy";
  var mode = load("mode");
  if (mode !== "light" && mode !== "dark") {
    mode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function apply() {
    root.setAttribute("data-theme", theme);
    root.setAttribute("data-mode", mode);
    pick.value = theme;
  }

  modeBtn.addEventListener("click", function () {
    mode = mode === "dark" ? "light" : "dark";
    save("mode", mode);
    apply();
  });
  pick.addEventListener("change", function () {
    theme = pick.value;
    save("theme", theme);
    apply();
  });
  apply();

  // ----- Search: dims everything that does not match and jumps to the first match -----
  var items = Array.prototype.slice.call(document.querySelectorAll(".searchable"));

  function clearSearch() {
    items.forEach(function (el) { el.classList.remove("dim", "hit"); });
    count.textContent = "";
  }

  function runSearch() {
    var q = input.value.trim().toLowerCase();
    if (!q) { clearSearch(); return; }
    var first = null, n = 0;
    items.forEach(function (el) {
      var match = el.textContent.toLowerCase().indexOf(q) !== -1;
      el.classList.toggle("dim", !match);
      el.classList.toggle("hit", match);
      if (match) { n++; if (!first) first = el; }
    });
    count.textContent = n + (n === 1 ? " match" : " matches");
    if (first) first.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  searchBtn.addEventListener("click", function () {
    var open = bar.hasAttribute("hidden");
    if (open) { bar.removeAttribute("hidden"); input.focus(); }
    else { bar.setAttribute("hidden", ""); input.value = ""; clearSearch(); }
  });
  input.addEventListener("input", runSearch);
  input.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { bar.setAttribute("hidden", ""); input.value = ""; clearSearch(); }
  });
})();
