/*
 * 1-bit dithering engine.
 *
 * Every <canvas data-dither="..."> on the page is rendered using the
 * --dither-dark / --dither-light colour tokens (hex values) from style.css.
 *
 *   data-dither="image"        dithers data-src; falls back to a placeholder
 *                              portrait if the image is missing
 *   data-dither="placeholder"  placeholder portrait only
 *   data-dither="waves"        animated generative pattern (used by the banner)
 *
 * Options:
 *   data-scale       CSS pixels per dither pixel (default 2; larger = chunkier)
 *   data-algo        "atkinson" (error diffusion) or "bayer" (ordered)
 *   data-contrast    default 1
 *   data-brightness  default 0 (range roughly -0.5 .. 0.5)
 *   data-zoom        crop in on images, default 1
 *   data-focus       "x y" point of the image (0..1) to keep centred, default "0.5 0.5"
 */
(function () {
  "use strict";

  // 8x8 Bayer threshold matrix, normalised to (0, 1).
  const BAYER = (function () {
    let m = [[0]];
    for (let n = 1; n < 8; n *= 2) {
      const next = Array.from({ length: n * 2 }, () => new Array(n * 2));
      for (let y = 0; y < n; y++) {
        for (let x = 0; x < n; x++) {
          const v = m[y][x] * 4;
          next[y][x] = v;
          next[y][x + n] = v + 2;
          next[y + n][x] = v + 3;
          next[y + n][x + n] = v + 1;
        }
      }
      m = next;
    }
    return m.map((row) => row.map((v) => (v + 0.5) / 64));
  })();

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const darkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  let colors = null;

  function readColor(name) {
    const ctx = document.createElement("canvas").getContext("2d");
    ctx.fillStyle =
      getComputedStyle(document.documentElement).getPropertyValue(name).trim() || "#000";
    const hex = ctx.fillStyle; // normalised to #rrggbb
    return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  }

  function getColors() {
    if (!colors) {
      const paper = readColor("--paper");
      colors = {
        dark: readColor("--dither-dark"),
        light: readColor("--dither-light"),
        paperIsDark: paper[0] + paper[1] + paper[2] < 384,
      };
    }
    return colors;
  }

  // ---- quantisation -------------------------------------------------------

  function quantize(lum, w, h, algo) {
    const out = new Uint8Array(w * h);

    if (algo === "bayer") {
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = y * w + x;
          out[i] = lum[i] > BAYER[y & 7][x & 7] ? 1 : 0;
        }
      }
      return out;
    }

    // Atkinson: diffuses 6/8 of the error, which keeps highlights crisp.
    const buf = Float32Array.from(lum);
    const spread = (x, y, e) => {
      if (x >= 0 && x < w && y < h) buf[y * w + x] += e;
    };
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = y * w + x;
        const v = buf[i] > 0.5 ? 1 : 0;
        const e = (buf[i] - v) / 8;
        out[i] = v;
        spread(x + 1, y, e);
        spread(x + 2, y, e);
        spread(x - 1, y + 1, e);
        spread(x, y + 1, e);
        spread(x + 1, y + 1, e);
        spread(x, y + 2, e);
      }
    }
    return out;
  }

  function paint(canvas, bits, w, h) {
    const { dark, light } = getColors();
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    const img = ctx.createImageData(w, h);
    const d = img.data;
    for (let i = 0; i < bits.length; i++) {
      const c = bits[i] ? light : dark;
      const j = i * 4;
      d[j] = c[0];
      d[j + 1] = c[1];
      d[j + 2] = c[2];
      d[j + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
  }

  // ---- sources ------------------------------------------------------------

  function luminance(ctx, w, h, contrast, brightness) {
    const d = ctx.getImageData(0, 0, w, h).data; // throws on tainted canvases
    const lum = new Float32Array(w * h);
    for (let i = 0; i < lum.length; i++) {
      const j = i * 4;
      const l = (0.2126 * d[j] + 0.7152 * d[j + 1] + 0.0722 * d[j + 2]) / 255;
      lum[i] = (l - 0.5) * contrast + 0.5 + brightness;
    }
    return lum;
  }

  function drawCover(ctx, img, w, h, zoom, focus) {
    const s = Math.max(w / img.naturalWidth, h / img.naturalHeight) * zoom;
    const dw = img.naturalWidth * s;
    const dh = img.naturalHeight * s;
    const clamp = (v, min) => Math.min(0, Math.max(min, v));
    const x = clamp(w / 2 - focus[0] * dw, w - dw);
    const y = clamp(h / 2 - focus[1] * dh, h - dh);
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, x, y, dw, dh);
  }

  // A soft-shaded head-and-shoulders silhouette, so the empty photo slot
  // still shows off the dithering.
  function drawPlaceholder(ctx, w, h) {
    const bg = ctx.createLinearGradient(0, 0, w, h);
    bg.addColorStop(0, "#d8d8d8");
    bg.addColorStop(1, "#707070");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    const body = ctx.createRadialGradient(w * 0.4, h * 0.8, w * 0.05, w * 0.5, h * 0.95, w * 0.6);
    body.addColorStop(0, "#7a7a7a");
    body.addColorStop(1, "#262626");
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.ellipse(w * 0.5, h * 1.02, w * 0.42, h * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#4a4a4a";
    ctx.fillRect(w * 0.43, h * 0.5, w * 0.14, h * 0.2);

    const head = ctx.createRadialGradient(w * 0.43, h * 0.34, w * 0.02, w * 0.5, h * 0.4, w * 0.22);
    head.addColorStop(0, "#b0b0b0");
    head.addColorStop(1, "#353535");
    ctx.fillStyle = head;
    ctx.beginPath();
    ctx.ellipse(w * 0.5, h * 0.4, w * 0.17, h * 0.155, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  function waves(w, h, t) {
    const invert = getColors().paperIsDark;
    const lum = new Float32Array(w * h);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const u = x * 0.045;
        const v = y * 0.09;
        const f =
          Math.sin(u + t * 0.5 + Math.sin(v * 0.8 + t * 0.3) * 1.5) +
          Math.sin(u * 0.37 - v * 1.3 - t * 0.4);
        // Fade towards the paper colour at the bottom edge.
        const l = 0.42 + f * 0.2 + (y / h) * 0.45;
        lum[y * w + x] = invert ? 1 - l : l;
      }
    }
    return lum;
  }

  // ---- rendering ----------------------------------------------------------

  const images = new Map(); // canvas -> loaded HTMLImageElement
  const ready = new WeakSet(); // canvases whose source is settled
  const canvases = Array.from(document.querySelectorAll("canvas[data-dither]"));
  const animated = canvases.filter((c) => c.dataset.dither === "waves");
  const start = performance.now();

  function size(canvas) {
    const scale = parseFloat(canvas.dataset.scale) || 2;
    const r = canvas.getBoundingClientRect();
    return {
      w: Math.max(1, Math.round(r.width / scale)),
      h: Math.max(1, Math.round(r.height / scale)),
    };
  }

  function fallbackToImage(canvas, img) {
    console.warn(
      "[dither] Could not read image pixels. Browsers block this for pages opened " +
        "straight from disk; serve the folder instead (e.g. `python3 -m http.server`)."
    );
    const el = document.createElement("img");
    el.src = img.src;
    el.alt = canvas.getAttribute("aria-label") || "";
    el.className = "dither-fallback";
    canvas.replaceWith(el);
  }

  function render(canvas) {
    if (!ready.has(canvas) || !canvas.isConnected) return;
    const { w, h } = size(canvas);
    const mode = canvas.dataset.dither;
    let lum;
    let algo = canvas.dataset.algo;

    if (mode === "waves") {
      lum = waves(w, h, (performance.now() - start) / 1000);
      algo = algo || "bayer";
    } else {
      const src = document.createElement("canvas");
      src.width = w;
      src.height = h;
      const ctx = src.getContext("2d", { willReadFrequently: true });
      const img = images.get(canvas);
      if (img) {
        const zoom = parseFloat(canvas.dataset.zoom) || 1;
        const focus = (canvas.dataset.focus || "0.5 0.5").split(/\s+/).map(Number);
        drawCover(ctx, img, w, h, zoom, focus);
      }
      else drawPlaceholder(ctx, w, h);
      try {
        lum = luminance(
          ctx,
          w,
          h,
          parseFloat(canvas.dataset.contrast) || 1,
          parseFloat(canvas.dataset.brightness) || 0
        );
      } catch (e) {
        fallbackToImage(canvas, img);
        return;
      }
      algo = algo || "atkinson";
    }

    paint(canvas, quantize(lum, w, h, algo), w, h);
  }

  function renderAll() {
    canvases.forEach(render);
  }

  canvases.forEach((canvas) => {
    const src = canvas.dataset.src;
    if (canvas.dataset.dither === "image" && src) {
      const img = new Image();
      img.onload = () => {
        images.set(canvas, img);
        ready.add(canvas);
        render(canvas);
      };
      img.onerror = () => {
        ready.add(canvas);
        render(canvas);
      };
      img.src = src;
    } else {
      ready.add(canvas);
    }
  });

  // Re-dither when a canvas changes size (debounced per frame).
  let pending = new Set();
  const ro = new ResizeObserver((entries) => {
    if (!pending.size) {
      requestAnimationFrame(() => {
        pending.forEach(render);
        pending = new Set();
      });
    }
    entries.forEach((e) => pending.add(e.target));
  });
  canvases.forEach((c) => ro.observe(c));

  // Re-colour when the theme changes.
  const recolour = () => {
    colors = null;
    renderAll();
  };
  document.addEventListener("themechange", recolour);
  darkScheme.addEventListener("change", recolour);

  // Animate generative canvases at ~10 fps.
  if (animated.length) {
    let last = 0;
    const tick = (now) => {
      if (!reduceMotion.matches && now - last > 100) {
        last = now;
        animated.forEach(render);
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
})();
