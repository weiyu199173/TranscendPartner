import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yzhxcljvdcizmxtbxkip.supabase.co';
const supabaseAnonKey = 'sb_publishable_k2gpmU7GTsKdFfp_GTT4TA_c6Ja55fp';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
