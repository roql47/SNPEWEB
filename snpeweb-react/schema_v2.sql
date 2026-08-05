-- ============================================================
-- SNPE Supabase 마이그레이션 v2 (TODO3 4-2 ~ 4-5 지원)
-- 실행 방법:
--   1. Supabase 대시보드(https://supabase.com/dashboard) → snpe-web 프로젝트
--   2. 좌측 SQL Editor → New query
--   3. 이 파일 전체 복사 → Run
-- ============================================================

-- ── #26 (4-5): teachers.ambassador 컬럼 추가 ──
alter table public.teachers
  add column if not exists ambassador boolean default false;

-- 기존 featured(우수강사) 강사를 일단 그대로 둠. ambassador는 운영자가 직접 체크.

-- ── #22 (4-2-FAQ): FAQ 테이블 신설 ──
create table if not exists public.faqs (
  id          uuid primary key default gen_random_uuid(),
  category    text not null,        -- 운동 / 수강신청 / 강사관련 / 출강관련 / 기타
  question    text not null,
  answer      text not null,
  sort_order  integer default 0,
  created_at  timestamptz default now()
);

-- 중복 방지: question 컬럼에 unique 제약 (같은 질문 중복 입력 차단)
alter table public.faqs drop constraint if exists faqs_question_unique;
alter table public.faqs add constraint faqs_question_unique unique (question);

alter table public.faqs enable row level security;

drop policy if exists "anon_all" on public.faqs;
create policy "anon_all" on public.faqs for all to anon using (true) with check (true);

-- ── #22 (4-2-교육과정): 교육 일정 테이블 신설 ──
-- 1·2·3급 / 마스터 / 기업특강 / 문화센터 / 직무교육 통합 관리
create table if not exists public.educations (
  id           uuid primary key default gen_random_uuid(),
  category     text not null,       -- level1 / level2 / level3 / master / company / culture / training
  title        text not null,
  start_date   date,
  end_date     date,
  location     text,
  capacity     integer,
  status       text default 'open', -- open / closing / closed / done
  description  text,
  apply_url    text,
  created_at   timestamptz default now()
);

alter table public.educations enable row level security;

drop policy if exists "anon_all" on public.educations;
create policy "anon_all" on public.educations for all to anon using (true) with check (true);

-- ── 시드 데이터 (FAQ 9건) — 기존 Faq.jsx 하드코딩 데이터를 DB에 이전 ──
insert into public.faqs (category, question, answer, sort_order) values
  ('운동',     'SNPE 운동은 어떤 도구가 필요한가요?',                    '바른자세벨트, 다나송(SNPE 전용 스트랩), 웨이브베개가 기본 도구입니다. SNPE SHOP에서 구매하실 수 있습니다.',                                                  1),
  ('운동',     '운동 초보자도 할 수 있나요?',                            '네, SNPE는 누구나 할 수 있는 셀프 운동법입니다. 입문자 가이드와 영상을 참고하시거나, 전문센터에서 기초부터 배우실 수 있습니다.',                  2),
  ('운동',     '디스크 환자도 SNPE 운동을 할 수 있나요?',                '경미한 디스크 증상의 경우 도움이 될 수 있지만, 반드시 전문 의료인과 상담 후 전문 강사의 지도 아래 진행하시길 권장합니다.',                       3),
  ('수강신청', '전문센터 수강은 어떻게 신청하나요?',                     '전문센터 검색에서 가까운 센터를 찾으신 후 직접 연락하시거나, 온라인 수강신청 페이지에서 신청하실 수 있습니다.',                                  4),
  ('수강신청', '온라인으로도 수업을 들을 수 있나요?',                    '네, 온라인 교육 플랫폼을 통해 실시간 및 녹화 수업을 수강하실 수 있습니다.',                                                                       5),
  ('강사관련', '인증강사가 되려면 어떻게 해야 하나요?',                  'Level 3 입문과정부터 시작하여 Level 2, Level 1까지 단계적으로 교육과 시험을 통해 인증강사 자격을 취득하실 수 있습니다.',                          6),
  ('강사관련', '자격시험은 언제 있나요?',                                '연 2~3회 정기적으로 시행됩니다. 공지사항에서 정확한 일정을 확인하세요.',                                                                            7),
  ('출강관련', '기업 출강은 어떻게 요청하나요?',                         '고객 문의 또는 전화(02-539-2925)로 기업 출강 상담을 요청하실 수 있습니다.',                                                                        8),
  ('기타',     'SNPE SHOP에서 어떤 제품을 구매할 수 있나요?',            '바른자세벨트, 다나송, 웨이브베개, SNPE 서적 등 다양한 운동 도구와 교재를 구매하실 수 있습니다.',                                                  9)
on conflict (question) do nothing;

-- ── 메인 홈 직영점 관리 ──
create table if not exists public.branches (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,          -- 강남점
  subtitle    text,                   -- 강남본원
  address     text,
  image_url   text,
  map_url     text,
  sort_order  integer default 0,      -- 표시 순서 (오름차순)
  created_at  timestamptz default now()
);

alter table public.branches enable row level security;
drop policy if exists "anon_all" on public.branches;
create policy "anon_all" on public.branches for all to anon using (true) with check (true);

-- 기존 직영점 3곳 시드 데이터
insert into public.branches (name, subtitle, address, image_url, map_url, sort_order) values
  ('강남점', '강남본원', '서울시 강남구 봉은사로 68길 8, 4층', '/images/center3.png', 'https://map.naver.com/p/entry/place/1344095407', 1),
  ('대치점', '대치본점', '서울시 강남구 역삼로 542, 2층',      '/images/center2.png', 'https://map.naver.com/p/entry/place/1203617850', 2),
  ('잠실점', '잠실본점', '서울시 송파구 올림픽로 289, 3층',    '/images/center1.png', 'https://map.naver.com/p/entry/place/1172997051', 3)
on conflict do nothing;

-- ── 공지사항 팝업 노출 기능 (메인 홈 모달) ──
-- popup_active: 팝업 노출 ON/OFF
-- popup_image_url: 배너 이미지 URL (옵션, 비우면 제목/내용 텍스트로 표시)
-- popup_link_url: 클릭 시 이동할 URL (옵션, 새 탭)
-- popup_start_date / popup_end_date: 노출 기간 (옵션, NULL이면 무기한)
alter table public.notices
  add column if not exists popup_active     boolean default false,
  add column if not exists popup_image_url  text,
  add column if not exists popup_link_url   text,
  add column if not exists popup_start_date date,
  add column if not exists popup_end_date   date;

-- ── 체험사례 상세 콘텐츠 컬럼 추가 ──
alter table public.experience_cases
  add column if not exists detail text,
  add column if not exists image_url text;

-- ── Supabase Storage 버킷 생성 (이미지 업로드용) ──
-- 한 번만 실행. 이미 존재하면 무시됨.
insert into storage.buckets (id, name, public)
values ('page-images', 'page-images', true)
on conflict (id) do nothing;

-- 익명 사용자에게 업로드/조회 권한 부여 (어드민 페이지가 anon key 사용)
drop policy if exists "anon_upload_page_images" on storage.objects;
create policy "anon_upload_page_images" on storage.objects
  for insert to anon with check (bucket_id = 'page-images');

drop policy if exists "anon_read_page_images" on storage.objects;
create policy "anon_read_page_images" on storage.objects
  for select to anon using (bucket_id = 'page-images');

drop policy if exists "anon_delete_page_images" on storage.objects;
create policy "anon_delete_page_images" on storage.objects
  for delete to anon using (bucket_id = 'page-images');

-- ── 페이지 콘텐츠 CMS (slug 단위 JSONB 저장) ──
-- 자격증 안내 등 정적 페이지의 텍스트 섹션을 어드민에서 편집 가능하게 함
create table if not exists public.page_contents (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  content     jsonb not null default '{}'::jsonb,
  updated_at  timestamptz default now()
);

alter table public.page_contents enable row level security;
drop policy if exists "anon_all" on public.page_contents;
create policy "anon_all" on public.page_contents for all to anon using (true) with check (true);

-- Degree 페이지 시드 데이터 (현재 하드코딩 콘텐츠 그대로)
insert into public.page_contents (slug, content) values ('degree', '{
  "intro": {
    "title": "SNPE 교육 소개",
    "body": "SNPE 교육은 신체의 구조적 균형을 이해하고 올바른 움직임을 통해 건강한 몸을 만들어가는 교육 프로그램입니다.\n단순한 운동 방법을 배우는 것을 넘어, 신체 구조와 움직임의 원리를 이해하고 스스로 몸을 관리할 수 있도록 돕는 것을 목표로 합니다."
  },
  "philosophy": {
    "title": "SNPE 교육 철학",
    "items": [
      "신체의 구조적 균형을 회복하고 건강한 움직임을 통해 몸을 관리할 수 있도록 돕는 것을 목표로 합니다.",
      "올바른 자세 인식과 신체 사용 방법을 이해하고 실천할 수 있도록 이론과 실습을 함께 교육합니다.",
      "예방 중심의 건강관리 철학을 바탕으로 지속 가능한 신체 관리 방법을 제시합니다."
    ]
  },
  "features": {
    "title": "SNPE 교육 특징",
    "items": [
      { "icon": "Layers",   "title": "체계적인 단계별 교육 시스템", "desc": "LEVEL 1부터 LEVEL 3까지 단계적으로 구성되어 운동 이해부터 지도 역량까지 체계적으로 학습할 수 있습니다." },
      { "icon": "BookOpen", "title": "이론과 실습이 결합된 교육",  "desc": "신체 구조와 운동 원리를 이론으로 이해하고 실제 동작 실습을 통해 몸의 변화를 경험하며 학습합니다." },
      { "icon": "Users",    "title": "티칭 중심 지도자 교육",      "desc": "LEVEL 2부터는 실제 지도 상황을 중심으로 티칭 방법을 배우며 지도자로서 필요한 교육 역량을 강화합니다." },
      { "icon": "Target",   "title": "현장에서 활용 가능한 실전 교육", "desc": "센터 수업, 그룹 수업, 개인 지도 등 실제 현장에서 활용할 수 있는 운동 지도 방법을 중심으로 교육이 진행됩니다." }
    ]
  },
  "target": {
    "title": "SNPE 교육 대상",
    "intro": "SNPE 교육은 운동을 체계적으로 배우고 싶은 분부터 전문 지도자를 목표로 하는 분까지 다양한 분들이 참여할 수 있습니다.",
    "items": [
      "SNPE 운동을 체계적으로 배우고 싶은 분",
      "자신의 자세와 신체 균형을 이해하고 관리하고 싶은 분",
      "건강 관리 및 운동 분야에 관심이 있는 분",
      "운동 지도자로 활동하고 싶은 분",
      "기존 운동 지도 경험에 전문성을 더하고 싶은 분"
    ]
  },
  "roadmap": {
    "title": "SNPE 교육 구조",
    "intro": "LEVEL 1 → LEVEL 2 → LEVEL 3 순으로 교육이 진행되며, 운동의 이해부터 지도 역량까지 단계적으로 학습할 수 있도록 설계되어 있습니다.",
    "items": [
      { "level": "LEVEL 1", "name": "SNPE 기초 수료 과정", "desc": "운동 원리 및 기본 동작 이해", "path": "/level1" },
      { "level": "LEVEL 2", "name": "SNPE 지도자 자격 과정", "desc": "티칭 중심 지도자 교육", "path": "/level2" },
      { "level": "LEVEL 3", "name": "SNPE 전문가 과정", "desc": "지도 역량 심화 교육", "path": "/level3" }
    ]
  },
  "career": {
    "title": "교육 후 진로",
    "items": [
      "SNPE 센터 강의, 그룹 운동 지도, 개인 운동 지도 등 다양한 형태로 활동 가능",
      "SNPE 운동을 기반으로 건강 관리와 운동 교육 분야 전문성 확장",
      "지속적인 교육과 경험을 통해 전문 지도자로 성장"
    ]
  },
  "contact": {
    "title": "문의 안내",
    "intro": "교육 과정 관련 문의는 아래 채널을 통해 가능합니다.",
    "team": "교육 운영팀 문의",
    "email": "contact@mycuring.com",
    "phone": "02-539-2925",
    "hours": "평일 10:00 ~ 16:00"
  }
}'::jsonb)
on conflict (slug) do nothing;
