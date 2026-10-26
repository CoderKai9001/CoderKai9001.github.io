/*
 * Site-wide settings. Shared by every page through assets/js/layout.js.
 *
 * Adding a page later:
 *   1. Copy _template.html to e.g. blog.html and set <body data-page="blog">.
 *   2. Add a matching entry to `nav` below (the `id` must equal data-page).
 * Links to files (a PDF, say) can go straight into `nav` too.
 */
window.SITE = {
  name: "Aditya Vadali",

  // Author-name spellings that get bolded in publication author lists.
  authorAliases: ["A. Vadali", "Aditya Vadali"],

  nav: [
    { id: "home", label: "About", href: "index.html" },
    { id: "publications", label: "Publications", href: "publications.html" },
    { id: "projects", label: "Projects", href: "projects.html" },
    { id: "cv", label: "CV", href: "cv.html" },
    // { id: "blog", label: "Blog", href: "blog.html" },
  ],

  // Shown under the intro and in the footer.
  links: [
    { label: "Email", href: "mailto:moulichandra4321@gmail.com" },
    { label: "GitHub", href: "https://github.com/CoderKai9001" },
    { label: "CV (PDF)", href: "assets/pdf/Aditya_Vadali_CV.pdf" },
    // TODO: add once available.
    // { label: "Scholar", href: "https://scholar.google.com/citations?user=XXXXXXXXXXXX" },
    // { label: "LinkedIn", href: "https://www.linkedin.com/in/aditya-vadali" },
  ],
};
