import { createClient } from "@supabase/supabase-js";

export const supabaseAuth = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export type User = {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  referralCode?: string;
};

export type Session = {
  user: User | null;
  session: any;
};
