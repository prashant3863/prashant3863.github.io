/*
 * The glider: Conway's Game of Life, drawn as soft isometric cubes. Spec: design/system.md → Motion → Glider.
 *
 * Shows only the interesting part: the glider's four shapes. The view follows the glider, so it walks in
 * place while the dot grid slides past. Each generation changes in the first 40% of a 1.5s step, then holds.
 * Colours come from the --ns-cube-* tokens in design/tokens.css.
 *
 * Markup: <canvas class="ns-glider__canvas" data-ns-glider role="img" aria-label="…"></canvas>
 * (see _includes/ns/glider.html). Pauses when off screen or in a background tab.
 */
(function () {
  'use strict';
  var STEP = 1500;   // ms per generation
  var MOVE = 0.4;    // share of a step spent changing; the rest is a hold
  var reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  function token(name, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name);
    return v && v.trim() ? v.trim() : fallback;
  }
  var C = {
    top1: token('--ns-cube-top-1', '#FFFFFF'),
    top2: token('--ns-cube-top-2', '#F3F6F6'),
    left: token('--ns-cube-left', '#E9EEEF'),
    right1: token('--ns-cube-right-1', '#D9F5EC'),
    right2: token('--ns-cube-right-2', '#9EDDCB'),
    shadow: token('--ns-cube-shadow', 'rgba(20, 70, 58, 0.09)'),
    dot: token('--ns-dot', '#C9D4D1')
  };

  function key(i, j) { return i + ',' + j; }
  function life(s) {
    var counts = new Map();
    s.forEach(function (k) {
      var p = k.split(','), i = +p[0], j = +p[1];
      for (var di = -1; di <= 1; di++) for (var dj = -1; dj <= 1; dj++) {
        if (!di && !dj) continue;
        var nk = key(i + di, j + dj);
        counts.set(nk, (counts.get(nk) || 0) + 1);
      }
    });
    var next = new Set();
    counts.forEach(function (c, k) { if (c === 3 || (c === 2 && s.has(k))) next.add(k); });
    return next;
  }
  // Four phases of a glider moving +i, -j (to the right on screen). phases[4] is phases[0] moved one cell.
  var phases = [new Set([[1, 2], [2, 1], [0, 0], [1, 0], [2, 0]].map(function (p) { return key(p[0], p[1]); }))];
  for (var g = 0; g < 4; g++) phases.push(life(phases[g]));

  function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function easeOutBack(x) { var c1 = 1.5, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); }
  function easeIn(x) { return x * x * x; }
  function easeInOut(x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }

  function start(el) {
    var ctx = el.getContext && el.getContext('2d');
    if (!ctx) return;
    var k = 0, t0 = performance.now(), raf = 0, visible = true;

    function face(pts, fill, lw) {
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (var n = 1; n < pts.length; n++) ctx.lineTo(pts[n][0], pts[n][1]);
      ctx.closePath();
      ctx.fillStyle = fill; ctx.strokeStyle = fill; ctx.lineWidth = lw; ctx.lineJoin = 'round';
      ctx.fill(); ctx.stroke();
    }

    function draw(now) {
      raf = 0;
      var dpr = window.devicePixelRatio || 1, W = el.clientWidth, H = el.clientHeight;
      if (W > 0 && H > 0) {
        if (el.width !== Math.round(W * dpr) || el.height !== Math.round(H * dpr)) {
          el.width = Math.round(W * dpr); el.height = Math.round(H * dpr);
        }
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, W, H);

        var t = reduce ? 0 : (now - t0) / STEP;
        if (!reduce && t >= 1) { k = (k + 1) % 4; t0 = now; t = 0; }
        var e = reduce ? 0 : clamp(t / MOVE);
        var cur = phases[k], nxt = phases[k + 1];

        var w = Math.min(W / 5, H / 3.4, 72);
        var cam = (k + easeInOut(e)) / 4;
        var cu = 0.6 + 2 * cam, cv = 1.8;
        var pos = function (i, j) { return [W / 2 + ((i - j) - cu) * w / 2, H / 2 + ((i + j) - cv) * w / 4 + w * 0.22]; };

        // Dot grid with a soft vignette
        var ic = Math.round(1.2 + cam), jc = Math.round(0.6 - cam);
        ctx.fillStyle = C.dot;
        for (var i = ic - 9; i <= ic + 9; i++) for (var j = jc - 9; j <= jc + 9; j++) {
          var p = pos(i, j), dx = (p[0] - W / 2) / (W / 2), dy = (p[1] - H / 2) / (H / 2);
          var a = clamp(1.15 - Math.sqrt(dx * dx + dy * dy));
          if (a < 0.03) continue;
          ctx.globalAlpha = a;
          ctx.beginPath(); ctx.arc(p[0], p[1], 1.3, 0, Math.PI * 2); ctx.fill();
        }
        ctx.globalAlpha = 1;

        // Cells: born ones pop in, dying ones shrink away
        var cells = [], all = new Set();
        cur.forEach(function (c) { all.add(c); });
        if (!reduce) nxt.forEach(function (c) { all.add(c); });
        all.forEach(function (c) {
          var inCur = cur.has(c), inNext = nxt.has(c), s = 1;
          if (!reduce) {
            if (inNext && !inCur) s = Math.max(0, easeOutBack(e));
            else if (inCur && !inNext) s = 1 - easeIn(e);
          }
          if (s <= 0.01) return;
          var q = c.split(',');
          cells.push({ i: +q[0], j: +q[1], s: s });
        });
        cells.sort(function (a, b) { return (a.i + a.j) - (b.i + b.j) || a.i - b.i; });

        cells.forEach(function (c) {
          var p = pos(c.i, c.j), a = w * 0.36 * c.s;
          ctx.globalAlpha = Math.min(1, c.s);
          ctx.fillStyle = C.shadow;
          ctx.beginPath(); ctx.ellipse(p[0] + a * 0.25, p[1] + a * 0.18, a * 1.15, a * 0.6, 0, 0, Math.PI * 2); ctx.fill();
        });
        ctx.globalAlpha = 1;
        cells.forEach(function (c) {
          var p = pos(c.i, c.j), gx = p[0], gy = p[1];
          var a = w * 0.36 * c.s, b = a / 2, h = w * 0.46 * c.s, ty = gy - h, lw = a * 0.32;
          var rg = ctx.createLinearGradient(gx, ty, gx + a, ty + h);
          rg.addColorStop(0, C.right1); rg.addColorStop(1, C.right2);
          face([[gx - a, ty], [gx, ty + b], [gx, ty + b + h], [gx - a, ty + h]], C.left, lw);
          face([[gx + a, ty], [gx, ty + b], [gx, ty + b + h], [gx + a, ty + h]], rg, lw);
          var tg = ctx.createLinearGradient(gx, ty - b, gx, ty + b);
          tg.addColorStop(0, C.top1); tg.addColorStop(1, C.top2);
          face([[gx, ty - b], [gx + a, ty], [gx, ty + b], [gx - a, ty]], tg, lw);
        });
      }
      if (!(W > 0 && H > 0) || (!reduce && visible && !document.hidden)) raf = requestAnimationFrame(draw);
    }

    function resume() {
      if (!raf && !reduce && visible && !document.hidden) { t0 = performance.now() - ((performance.now() - t0) % STEP); raf = requestAnimationFrame(draw); }
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        if (visible) resume();
      }).observe(el);
    }
    document.addEventListener('visibilitychange', resume);
    window.addEventListener('resize', function () { if (reduce && !raf) raf = requestAnimationFrame(draw); });
    raf = requestAnimationFrame(draw);
  }

  Array.prototype.forEach.call(document.querySelectorAll('canvas[data-ns-glider]'), start);
})();
