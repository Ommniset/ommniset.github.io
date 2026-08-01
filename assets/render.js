/* ============================================
   render.js — Genera el HTML de cada seccion
   segun su "type", a partir de los datos de Supabase
   ============================================ */

const PortfolioRender = (function () {
  'use strict';

  let currentLang = 'en';

  function esc(str) {
    if (str === undefined || str === null) return '';
    const div = document.createElement('div');
    div.textContent = String(str);
    return div.innerHTML;
  }

  // Toma "titulo_en" / "titulo_es" segun idioma, con fallback al que exista
  function pick(content, base, lang) {
    const key = base + '_' + lang;
    const fallbackKey = base + '_' + (lang === 'en' ? 'es' : 'en');
    if (content[key] !== undefined) return content[key];
    if (content[base] !== undefined) return content[base];
    if (content[fallbackKey] !== undefined) return content[fallbackKey];
    return '';
  }

  function t(translations, lang, key, fallback) {
    return (translations[lang] && translations[lang][key]) || fallback || key;
  }

  const ICONS = {
    'cert-badge': '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>',
    'cert-shield': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    'cert-globe': '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
    'activity': '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    'alert-circle': '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    'shield': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    'target': '<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>',
    'server': '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
    'git-branch': '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
    'cloud': '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>',
    'cpu': '<path d="M12 2a4 4 0 0 1 4 4v1h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2V6a4 4 0 0 1 4-4z"/>',
    'file-text': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>'
  };

  function icon(name, size) {
    const path = ICONS[name] || ICONS['file-text'];
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
      'stroke-linecap="round" stroke-linejoin="round" width="' + (size || 20) + '" height="' + (size || 20) + '">' + path + '</svg>';
  }

  /* ---------- Plantillas por tipo de seccion ---------- */

  function renderFeed(cards, lang, translations) {
    const filters = ['all', 'lab', 'project', 'cert', 'job', 'learning'];
    const filterBtns = filters.map(function (f) {
      const active = f === 'all' ? ' active' : '';
      return '<button class="filter-btn' + active + '" data-filter="' + f + '">' +
        esc(t(translations, lang, 'feed.filter.' + f, f)) + '</button>';
    }).join('');

    const entries = cards.map(function (c) {
      const d = c.content;
      const linkHtml = d.link_url
        ? '<a href="' + esc(d.link_url) + '" target="_blank" rel="noopener" class="feed-link">' + esc(pick(d, 'link_text', lang)) + '</a>'
        : '';
      const titleHtml = d.link_url
        ? '<a href="' + esc(d.link_url) + '" target="_blank" rel="noopener">' + esc(pick(d, 'title', lang)) + '</a>'
        : esc(pick(d, 'title', lang));
      return '<article class="feed-entry" data-category="' + esc(d.category || 'all') + '">' +
        '<time class="feed-date">' + esc(d.date || '') + '</time>' +
        '<div class="feed-content">' +
        '<h3 class="feed-entry-title">' + titleHtml +
        '<span class="cat-badge cat-badge--' + esc(d.category || '') + '">' + esc(t(translations, lang, 'feed.filter.' + (d.category || ''), d.category)) + '</span>' +
        '</h3>' +
        '<p class="feed-desc">' + esc(pick(d, 'desc', lang)) + '</p>' +
        linkHtml +
        '</div></article>';
    }).join('');

    return '<div class="feed-header">' +
      '<h2 class="feed-title">' + esc(t(translations, lang, 'feed.title', 'Activity')) + '</h2>' +
      '<div class="feed-filters">' + filterBtns + '</div>' +
      '</div><div class="feed-list">' + entries + '</div>';
  }

  function renderTimeline(cards, lang) {
    const items = cards.map(function (c) {
      const d = c.content;
      const company = pick(d, 'company', lang) || pick(d, 'school', lang);
      const roleOrDegree = pick(d, 'role', lang) || pick(d, 'degree', lang);
      const meta = [pick(d, 'date', lang), pick(d, 'location', lang), pick(d, 'mode', lang)]
        .filter(Boolean)
        .map(function (m) { return '<span>' + esc(m) + '</span>'; })
        .join('<span class="timeline-meta-sep"></span>');
      const desc = pick(d, 'desc', lang) ? '<p class="timeline-desc">' + esc(pick(d, 'desc', lang)) + '</p>' : '';
      const tags = (d.tags || []).map(function (tag) { return '<span class="timeline-tag">' + esc(tag) + '</span>'; }).join('');
      const tagsHtml = tags ? '<div class="timeline-tags">' + tags + '</div>' : '';
      return '<div class="timeline-item"><div class="timeline-dot"></div>' +
        '<div class="timeline-header"><h3 class="timeline-role">' + esc(roleOrDegree) + '</h3>' +
        (d.company_en || d.company_es || d.company ? '<span class="timeline-company">' + esc(company) + '</span>' : '') +
        '</div>' +
        '<div class="timeline-meta">' + meta + '</div>' +
        (!(d.company_en || d.company_es || d.company) && company ? '<div class="timeline-meta"><span class="timeline-company">' + esc(company) + '</span></div>' : '') +
        desc + tagsHtml + '</div>';
    }).join('');
    return '<div class="timeline">' + items + '</div>';
  }

  function renderCertGrid(cards, lang) {
    const items = cards.map(function (c) {
      const d = c.content;
      const statusClass = (pick(d, 'status', lang) || '').toLowerCase().indexOf('progress') > -1 || (pick(d, 'status', lang) || '').toLowerCase().indexOf('progreso') > -1
        ? 'cert-status--progress' : 'cert-status--done';
      return '<div class="cert-card"><div class="cert-icon">' + icon(d.icon, 20) + '</div>' +
        '<h3 class="cert-name">' + esc(pick(d, 'name', lang)) + '</h3>' +
        '<p class="cert-issuer">' + esc(pick(d, 'issuer', lang)) + '</p>' +
        '<span class="cert-status ' + statusClass + '">' + esc(pick(d, 'status', lang)) + '</span></div>';
    }).join('');
    return '<div class="cert-grid stagger">' + items + '</div>';
  }

  function renderLangGrid(cards, lang) {
    const flagHtml = function (flag) {
      if (flag === 'senyera') {
        return '<svg viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg" style="width:2rem;height:1.4rem;border-radius:2px;">' +
          '<rect width="24" height="16" fill="#FCDD09"/><rect y="1.78" width="24" height="1.78" fill="#DA121A"/>' +
          '<rect y="5.33" width="24" height="1.78" fill="#DA121A"/><rect y="8.89" width="24" height="1.78" fill="#DA121A"/>' +
          '<rect y="12.44" width="24" height="1.78" fill="#DA121A"/></svg>';
      }
      return esc(flag);
    };
    const items = cards.map(function (c) {
      const d = c.content;
      return '<div class="lang-card"><span class="lang-flag">' + flagHtml(d.flag) + '</span><div>' +
        '<div class="lang-name">' + esc(pick(d, 'name', lang)) + '</div>' +
        '<div class="lang-level">' + esc(pick(d, 'level', lang)) + '</div></div></div>';
    }).join('');
    return '<div class="lang-grid stagger">' + items + '</div>';
  }

  function renderSkillGrid(cards, lang) {
    const items = cards.map(function (c) {
      const d = c.content;
      const tags = (d.tags || []).map(function (tag) { return '<span class="skill-tag">' + esc(tag) + '</span>'; }).join('');
      return '<div class="skill-group"><h3 class="skill-group-title">' +
        '<span class="skill-group-icon">' + icon(d.icon, 20) + '</span>' +
        '<span>' + esc(pick(d, 'category', lang)) + '</span></h3>' +
        '<div class="skill-tags">' + tags + '</div></div>';
    }).join('');
    return '<div class="skills-grid stagger">' + items + '</div>';
  }

  function renderProjectGrid(cards, lang, translations) {
    const items = cards.map(function (c) {
      const d = c.content;
      let media;
      if (d.thumbnail) {
        media = '<a href="' + esc(d.thumbnail_link || '#') + '" target="_blank" rel="noopener" class="project-thumb-link">' +
          '<img src="' + esc(d.thumbnail) + '" alt="' + esc(d.name) + '" class="project-thumb">' +
          '<span class="project-play-icon"><svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg></span></a>';
      } else if (d.placeholder) {
        media = '<div class="project-thumb-link" style="cursor: default;"><div class="placeholder-text" ' +
          'style="border-radius: var(--radius-lg) var(--radius-lg) 0 0; background: var(--bg-tertiary); padding: 3rem 1.5rem; text-align: center;">' +
          '<div class="placeholder-text-icon">' + icon('file-text', 36) + '</div>' +
          '<p class="feed-desc" style="margin-top: 0.5rem; color: var(--text-tertiary);">' + esc(pick(d, 'placeholder_text', lang)) + '</p></div></div>';
      } else {
        media = '';
      }
      const links = [];
      if (d.github_url) links.push('<a href="' + esc(d.github_url) + '" target="_blank" rel="noopener" class="project-link">' +
        '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none" width="14" height="14"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>' +
        '<span>' + esc(t(translations, lang, 'project.github', 'GitHub')) + '</span></a>');
      if (d.demo_url) links.push('<a href="' + esc(d.demo_url) + '" target="_blank" rel="noopener" class="project-link">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><polygon points="5 3 19 12 5 21 5 3"/></svg>' +
        '<span>' + esc(t(translations, lang, 'project.demo', 'Watch Demo')) + '</span></a>');
      const tags = (d.tags || []).map(function (tag) { return '<span class="skill-tag">' + esc(tag) + '</span>'; }).join('');
      return '<div class="project-card">' + media + '<div class="project-body">' +
        '<h3 class="project-name">' + esc(d.name) + '</h3>' +
        '<p class="project-desc">' + esc(pick(d, 'desc', lang)) + '</p>' +
        '<div class="project-links">' + links.join('') + '</div>' +
        '<div class="project-tags">' + tags + '</div></div></div>';
    }).join('');
    return '<div class="projects-grid">' + items + '</div>';
  }

  const TEMPLATES = {
    'feed': renderFeed,
    'timeline': renderTimeline,
    'cert-grid': renderCertGrid,
    'lang-grid': renderLangGrid,
    'skill-grid': renderSkillGrid,
    'project-grid': renderProjectGrid
  };

  /**
   * Pinta todas las secciones de la pagina dentro de sus contenedores
   * <div data-section="slug"></div> ya presentes en el HTML.
   */
  function renderPage(data, lang) {
    currentLang = lang;
    data.sections.forEach(function (section) {
      const container = document.querySelector('[data-section="' + section.slug + '"]');
      if (!container) return;
      const fn = TEMPLATES[section.type];
      if (!fn) { console.warn('Tipo de seccion desconocido:', section.type); return; }
      container.innerHTML = fn(section.cards, lang, data.translations);
    });
    renderSettings(data.settings, lang);
  }

  function renderSettings(settings, lang) {
    document.querySelectorAll('[data-setting]').forEach(function (el) {
      const key = el.getAttribute('data-setting');
      if (settings[key] !== undefined) {
        if (el.tagName === 'IMG') el.setAttribute('src', settings[key]);
        else if (el.tagName === 'A') el.setAttribute('href', settings[key]);
        else el.textContent = settings[key];
      }
    });
  }

  return { renderPage: renderPage, renderSettings: renderSettings };
})();
