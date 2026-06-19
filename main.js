/* =============================================================================
   main.js — behavior for the portfolio. Pure vanilla JS, no dependencies.
   Reads content from window.PORTFOLIO (data.js) and renders it into index.html,
   then wires up navigation, animations, theme, the lightbox, and the form.
   You normally never need to edit this file — content lives in data.js.
   ========================================================================== */
(function () {
  'use strict';

  var DATA = window.PORTFOLIO || {};
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mark that JS is running (enables hidden-until-revealed CSS).
  document.documentElement.classList.add('js');

  /* ---------- tiny helpers ---------- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function el(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* ---------- inline SVG icon set ---------- */
  var ICONS = {
    linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>',
    github: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.2 3.44 9.6 8.21 11.16.6.11.82-.25.82-.56v-2.17c-3.34.71-4.04-1.58-4.04-1.58-.55-1.36-1.34-1.73-1.34-1.73-1.09-.73.08-.72.08-.72 1.2.08 1.84 1.21 1.84 1.21 1.07 1.79 2.81 1.27 3.5.97.11-.76.42-1.27.76-1.56-2.67-.3-5.47-1.31-5.47-5.83 0-1.29.47-2.34 1.24-3.17-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.21a11.6 11.6 0 016.01 0c2.29-1.53 3.3-1.21 3.3-1.21.66 1.64.24 2.86.12 3.16.77.83 1.23 1.88 1.23 3.17 0 4.53-2.81 5.53-5.49 5.82.43.36.81 1.08.81 2.18v3.23c0 .31.22.68.83.56C20.57 21.88 24 17.49 24 12.29 24 5.78 18.63.5 12 .5z"/></svg>',
    medium: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.54 12a6.8 6.8 0 11-13.6 0 6.8 6.8 0 0113.6 0zm7.42 0c0 3.54-.85 6.42-1.9 6.42-1.06 0-1.9-2.88-1.9-6.42s.84-6.42 1.9-6.42 1.9 2.88 1.9 6.42zM24 12c0 3.17-.3 5.75-.67 5.75-.36 0-.66-2.58-.66-5.75s.3-5.75.66-5.75c.37 0 .67 2.58.67 5.75z"/></svg>',
    email: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z"/></svg>'
  };

  /* =========================================================================
     RENDER
     ====================================================================== */

  function renderMeta() {
    var m = DATA.meta || {};
    document.title = (m.fullName || 'Portfolio') + ' · QA Architect & Agentic AI Builder';
    if (el('footerYear')) el('footerYear').textContent = '© ' + new Date().getFullYear();
    if (el('footerName')) el('footerName').textContent = m.fullName || '';
    if (el('footerBuilt')) el('footerBuilt').textContent = m.builtByNote || '';
  }

  function renderHero() {
    var h = DATA.hero || {}, m = DATA.meta || {};
    if (el('heroLocation')) el('heroLocation').textContent = m.location || '';
    if (el('hero-name')) el('hero-name').textContent = h.name || '';
    if (el('heroTitles')) {
      el('heroTitles').innerHTML = (h.titles || [])
        .map(esc).join('<span class="dot" aria-hidden="true">·</span>');
    }
    // Stats (counters animate later)
    if (el('heroStats')) {
      el('heroStats').innerHTML = (h.stats || []).map(function (s) {
        return '<li class="hero__stat reveal">' +
          '<div class="num" data-value="' + esc(s.value) + '" data-prefix="' + esc(s.prefix || '') +
          '" data-suffix="' + esc(s.suffix || '') + '">' +
          esc(s.prefix || '') + '0' + esc(s.suffix || '') + '</div>' +
          '<div class="label">' + esc(s.label) + '</div></li>';
      }).join('');
    }
    if (el('heroCtas')) {
      el('heroCtas').innerHTML = (h.ctas || []).map(function (c) {
        var cls = c.kind === 'secondary' ? 'btn btn--secondary' : 'btn btn--primary';
        var ext = c.external ? ' target="_blank" rel="noopener"' : '';
        return '<a class="' + cls + '" href="' + esc(c.href) + '"' + ext + '>' + esc(c.label) + '</a>';
      }).join('');
    }
    if (el('heroSocials')) {
      el('heroSocials').innerHTML = (h.socials || []).map(function (s) {
        var ext = /^https?:/.test(s.href) ? ' target="_blank" rel="noopener"' : '';
        return '<li><a href="' + esc(s.href) + '"' + ext + ' aria-label="' + esc(s.label) + '">' +
          (ICONS[s.icon] || '') + '</a></li>';
      }).join('');
    }
    // Hero avatar: monogram placeholder, swapped for the headshot when it loads.
    var avatar = el('heroAvatar'), photo = (DATA.about || {}).headshot;
    if (avatar) {
      avatar.textContent = m.monogram || 'AS';
      if (photo) {
        var im = new Image();
        im.onload = function () { im.alt = ''; avatar.textContent = ''; avatar.appendChild(im); };
        im.src = photo;
      }
    }
  }

  function renderAbout() {
    var a = DATA.about || {}, m = DATA.meta || {};
    if (el('aboutBio')) el('aboutBio').innerHTML = (a.bio || []).map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('');
    if (el('aboutBadges')) el('aboutBadges').innerHTML = (a.badges || []).map(function (b) { return '<li>' + esc(b) + '</li>'; }).join('');
    // Headshot: show monogram placeholder; swap in real image if it loads.
    var hs = el('aboutHeadshot');
    if (hs) {
      hs.textContent = m.monogram || 'AS';
      if (a.headshot) {
        var img = new Image();
        img.onload = function () { hs.textContent = ''; hs.appendChild(img); hs.setAttribute('aria-hidden', 'false'); img.alt = (m.fullName || '') + ' headshot'; };
        img.src = a.headshot;
      }
    }
  }

  function interestCard(c, clone) {
    // The cloned set is duplicated purely for the seamless scroll loop — hide its
    // links from the keyboard tab order (the whole clone group is also aria-hidden).
    var linkExtra = clone ? ' tabindex="-1"' : '';
    var link = c.link ? '<a class="icard__link" href="' + esc(c.link) + '"' + linkExtra +
      (/^https?:/.test(c.link) ? ' target="_blank" rel="noopener"' : '') + '>Learn more</a>' : '';
    var iconHtml = c.logo
      ? '<div class="icard__icon icard__icon--logo"><img src="' + esc(c.logo) + '" alt="' + esc(c.title) + ' logo" loading="lazy" /></div>'
      : '<div class="icard__icon" aria-hidden="true">' + esc(c.icon) + '</div>';
    return '<article class="icard">' +
      iconHtml +
      '<h3 class="icard__title">' + esc(c.title) + '</h3>' +
      '<p class="icard__desc">' + esc(c.description) + '</p>' + link + '</article>';
  }
  function renderInterests() {
    var grid = el('interestsGrid'); if (!grid) return;
    var items = DATA.interests || [];
    var real = items.map(function (c) { return interestCard(c, false); }).join('');
    var clone = items.map(function (c) { return interestCard(c, true); }).join('');
    // Two identical groups let the track loop seamlessly with a single translateX(-50%).
    grid.innerHTML = '<div class="marquee__group">' + real + '</div>' +
      '<div class="marquee__group" aria-hidden="true">' + clone + '</div>';
    var marquee = grid.parentNode;
    if (marquee && marquee.classList && marquee.classList.contains('marquee')) {
      // Keep the scroll speed steady (~6s per card) regardless of how many cards exist.
      marquee.style.setProperty('--marquee-duration', Math.max(28, items.length * 6) + 's');
    }
  }

  function renderAchievements() {
    var grid = el('achievementsGrid'); if (!grid) return;
    grid.innerHTML = (DATA.achievements || []).map(function (a) {
      var ribbon = a.hackathon ? '<span class="achv__ribbon">Hackathon Winner</span>' : '';
      return '<article class="achv reveal">' + ribbon +
        '<h3 class="achv__title">' + esc(a.title) + '</h3>' +
        '<p class="achv__desc">' + esc(a.description) + '</p>' +
        '<span class="achv__metric">' + esc(a.metric) + '</span></article>';
    }).join('');
  }

  function renderExperience() {
    var tl = el('timeline'); if (!tl) return;
    var html = (DATA.experience || []).map(function (x) {
      var bullets = (x.bullets || []).map(function (b) { return '<li>' + esc(b) + '</li>'; }).join('');
      var tags = (x.tags || []).map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('');
      return '<div class="tl-item reveal">' +
        '<span class="tl-item__dot" aria-hidden="true"></span>' +
        '<p class="tl-item__date">' + esc(x.dates) + '</p>' +
        '<h3 class="tl-item__client">' + esc(x.client) + '</h3>' +
        '<p class="tl-item__role">' + esc(x.role) + '</p>' +
        '<p class="tl-item__domain">' + esc(x.domain) + '</p>' +
        '<ul class="tl-item__bullets">' + bullets + '</ul>' +
        '<div class="tl-tags">' + tags + '</div></div>';
    }).join('');
    tl.insertAdjacentHTML('beforeend', html); // keep the existing spine element
  }

  function renderEducation() {
    var list = el('eduList'); if (!list) return;
    list.innerHTML = (DATA.education || []).map(function (e) {
      return '<div class="edu-card reveal">' +
        '<div class="edu-card__icon" aria-hidden="true">🎓</div>' +
        '<div class="edu-card__body">' +
        '<p class="edu-card__date">' + esc(e.dates) + '</p>' +
        '<h4 class="edu-card__school">' + esc(e.school) + '</h4>' +
        (e.formerly ? '<p class="edu-card__formerly">' + esc(e.formerly) + '</p>' : '') +
        '<p class="edu-card__degree">' + esc(e.degree) + '</p>' +
        '<p class="edu-card__loc">' + esc(e.location) + '</p>' +
        '</div></div>';
    }).join('');
  }

  function renderSkills() {
    var grid = el('skillsGrid'); if (!grid) return;
    grid.innerHTML = (DATA.skills || []).map(function (g) {
      var pills = (g.items || []).map(function (s) { return '<span class="pill">' + esc(s) + '</span>'; }).join('');
      return '<div class="skillgroup reveal">' +
        '<h3 class="skillgroup__title">' + esc(g.group) + '</h3>' +
        '<div class="pillcloud">' + pills + '</div></div>';
    }).join('');
  }

  function renderCerts() {
    var grid = el('certGrid'); if (!grid) return;
    grid.innerHTML = (DATA.certifications || []).map(function (c, i) {
      var meta = [c.issuer, c.date].filter(Boolean).join(' · ');
      return '<li class="cert reveal">' +
        '<button class="cert__btn" data-cert="' + i + '" aria-label="View certificate: ' + esc(c.title) + '">' +
        '<span class="cert__thumb"><img src="assets/certifications/' + esc(c.filename) + '" alt="" loading="lazy"></span>' +
        '<span class="cert__meta"><span class="cert__title">' + esc(c.title) + '</span>' +
        '<span class="cert__issuer">' + esc(meta) + '</span></span></button></li>';
    }).join('');
  }

  function projectStage(p) {
    return p.frame === 'devices'
      ? '<div class="project__devices"><div class="mock-browser"></div><div class="mock-phone"></div></div>'
      : '<div class="mock-browser"></div>';
  }
  function projectBrand(p) {
    var host = '';
    if (p.links && p.links[0]) { try { host = new URL(p.links[0].href).host.replace(/^www\./, ''); } catch (e) {} }
    var mark = p.logo
      ? '<img class="project__brand-logo" src="' + esc(p.logo) + '" alt="' + esc(p.title) + ' logo" loading="lazy">'
      : '<span class="project__brand-mark" aria-hidden="true">' + esc(p.icon || '◆') + '</span>';
    return '<div class="project__brand">' + mark +
      '<span class="project__brand-name">' + esc(p.title) + '</span>' +
      (host ? '<span class="project__brand-host">' + esc(host) + '</span>' : '') + '</div>';
  }
  function browserShot(src, title) {
    return '<div class="shot-browser"><div class="shot-browser__bar"><span></span><span></span><span></span></div>' +
      '<div class="shot-browser__screen"><img src="' + esc(src) + '" alt="' + esc(title) + ' website" loading="lazy"></div></div>';
  }
  function phoneShot(src, title) {
    return '<div class="shot-phone"><div class="shot-phone__notch" aria-hidden="true"></div>' +
      '<div class="shot-phone__screen"><img src="' + esc(src) + '" alt="' + esc(title) + ' mobile app" loading="lazy"></div></div>';
  }
  // Real screenshots in device frames; falls back to a branded panel if none provided.
  function projectVisual(p) {
    var s = p.screenshots || {};
    if (s.web && s.app) return '<div class="dev-combo dev-combo--pair">' + browserShot(s.web, p.title) + phoneShot(s.app, p.title) + '</div>';
    if (s.web) return '<div class="dev-combo">' + browserShot(s.web, p.title) + '</div>';
    if (s.app) return '<div class="dev-combo dev-combo--phone">' + phoneShot(s.app, p.title) + '</div>';
    return projectBrand(p);
  }
  function projectStageClass(p) {
    var s = p.screenshots || {};
    return 'project__stage ' + ((s.web || s.app) ? 'project__stage--shot' : 'project__stage--brand');
  }
  function projectTech(p) { return (p.tech || []).map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join(''); }
  function projectLinks(p) {
    return (p.links || []).map(function (l) {
      var play = l.kind === 'play';
      return '<a class="project__link' + (play ? ' project__link--play' : '') + '" href="' + esc(l.href) + '" target="_blank" rel="noopener">' + esc(l.label) + '</a>';
    }).join('');
  }
  function projectBadge(p, star) {
    if (!p.badge) return '';
    return '<span class="project__badge' + (p.ownerGold ? ' project__badge--gold' : '') + '">' + (star ? '★ ' : '') + esc(p.badge) + '</span>';
  }

  function renderProjects() {
    var grid = el('projectsGrid'); if (!grid) return;
    grid.innerHTML = (DATA.projects || []).map(function (p) {
      var tagline = p.tagline ? '<p class="project__tagline">' + esc(p.tagline) + '</p>' : '';
      if (p.featured) {
        return '<article class="project project--featured reveal">' +
          (p.owned ? '<span class="project__ribbon">My Creation</span>' : '') +
          '<div class="' + projectStageClass(p) + '" aria-hidden="true">' + projectVisual(p) + '</div>' +
          '<div class="project__body">' +
          '<div class="project__head"><div><h3 class="project__title">' + esc(p.title) + '</h3>' +
          '<p class="project__subtitle">' + esc(p.subtitle) + '</p></div>' + projectBadge(p, true) + '</div>' +
          tagline +
          '<p class="project__desc">' + esc(p.description) + '</p>' +
          '<div class="project__tech">' + projectTech(p) + '</div>' +
          '<div class="project__links">' + projectLinks(p) + '</div></div></article>';
      }
      return '<article class="project reveal">' +
        '<div class="' + projectStageClass(p) + '" aria-hidden="true">' + projectVisual(p) + '</div>' +
        '<div class="project__body">' +
        '<div class="project__head"><div><h3 class="project__title">' + esc(p.title) + '</h3>' +
        '<p class="project__subtitle">' + esc(p.subtitle) + '</p></div>' + projectBadge(p, false) + '</div>' +
        tagline +
        '<p class="project__desc">' + esc(p.description) + '</p>' +
        '<div class="project__tech">' + projectTech(p) + '</div>' +
        '<div class="project__links">' + projectLinks(p) + '</div></div></article>';
    }).join('');
  }

  function renderBook() {
    var b = DATA.book || {}, m = DATA.meta || {};
    if (el('bookStatus')) el('bookStatus').textContent = b.statusLabel || '';
    if (el('book-title')) el('book-title').textContent = b.title || '';
    if (el('bookSubtitle')) el('bookSubtitle').textContent = b.subtitle || '';
    if (el('bookBlurb')) el('bookBlurb').textContent = b.blurb || '';
    if (el('bookThemes')) el('bookThemes').innerHTML = (b.themes || []).map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('');
    var vis = el('bookVisual');
    if (!vis) return;
    var front = b.coverFront || b.coverImage;
    if (front && b.coverBack) {
      // Two-sided flip book using the real front + back cover art.
      vis.innerHTML =
        '<button type="button" class="book3d book3d--flip" id="bookFlip" aria-pressed="false" ' +
          'aria-label="' + esc(b.title) + ' book cover. Activate to view the back cover.">' +
          '<span class="book3d__face book3d__face--front"><img src="' + esc(front) + '" alt="' + esc(b.title) + ' — front cover"></span>' +
          '<span class="book3d__face book3d__face--back"><img src="' + esc(b.coverBack) + '" alt="' + esc(b.title) + ' — back cover synopsis"></span>' +
        '</button>' +
        '<span class="book__fliphint" aria-hidden="true">Hover or tap to flip</span>';
      vis.setAttribute('aria-hidden', 'false');
    } else if (front) {
      vis.innerHTML = '<div class="book3d"><span class="book3d__spine" aria-hidden="true"></span>' +
        '<div class="book3d__cover"><img src="' + esc(front) + '" alt="' + esc(b.title) + ' cover"></div></div>';
      vis.setAttribute('aria-hidden', 'false');
    } else {
      vis.innerHTML = '<div class="book3d"><span class="book3d__spine" aria-hidden="true"></span>' +
        '<div class="book3d__cover">' +
        '<span class="book3d__kicker">' + esc(b.statusLabel || '') + '</span>' +
        '<span class="book3d__title">' + esc(b.title || '') + '</span>' +
        '<span class="book3d__author">' + esc(m.fullName || '') + '</span></div></div>';
    }
  }

  /* ---------- Writing feed (filter tabs + show more) ---------- */
  var writingState = { filter: 'all', expanded: false, limit: 6 };

  function writingTypeLabel(t) { return { linkedin: 'LinkedIn', medium: 'Medium', youtube: 'YouTube' }[t] || t; }

  function renderWritingTabs() {
    var tabs = el('writingTabs'); if (!tabs) return;
    var present = [];
    (DATA.writing || []).forEach(function (w) { if (present.indexOf(w.type) === -1) present.push(w.type); });
    var all = ['all'].concat(present);
    tabs.innerHTML = all.map(function (t) {
      var sel = t === writingState.filter;
      return '<button class="wtab" role="tab" data-filter="' + t + '" aria-selected="' + sel + '" tabindex="' + (sel ? '0' : '-1') + '">' +
        (t === 'all' ? 'All' : writingTypeLabel(t)) + '</button>';
    }).join('');
  }

  function writingTypeChip(w) {
    return '<span class="wcard__type wcard__type--' + esc(w.type) + '">' + (ICONS[w.type] || '') + esc(writingTypeLabel(w.type)) + '</span>';
  }
  function writingCardHTML(w) {
    var thumb = w.image ? '<div class="wcard__thumb"><img src="' + esc(w.image) + '" alt="" loading="lazy"></div>' : '';
    return '<a class="wcard reveal" href="' + esc(w.url) + '" target="_blank" rel="noopener">' + thumb +
      '<div class="wcard__body">' + writingTypeChip(w) +
      '<h3 class="wcard__title">' + esc(w.title) + '</h3>' +
      '<p class="wcard__summary">' + esc(w.summary) + '</p>' +
      '<span class="wcard__date">' + esc(w.date) + '</span></div></a>';
  }
  function writingFeaturedHTML(w) {
    var media = w.image ? '<div class="wfeat__media"><img src="' + esc(w.image) + '" alt="" loading="lazy"></div>' : '';
    var gallery = (w.gallery && w.gallery.length)
      ? '<div class="wfeat__gallery">' + w.gallery.map(function (g) {
          return '<span class="wfeat__shot"><img src="' + esc(g) + '" alt="" loading="lazy"></span>';
        }).join('') + '</div>'
      : '';
    return '<a class="wfeat reveal" href="' + esc(w.url) + '" target="_blank" rel="noopener">' + media +
      '<div class="wfeat__body">' +
      '<span class="wfeat__flag">★ Featured read</span>' + writingTypeChip(w) +
      '<h3 class="wfeat__title">' + esc(w.title) + '</h3>' +
      '<p class="wfeat__summary">' + esc(w.summary) + '</p>' + gallery +
      '<span class="wcard__date">' + esc(w.date) + '</span></div></a>';
  }
  function renderWriting() {
    var grid = el('writingGrid'), more = el('writingMore'); if (!grid) return;
    var list = (DATA.writing || []).filter(function (w) { return writingState.filter === 'all' || w.type === writingState.filter; });
    // featured posts first
    list = list.slice().sort(function (a, b) { return (b.featured ? 1 : 0) - (a.featured ? 1 : 0); });
    var shown = writingState.expanded ? list : list.slice(0, writingState.limit);
    grid.innerHTML = shown.map(function (w) { return w.featured ? writingFeaturedHTML(w) : writingCardHTML(w); }).join('');
    if (more) {
      more.hidden = writingState.expanded || list.length <= writingState.limit;
      more.textContent = 'Show more (' + Math.max(0, list.length - writingState.limit) + ')';
    }
    observeReveals(grid);
  }

  function renderContact() {
    var c = DATA.contact || {};
    if (el('contact-title')) el('contact-title').textContent = c.heading || 'Contact';
    if (el('contactLead')) el('contactLead').textContent = c.subheading || '';
    var box = el('contactButtons');
    if (box) {
      var btns = [];
      if (c.email) btns.push('<a class="btn btn--primary" href="mailto:' + esc(c.email) + '">Email Me</a>');
      if (c.linkedin) btns.push('<a class="btn btn--ghost" href="' + esc(c.linkedin) + '" target="_blank" rel="noopener">LinkedIn</a>');
      if (c.github) btns.push('<a class="btn btn--ghost" href="' + esc(c.github) + '" target="_blank" rel="noopener">GitHub</a>');
      box.innerHTML = btns.join('');
    }
  }

  /* =========================================================================
     BEHAVIOR
     ====================================================================== */

  /* ---------- scroll reveal with staggered delay ---------- */
  var revealObserver = null;
  function observeReveals(scope) {
    if (prefersReduced) {
      (scope || document).querySelectorAll('.reveal').forEach(function (n) { n.classList.add('is-visible'); });
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('is-visible'); revealObserver.unobserve(e.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    }
    // group siblings for stagger
    (scope || document).querySelectorAll('.reveal:not(.is-visible)').forEach(function (n) {
      if (n.dataset.revealReady) return;
      n.dataset.revealReady = '1';
      var sibs = Array.prototype.slice.call(n.parentNode.children).filter(function (c) { return c.classList && c.classList.contains('reveal'); });
      var idx = sibs.indexOf(n);
      n.style.transitionDelay = (Math.min(idx, 8) * 0.1) + 's';
      revealObserver.observe(n);
    });
  }

  /* ---------- pill bounce + shimmer on section entry ---------- */
  function initSkillPills() {
    var groups = document.querySelectorAll('.skillgroup');
    if (prefersReduced) {
      document.querySelectorAll('.pill').forEach(function (p) { p.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var pills = e.target.querySelectorAll('.pill');
        pills.forEach(function (p, i) { p.style.animationDelay = (i * 0.06) + 's'; setTimeout(function () { p.classList.add('is-visible'); }, 0); });
        io.unobserve(e.target);
      });
    }, { threshold: 0.3 });
    groups.forEach(function (g) { io.observe(g); });
  }

  /* ---------- hero stat counters ---------- */
  function initCounters() {
    var nums = document.querySelectorAll('.hero__stat .num');
    if (prefersReduced) {
      nums.forEach(function (n) { n.textContent = (n.dataset.prefix || '') + n.dataset.value + (n.dataset.suffix || ''); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var node = e.target, target = parseFloat(node.dataset.value) || 0;
        var pre = node.dataset.prefix || '', suf = node.dataset.suffix || '', start = null, dur = 1400;
        function step(ts) {
          if (start === null) start = ts;
          var t = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - t, 3);
          node.textContent = pre + Math.round(target * eased) + suf;
          if (t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        io.unobserve(node);
      });
    }, { threshold: 0.5 });
    nums.forEach(function (n) { io.observe(n); });
  }

  /* ---------- timeline spine draw on scroll ---------- */
  function initSpine() {
    var fill = el('spineFill'), tl = el('timeline');
    if (!fill || !tl) return;
    function update() {
      var r = tl.getBoundingClientRect();
      var vh = window.innerHeight;
      var total = r.height;
      var progressed = Math.min(Math.max(vh * 0.5 - r.top, 0), total);
      fill.style.height = (total ? (progressed / total) * 100 : 0) + '%';
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  }

  /* ---------- sticky header shadow + active nav link ---------- */
  function initNavState() {
    var header = el('site-header');
    window.addEventListener('scroll', function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    }, { passive: true });

    var links = Array.prototype.slice.call(document.querySelectorAll('.nav__menu a[href^="#"]'));
    var map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var sections = links.map(function (a) { return el(a.getAttribute('href').slice(1)); }).filter(Boolean);

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var id = e.target.id;
        links.forEach(function (a) { a.classList.remove('is-active'); a.removeAttribute('aria-current'); });
        if (map[id]) { map[id].classList.add('is-active'); map[id].setAttribute('aria-current', 'true'); }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { io.observe(s); });
  }

  /* ---------- mobile drawer ---------- */
  function initMobileNav() {
    var toggle = el('navToggle'), menu = el('navMenu');
    if (!toggle || !menu) return;
    function setOpen(open) {
      menu.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    }
    toggle.addEventListener('click', function () { setOpen(toggle.getAttribute('aria-expanded') !== 'true'); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
    window.addEventListener('resize', function () { if (window.innerWidth > 760) setOpen(false); });
  }

  /* ---------- theme toggle ---------- */
  function initTheme() {
    var btn = el('themeToggle');
    function current() { return document.documentElement.getAttribute('data-theme') || 'light'; }
    function apply(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      if (btn) {
        btn.setAttribute('aria-pressed', String(theme === 'dark'));
        var icon = $('.theme-toggle__icon', btn);
        if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
      }
    }
    apply(current());
    if (btn) btn.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('theme', next); } catch (e) {}
      apply(next);
    });
  }

  /* ---------- certificate lightbox (ARIA modal) ---------- */
  function initLightbox() {
    var certs = DATA.certifications || [];
    var box = el('lightbox'), img = el('lightboxImg'), title = el('lightboxTitle'), meta = el('lightboxMeta');
    var btnClose = el('lightboxClose'), btnPrev = el('lightboxPrev'), btnNext = el('lightboxNext');
    if (!box) return;
    var current = 0, lastFocused = null;
    var focusable = [btnClose, btnPrev, btnNext];

    function show(i) {
      current = (i + certs.length) % certs.length;
      var c = certs[current];
      img.src = 'assets/certifications/' + c.filename;
      img.alt = c.title + ' certificate';
      title.textContent = c.title;
      meta.textContent = [c.issuer, c.date].filter(Boolean).join(' · ');
    }
    function open(i) {
      lastFocused = document.activeElement;
      show(i);
      box.hidden = false;
      document.body.style.overflow = 'hidden';
      btnClose.focus();
    }
    function close() {
      box.hidden = true;
      document.body.style.overflow = '';
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }
    document.addEventListener('click', function (e) {
      var t = e.target.closest('[data-cert]');
      if (t) { e.preventDefault(); open(parseInt(t.getAttribute('data-cert'), 10)); }
      if (e.target.hasAttribute && e.target.hasAttribute('data-close')) close();
    });
    btnClose.addEventListener('click', close);
    btnPrev.addEventListener('click', function () { show(current - 1); });
    btnNext.addEventListener('click', function () { show(current + 1); });
    document.addEventListener('keydown', function (e) {
      if (box.hidden) return;
      if (e.key === 'Escape') { close(); }
      else if (e.key === 'ArrowLeft') { show(current - 1); }
      else if (e.key === 'ArrowRight') { show(current + 1); }
      else if (e.key === 'Tab') {
        // focus trap
        var idx = focusable.indexOf(document.activeElement);
        if (e.shiftKey && (idx <= 0)) { e.preventDefault(); focusable[focusable.length - 1].focus(); }
        else if (!e.shiftKey && idx === focusable.length - 1) { e.preventDefault(); focusable[0].focus(); }
        else if (idx === -1) { e.preventDefault(); focusable[0].focus(); }
      }
    });
  }

  /* ---------- writing tabs + show more ---------- */
  function initWriting() {
    var tabs = el('writingTabs'), more = el('writingMore');
    if (tabs) {
      tabs.addEventListener('click', function (e) {
        var b = e.target.closest('[data-filter]'); if (!b) return;
        writingState.filter = b.getAttribute('data-filter');
        writingState.expanded = false;
        renderWritingTabs();
        renderWriting();
      });
      // arrow-key roving for the tablist
      tabs.addEventListener('keydown', function (e) {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        var btns = Array.prototype.slice.call(tabs.querySelectorAll('[data-filter]'));
        var i = btns.indexOf(document.activeElement); if (i === -1) return;
        var n = e.key === 'ArrowRight' ? (i + 1) % btns.length : (i - 1 + btns.length) % btns.length;
        btns[n].focus(); btns[n].click();
      });
    }
    if (more) more.addEventListener('click', function () { writingState.expanded = true; renderWriting(); more.blur(); });
  }

  /* ---------- book cover flip ---------- */
  function initBook() {
    var btn = el('bookFlip'); if (!btn) return;
    btn.addEventListener('click', function () {
      var flipped = btn.classList.toggle('is-flipped');
      btn.setAttribute('aria-pressed', String(flipped));
    });
  }

  /* ---------- contact form (mailto / Formspree) ---------- */
  function initForm() {
    var form = el('contactForm'); if (!form) return;
    var status = el('contactStatus');
    function err(id, msg) { var n = el(id); if (n) n.textContent = msg || ''; }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = el('cf-name'), email = el('cf-email'), msg = el('cf-message');
      var ok = true;
      err('cf-name-err'); err('cf-email-err'); err('cf-message-err');
      if (!name.value.trim()) { err('cf-name-err', 'Please enter your name.'); ok = false; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { err('cf-email-err', 'Please enter a valid email.'); ok = false; }
      if (!msg.value.trim()) { err('cf-message-err', 'Please enter a message.'); ok = false; }
      if (!ok) return;

      var endpoint = (DATA.contact || {}).formspreeEndpoint;
      if (endpoint) {
        status.textContent = 'Sending…';
        fetch(endpoint, {
          method: 'POST', headers: { 'Accept': 'application/json' },
          body: new FormData(form)
        }).then(function (r) {
          if (r.ok) { form.reset(); status.textContent = 'Thanks — your message has been sent.'; }
          else { status.textContent = 'Something went wrong. Please email me directly.'; }
        }).catch(function () { status.textContent = 'Network error. Please email me directly.'; });
      } else {
        var to = (DATA.contact || {}).email || (DATA.meta || {}).email;
        var subject = encodeURIComponent('Portfolio contact from ' + name.value.trim());
        var body = encodeURIComponent(msg.value.trim() + '\n\n— ' + name.value.trim() + ' (' + email.value.trim() + ')');
        window.location.href = 'mailto:' + to + '?subject=' + subject + '&body=' + body;
        status.textContent = 'Opening your email app…';
      }
    });
  }

  /* =========================================================================
     INIT
     ====================================================================== */
  function init() {
    renderMeta();
    renderHero();
    renderAbout();
    renderInterests();
    renderAchievements();
    renderExperience();
    renderEducation();
    renderSkills();
    renderCerts();
    renderProjects();
    renderBook();
    renderWritingTabs();
    renderWriting();
    renderContact();

    initTheme();
    initMobileNav();
    initNavState();
    initSpine();
    initCounters();
    initSkillPills();
    initLightbox();
    initWriting();
    initBook();
    initForm();

    observeReveals(document);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
