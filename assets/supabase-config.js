/* ============================================
   supabase-config.js — Credenciales del proyecto
   ============================================
   Rellena estos dos valores con los tuyos:
   Supabase Dashboard > Project Settings > API
   ============================================ */

const SUPABASE_URL = 'https://jvdpqfwbenpjpagbdccl.supabase.co';       // ej. https://xxxxx.supabase.co
const SUPABASE_ANON_KEY = 'sb_publishable_rWzUFJpMVLwOXcMoZQd3NQ_OpmHQZzI';       // clave publica, es seguro exponerla

/* No tocar debajo de esta linea */
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
