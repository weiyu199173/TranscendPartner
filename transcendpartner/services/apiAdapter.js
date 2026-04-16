import mockApi from '../api';
import supabaseApi from './supabaseApi';

const USE_SUPABASE = false;

const apiAdapter = USE_SUPABASE ? supabaseApi : mockApi;

export default apiAdapter;
