/* ============================================
   data.js — Carga de datos desde Supabase
   ============================================ */

const PortfolioData = (function () {
  'use strict';

  let cache = null;

  /**
   * Trae todo lo necesario para pintar la pagina actual en un solo golpe:
   * settings, secciones (de esta pagina) con sus tarjetas ya anidadas, y traducciones.
   */
  async function loadAll(page) {
    if (cache && cache.page === page) return cache;

    const [settingsRes, sectionsRes, translationsRes] = await Promise.all([
      supabaseClient.from('site_settings').select('key, value'),
      supabaseClient
        .from('sections')
        .select('id, slug, type, order_index, visible, cards(id, order_index, visible, content)')
        .eq('page', page)
        .eq('visible', true)
        .order('order_index', { ascending: true }),
      supabaseClient.from('translations').select('key, lang, value')
    ]);

    if (settingsRes.error) console.error('Error loading settings:', settingsRes.error);
    if (sectionsRes.error) console.error('Error loading sections:', sectionsRes.error);
    if (translationsRes.error) console.error('Error loading translations:', translationsRes.error);

    // settings: array de {key, value} -> objeto plano
    const settings = {};
    (settingsRes.data || []).forEach(function (row) { settings[row.key] = row.value; });

    // translations: array de {key, lang, value} -> { en: {...}, es: {...} }
    const translations = { en: {}, es: {} };
    (translationsRes.data || []).forEach(function (row) {
      if (!translations[row.lang]) translations[row.lang] = {};
      translations[row.lang][row.key] = row.value;
    });

    // sections: ordenar tarjetas dentro de cada seccion y quitar las invisibles
    const sections = (sectionsRes.data || []).map(function (s) {
      const cards = (s.cards || [])
        .filter(function (c) { return c.visible; })
        .sort(function (a, b) { return a.order_index - b.order_index; });
      return { id: s.id, slug: s.slug, type: s.type, cards: cards };
    });

    cache = { page: page, settings: settings, sections: sections, translations: translations };
    return cache;
  }

  function invalidate() { cache = null; }

  return { loadAll: loadAll, invalidate: invalidate };
})();
