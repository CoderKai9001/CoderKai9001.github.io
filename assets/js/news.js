/*
 * Renders window.NEWS (data/news.js) into <ol id="news-list">.
 * <ol data-limit="N"> controls how many show before "show all" (default 5).
 */
(function () {
  "use strict";

  const list = document.getElementById("news-list");
  if (!list) return;

  const limit = parseInt(list.dataset.limit, 10) || 5;
  const items = (window.NEWS || [])
    .slice()
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));

  function formatDate(date) {
    const [y, m, d] = String(date).split("-").map(Number);
    if (!m) return String(y);
    const month = new Date(y, m - 1, 1).toLocaleString("en", { month: "short" });
    return d ? `${month} ${d}, ${y}` : `${month} ${y}`;
  }

  if (!items.length) {
    list.innerHTML = '<li class="news-empty">Nothing here yet.</li>';
    return;
  }

  list.innerHTML = items
    .map((n, i) => {
      const hidden = i >= limit ? " is-hidden" : "";
      const tag = n.tag ? `<span class="tag">${n.tag}</span> ` : "";
      return `<li class="news-item${hidden}">
        <time class="news-date" datetime="${n.date}">${formatDate(n.date)}</time>
        <p class="news-text">${tag}${n.text}</p>
      </li>`;
    })
    .join("");

  const toggle = document.getElementById("news-toggle");
  if (toggle && items.length > limit) {
    toggle.hidden = false;
    toggle.textContent = `Show all (${items.length})`;
    toggle.addEventListener("click", () => {
      const expanded = list.classList.toggle("is-expanded");
      toggle.textContent = expanded ? "Show fewer" : `Show all (${items.length})`;
      toggle.setAttribute("aria-expanded", String(expanded));
    });
  }
})();
