alter table public.module_sections
  add column if not exists content_blocks jsonb not null default '[]'::jsonb;

alter table public.problems
  add column if not exists supporting_equations jsonb not null default '[]'::jsonb;

create table if not exists public.notation_entries (
  id text primary key,
  module_slug text,
  kind text not null check (kind in ('symbol', 'parameter', 'abbreviation', 'shock', 'operator')),
  display_latex text not null,
  spoken_name text not null default '',
  plain_meaning text not null default '',
  why_it_matters text not null default '',
  where_it_appears jsonb not null default '[]'::jsonb,
  common_confusions jsonb not null default '[]'::jsonb,
  related_terms jsonb not null default '[]'::jsonb,
  status text not null default 'verified' check (status in ('verified', 'not_found_in_material')),
  citations jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists notation_entries_module_slug_idx
  on public.notation_entries (module_slug);

create index if not exists notation_entries_kind_idx
  on public.notation_entries (kind);

alter table public.notation_entries enable row level security;

drop policy if exists "notation entries published read" on public.notation_entries;
create policy "notation entries published read" on public.notation_entries
  for select using (true);

drop policy if exists "notation entries admin write" on public.notation_entries;
create policy "notation entries admin write" on public.notation_entries
  for all using (public.is_admin())
  with check (public.is_admin());
