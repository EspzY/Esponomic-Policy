"use client";

import { createBrowserClient } from "@supabase/ssr";

import { getRequiredServerEnv, isSupabaseConfigured } from "@/lib/env";

export function createClient() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const { supabaseUrl, supabasePublishableKey } = getRequiredServerEnv();

  return createBrowserClient(supabaseUrl, supabasePublishableKey);
}
