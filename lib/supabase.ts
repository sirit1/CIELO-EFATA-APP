import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Tipos
export interface EvaluationResult {
  id?: string;
  nombre: string;
  email: string;
  whatsapp: string;
  puntaje: number;
  created_at?: string;
  respuestas?: number[];
}

export interface LeaderboardEntry {
  nombre: string;
  puntaje: number;
  created_at: string;
}
