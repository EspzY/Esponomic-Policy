# Economic Policy v1

Invite-only learning platform for the Economic Policy course. The app is built with Next.js App Router for Vercel, Supabase for Auth/DB/Storage, and a hybrid tutor layer that can use Hugging Face embeddings plus OpenAI Responses.

## What is implemented

- Invite-only registration with per-person tokens
- Landing page + login
- Dashboard with module cards, progress summary, and weak-tag review hints
- Module 1 symbol register
- Lecture 2 learning module with source notes and section completion
- Problem workspace with hint / next-step / check-my-solution / full-outline modes
- Runtime quiz submission and progress updates
- Admin pages for invites, PDF uploads/processing, and curated module publishing
- Supabase migration covering tables, storage buckets, and RLS
- Demo fallback mode when Supabase env vars are not configured yet

## Environment

Copy `.env.example` to `.env.local` and fill in:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
OPENAI_RUNTIME_MODEL=gpt-5-mini
OPENAI_AUTHORING_MODEL=gpt-5
HUGGINGFACE_API_KEY=
HUGGINGFACE_EMBEDDING_MODEL=BAAI/bge-m3
```

## Useful commands

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
npm run check
```

## Supabase

Apply the migration in:

- `supabase/migrations/20260409120000_economic_policy_v1.sql`

The implementation assumes a fresh Supabase project for the course, not the older survey schema.
