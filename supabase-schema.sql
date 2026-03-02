-- 経営革新 AI アシスト — Supabase 初期スキーマ
-- Dashboard > SQL Editor で実行してください

-- プロフィール（認証ユーザーと1対1）
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  name text not null default '',
  role text not null default 'member' check (role in ('member','admin')),
  ok boolean not null default false,
  region text,
  aff_code text not null default '',
  refs integer not null default 0,
  comm integer not null default 0,
  perms jsonb not null default '{"innovation":0,"subsidy":0,"report":0,"other":0}',
  fd jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- RLS: 自分の行は読める・更新可。管理者は全件読める・更新可
alter table public.profiles enable row level security;

create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_select_admin"
  on public.profiles for select
  using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

create policy "profiles_update_admin"
  on public.profiles for update
  using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- 初回管理者用: 手動で1件追加するか、初回サインアップしたユーザーを admin に昇格
-- insert into auth.users は Dashboard から行うか、Supabase Auth で最初のユーザーを作成後:
-- update public.profiles set role = 'admin', ok = true where email = 'admin@example.com';
