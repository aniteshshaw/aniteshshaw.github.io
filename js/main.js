// Progressive enhancement only: every word of content is already in the static HTML.
// This file adds navigation, scroll reveals, counters, catalog filters, and the
// QIS-Skills chat demo. Everything degrades to a readable static page without it.
(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Mobile nav ----
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('navMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = '© ' + new Date().getFullYear();

  // ---- Reveal on scroll + count-up ----
  function countUp(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    if (isNaN(target) || reduceMotion) return;
    var start = null;
    function frame(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / 900, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  var revealEls = document.querySelectorAll('.reveal');
  var countEls = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        if (entry.target.hasAttribute('data-count')) countUp(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
    countEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  // ---- One clock for every moving diagram ----
  // The flywheel and the blueprint diagrams are driven from a single requestAnimationFrame
  // loop, so the travelling dot and the highlighted stage can never drift apart. Each diagram
  // only runs while it is on screen, and nothing moves for people who prefer reduced motion.
  var animated = [];

  function setupFlywheel(root) {
    var svg = root.querySelector('.flywheel__svg');
    var packet = svg && svg.querySelector('.fw-packet');
    var stages = svg ? svg.querySelectorAll('.fw-stage') : [];
    var items = root.querySelectorAll('.stage');
    if (!packet || !stages.length) return;
    var LAP = 12000, R = 150, C = 200, n = stages.length, current = -1;
    function light(i) {
      if (i === current) return;
      current = i;
      stages.forEach(function (g, k) { g.classList.toggle('is-active', k === i); });
      items.forEach(function (li, k) { li.classList.toggle('is-active', k === i); });
    }
    animated.push({ el: root, tick: function (t) {
      var turn = (t % LAP) / LAP;                       // 0..1 around the ring, clockwise from the top
      var a = turn * 2 * Math.PI - Math.PI / 2;
      packet.setAttribute('cx', (C + R * Math.cos(a)).toFixed(1));
      packet.setAttribute('cy', (C + R * Math.sin(a)).toFixed(1));
      var seg = turn * n;                               // stage k sits at seg === k
      var nearest = Math.round(seg) % n;
      light(Math.abs(seg - Math.round(seg)) < 0.32 ? nearest : -1);
    } });
  }

  function setupBlueprint(svg) {
    var packet = svg.querySelector('.bp-packet');
    var nodes = svg.querySelectorAll('.bp-node');
    if (!packet || !nodes.length) return;
    var axis = svg.getAttribute('data-axis');
    var from = parseFloat(svg.getAttribute('data-from'));
    var to = parseFloat(svg.getAttribute('data-to'));
    var spans = Array.prototype.map.call(nodes, function (g) {
      return [parseFloat(g.getAttribute('data-a')), parseFloat(g.getAttribute('data-b'))];
    });
    var LAP = 1200 * (nodes.length + 1), attr = axis === 'y' ? 'cy' : 'cx';
    animated.push({ el: svg, tick: function (t) {
      var pos = from + ((t % LAP) / LAP) * (to - from);
      packet.setAttribute(attr, pos.toFixed(1));
      spans.forEach(function (sp, k) { nodes[k].classList.toggle('is-lit', pos >= sp[0] && pos <= sp[1]); });
    } });
  }

  document.querySelectorAll('[data-flywheel]').forEach(setupFlywheel);
  document.querySelectorAll('svg.bp[data-axis]').forEach(setupBlueprint);

  if (animated.length && !reduceMotion) {
    if ('IntersectionObserver' in window) {
      var vis = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          animated.forEach(function (a) { if (a.el === e.target) a.visible = e.isIntersecting; });
        });
      }, { threshold: 0.05 });
      animated.forEach(function (a) { vis.observe(a.el); });
    } else {
      animated.forEach(function (a) { a.visible = true; });
    }
    (function loop(t) {
      animated.forEach(function (a) { if (a.visible) a.tick(t); });
      requestAnimationFrame(loop);
    })(performance.now());
  }

  // ---- Skill cards: cursor-follow glow ----
  document.querySelectorAll('.skill-card').forEach(function (card) {
    card.addEventListener('pointermove', function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  // ---- Book cover tilt ----
  if (!reduceMotion) {
    document.querySelectorAll('[data-tilt]').forEach(function (el) {
      var img = el.querySelector('img');
      if (!img) return;
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        img.style.setProperty('--ry', (x * 22 - 6) + 'deg');
        img.style.setProperty('--rx', (-y * 14) + 'deg');
      });
      el.addEventListener('pointerleave', function () {
        img.style.removeProperty('--ry');
        img.style.removeProperty('--rx');
      });
    });
  }

  // ---- Catalog filters ----
  var filterBtns = document.querySelectorAll('[data-filter]');
  var cards = document.querySelectorAll('.skill-card');
  var status = document.getElementById('catalogStatus');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.getAttribute('data-filter');
      filterBtns.forEach(function (b) {
        var on = b === btn;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', String(on));
      });
      var shown = 0;
      cards.forEach(function (card) {
        var show = filter === 'all' ||
          (filter === 'featured' && card.getAttribute('data-featured') === 'true') ||
          card.getAttribute('data-category') === filter;
        card.classList.toggle('is-filtered', !show);
        if (show) { shown++; card.classList.add('is-in'); }
      });
      if (status) status.textContent = shown + ' skills shown';
    });
  });

  // ---- QIS-Skills chat demo ----
  var demo = document.getElementById('chatDemo');
  var dataEl = document.getElementById('qis-demos');
  if (demo && dataEl) {
    var demos = [];
    try { demos = JSON.parse(dataEl.textContent); } catch (e) { demos = []; }
    if (demos.length) runChatDemo(demo, demos);
  }

  function runChatDemo(root, demos) {
    var slot = function (name) { return root.querySelector('[data-slot="' + name + '"]'); };
    var promptEl = slot('prompt'), skillEl = slot('skill'), stepsEl = slot('steps'), resultEl = slot('result'), tabsEl = slot('tabs');
    var timers = [];
    var current = 0;
    var paused = false;

    function later(fn, ms) { timers.push(setTimeout(fn, ms)); }
    function clear() { timers.forEach(clearTimeout); timers = []; }
    function esc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

    tabsEl.innerHTML = demos.map(function (d, i) {
      return '<button type="button" data-i="' + i + '" tabindex="-1">' + esc(d.name) + '</button>';
    }).join('');
    tabsEl.querySelectorAll('button').forEach(function (b) {
      b.addEventListener('click', function () { play(parseInt(b.getAttribute('data-i'), 10)); });
    });

    function render(d, final) {
      tabsEl.querySelectorAll('button').forEach(function (b, i) { b.classList.toggle('is-active', i === current); });
      skillEl.innerHTML = '<span class="chat-skill__dot"></span>Using skill <code>' + esc(d.label || d.id) + '</code>';
      stepsEl.innerHTML = d.steps.map(function (s) { return '<li' + (final ? ' class="is-done"' : '') + '>' + esc(s) + '</li>'; }).join('');
      resultEl.innerHTML = '<strong>' + esc(d.title) + '</strong><ul>' + d.lines.map(function (l) {
        return '<li class="k-' + esc(l.kind) + '">' + esc(l.text) + '</li>';
      }).join('') + '</ul>';
      promptEl.textContent = final ? d.prompt : '';
      // Hide the previous answer instantly so it never overlaps the next question being typed.
      [skillEl, resultEl].forEach(function (el) {
        el.style.transition = 'none';
        el.classList.toggle('is-in', !!final);
        void el.offsetWidth;
        el.style.transition = '';
      });
    }

    function play(i) {
      clear();
      current = i;
      var d = demos[i];
      if (reduceMotion) { render(d, true); return; }
      render(d, false);
      promptEl.classList.add('is-typing');
      var t = 0;
      d.prompt.split('').forEach(function (ch, k) {
        later(function () { promptEl.textContent = d.prompt.slice(0, k + 1); }, t += 38);
      });
      later(function () { promptEl.classList.remove('is-typing'); skillEl.classList.add('is-in'); }, t += 450);
      var items = stepsEl.querySelectorAll('li');
      items.forEach(function (li, k) {
        later(function () { li.classList.add('is-active'); }, t += 350);
        later(function () { li.classList.remove('is-active'); li.classList.add('is-done'); }, t += 650);
      });
      later(function () { resultEl.classList.add('is-in'); }, t += 400);
      later(function () { if (!paused) play((current + 1) % demos.length); }, t += 4200);
    }

    root.addEventListener('pointerenter', function () { paused = true; });
    root.addEventListener('pointerleave', function () {
      paused = false;
      if (resultEl.classList.contains('is-in')) later(function () { if (!paused) play((current + 1) % demos.length); }, 1500);
    });

    // Start only when the demo scrolls into view, so it never runs unseen.
    if ('IntersectionObserver' in window) {
      var started = false;
      new IntersectionObserver(function (entries, obs) {
        if (entries[0].isIntersecting && !started) { started = true; play(0); obs.disconnect(); }
      }, { threshold: 0.3 }).observe(root);
    } else {
      play(0);
    }
  }
})();
