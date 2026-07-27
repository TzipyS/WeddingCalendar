-- הריצו את הסקריפט הזה ב-Supabase SQL Editor

create table if not exists public.wishes (
  id uuid primary key default gen_random_uuid(),
  author_name text not null check (char_length(author_name) <= 80),
  message text not null check (char_length(message) <= 500),
  created_at timestamptz not null default now()
);

create index if not exists wishes_created_at_idx on public.wishes (created_at desc);

alter table public.wishes enable row level security;

-- כולם יכולים לקרוא
create policy "Anyone can read wishes"
  on public.wishes for select
  using (true);

-- כולם יכולים לכתוב
create policy "Anyone can insert wishes"
  on public.wishes for insert
  with check (true);

-- כולם יכולים למחוק (כפי שביקשתם)
create policy "Anyone can delete wishes"
  on public.wishes for delete
  using (true);
