const env = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL,
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabasePublishableKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  openAiApiKey: process.env.OPENAI_API_KEY,
  openAiRuntimeModel: process.env.OPENAI_RUNTIME_MODEL ?? "gpt-5-mini",
  openAiAuthoringModel: process.env.OPENAI_AUTHORING_MODEL ?? "gpt-5",
  huggingFaceApiKey: process.env.HUGGINGFACE_API_KEY,
  huggingFaceEmbeddingModel:
    process.env.HUGGINGFACE_EMBEDDING_MODEL ?? "BAAI/bge-m3",
};

export function isSupabaseConfigured() {
  return Boolean(
    env.supabaseUrl &&
      env.supabasePublishableKey &&
      env.supabaseServiceRoleKey,
  );
}

export function isOpenAiConfigured() {
  return Boolean(env.openAiApiKey);
}

export function isHuggingFaceConfigured() {
  return Boolean(env.huggingFaceApiKey);
}

export function getRequiredServerEnv() {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase environment variables are missing.");
  }

  return {
    supabaseUrl: env.supabaseUrl!,
    supabasePublishableKey: env.supabasePublishableKey!,
    supabaseServiceRoleKey: env.supabaseServiceRoleKey!,
  };
}

export { env };
