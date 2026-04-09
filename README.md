# Economic Policy v1

Invite-only learning platform for the Economic Policy course. The app is built with Next.js App Router for Vercel, Supabase for Auth/DB/Storage, and a hybrid tutor layer that combines source-grounded retrieval with OpenAI-generated teaching support.

## What ships in v1

- Invite-only registration with per-person tokens
- Landing page with login and clear invite-only messaging
- Dashboard with progress overview, quiz results, and weak-tag review hints
- Module 1 symbol register with verified citations
- Lecture 2 learning module with section completion and source notes
- Practice workspace with hint, next-step, full-solution, and check-my-solution modes
- Admin pages for invites, PDF uploads, extraction, and curated module publishing
- Supabase migration covering schema, RLS, and private storage buckets
- Demo fallback mode so the app remains explorable before env vars are configured

## Stack

- Next.js App Router
- React 19
- Tailwind CSS 4
- Supabase Auth, Postgres, and Storage
- OpenAI Responses API
- Hugging Face Inference API
- `pdfjs-dist` for PDF text extraction

## Environment

Copy `.env.example` to `.env.local` and fill in:

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
OPENAI_RUNTIME_MODEL=gpt-5-mini
OPENAI_AUTHORING_MODEL=gpt-5
HUGGINGFACE_API_KEY=
HUGGINGFACE_EMBEDDING_MODEL=BAAI/bge-m3
```

## Local development

```bash
npm install
npm run dev
```

Useful checks:

```bash
npm run lint
npm run typecheck
npm run build
npm run check
```

## Supabase setup

Apply the migration in:

- `supabase/migrations/20260409120000_economic_policy_v1.sql`

This project assumes a fresh Supabase project for the course, separate from the older survey schema.

For production on Vercel, set `NEXT_PUBLIC_APP_URL` to your canonical app URL and also update Supabase Auth URL configuration so recovery and future email-based flows point back to the deployed app.

## Product routes

Student-facing:

- `/`
- `/invite/[token]`
- `/dashboard`
- `/modules/symbols`
- `/modules/lecture-2`
- `/modules/[slug]/quiz`
- `/practice/[problemSlug]`

Admin:

- `/admin/invites`
- `/admin/uploads`
- `/admin/modules`

## Notes

- Demo content is seeded from `src/lib/demo-content.ts`.
- PDF files are expected to stay local/private and be uploaded through the admin flow rather than committed to Git.
- Fact-style tutor answers are designed to fall back to "not enough evidence" instead of guessing when source support is weak.
