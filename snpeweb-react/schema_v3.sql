-- ============================================================
-- SNPE Supabase 마이그레이션 v3 (기업특강 + 가맹점 개설 신청 저장)
-- 실행 방법: Supabase 대시보드 → SQL Editor → New query → 붙여넣기 → Run
-- ============================================================

-- ── 기업특강 신청 ────────────────────────────────────────────
create table if not exists public.inquiries (
  id              uuid primary key default gen_random_uuid(),
  organization    text not null,
  manager         text not null,
  phone           text not null,
  email           text not null,
  preferred_date  text,
  participants    integer,
  location_type   text,                -- onsite / center / online
  address         text,
  request_type    text,                -- one-time / regular / wellness / etc
  budget          text,
  message         text,
  status          text default 'new',  -- new / in_progress / done / canceled
  admin_note      text,
  created_at      timestamptz default now()
);

alter table public.inquiries enable row level security;

drop policy if exists "anon_all" on public.inquiries;
create policy "anon_all" on public.inquiries for all to anon using (true) with check (true);

-- ── 가맹점·인증점 개설 문의 ─────────────────────────────────
create table if not exists public.franchise_inquiries (
  id           uuid primary key default gen_random_uuid(),
  type         text not null,         -- center / studio
  name         text not null,
  phone        text not null,
  cert_level   text,                  -- level2 / level3 / inProgress / none
  region       text,
  has_space    text,                  -- owned / reviewing / none
  timing       text,                  -- immediate / 3months / 6months / inquiry
  note         text,
  status       text default 'new',    -- new / in_progress / done / canceled
  admin_note   text,
  created_at   timestamptz default now()
);

alter table public.franchise_inquiries enable row level security;

drop policy if exists "anon_all" on public.franchise_inquiries;
create policy "anon_all" on public.franchise_inquiries for all to anon using (true) with check (true);
