-- ============================================================
-- SNPE 홈페이지 Supabase 스키마
-- Supabase 대시보드 > SQL Editor 에 붙여넣고 실행
-- ============================================================

-- Centers
create table public.centers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  region text not null default '',
  address text not null default '',
  tel text not null default '',
  email text not null default '',
  naver_url text not null default '',
  created_at timestamptz default now()
);

-- Studios
create table public.studios (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner text not null default '',
  tel text not null default '',
  email text not null default '',
  address text not null default '',
  created_at timestamptz default now()
);

-- Notices
create table public.notices (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  date text not null default '',
  content text not null default '',
  pinned boolean not null default false,
  created_at timestamptz default now()
);

-- News
create table public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  date text not null default '',
  source text not null default '',
  url text not null default '',
  summary text not null default '',
  created_at timestamptz default now()
);

-- Activities
create table public.activities (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  date text not null default '',
  location text not null default '',
  description text not null default '',
  category text not null default '',
  image_url text not null default '',
  created_at timestamptz default now()
);

-- Teachers (인증강사)
create table public.teachers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  level text not null default '',
  region text not null default '',
  photo_url text not null default '',
  intro text not null default '',
  featured boolean not null default false,
  created_at timestamptz default now()
);

-- Experience Cases (체험사례)
create table public.experience_cases (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  age text not null default '',
  issue text not null default '',
  period text not null default '',
  content text not null default '',
  created_at timestamptz default now()
);

-- Research Papers (연구논문)
create table public.research_papers (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  authors text not null default '',
  journal text not null default '',
  year text not null default '',
  category text not null default '',
  url text not null default '',
  description text not null default '',
  created_at timestamptz default now()
);

-- ============================================================
-- Row Level Security (공개 읽기 + 관리자 쓰기 허용)
-- ============================================================
alter table public.centers enable row level security;
alter table public.studios enable row level security;
alter table public.notices enable row level security;
alter table public.news enable row level security;
alter table public.activities enable row level security;
alter table public.teachers enable row level security;
alter table public.experience_cases enable row level security;
alter table public.research_papers enable row level security;

create policy "public_all" on public.centers for all using (true) with check (true);
create policy "public_all" on public.studios for all using (true) with check (true);
create policy "public_all" on public.notices for all using (true) with check (true);
create policy "public_all" on public.news for all using (true) with check (true);
create policy "public_all" on public.activities for all using (true) with check (true);
create policy "public_all" on public.teachers for all using (true) with check (true);
create policy "public_all" on public.experience_cases for all using (true) with check (true);
create policy "public_all" on public.research_papers for all using (true) with check (true);
