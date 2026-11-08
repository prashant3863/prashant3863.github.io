/*
 * Photo viewer for the photographs page. Spec: design/system.md → Components → Photographs.
 *
 * Markup: a container [data-ns-photos] holding buttons
 *   <button class="ns-shot" data-full="/assets/photos/…/03.jpg" data-caption="Ladakh, 2021 · The Greatest Gig in the Sky">
 *     <img src="/assets/photos/…/03-s.jpg" alt="…" loading="lazy">
 *   </button>
 * Keys: ← → to move, Esc to close. Focus returns to the photo that opened it.
 */
(function () {
  'use strict';
  var root = document.querySelector('[data-ns-photos]');
  if (!root) return;
  var shots = Array.prototype.slice.call(root.querySelectorAll('[data-full]'));
  if (!shots.length) return;

  var box = null, img = null, cap = null, count = null, index = 0, opener = null;

  function render() {
    var s = shots[index], thumb = s.querySelector('img');
    img.src = s.getAttribute('data-full');
    img.alt = thumb ? thumb.alt : '';
    cap.textContent = s.getAttribute('data-caption') || '';
    count.textContent = (index + 1) + ' / ' + shots.length;
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
  function button(label, fn) {
    var b = document.createElement('button');
    b.type = 'button'; b.textContent = label; b.addEventListener('click', fn);
    return b;
  }
  function open(i, from) {
    index = i; opener = from;
    box = document.createElement('div');
    box.className = 'ns-lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Photograph viewer');

    var top = document.createElement('div'); top.className = 'ns-lightbox__bar';
    count = document.createElement('span'); count.style.fontVariantNumeric = 'tabular-nums';
    var closeBtn = button('Close', close);
    top.appendChild(count); top.appendChild(closeBtn);

    var stage = document.createElement('div'); stage.className = 'ns-lightbox__stage';
    img = document.createElement('img'); stage.appendChild(img);

    var bottom = document.createElement('div'); bottom.className = 'ns-lightbox__bar';
    cap = document.createElement('span'); cap.style.textAlign = 'center';
    bottom.appendChild(button('← Previous', function () { move(-1); }));
    bottom.appendChild(cap);
    bottom.appendChild(button('Next →', function () { move(1); }));

    box.appendChild(top); box.appendChild(stage); box.appendChild(bottom);
    document.body.appendChild(box);
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    render();
    closeBtn.focus();
  }

  shots.forEach(function (s, i) { s.addEventListener('click', function () { open(i, s); }); });
})();
