/* ============================================
   app.js — Orquestacion: carga datos + pinta + interactividad
   ============================================ */

(function () {
  'use strict';

  const GITHUB_USER = 'Ommniset';

  document.addEventListener('DOMContentLoaded', init);

  async function init() {
    const page = document.querySelector('[data-section="feed"]') ? 'home' : 'about';
    const lang = localStorage.getItem('lang') || 'en';

    let data;
    try {
      data = await PortfolioData.loadAll(page);
    } catch (err) {
      console.error('No se pudo cargar el contenido desde Supabase:', err);
      return;
    }

    applyTranslations(data.translations, lang);
    PortfolioRender.renderPage(data, lang);
    applyMailtoLinks(data.settings);

    // Ahora que el DOM dinamico ya existe, inicializamos toda la interactividad
    initScrollProgress();
    initThemeToggle();
    initLangToggle(data, lang);
    initFadeObserver();
    initCopyEmail(data.settings);
    initFeedFilter();
    initTypingEffect(data.translations, lang);
    initRoleRotation();
    initGitHubStats();
    initActiveNav();
  }

  /* ---------- Traducciones e i18n ---------- */
  function applyTranslations(translations, lang) {
    const dict = translations[lang] || {};
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.textContent = dict[key];
    });
    document.documentElement.setAttribute('lang', lang);
  }

  function applyMailtoLinks(settings) {
    document.querySelectorAll('[data-setting-mailto]').forEach(function (el) {
      const key = el.getAttribute('data-setting-mailto');
      if (settings[key]) el.setAttribute('href', 'mailto:' + settings[key]);
    });
  }

  /* ---------- Scroll Progress ---------- */
  function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    function update() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = pct + '%';
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ---------- Theme Toggle ---------- */
  function initThemeToggle() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    const saved = localStorage.getItem('theme');
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    updateThemeIcon(btn);
    btn.addEventListener('click', function () {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateThemeIcon(btn);
    });
  }

  function updateThemeIcon(btn) {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    btn.innerHTML = isDark
      ? '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
      : '<svg viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  /* ---------- Language Toggle (recarga datos y re-pinta) ---------- */
  function initLangToggle(data, lang) {
    const btn = document.getElementById('lang-toggle');
    if (!btn) return;
    updateLangBtn(btn, lang);
    btn.addEventListener('click', async function () {
      const newLang = (localStorage.getItem('lang') || 'en') === 'en' ? 'es' : 'en';
      localStorage.setItem('lang', newLang);
      applyTranslations(data.translations, newLang);
      PortfolioRender.renderPage(data, newLang);
      updateLangBtn(btn, newLang);
      // Re-inicializar lo que depende del DOM recien pintado
      initFeedFilter();
      initCopyEmail(data.settings);
      window._typingTarget = (data.translations[newLang] && data.translations[newLang]['hero.typing']) || window._typingTarget;
      const typingEl = document.getElementById('typing-text');
      if (typingEl) typingEl.textContent = window._typingTarget;
    });
  }

  function updateLangBtn(btn, lang) {
    btn.textContent = lang === 'en' ? 'ES' : 'EN';
    btn.setAttribute('aria-label', lang === 'en' ? 'Cambiar a español' : 'Switch to English');
  }

  /* ---------- Fade In Observer ---------- */
  function initFadeObserver() {
    var sections = document.querySelectorAll('.fade-section');
    if (!sections.length) return;
    function isInView(el) {
      var rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight + 50 && rect.bottom > -50;
    }
    function revealVisible() {
      var delay = 0;
      sections.forEach(function (s) {
        if (!s.classList.contains('visible') && isInView(s)) {
          (function (el, d) { setTimeout(function () { el.classList.add('visible'); }, d); })(s, delay);
          delay += 100;
        }
      });
    }
    setTimeout(revealVisible, 80);
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
        });
      }, { threshold: 0.01 });
      sections.forEach(function (s) { observer.observe(s); });
    }
    window.addEventListener('scroll', revealVisible, { passive: true });
  }

  /* ---------- Copy Email ---------- */
  function initCopyEmail(settings) {
    var trigger = document.getElementById('copy-email');
    if (!trigger) return;
    var newTrigger = trigger.cloneNode(true); // evita listeners duplicados al re-pintar por idioma
    trigger.parentNode.replaceChild(newTrigger, trigger);
    newTrigger.addEventListener('click', function () {
      navigator.clipboard.writeText(settings['social.email'] || '').then(function () {
        var tooltip = newTrigger.querySelector('.copy-tooltip');
        if (tooltip) {
          tooltip.classList.add('show');
          setTimeout(function () { tooltip.classList.remove('show'); }, 1600);
        }
      });
    });
  }

  /* ---------- Feed Filter ---------- */
  function initFeedFilter() {
    var buttons = document.querySelectorAll('.filter-btn');
    var entries = document.querySelectorAll('.feed-entry');
    if (!buttons.length || !entries.length) return;
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter');
        buttons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        entries.forEach(function (entry) {
          var cat = entry.getAttribute('data-category');
          entry.classList.toggle('hidden', !(filter === 'all' || cat === filter));
        });
      });
    });
  }

  /* ---------- Typing Effect ---------- */
  function initTypingEffect(translations, lang) {
    var el = document.getElementById('typing-text');
    if (!el) return;
    var dict = translations[lang] || {};
    var baseText = dict['hero.typing'] || 'Cybersecurity Analyst & SysAdmin';
    window._typingTarget = baseText;
    var charIndex = 0;
    el.textContent = '';
    function type() {
      if (charIndex < window._typingTarget.length) {
        el.textContent = window._typingTarget.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(type, 45 + Math.random() * 35);
      }
    }
    setTimeout(type, 600);
  }

  /* ---------- Role Rotation (About Hero) ---------- */
  function initRoleRotation() {
    var el = document.getElementById('role-rotation');
    if (!el) return;
    var roles = ['Cybersecurity Analyst', 'SysAdmin', 'Network Admin'];
    var index = 0;
    function rotate() {
      el.style.opacity = '0';
      el.style.transform = 'translateY(-6px)';
      setTimeout(function () {
        index = (index + 1) % roles.length;
        el.textContent = roles[index];
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 350);
    }
    el.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
    setInterval(rotate, 2800);
  }

  /* ---------- GitHub Stats ---------- */
  function initGitHubStats() {
    var reposEl = document.getElementById('gh-repos');
    var starsEl = document.getElementById('gh-stars');
    var followersEl = document.getElementById('gh-followers');
    if (!reposEl && !starsEl && !followersEl) return;

    fetch('https://api.github.com/users/' + GITHUB_USER)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (reposEl) reposEl.textContent = data.public_repos || '—';
        if (followersEl) followersEl.textContent = data.followers || '—';
      })
      .catch(function () {
        if (reposEl) reposEl.textContent = '—';
        if (followersEl) followersEl.textContent = '—';
      });

    fetch('https://api.github.com/users/' + GITHUB_USER + '/repos?per_page=100')
      .then(function (r) { return r.json(); })
      .then(function (repos) {
        if (!Array.isArray(repos)) { if (starsEl) starsEl.textContent = '—'; return; }
        var total = repos.reduce(function (sum, repo) { return sum + (repo.stargazers_count || 0); }, 0);
        if (starsEl) starsEl.textContent = total;
      })
      .catch(function () { if (starsEl) starsEl.textContent = '—'; });
  }

  /* ---------- Active Nav ---------- */
  function initActiveNav() {
    var links = document.querySelectorAll('.nav-links a');
    if (!links.length) return;
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    links.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

})();
