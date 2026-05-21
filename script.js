/* =============================================================
   DR. ASMA AL MANNAEI  —  script.js  v3
   All IDs match index.html exactly.
   ============================================================= */
(function () {
    'use strict';

    /* ── SCROLL BAR ── */
    const bar = document.getElementById('scrollBar');
    function updateBar() {
        if (!bar) return;
        const p = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
        bar.style.width = Math.min(p, 100) + '%';
    }

    /* ── NAVBAR ── */
    const nav = document.getElementById('navbar');
    const burger = document.getElementById('navBurger');
    const menu = document.getElementById('navMenu');

    function updateNav() {
        if (nav) nav.classList.toggle('solid', window.scrollY > 50);
    }

    if (burger && menu) {
        burger.addEventListener('click', function () {
            const open = menu.classList.toggle('open');
            burger.setAttribute('aria-expanded', open);
            document.body.style.overflow = open ? 'hidden' : '';
        });
        menu.querySelectorAll('.nl').forEach(function (link) {
            link.addEventListener('click', function () {
                menu.classList.remove('open');
                burger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
        document.addEventListener('click', function (e) {
            if (nav && !nav.contains(e.target) && menu.classList.contains('open')) {
                menu.classList.remove('open');
                burger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    /* ── ACTIVE SECTION ── */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nl[href^="#"]');
    function updateActive() {
        const y = window.scrollY + 120;
        sections.forEach(function (s) {
            if (y >= s.offsetTop && y < s.offsetTop + s.offsetHeight) {
                navLinks.forEach(function (l) {
                    l.classList.toggle('active', l.getAttribute('href') === '#' + s.id);
                });
            }
        });
    }

    /* ── BACK TO TOP ── */
    const toTop = document.getElementById('toTop');
    function updateTop() {
        if (toTop) toTop.classList.toggle('show', window.scrollY > 480);
    }
    if (toTop) {
        toTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ── SCROLL HANDLER ── */
    window.addEventListener('scroll', function () {
        updateBar();
        updateNav();
        updateActive();
        updateTop();
    }, { passive: true });
    updateNav(); updateTop();

    /* ── SMOOTH ANCHORS ── */
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
        a.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (id === '#') return;
            const el = document.querySelector(id);
            if (el) {
                e.preventDefault();
                window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 74, behavior: 'smooth' });
            }
        });
    });

    /* ── INTERSECTION OBSERVER: scroll animations ── */
    const aosEls = document.querySelectorAll('.aos, .aos-left, .aos-right');
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -28px 0px' });
        aosEls.forEach(function (el) { io.observe(el); });
    } else {
        aosEls.forEach(function (el) { el.classList.add('in'); });
    }

    /* ── HERO COUNTERS (run on page load since hero is visible) ── */
    function runCounter(el) {
        const target = parseInt(el.getAttribute('data-target'), 10);
        if (isNaN(target)) return;
        const dur = 1600, step = 16, inc = target / (dur / step);
        let cur = 0;
        const t = setInterval(function () {
            cur = Math.min(cur + inc, target);
            el.textContent = Math.floor(cur);
            if (cur >= target) clearInterval(t);
        }, step);
    }
    /* Delay hero counters slightly so animation feels natural */
    setTimeout(function () {
        document.querySelectorAll('.hs-num[data-target]').forEach(runCounter);
    }, 600);

    /* ── TIMELINE ── */
    const nodes = document.querySelectorAll('.tl-node');
    const panels = document.querySelectorAll('.tl-panel');

    nodes.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const idx = this.getAttribute('data-idx');
            nodes.forEach(function (n) { n.classList.remove('active'); });
            panels.forEach(function (p) { p.classList.remove('active'); });
            this.classList.add('active');
            const target = document.querySelector('.tl-panel[data-idx="' + idx + '"]');
            if (target) target.classList.add('active');
        });
    });

    /* ── CONTACT FORM ── */
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const orig = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
            btn.disabled = true;
            setTimeout(function () {
                btn.innerHTML = '<i class="fas fa-check"></i> Message Sent';
                btn.style.background = '#14b464';
                setTimeout(function () {
                    btn.innerHTML = orig;
                    btn.style.background = '';
                    btn.disabled = false;
                    form.reset();
                }, 3000);
            }, 1400);
        });
        form.querySelectorAll('input[required], textarea[required]').forEach(function (inp) {
            inp.addEventListener('blur', function () {
                this.style.borderColor = this.value.trim() ? '' : '#e05252';
            });
            inp.addEventListener('focus', function () { this.style.borderColor = ''; });
        });
    }

    /* ── GOVERNANCE: title glide on hover ── */
    document.querySelectorAll('.gov-row').forEach(function (row) {
        const h = row.querySelector('h3');
        if (!h) return;
        row.addEventListener('mouseenter', function () {
            h.style.transform = 'translateX(4px)';
            h.style.transition = 'transform .2s ease';
        });
        row.addEventListener('mouseleave', function () { h.style.transform = ''; });
    });

})();