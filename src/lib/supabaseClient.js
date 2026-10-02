import { createClient } from '@supabase/supabase-js';

// Clean the URL by removing /rest/v1 or trailing slashes if present
const rawUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables in .env!');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);