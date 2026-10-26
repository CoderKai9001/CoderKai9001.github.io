/*
 * Renders window.CV (data/cv.js) into <div id="cv">. Publication sections
 * become <ol data-publications>, filled by publications.js (load it after this).
 */
(function () {
  "use strict";

  const root = document.getElementById("cv");
  if (!root || !window.CV) return;

  function entry(e) {
    const where = [e.org, e.location].filter(Boolean).join(" &middot; ");
    const highlights = e.highlights && e.highlights.length
      ? `<ul>${e.highlights.map((h) => `<li>${h}</li>`).join("")}</ul>`
      : "";
    return `<div class="cv-entry">
      <span class="cv-dates">${e.dates || ""}</span>
      <div class="cv-body">
        <p class="cv-title">${e.title}</p>
        ${where ? `<p class="cv-where">${where}</p>` : ""}
        ${e.summary ? `<p class="cv-summary">${e.summary}</p>` : ""}
        ${highlights}
      </div>
    </div>`;
  }

  function skills(list) {
    return `<dl class="cv-skills">${list
      .map((s) => `<dt>${s.name}</dt><dd>${s.items}</dd>`)
      .join("")}</dl>`;
  }

  root.innerHTML = window.CV.sections
    .map((s) => {
      let content = "";
      if (s.publications) content = '<ol class="pub-list" data-publications></ol>';
      else if (s.skills) content = skills(s.skills);
      else content = (s.entries || []).map(entry).join("");
      return `<section class="cv-section">
        <h2 class="section-title">${s.title}</h2>
        ${content}
      </section>`;
    })
    .join("");

  document.querySelectorAll("[data-cv-pdf]").forEach((a) => (a.href = window.CV.pdf));
  document.querySelectorAll("[data-cv-resume]").forEach((a) => (a.href = window.CV.resume));
})();
