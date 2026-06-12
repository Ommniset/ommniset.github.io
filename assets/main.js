/* ============================================
   main.js — Portfolio shared logic
   ============================================ */

(function () {
  'use strict';

  /* ---------- Constants ---------- */
  const GITHUB_USER = 'Ommniset';
  const EMAIL = 'correosadam@gmail.com';

  /* ---------- DOM Ready ---------- */
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initScrollProgress();
    initThemeToggle();
    initLangToggle();
    initFadeObserver();
    initCopyEmail();
    initFeedFilter();
    initTypingEffect();
    initRoleRotation();
    initGitHubStats();
    initActiveNav();
  }

  /* ============================================
     1. Scroll Progress Bar
     ============================================ */
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

  /* ============================================
     2. Dark / Light Mode Toggle
     ============================================ */
  function initThemeToggle() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;

    // Read saved preference or system
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

  /* ============================================
     3. Language Toggle (EN / ES)
     ============================================ */
  function initLangToggle() {
    const btn = document.getElementById('lang-toggle');
    if (!btn) return;

    // Default language
    let lang = localStorage.getItem('lang') || 'en';
    applyLang(lang);
    updateLangBtn(btn, lang);

    btn.addEventListener('click', function () {
      lang = lang === 'en' ? 'es' : 'en';
      localStorage.setItem('lang', lang);
      applyLang(lang);
      updateLangBtn(btn, lang);
    });
  }

  function applyLang(lang) {
    if (typeof translations === 'undefined') return;
    const dict = translations[lang];
    if (!dict) return;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        el.textContent = dict[key];
      }
    });

    // Also update typing effect target text
    if (window._typingTarget !== undefined) {
      window._typingTarget = dict['hero.typing'] || window._typingTarget;
    }

    document.documentElement.setAttribute('lang', lang);
  }

  function updateLangBtn(btn, lang) {
    btn.textContent = lang === 'en' ? 'ES' : 'EN';
    btn.setAttribute('aria-label', lang === 'en' ? 'Cambiar a español' : 'Switch to English');
  }

  /* ============================================
     4. Intersection Observer — Fade In
     ============================================ */
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
          (function (el, d) {
            setTimeout(function () { el.classList.add('visible'); }, d);
          })(s, delay);
          delay += 100;
        }
      });
    }

    // Reveal on load (with small delay to ensure layout)
    setTimeout(revealVisible, 80);

    // Observer for elements that enter viewport later
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.01 });

      sections.forEach(function (s) { observer.observe(s); });
    }

    // Scroll fallback
    window.addEventListener('scroll', revealVisible, { passive: true });
  }

  /* ============================================
     5. Copy Email to Clipboard
     ============================================ */
  function initCopyEmail() {
    var trigger = document.getElementById('copy-email');
    if (!trigger) return;

    trigger.addEventListener('click', function () {
      navigator.clipboard.writeText(EMAIL).then(function () {
        var tooltip = trigger.querySelector('.copy-tooltip');
        if (tooltip) {
          tooltip.classList.add('show');
          setTimeout(function () { tooltip.classList.remove('show'); }, 1600);
        }
      });
    });
  }

  /* ============================================
     6. Feed Category Filter
     ============================================ */
  function initFeedFilter() {
    var buttons = document.querySelectorAll('.filter-btn');
    var entries = document.querySelectorAll('.feed-entry');
    if (!buttons.length || !entries.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter');

        // Update active button
        buttons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        // Filter entries
        entries.forEach(function (entry) {
          var cat = entry.getAttribute('data-category');
          if (filter === 'all' || cat === filter) {
            entry.classList.remove('hidden');
          } else {
            entry.classList.add('hidden');
          }
        });
      });
    });
  }

  /* ============================================
     7. Typing Effect (Home Hero)
     ============================================ */
  function initTypingEffect() {
    var el = document.getElementById('typing-text');
    if (!el) return;

    var lang = localStorage.getItem('lang') || 'en';
    var dict = (typeof translations !== 'undefined') ? translations[lang] : null;
    var baseText = (dict && dict['hero.typing']) ? dict['hero.typing'] : 'Cybersecurity Analyst & SysAdmin';
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

    // Start after a brief delay
    setTimeout(type, 600);
  }

  /* ============================================
     8. Role Rotation (About Hero)
     ============================================ */
  function initRoleRotation() {
    var el = document.getElementById('role-rotation');
    if (!el) return;

    var roles = [
      'Cybersecurity Analyst',
      'SysAdmin',
      'Network Admin'
    ];
    var index = 0;

    function rotate() {
      // Fade out
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

  /* ============================================
     9. GitHub Stats (Contact Section)
     ============================================ */
  function initGitHubStats() {
    var reposEl = document.getElementById('gh-repos');
    var starsEl = document.getElementById('gh-stars');
    var followersEl = document.getElementById('gh-followers');
    if (!reposEl && !starsEl && !followersEl) return;

    // Fetch user data
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

    // Fetch total stars
    fetch('https://api.github.com/users/' + GITHUB_USER + '/repos?per_page=100')
      .then(function (r) { return r.json(); })
      .then(function (repos) {
        if (!Array.isArray(repos)) { if (starsEl) starsEl.textContent = '—'; return; }
        var total = repos.reduce(function (sum, repo) { return sum + (repo.stargazers_count || 0); }, 0);
        if (starsEl) starsEl.textContent = total;
      })
      .catch(function () {
        if (starsEl) starsEl.textContent = '—';
      });
  }

  /* ============================================
     10. Active Nav Highlight
     ============================================ */
  function initActiveNav() {
    var links = document.querySelectorAll('.nav-links a');
    if (!links.length) return;

    // Highlight current page
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    links.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html') || (currentPage === 'index.html' && href === 'index.html')) {
        link.classList.add('active');
      }
    });

    // For about page — highlight sections on scroll
    var sections = document.querySelectorAll('.section[id]');
    if (!sections.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          // No in-page nav links to highlight, but we keep the observer
          // for future use if anchor links are added
        }
      });
    }, {
      threshold: 0.3
    });

    sections.forEach(function (s) { observer.observe(s); });
  }

})();
