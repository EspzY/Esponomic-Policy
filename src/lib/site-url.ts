import { env } from "@/lib/env";

function normalizeUrl(value: string) {
  return value.startsWith("http://") || value.startsWith("https://")
    ? value
    : `https://${value}`;
}

export function getAppUrl(request?: Request) {
  if (env.appUrl) {
    return env.appUrl;
  }

  const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProductionUrl) {
    return normalizeUrl(vercelProductionUrl);
  }

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) {
    return normalizeUrl(vercelUrl);
  }

  if (request) {
    return new URL(request.url).origin;
  }

  return "http://localhost:3000";
}
