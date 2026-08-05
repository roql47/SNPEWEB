-- ============================================================
-- SNPE Supabase 테이블 스키마 (재생성용)
-- 사용법:
--   1. Supabase 대시보드 → SQL Editor 진입
--   2. 이 파일 내용 전체 복사 → Run
--   3. node seed.js 실행
-- ============================================================

-- ── centers (전문센터) ──
create table if not exists public.centers (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  region      text,
  address     text,
  tel         text,
  email       text,
  naver_url   text,
  created_at  timestamptz default now()
);

-- ── studios (인증점) ──
create table if not exists public.studios (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  owner       text,
  tel         text,
  email       text,
  address     text,
  created_at  timestamptz default now()
);

-- ── notices (공지사항) ──
create table if not exists public.notices (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  date        date,
  content     text,
  pinned      boolean default false,
  created_at  timestamptz default now()
);

-- ── news (언론보도) ──
create table if not exists public.news (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  date        date,
  source      text,
  url         text,
  summary     text,
  created_at  timestamptz default now()
);

-- ── activities (활동소식) ──
create table if not exists public.activities (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  date         date,
  location     text,
  description  text,
  category     text,
  image_url    text,
  created_at   timestamptz default now()
);

-- ── teachers (인증강사) ──
create table if not exists public.teachers (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  level       text,
  region      text,
  photo_url   text,
  intro       text,
  featured    boolean default false,
  created_at  timestamptz default now()
);

-- ── experience_cases (체험사례) ──
create table if not exists public.experience_cases (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  age         text,
  issue       text,
  period      text,
  content     text,
  created_at  timestamptz default now()
);

-- ── research_papers (연구논문) ──
create table if not exists public.research_papers (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  authors      text,
  journal      text,
  year         text,
  category     text,
  url          text,
  description  text,
  created_at   timestamptz default now()
);

-- ============================================================
-- RLS (Row Level Security) — anon 키로 모든 작업 허용
-- 운영 환경에서는 admin 권한 분리를 권장하지만,
-- 현재 관리자 모드는 anon 키만 사용하므로 전체 허용으로 둠.
-- ============================================================
alter table public.centers          enable row level security;
alter table public.studios          enable row level security;
alter table public.notices          enable row level security;
alter table public.news             enable row level security;
alter table public.activities       enable row level security;
alter table public.teachers         enable row level security;
alter table public.experience_cases enable row level security;
alter table public.research_papers  enable row level security;

-- 정책: anon 역할에 대해 모든 테이블에 SELECT/INSERT/UPDATE/DELETE 허용
do $$
declare t text;
begin
  for t in select unnest(array[
    'centers','studios','notices','news','activities','teachers','experience_cases','research_papers'
  ]) loop
    execute format('drop policy if exists "anon_all" on public.%I', t);
    execute format('create policy "anon_all" on public.%I for all to anon using (true) with check (true)', t);
  end loop;
end$$;
