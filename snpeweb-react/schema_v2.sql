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
