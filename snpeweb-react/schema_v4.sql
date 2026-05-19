-- ============================================================
-- SNPE Supabase 마이그레이션 v4 (센터 검색 키워드 기능)
-- 실행 방법: Supabase 대시보드 → SQL Editor → New query → 붙여넣기 → Run
-- ============================================================

-- ── centers 테이블에 keywords 컬럼 추가 ──
-- 쉼표로 구분된 검색 키워드 (예: 잠실,신천,석촌,송파)
alter table public.centers
  add column if not exists keywords text default '';
