import { createClient } from '@supabase/supabase-js';

const url = typeof import.meta.env.VITE_SUPABASE_URL === 'string' && import.meta.env.VITE_SUPABASE_URL.trim();
const anon = typeof import.meta.env.VITE_SUPABASE_ANON_KEY === 'string' && import.meta.env.VITE_SUPABASE_ANON_KEY.trim();
const isValidUrl = url && (url.startsWith('https://') || url.startsWith('http://'));

export const supabase = isValidUrl && anon ? createClient(url, anon) : null;

export function hasSupabase() {
  return !!supabase;
}
