-- ============================================================
-- SNPE Supabase 마이그레이션 v5 (인증강사 개인정보 필드 추가)
-- 실행 방법: Supabase 대시보드 → SQL Editor → New query → 붙여넣기 → Run
-- ============================================================

-- ── teachers 테이블에 전화번호·생년월일 컬럼 추가 ──
-- 동명이인 확인용 (어드민 전용, 공개 검색 페이지에 미노출)
alter table public.teachers
  add column if not exists phone      text default '',
  add column if not exists birth_date text default '';
