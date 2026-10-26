# Personal research site

A static, dependency-free site with a 1-bit dithered look. No build step.

## Run locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

Opening `index.html` directly from disk mostly works, but browsers won't let
the page read pixels from a local photo, so your portrait will show undithered.
Use a local server (or any static host, e.g. GitHub Pages) to see it dithered.

## Layout

```
index.html            home: intro, photo, news
publications.html     papers
projects.html         projects, grouped by category
cv.html               CV + PDF downloads
404.html              not-found page (used by GitHub Pages)
_template.html        copy this to start a new page

data/                 ← content lives here
  site.js             name, navigation, contact links (shared by all pages)
  news.js             news entries
  publications.js     papers (also shown in the CV)
  projects.js         projects and their categories
  cv.js               CV sections

assets/css/style.css  all styles; colour/font tokens at the top
assets/js/            renderers for each data file, plus:
  layout.js           header, nav, footer, link lists
  dither.js           dithering engine for <canvas data-dither>
  theme.js            applies the saved light/dark choice early
assets/img/           images (profile.jpg is the portrait)
assets/pdf/           CV and resume PDFs
```

## Common edits

- **Post news:** add an entry to `data/news.js`. Order doesn't matter; it's sorted by date.
- **Add a paper:** add it to the top of `data/publications.js`. It appears on the
  Publications page and in the CV.
- **Add a project:** add an entry to `data/projects.js`. Set `img` to show a dithered
  picture; link to it from elsewhere with `projects.html#<id>`.
- **Change your photo:** replace `assets/img/profile.jpg`. Tune the look on the canvas
  in `index.html`: `data-scale` (pixel size), `data-zoom` / `data-focus` (crop),
  `data-contrast`, `data-brightness`, `data-algo="atkinson" | "bayer"`.
- **Add a page:** copy `_template.html`, set `data-page` on `<body>`, and add a
  matching entry to `nav` in `data/site.js`.
- **Recolour:** edit the tokens at the top of `style.css`. `--dither-dark` and
  `--dither-light` must be hex colours.

Renderers that create `<canvas data-dither>` elements must be loaded before
`assets/js/dither.js`.
