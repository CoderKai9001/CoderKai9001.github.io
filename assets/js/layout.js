/*
 * Shared page chrome: header (dithered banner + nav), footer, and link lists.
 * Reads window.SITE from data/site.js. Pages provide empty
 * <header id="site-header"> / <footer id="site-footer"> slots, and any
 * element with [data-site-links] gets the list of links.
 */
(function () {
  "use strict";

  const SITE = window.SITE || { name: "", nav: [], links: [] };
  const page = document.body.dataset.page;

  const linkItems = (SITE.links || [])
    .map((l) => `<li><a href="${l.href}">${l.label}</a></li>`)
    .join("");

  const header = document.getElementById("site-header");
  if (header) {
    const nav = (SITE.nav || [])
      .map((item) => {
        const current = item.id === page ? ' aria-current="page"' : "";
        return `<li><a href="${item.href}"${current}>${item.label}</a></li>`;
      })
      .join("");

    header.innerHTML = `
      <canvas class="banner" data-dither="waves" data-scale="3" aria-hidden="true"></canvas>
      <div class="container header-row">
        <a class="wordmark" href="index.html">${SITE.name}</a>
        <nav class="site-nav" aria-label="Main"><ul>${nav}</ul></nav>
        <button class="theme-toggle" type="button" aria-label="Toggle dark mode" title="Toggle dark mode">
          <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
            <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-width="1.5" />
            <path d="M8 1.5a6.5 6.5 0 0 1 0 13z" fill="currentColor" />
          </svg>
        </button>
      </div>`;

    header.querySelector(".theme-toggle").addEventListener("click", () => {
      const root = document.documentElement;
      const isDark = root.dataset.theme
        ? root.dataset.theme === "dark"
        : window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.dataset.theme = isDark ? "light" : "dark";
      try {
        localStorage.setItem("theme", root.dataset.theme);
      } catch (e) {}
      document.dispatchEvent(new Event("themechange"));
    });
  }

  const footer = document.getElementById("site-footer");
  if (footer) {
    footer.innerHTML = `
      <div class="container footer-row">
        <span>&copy; ${new Date().getFullYear()} ${SITE.name}</span>
        <ul class="links">${linkItems}</ul>
      </div>`;
  }

  document.querySelectorAll("[data-site-links]").forEach((el) => {
    el.innerHTML = linkItems;
  });
})();
