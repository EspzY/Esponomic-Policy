import { createClient } from "@supabase/supabase-js";

import { getRequiredServerEnv, isSupabaseConfigured } from "@/lib/env";

export function createAdminSupabaseClient() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const { supabaseServiceRoleKey, supabaseUrl } = getRequiredServerEnv();

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
