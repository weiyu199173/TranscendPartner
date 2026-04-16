import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://yzhxcljvdcizmxtbxkip.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_k2gpmU7GTsKdFfp_GTT4TA_c6Ja55fp';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
