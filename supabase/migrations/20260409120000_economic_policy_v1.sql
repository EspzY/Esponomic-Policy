create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  cohort text,
  role text not null default 'student' check (role in ('student', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.invites (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  full_name text not null,
  cohort text not null,
  token_hash text not null unique,
  expires_at timestamptz not null,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'revoked', 'expired')),
  created_by uuid references auth.users(id) on delete set null,
  accepted_by uuid references auth.users(id) on delete set null,
  accepted_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.modules (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  kind text not null check (kind in ('lecture', 'symbol_register')),
  summary text not null default '',
  description text not null default '',
  estimated_minutes integer not null default 0,
  tags text[] not null default '{}',
  objectives jsonb not null default '[]'::jsonb,
  citations jsonb not null default '[]'::jsonb,
  publication_status text not null default 'draft' check (publication_status in ('draft', 'published')),
  release_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.module_sections (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.modules(id) on delete cascade,
  slug text not null,
  title text not null,
  summary text not null default '',
  body jsonb not null default '[]'::jsonb,
  equations jsonb not null default '[]'::jsonb,
  checkpoints jsonb not null default '[]'::jsonb,
  citations jsonb not null default '[]'::jsonb,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  unique(module_id, slug)
);

create table if not exists public.source_documents (
  id uuid primary key default gen_random_uuid(),
  module_slug text,
  title text not null,
  source_type text not null,
  storage_bucket text not null,
  storage_path text not null unique,
  mime_type text,
  page_count integer,
  extraction_status text not null default 'uploaded' check (extraction_status in ('uploaded', 'processed', 'failed')),
  is_authoritative boolean not null default true,
  preview_text text,
  metadata jsonb not null default '{}'::jsonb,
  uploaded_by uuid references auth.users(id) on delete set null,
  extracted_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.document_chunks (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.source_documents(id) on delete cascade,
  chunk_index integer not null,
  page_from integer not null,
  page_to integer not null,
  content text not null,
  embedding_json jsonb,
  created_at timestamptz not null default now(),
  unique(document_id, chunk_index)
);

create table if not exists public.symbols (
  id uuid primary key default gen_random_uuid(),
  module_slug text not null default 'symbols',
  symbol text not null,
  spoken_name text,
  definition text not null,
  context_note text,
  status text not null default 'verified' check (status in ('verified', 'not_found_in_material')),
  citations jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.problems (
  id uuid primary key default gen_random_uuid(),
  module_slug text not null,
  slug text not null unique,
  title text not null,
  prompt_lines jsonb not null default '[]'::jsonb,
  equations jsonb not null default '[]'::jsonb,
  citations jsonb not null default '[]'::jsonb,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.problem_steps (
  id uuid primary key default gen_random_uuid(),
  problem_id uuid not null references public.problems(id) on delete cascade,
  step_kind text not null check (step_kind in ('hint', 'next_step', 'full_solution')),
  title text not null,
  content_markdown text not null,
  step_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.quiz_items (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.modules(id) on delete cascade,
  prompt text not null,
  choices jsonb not null default '[]'::jsonb,
  correct_index integer not null,
  explanation text not null,
  tags text[] not null default '{}',
  citations jsonb not null default '[]'::jsonb,
  sort_order integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  module_slug text not null,
  answers jsonb not null default '[]'::jsonb,
  score_pct integer not null,
  weak_tags text[] not null default '{}',
  submitted_at timestamptz not null default now()
);

create table if not exists public.user_module_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  module_slug text not null,
  status text not null default 'not_started' check (status in ('not_started', 'in_progress', 'completed')),
  completed_sections jsonb not null default '[]'::jsonb,
  best_quiz_score integer not null default 0,
  weak_tags text[] not null default '{}',
  last_activity_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, module_slug)
);

create table if not exists public.qa_threads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  module_slug text not null,
  title text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.qa_messages (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.qa_threads(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  mode text not null check (mode in ('qa', 'hint', 'next_step', 'solution_check', 'full_solution')),
  content_markdown text not null,
  citations jsonb not null default '[]'::jsonb,
  confidence_label text,
  created_at timestamptz not null default now()
);

create table if not exists public.ai_usage_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  usage_kind text not null check (usage_kind in ('qa', 'solution_check', 'full_solution')),
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

alter table public.profiles enable row level security;
alter table public.invites enable row level security;
alter table public.modules enable row level security;
alter table public.module_sections enable row level security;
alter table public.source_documents enable row level security;
alter table public.document_chunks enable row level security;
alter table public.symbols enable row level security;
alter table public.problems enable row level security;
alter table public.problem_steps enable row level security;
alter table public.quiz_items enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.user_module_progress enable row level security;
alter table public.qa_threads enable row level security;
alter table public.qa_messages enable row level security;
alter table public.ai_usage_events enable row level security;

create policy "profiles self read" on public.profiles
  for select using (auth.uid() = id or public.is_admin());

create policy "profiles self update" on public.profiles
  for update using (auth.uid() = id or public.is_admin())
  with check (auth.uid() = id or public.is_admin());

create policy "profiles self insert" on public.profiles
  for insert with check (auth.uid() = id or public.is_admin());

create policy "invites admin only" on public.invites
  for all using (public.is_admin())
  with check (public.is_admin());

create policy "modules published read" on public.modules
  for select using (publication_status = 'published' or public.is_admin());

create policy "modules admin write" on public.modules
  for all using (public.is_admin())
  with check (public.is_admin());

create policy "module sections published read" on public.module_sections
  for select using (
    public.is_admin() or exists (
      select 1 from public.modules
      where modules.id = module_sections.module_id
        and modules.publication_status = 'published'
    )
  );

create policy "module sections admin write" on public.module_sections
  for all using (public.is_admin())
  with check (public.is_admin());

create policy "source documents admin only" on public.source_documents
  for all using (public.is_admin())
  with check (public.is_admin());

create policy "document chunks admin only" on public.document_chunks
  for all using (public.is_admin())
  with check (public.is_admin());

create policy "symbols published read" on public.symbols
  for select using (true);

create policy "symbols admin write" on public.symbols
  for all using (public.is_admin())
  with check (public.is_admin());

create policy "problems published read" on public.problems
  for select using (is_published or public.is_admin());

create policy "problems admin write" on public.problems
  for all using (public.is_admin())
  with check (public.is_admin());

create policy "problem steps published read" on public.problem_steps
  for select using (
    public.is_admin() or exists (
      select 1 from public.problems
      where problems.id = problem_steps.problem_id
        and problems.is_published = true
    )
  );

create policy "problem steps admin write" on public.problem_steps
  for all using (public.is_admin())
  with check (public.is_admin());

create policy "quiz items published read" on public.quiz_items
  for select using (
    is_published = true or public.is_admin()
  );

create policy "quiz items admin write" on public.quiz_items
  for all using (public.is_admin())
  with check (public.is_admin());

create policy "quiz attempts own read" on public.quiz_attempts
  for select using (auth.uid() = user_id or public.is_admin());

create policy "quiz attempts own insert" on public.quiz_attempts
  for insert with check (auth.uid() = user_id or public.is_admin());

create policy "module progress own read" on public.user_module_progress
  for select using (auth.uid() = user_id or public.is_admin());

create policy "module progress own write" on public.user_module_progress
  for all using (auth.uid() = user_id or public.is_admin())
  with check (auth.uid() = user_id or public.is_admin());

create policy "qa threads own read" on public.qa_threads
  for select using (auth.uid() = user_id or public.is_admin());

create policy "qa threads own insert" on public.qa_threads
  for insert with check (auth.uid() = user_id or public.is_admin());

create policy "qa messages own read" on public.qa_messages
  for select using (
    public.is_admin() or exists (
      select 1 from public.qa_threads
      where qa_threads.id = qa_messages.thread_id
        and qa_threads.user_id = auth.uid()
    )
  );

create policy "qa messages own insert" on public.qa_messages
  for insert with check (
    public.is_admin() or exists (
      select 1 from public.qa_threads
      where qa_threads.id = qa_messages.thread_id
        and qa_threads.user_id = auth.uid()
    )
  );

create policy "ai usage own read" on public.ai_usage_events
  for select using (auth.uid() = user_id or public.is_admin());

create policy "ai usage own insert" on public.ai_usage_events
  for insert with check (auth.uid() = user_id or public.is_admin());

insert into storage.buckets (id, name, public)
values
  ('course-documents', 'course-documents', false),
  ('figure-assets', 'figure-assets', false)
on conflict (id) do nothing;

create policy "course documents admin access" on storage.objects
  for all using (bucket_id in ('course-documents', 'figure-assets') and public.is_admin())
  with check (bucket_id in ('course-documents', 'figure-assets') and public.is_admin());
