/*
 * Publications, rendered on publications.html and in the CV.
 * Listed in the order given here (newest first).
 *
 *   title, authors (array; names in SITE.authorAliases are bolded),
 *   venue (full name), short (badge text, e.g. "CoRL 2026"), year,
 *   note (optional HTML), links (optional [{ label, href }]),
 *   thumb (optional image; also the video poster), video (optional looping clip)
 * Thumbnails show wherever the list has data-thumbs (the home page).
 */
window.PUBLICATIONS = [
  {
    title: "Plann3r: Predicting Planning Costs Grounded in 3D",
    authors: [
      "A. Vadali",
      "K. Pandya",
      "V. Garg",
      "N. Chandna",
      "D. Craggs",
      "F. Dayoub",
      "K. M. Krishna",
      "S. Garg",
    ],
    venue: "Conference on Robot Learning (CoRL)",
    short: "CoRL 2026",
    year: 2026,
    note: "First author. Presenting in person in Austin, TX (Nov 9–12, 2026).",
    // TODO: add arXiv / code / PDF links once public.
    links: [{ label: "Project page", href: "https://plann3r.github.io/" }],
    thumb: "assets/img/pubs/plann3r-poster.jpg",
    video: "assets/img/pubs/plann3r.mp4",
  },
  {
    title: "PixelLoop: Shortcut Topological Navigation with Pixel-Level Loops",
    authors: [
      "S. Chittawar",
      "V. Garg",
      "A. Vadali",
      "K. Pandya",
      "R. Jayanti",
      "S. Garg",
      "K. M. Krishna",
    ],
    venue: "IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS)",
    short: "IROS 2026",
    year: 2026,
    // TODO: add the arXiv link once the ID is verified.
    links: [{ label: "Project page", href: "https://pixelloop-nav.github.io/" }],
    thumb: "assets/img/pubs/pixelloop.jpg",
  },
];
