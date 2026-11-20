/*
 * On-this-page tracking for the about timeline and long posts. Spec: design/system.md → Components → Timeline.
 * Marks the entry for the section being read: li.is-active plus aria-current="true" on its link.
 *
 * Two ways to use it:
 * - Hand-written (about): <nav data-ns-toc aria-label="On this page"> … <li><a href="#gojek">…</a></li> … </nav>
 *   Each href points at an element with that id on the page.
 * - Built from the post (long posts, front matter `toc: true`): <nav data-ns-toc="auto" aria-label="On this page"></nav>
 *   The list is made from the article's h2s, or its h3s when it has fewer than three h2s.
 *   With fewer than three headings the side column stays empty.
 */
(function () {
  'use strict';

  function build(nav) {
    var article = document.querySelector('article.ns-prose');
    if (!article) return;
    var heads = article.querySelectorAll('h2[id]');
    if (heads.length < 3) heads = article.querySelectorAll('h3[id]');
    if (heads.length < 3) return;
    var ol = document.createElement('ol');
    ol.className = 'ns-tl';
    Array.prototype.forEach.call(heads, function (h) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      var name = document.createElement('span');
      a.href = '#' + h.id;
      name.className = 'ns-tl__name';
      name.textContent = h.textContent;
      a.appendChild(name);
      li.appendChild(a);
      ol.appendChild(li);
    });
    nav.appendChild(ol);
  }

  Array.prototype.forEach.call(document.querySelectorAll('[data-ns-toc]'), function (nav) {
    if (nav.getAttribute('data-ns-toc') === 'auto') build(nav);

    var links = Array.prototype.filter.call(nav.querySelectorAll('a[href^="#"]'), function (a) {
      return document.getElementById(decodeURIComponent(a.getAttribute('href').slice(1)));
    });
    if (!links.length || !('IntersectionObserver' in window)) return;

    function activate(id) {
      links.forEach(function (a) {
        var on = a.getAttribute('href') === '#' + id;
        a.parentElement.classList.toggle('is-active', on);
        if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
      });
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) activate(en.target.id); });
    }, { rootMargin: '-20% 0px -70% 0px' });

    links.forEach(function (a) { io.observe(document.getElementById(decodeURIComponent(a.getAttribute('href').slice(1)))); });
    activate(decodeURIComponent(links[0].getAttribute('href').slice(1)));
  });
})();
