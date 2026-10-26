/*
 * Renders window.PUBLICATIONS (data/publications.js) into every
 * <ol data-publications> on the page. Lists marked data-thumbs also show each
 * paper's thumbnail image or looping video.
 */
(function () {
  "use strict";

  const pubs = window.PUBLICATIONS || [];
  const aliases = (window.SITE && window.SITE.authorAliases) || [];

  function authors(list) {
    return list
      .map((name) => (aliases.includes(name) ? `<strong>${name}</strong>` : name))
      .join(", ");
  }

  function links(list) {
    if (!list || !list.length) return "";
    return `<ul class="chips">${list
      .map((l) => `<li><a class="chip" href="${l.href}">${l.label}</a></li>`)
      .join("")}</ul>`;
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function thumb(p) {
    const href = p.links && p.links.length ? p.links[0].href : null;
    const media = p.video
      ? `<video src="${p.video}" ${p.thumb ? `poster="${p.thumb}"` : ""} muted loop playsinline
          ${reduceMotion ? "controls" : "autoplay"} preload="metadata" aria-label="${p.title}"></video>`
      : `<img src="${p.thumb}" alt="${p.title}" loading="lazy" />`;
    return `<div class="pub-media">${
      href ? `<a class="pub-thumb" href="${href}">${media}</a>` : `<div class="pub-thumb">${media}</div>`
    }</div>`;
  }

  function render(p, withThumb) {
    if (withThumb && (p.thumb || p.video)) {
      return `<li class="pub has-thumb">
        ${thumb(p)}
        <div class="pub-body">
          <span class="pub-badge">${p.short || p.year}</span>
          ${body(p)}
        </div>
      </li>`;
    }
    return `<li class="pub">
      <span class="pub-badge">${p.short || p.year}</span>
      <div class="pub-body">${body(p)}</div>
    </li>`;
  }

  function body(p) {
    return `
        <p class="pub-title">${p.title}</p>
        <p class="pub-authors">${authors(p.authors || [])}</p>
        <p class="pub-venue"><em>${p.venue}</em>, ${p.year}</p>
        ${p.note ? `<p class="pub-note">${p.note}</p>` : ""}
        ${links(p.links)}`;
  }

  document.querySelectorAll("[data-publications]").forEach((el) => {
    const withThumb = el.hasAttribute("data-thumbs");
    el.innerHTML = pubs.length
      ? pubs.map((p) => render(p, withThumb)).join("")
      : '<li class="news-empty">Nothing here yet.</li>';
  });
})();
