import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables! Please create a .env.local file in your project root with the following content (replace with your actual values):\n' +
    'NEXT_PUBLIC_SUPABASE_URL=your-supabase-url\n' +
    'NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key\n\n' +
    'After saving the environment variables, restart the development server by running:\n' +
    'pnpm dev'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
