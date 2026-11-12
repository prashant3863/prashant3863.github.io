/*
 * notshant logo motion. Spec: design/system.md → Motion → Logo.
 *
 * - First page view of a visit: the outline draws in (4.8s), then the fill fades in.
 * - Later pages in the same visit: the logo is already drawn.
 * - Hover or keyboard focus: the logo vanishes and redraws the same way. Ignored while it is still drawing.
 * - prefers-reduced-motion: always drawn, never animates.
 *
 * Needs: _includes/ns/head.html (sets html.ns-js) and _includes/ns/logo.html.
 */
(function () {
  'use strict';
  var KEY = 'ns-logo-drawn';
  var FIRST_MS = 5000;   // .15s delay + 4.8s outline
  var REDRAW_MS = 4800;
  var reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  function seenThisVisit() {
    try { return sessionStorage.getItem(KEY) === '1'; } catch (e) { return false; }
  }
  function markSeen() {
    try { sessionStorage.setItem(KEY, '1'); } catch (e) { /* private mode: replays each page, which is fine */ }
  }

  Array.prototype.forEach.call(document.querySelectorAll('.ns-logo'), function (svg) {
    var busyUntil = 0;

    if (reduce || seenThisVisit()) {
      svg.classList.add('is-drawn');
    } else {
      svg.classList.add('is-drawing');
      busyUntil = performance.now() + FIRST_MS;
      markSeen();
    }
    if (reduce) return;

    function replay() {
      var now = performance.now();
      if (now < busyUntil) return;
      busyUntil = now + REDRAW_MS;
      svg.classList.remove('is-drawn', 'is-drawing', 'is-redraw');
      void svg.getBoundingClientRect(); // restart the animation
      svg.classList.add('is-redraw');
    }

    var target = svg.closest('a') || svg;
    target.addEventListener('mouseenter', replay);
    target.addEventListener('focus', replay);
  });
})();
