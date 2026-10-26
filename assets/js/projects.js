/*
 * Renders window.PROJECTS (data/projects.js) into <div id="projects">,
 * grouped by window.PROJECT_CATEGORIES, plus a jump list into
 * <ul id="project-jump"> if present. Must load before dither.js so project
 * images get dithered.
 */
(function () {
  "use strict";

  const root = document.getElementById("projects");
  if (!root) return;

  const categories = window.PROJECT_CATEGORIES || {};
  const projects = window.PROJECTS || [];

  function links(list) {
    if (!list || !list.length) return "";
    return `<ul class="chips">${list
      .map((l) => `<li><a class="chip" href="${l.href}">${l.label}</a></li>`)
      .join("")}</ul>`;
  }

  function render(p, i) {
    const img = p.img
      ? `<canvas class="project-img" data-dither="image" data-src="${p.img}" role="img" aria-label="${p.title}"></canvas>`
      : "";
    return `<article class="project" id="${p.id}">
      <span class="project-index">${String(i + 1).padStart(2, "0")}</span>
      <div class="project-body">
        <h3 class="project-title"><a href="#${p.id}">${p.title}</a></h3>
        <p class="project-desc">${p.description}</p>
        ${img}
        <div class="project-text">${p.body}</div>
        ${links(p.links)}
      </div>
    </article>`;
  }

  const groups = Object.keys(categories)
    .map((key) => ({
      key,
      label: categories[key],
      items: projects
        .filter((p) => p.category === key)
        .sort((a, b) => (a.importance || 0) - (b.importance || 0)),
    }))
    .filter((g) => g.items.length);

  root.innerHTML = groups
    .map(
      (g) => `<section class="project-group" id="${g.key}">
        <h2 class="section-title">${g.label}</h2>
        ${g.items.map(render).join("")}
      </section>`
    )
    .join("");

  const jump = document.getElementById("project-jump");
  if (jump) {
    jump.innerHTML = groups
      .map((g) => `<li><a href="#${g.key}">${g.label}</a></li>`)
      .join("");
  }
})();
