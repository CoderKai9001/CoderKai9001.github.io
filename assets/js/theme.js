// Loaded in <head> so a saved light/dark choice applies before first paint.
(function () {
  try {
    var saved = localStorage.getItem("theme");
    if (saved) document.documentElement.dataset.theme = saved;
  } catch (e) {}
})();
