/*
 * Photo viewer for the photographs page. Spec: design/system.md → Components → Photographs.
 *
 * Markup: a container [data-ns-photos] holding buttons
 *   <button class="ns-shot" data-full="/assets/photos/…/03.jpg" data-caption="Ladakh, 2021 · The Greatest Gig in the Sky">
 *     <img src="/assets/photos/…/03-s.jpg" alt="…" loading="lazy">
 *   </button>
 * Layout: count + Close on top, the photo fitted to the space left, caption + Previous / Next underneath.
 * Keys: ← → to move, Esc to close. Swipe left or right on touch screens. Tap the left or right third of the
 * photo to move. The neighbouring photos are fetched in advance. Focus returns to the photo that opened it.
 */
(function () {
  'use strict';
  var root = document.querySelector('[data-ns-photos]');
  if (!root) return;
  var shots = Array.prototype.slice.call(root.querySelectorAll('[data-full]'));
  if (!shots.length) return;

  var box = null, img = null, cap = null, count = null, index = 0, opener = null, touchX = null;

  function preload(i) {
    var s = shots[(i + shots.length) % shots.length];
    var p = new Image();
    p.src = s.getAttribute('data-full');
  }
  function render() {
    var s = shots[index], thumb = s.querySelector('img');
    img.src = s.getAttribute('data-full');
    img.alt = thumb ? thumb.alt : '';
    cap.textContent = s.getAttribute('data-caption') || '';
    count.textContent = (index + 1) + ' / ' + shots.length;
    preload(index + 1);
    preload(index - 1);
  }
  function move(d) { index = (index + d + shots.length) % shots.length; render(); }
  function close() {
    if (!box) return;
    box.remove(); box = null;
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

    var stage = el('div', 'ns-lightbox__stage');
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
