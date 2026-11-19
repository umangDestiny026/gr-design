(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ══════════════════════════════════════════════════════════
     1 · DATOS DE LA GAMA GR
     Único lugar donde se editan los modelos. Familias del manual
     GR Brand Migration Ver.7:
       GR       → deportivos puros      [GR] + [Modelo]
       GR SPORT → modelos de calle      [Modelo] + [GR SPORT]
 
     Los chips van SIEMPRE de a cuatro y en el mismo orden:
       1 motor · 2 potencia · 3 transmisión · 4 tracción o capacidad
     Las potencias salen de las fichas GR-Sport del catálogo Colombia.
     Excepción: los 306 CV del RAV4 PHEV son la cifra global del PHEV
     — conviene confirmarla contra la ficha local antes de publicar.
  ══════════════════════════════════════════════════════════ */
  var ICON = {
    turbo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="7.2"/><circle cx="12" cy="12" r="2.4"/><path d="M12 4.8v2.8M19.2 12h-2.8M12 19.2v-2.8M4.8 12h2.8"/></svg>',
    power: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.2 2 4.6 13.4h6.1L9.4 22l8.9-11.7h-6.2z"/></svg>',
    gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M7 5.5v13M17 5.5v13M7 12h10"/><circle cx="12" cy="12" r="1.9" fill="currentColor" stroke="none"/></svg>',
    engine: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V8.5A2.5 2.5 0 0 1 6.5 6h5A2.5 2.5 0 0 1 14 8.5V20"/><path d="M3 20h12M14 11.5h2.6a2 2 0 0 1 2 2v3.4a1.45 1.45 0 0 0 2.9 0v-6.6l-2.4-2.4"/></svg>',
    seats: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="8" r="3.1"/><path d="M5.6 20a6.4 6.4 0 0 1 12.8 0"/></svg>',
    awd: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="7" cy="7" r="2.3"/><circle cx="17" cy="7" r="2.3"/><circle cx="7" cy="17" r="2.3"/><circle cx="17" cy="17" r="2.3"/><path d="M9.3 7h5.4M9.3 17h5.4M7 9.3v5.4M17 9.3v5.4"/></svg>',
    hybrid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2.6" y="7.2" width="15.4" height="9.6" rx="2.2"/><path d="M20.6 10.6v2.8"/><path d="M10.9 9.9 8.4 13.1h3.2l-1 2.6"/></svg>'
  };

  var TOYOTA = 'https://www.toyota.com.co';

  var GR_VEHICLES = [
    {
      name: 'GR Yaris', variant: '', img: 'assets/cutouts/gr-yaris.png',
      url: 'interna-general.html',
      chips: [['turbo', '1.6L Turbo'], ['power', '261 CV'], ['gear', 'Manual 6 vel.'], ['awd', 'GR-FOUR AWD']],
      desc: 'Homologado para rally: tracción GR-FOUR y tres cilindros turbo.'
    },

    {
      name: 'Corolla', variant: 'GR Sport', img: 'assets/cutouts/corolla-gr.png',
      url: TOYOTA + '/vehicle-details/page?slug=corolla',
      chips: [['engine', '2.0L Gasolina'], ['power', '171 CV'], ['gear', 'CVT 10 vel.'], ['seats', '5 pasajeros']],
      desc: 'Sedán con suspensión y dirección recalibradas, y carrocería reforzada.'
    },

    {
      name: 'Corolla Cross', variant: 'GR Sport', img: 'assets/cutouts/corolla-cross-gr.png',
      url: TOYOTA + '/vehicle-details/page?slug=corolla-cross',
      chips: [['engine', '2.0L Gasolina'], ['power', '171 CV'], ['gear', 'CVT 10 vel.'], ['seats', '5 pasajeros']],
      desc: 'La SUV compacta con el ajuste de chasis y la estética GR.'
    },

    {
      name: 'Hilux', variant: 'GR Sport IV', img: 'assets/cutouts/hilux-gr.png',
      url: TOYOTA + '/vehicle-details/page?slug=hilux',
      chips: [['engine', '2.8L Turbo Diésel'], ['power', '224 CV'], ['gear', 'Automática 6 vel.'], ['awd', '4X4']],
      desc: 'Pick up con suspensión de desempeño, trocha ampliada y frenos de mayor capacidad.'
    },

    {
      name: 'RAV4 PHEV', variant: 'GR Sport', img: 'assets/cutouts/rav4-phev-gr-s.png',
      url: TOYOTA + '/vehicle-details/page?slug=rav4',
      chips: [['hybrid', 'Híbrida enchufable'], ['power', '306 CV'], ['gear', 'e-CVT'], ['awd', 'AWD']],
      desc: 'Híbrida enchufable con tracción eléctrica al eje trasero y ajuste GR.'
    },

    {
      name: 'Land Cruiser 300', variant: 'GR Sport', img: 'assets/cutouts/lc-300-gr.png',
      url: TOYOTA + '/vehicle-details/page?slug=land-cruiser-300',
      chips: [['hybrid', 'Híbrida'], ['power', '415 CV'], ['gear', 'Automática 10 vel.'], ['awd', '4X4']],
      desc: 'El tope de gama con diferenciales delantero y trasero bloqueables.'
    },

    {
      name: 'Fortuner', variant: 'GR Sport', img: 'assets/cutouts/fortuner-gr.png',
      url: TOYOTA + '/vehicle-details/page?slug=fortuner',
      chips: [['engine', '2.8L Turbo Diésel'], ['power', '224 CV'], ['gear', 'Automática 6 vel.'], ['seats', '7 pasajeros']],
      desc: 'SUV de siete pasajeros con puesta a punto GR y tracción 4X4.'
    }
  ];

  var vgrid = document.getElementById('gr-vehicles');
  if (vgrid) {
    vgrid.innerHTML = GR_VEHICLES.map(function (v) {
      var chips = v.chips.map(function (c) {
        return '<span class="gr-chip"><span>' + (ICON[c[0]] || '') + c[1] + '</span></span>';
      }).join('');
      return '' +
        '<article class="gr-vcard" role="listitem">' +
        '<div class="gr-vcard-body">' +
        '<div class="gr-vcard-photo">' +
        '<img src="' + v.img + '" alt="Toyota ' + v.name + ' ' + v.variant + '" loading="lazy" decoding="async">' +
        '</div>' +
        '<div class="gr-vcard-info">' +
        '<div class="gr-chips">' + chips + '</div>' +
        '<h3 class="gr-vcard-name">' + v.name +
        (v.variant ? '<span class="gr-vcard-variant">' + v.variant + '</span>' : '') +
        '</h3>' +
        '<p class="gr-vcard-desc">' + v.desc + '</p>' +
        '<a class="gr-btn gr-vcard-cta" href="' + v.url + '">' +
        '<span>Conocer detalles' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>' +
        '</span>' +
        '</a>' +
        '</div>' +
        '</div>' +
        '</article>';
    }).join('');
  }

  /* ══════════════════════════════════════════════════════════
     2 · CARRUSELES (GR Garage y línea de tiempo)
     scroll-snap nativo + botones. Misma mecánica para los dos, así
     que va en una función: el paso se recalcula en cada uso porque
     el ancho de card depende del viewport (todo es clamp/vw/cqi).
     La línea de tiempo solo es carrusel bajo 760 px; arriba es una
     reja y los botones están ocultos por CSS, sync() no estorba.
  ══════════════════════════════════════════════════════════ */
  function grCarousel(trackId, prevId, nextId, countId) {
    var track = document.getElementById(trackId);
    var prev = document.getElementById(prevId);
    var next = document.getElementById(nextId);
    var count = document.getElementById(countId);
    if (!track || !prev || !next) return;

    function step() {
      var first = track.children[0];
      if (!first) return 0;
      var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return first.getBoundingClientRect().width + gap;
    }
    function sync() {
      if (!track.clientWidth) return;
      var total = track.children.length;
      var s = step();
      var idx = s ? Math.round(track.scrollLeft / s) : 0;
      if (count) count.textContent = Math.min(idx + 1, total) + ' de ' + total;
      prev.disabled = track.scrollLeft <= 1;
      next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 1;
    }
    // Con scroll-behavior:smooth el scrollLeft final no está listo al
    // instante y el evento 'scroll' no es fiable en todos los motores:
    // se sincroniza enseguida y otra vez al terminar la animación.
    function nudge(dir) {
      track.scrollLeft += dir * step();
      setTimeout(sync, 60);
      setTimeout(sync, 450);
    }
    prev.addEventListener('click', function () { nudge(-1); });
    next.addEventListener('click', function () { nudge(1); });
    window.addEventListener('resize', sync);
    var t;
    track.addEventListener('scroll', function () {
      clearTimeout(t); t = setTimeout(sync, 120);
    }, { passive: true });
    sync();
  }

  grCarousel('gr-vehicles', 'gr-veh-prev', 'gr-veh-next', 'gr-veh-count');
  grCarousel('gr-timeline', 'gr-tl-prev', 'gr-tl-next', 'gr-tl-count');

  /* ══════════════════════════════════════════════════════════
     3a · MEGA-MENÚ DE GARAJE GR
     Lo abre el galón del header, no el enlace: el texto sigue
     llevando a la sección de modelos de la página.
  ══════════════════════════════════════════════════════════ */
  (function () {
    var btn = document.getElementById('t-mega-btn');
    var mega = document.getElementById('t-mega');
    if (!btn || !mega) return;

    function setOpen(open) {
      mega.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
    }
    function isOpen() { return btn.getAttribute('aria-expanded') === 'true'; }

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      setOpen(!isOpen());
    });
    // Cerrar al elegir un modelo, al hacer clic fuera o con Escape.
    mega.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
      else e.stopPropagation();
    });
    document.addEventListener('click', function () { if (isOpen()) setOpen(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) { setOpen(false); btn.focus(); }
    });

    /* ── Versión móvil: sub-panel deslizante dentro del menú hamburguesa ──
       Las tarjetas se clonan del mega-menú para no repetir los siete modelos
       en el HTML: una sola fuente de verdad. */
    var sub = document.getElementById('t-msub');
    var subList = document.getElementById('t-msub-list');
    var subOpen = document.getElementById('t-msub-open');
    var subBack = document.getElementById('t-msub-back');
    var subX = document.getElementById('t-msub-close');
    var grid = mega.querySelector('.t-mega-grid');
    if (!sub || !subList || !subOpen || !grid) return;

    subList.innerHTML = grid.innerHTML;

    function setSub(open) {
      sub.classList.toggle('is-open', open);
      sub.setAttribute('aria-hidden', String(!open));
      subOpen.setAttribute('aria-expanded', String(open));
      if (open) sub.scrollTop = 0;
    }
    subOpen.addEventListener('click', function () { setSub(true); });
    if (subBack) subBack.addEventListener('click', function () { setSub(false); });
    // La ✕ cierra el menú entero, no solo el sub-panel.
    if (subX) subX.addEventListener('click', function () {
      setSub(false);
      var close = document.getElementById('t-mobile-close');
      if (close) close.click();
    });
    // Al elegir un modelo se cierran los dos.
    subList.addEventListener('click', function (e) {
      if (!e.target.closest('a')) return;
      setSub(false);
      var close = document.getElementById('t-mobile-close');
      if (close) close.click();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && sub.classList.contains('is-open')) setSub(false);
    });
  }());

  /* ══════════════════════════════════════════════════════════
     3 · HEADER GR — panel móvil
     El panel ya está escrito en el HTML (son cuatro enlaces): no
     se genera desde el desktop como hacía el header de Toyota.
  ══════════════════════════════════════════════════════════ */
  (function () {
    var panel = document.getElementById('t-mobile');
    var burger = document.getElementById('t-burger');
    var closeBtn = document.getElementById('t-mobile-close');
    if (!panel || !burger) return;

    function openPanel() {
      panel.classList.add('is-open');
      panel.setAttribute('aria-hidden', 'false');
      burger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
    function closePanel() {
      panel.classList.remove('is-open');
      panel.setAttribute('aria-hidden', 'true');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
    burger.addEventListener('click', openPanel);
    if (closeBtn) closeBtn.addEventListener('click', closePanel);
    panel.addEventListener('click', function (e) {
      if (e.target.closest('a')) closePanel();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('is-open')) closePanel();
    });
  }());

  /* ══════════════════════════════════════════════════════════
     4 · ACORDEÓN DEL FOOTER (solo móvil)
  ══════════════════════════════════════════════════════════ */
  document.querySelectorAll('.t-footer-acc-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
    });
  });

  /* ══════════════════════════════════════════════════════════
     5 · LIGHTBOX de la galería
  ══════════════════════════════════════════════════════════ */
  (function () {
    var lb = document.getElementById('gr-lb');
    var grid = document.getElementById('gr-gallery-grid');
    if (!lb || !grid) return;

    var img = document.getElementById('gr-lb-img');
    var label = document.getElementById('gr-lb-label');
    var count = document.getElementById('gr-lb-count');
    var btns = Array.prototype.slice.call(grid.querySelectorAll('.gr-gal-item'));
    var items = btns.map(function (b) {
      var i = b.querySelector('img');
      return { src: i.getAttribute('src'), alt: i.getAttribute('alt') || '', cap: b.dataset.cap || '' };
    });
    var idx = 0, lastFocus = null;

    function paint() {
      var it = items[idx];
      img.src = it.src;
      img.alt = it.alt;
      label.textContent = it.cap;
      count.textContent = (idx + 1) + ' / ' + items.length;
    }
    function open(i) {
      idx = i; lastFocus = document.activeElement;
      paint();
      lb.setAttribute('aria-hidden', 'false');
      document.body.classList.add('gr-lb-open');
      document.getElementById('gr-lb-close').focus();
    }
    function close() {
      lb.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('gr-lb-open');
      if (lastFocus) lastFocus.focus();
    }
    function move(d) {
      idx = (idx + d + items.length) % items.length;
      if (reduceMotion) { paint(); return; }
      img.style.opacity = '0';
      setTimeout(function () { paint(); img.style.opacity = '1'; }, 130);
    }

    img.style.transition = 'opacity .2s ease';
    btns.forEach(function (b, i) { b.addEventListener('click', function () { open(i); }); });
    document.getElementById('gr-lb-close').addEventListener('click', close);
    document.getElementById('gr-lb-prev').addEventListener('click', function () { move(-1); });
    document.getElementById('gr-lb-next').addEventListener('click', function () { move(1); });
    lb.querySelectorAll('[data-lb-close]').forEach(function (el) {
      el.addEventListener('click', close);
    });
    document.addEventListener('keydown', function (e) {
      if (lb.getAttribute('aria-hidden') === 'true') return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') move(-1);
      if (e.key === 'ArrowRight') move(1);
    });
    // Swipe en táctil
    var x0 = null;
    lb.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) move(dx > 0 ? -1 : 1);
      x0 = null;
    }, { passive: true });
  }());

  /* ══════════════════════════════════════════════════════════
     6 · REVEAL al hacer scroll
  ══════════════════════════════════════════════════════════ */
  (function () {
    var els = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
    if (!els.length) return;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-in');
        obs.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: .1 });
    els.forEach(function (el) { obs.observe(el); });
  }());

}());
