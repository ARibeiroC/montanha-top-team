import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Evita erro se as variáveis não estiverem definidas (durante o setup inicial)
const isConfigured = supabaseUrl && supabaseKey

export const supabase = isConfigured 
  ? createClient(supabaseUrl, supabaseKey) 
  : null

export const isSupabaseConfigured = () => !!supabase