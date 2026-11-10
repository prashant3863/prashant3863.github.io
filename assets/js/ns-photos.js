/*
 * Photographs page: lays each grid out in rows, and runs the photo viewer. Spec: design/system.md → Components → Photographs.
 *
 * Markup (from _includes/ns/photo-grid.html): a container [data-ns-photos] holding buttons
 *   <button class="ns-shot" data-full="https://photos.notshant.xyz/…/dscf1229.jpg" data-large="…/dscf1229-l.jpg"
 *           data-ratio="2/3" data-caption="Tuscany, 2025 · The Italian Summer">
 *     <img src="…/dscf1229-s.jpg" srcset="…" alt="…" loading="lazy">
 *   </button>
 * data-full is 1600px on the long edge. data-large (3200px) is optional; it is used only when the photo, fitted
 * to the viewer, would need more than 1600 physical pixels (big or high-resolution screens).
 * Layout: count + Close on top, the photo fitted to the space left, caption + Previous / Next underneath.
 * Keys: ← → to move, Esc to close. Swipe left or right on touch screens. Tap the left or right third of the
 * photo to move. The neighbouring photos are fetched in advance. Focus returns to the photo that opened it.
 */
(function () {
  'use strict';
  var root = document.querySelector('[data-ns-photos]');
  if (!root) return;

  /* Rows ------------------------------------------------------------------------------------------------
   * Each .ns-photos grid is laid out in rows, left to right in the order of photos.yml (components.css → Photo rows).
   * Photos keep their real proportions. A row is scaled to the full width, and it breaks before or after a
   * photo, whichever keeps its height nearer the target (--ns-photo-row). The last row keeps the target height.
   * Rows are rebuilt when the grid's width changes. */
  function ratioOf(s) {
    var p = (s.getAttribute('data-ratio') || '').split('/'), r = p[0] / p[1];
    return r > 0 ? r : 1.5;
  }
  function planRows(ratios, W, H, gap) {
    var rows = [], cur = [];
    function height(idx) {
      var sum = 0;
      idx.forEach(function (i) { sum += ratios[i]; });
      return (W - gap * (idx.length - 1)) / sum;
    }
    ratios.forEach(function (r, i) {
      cur.push(i);
      var h = height(cur);
      if (h > H) return;
      if (cur.length > 1) {
        var before = cur.slice(0, -1), hb = height(before);
        if (Math.abs(hb - H) < Math.abs(h - H)) { rows.push({ idx: before, h: hb }); cur = [i]; return; }
      }
      rows.push({ idx: cur, h: h });
      cur = [];
    });
    if (cur.length) rows.push({ idx: cur, h: Math.min(H, height(cur)) });
    return rows;
  }
  function layout(grid) {
    var items = Array.prototype.slice.call(grid.querySelectorAll('.ns-shot'));
    var W = grid.clientWidth;
    if (!items.length || !W) return;
    var css = getComputedStyle(grid);
    var H = parseFloat(css.getPropertyValue('--ns-photo-target')) || 300;
    var gap = parseFloat(css.getPropertyValue('--ns-photo-gap')) || 8;
    var focused = document.activeElement;
    items.forEach(function (s) { grid.appendChild(s); });   // unwrap the old rows, keeping the order
    Array.prototype.slice.call(grid.querySelectorAll('.ns-photos__row')).forEach(function (r) { r.remove(); });
    var ratios = items.map(ratioOf);
    planRows(ratios, W - 1, H, gap).forEach(function (row) {   // 1px spare, so rounding never overflows
      var div = document.createElement('div');
      div.className = 'ns-photos__row';
      row.idx.forEach(function (i) {
        items[i].style.width = (ratios[i] * row.h).toFixed(2) + 'px';
        items[i].style.height = row.h.toFixed(2) + 'px';
        div.appendChild(items[i]);
      });
      grid.appendChild(div);
    });
    grid.classList.add('is-rows');
    if (focused && items.indexOf(focused) > -1) focused.focus({ preventScroll: true });
  }
  Array.prototype.slice.call(root.querySelectorAll('.ns-photos')).forEach(function (grid) {
    var lastW = 0, frame = 0;
    function update() {
      var w = grid.clientWidth;
      if (w === lastW) return;
      lastW = w;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(function () { layout(grid); });
    }
    update();
    if (window.ResizeObserver) new ResizeObserver(update).observe(grid);
    else window.addEventListener('resize', update);
  });

  /* Viewer ---------------------------------------------------------------------------------------------- */
  var shots = Array.prototype.slice.call(root.querySelectorAll('[data-full]'));
  if (!shots.length) return;

  var box = null, stage = null, img = null, cap = null, count = null, index = 0, opener = null, touchX = null;

  function source(s) {
    // The 1600px file, unless the photo as fitted to the stage needs more physical pixels than that.
    var full = s.getAttribute('data-full'), large = s.getAttribute('data-large');
    if (!large || !stage) return full;
    var parts = (s.getAttribute('data-ratio') || '3/2').split('/'), r = parts[0] / parts[1] || 1.5;
    var area = stage.getBoundingClientRect();
    var w = Math.min(area.width, area.height * r), longEdge = Math.max(w, w / r);
    return longEdge * (window.devicePixelRatio || 1) > 1700 ? large : full;
  }
  function preload(i) {
    var s = shots[(i + shots.length) % shots.length];
    var p = new Image();
    p.src = source(s);
  }
  function render() {
    var s = shots[index], thumb = s.querySelector('img');
    img.src = source(s);
    img.alt = thumb ? thumb.alt : '';
    cap.textContent = s.getAttribute('data-caption') || '';
    count.textContent = (index + 1) + ' / ' + shots.length;
    preload(index + 1);
    preload(index - 1);
  }
  function move(d) { index = (index + d + shots.length) % shots.length; render(); }
  function close() {
    if (!box) return;
    box.remove(); box = null; stage = null;
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKey);
    if (opener) opener.focus();
  }
  function onKey(e) {
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') move(1);
    else if (e.key === 'ArrowLeft') move(-1);
  }
  function el(tag, cls) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    return n;
  }
  function button(label, cls, fn) {
    var b = el('button', cls);
    b.type = 'button'; b.textContent = label; b.addEventListener('click', fn);
    return b;
  }
  function zone(cls, d) {
    // Pointer-only shortcut over a third of the photo; keyboard and screen readers use the footer buttons.
    var z = button('', 'ns-lightbox__zone ' + cls, function () { move(d); });
    z.tabIndex = -1;
    z.setAttribute('aria-hidden', 'true');
    return z;
  }
  function open(i, from) {
    index = i; opener = from;
    box = el('div', 'ns-lightbox');
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Photograph viewer');

    var top = el('div', 'ns-lightbox__bar');
    count = el('span');
    count.setAttribute('aria-live', 'polite');
    var closeBtn = button('Close', 'ns-lightbox__btn', close);
    top.appendChild(count); top.appendChild(closeBtn);

    stage = el('div', 'ns-lightbox__stage');
    img = el('img');
    stage.appendChild(img);
    stage.appendChild(zone('ns-lightbox__zone--prev', -1));
    stage.appendChild(zone('ns-lightbox__zone--next', 1));
    stage.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener('touchend', function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      touchX = null;
      if (Math.abs(dx) > 40) move(dx < 0 ? 1 : -1);
    });

    var foot = el('div', 'ns-lightbox__foot');
    cap = el('p', 'ns-lightbox__cap');
    cap.style.margin = '0';
    foot.appendChild(button('← Previous', 'ns-lightbox__btn ns-lightbox__btn--prev', function () { move(-1); }));
    foot.appendChild(cap);
    foot.appendChild(button('Next →', 'ns-lightbox__btn ns-lightbox__btn--next', function () { move(1); }));

    box.appendChild(top); box.appendChild(stage); box.appendChild(foot);
    document.body.appendChild(box);
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    render();
    closeBtn.focus({ preventScroll: true });
  }

  shots.forEach(function (s, i) { s.addEventListener('click', function () { open(i, s); }); });
})();
