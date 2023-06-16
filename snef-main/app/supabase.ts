import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config({path: ".env.local"});

const supabaseUrl = process.env.SUPABASE_URL as string ;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY as string ;

console.log(supabaseUrl, supabaseAnonKey)

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
