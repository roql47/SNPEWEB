-- ============================================================
-- SNPE Supabase 마이그레이션 v9 (260605 — LEVEL 페이지 교육일정 어드민 연동)
-- 실행 방법:
--   1. Supabase 대시보드 → snpe-web 프로젝트
--   2. 좌측 SQL Editor → New query
--   3. 이 파일 전체 복사 → Run
--
-- 목적:
--   각 LEVEL 페이지(LEVEL 1/2/3)의 "교육 일정" 박스(개강/과정/수업시간/수강료/
--   수련장소/모집정원)를 어드민 "교육과정 일정 관리"에서 직접 수정할 수 있도록
--   educations 테이블에 자유 텍스트 필드를 추가합니다. (기존 컬럼/데이터는 유지)
--
--   - location     : 수련 장소 (기존 컬럼 재사용)
--   - schedule_open : 개강 안내  (예: "6월 24일(수) 개강 / 10주 과정 (주2회 / 총 40시간)")
--   - course_period : 과정       (예: "총 12주 · 주 1회 · 총 84시간")
--   - class_time    : 수업 시간  (예: "매주 수요일 (19:00~21:00) / 일요일 (10:00~12:00)")
--   - tuition       : 수강료     (예: "180만원")
--   - capacity_note : 모집 정원  (예: "24명 한정 (선착순 마감)")
-- ============================================================

alter table public.educations add column if not exists schedule_open text;
alter table public.educations add column if not exists course_period text;
alter table public.educations add column if not exists class_time    text;
alter table public.educations add column if not exists tuition       text;
alter table public.educations add column if not exists capacity_note text;
