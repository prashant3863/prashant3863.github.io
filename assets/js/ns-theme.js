/*
 * Light / dark switch. Spec: design/system.md → Dark mode.
 *
 * - _includes/ns/head.html sets html.dark before first paint: the saved choice, else the system setting.
 * - The switch in the header ([data-ns-theme]) flips it and saves the choice in localStorage ('ns-theme').
 * - With nothing saved, the site follows the system setting live.
 * - Fires 'ns-themechange' on document so canvas drawings (the glider) can repaint with the new tokens.
 * - The switch is a football: each click restarts its kick animation (.is-kicking, see components.css).
 */
(function () {
  'use strict';
  var root = document.documentElement;
  var KEY = 'ns-theme';
  var buttons = Array.prototype.slice.call(document.querySelectorAll('[data-ns-theme]'));
  var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function saved() {
    try { var t = localStorage.getItem(KEY); return t === 'dark' || t === 'light' ? t : null; } catch (e) { return null; }
  }
  function apply(dark) {
    root.classList.toggle('dark', dark);
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', dark ? 'true' : 'false'); });
    document.dispatchEvent(new CustomEvent('ns-themechange', { detail: { dark: dark } }));
  }

  buttons.forEach(function (b) {
    b.setAttribute('aria-pressed', root.classList.contains('dark') ? 'true' : 'false');
    b.addEventListener('animationend', function () { b.classList.remove('is-kicking'); });
    b.addEventListener('click', function () {
      var dark = !root.classList.contains('dark');
      b.classList.remove('is-kicking');
      void b.offsetWidth; // restart the kick if it's clicked again mid-roll
      b.classList.add('is-kicking');
      try { localStorage.setItem(KEY, dark ? 'dark' : 'light'); } catch (e) { /* private mode: lasts for this page */ }
      apply(dark);
    });
  });

  if (media) {
    var follow = function (e) { if (!saved()) apply(e.matches); };
    if (media.addEventListener) media.addEventListener('change', follow); else if (media.addListener) media.addListener(follow);
  }
})();
