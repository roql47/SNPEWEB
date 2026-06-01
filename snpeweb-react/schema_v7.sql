-- ============================================================
-- SNPE Supabase 마이그레이션 v7 (260601 PPT 슬라이드 1 — 직영점 주소)
-- 실행 방법:
--   1. Supabase 대시보드 → snpe-web 프로젝트
--   2. 좌측 SQL Editor → New query
--   3. 이 파일 전체 복사 → Run
-- ※ 또는 관리자 화면 "직영점 관리"에서 각 카드 주소를 직접 수정해도 됩니다.
-- ============================================================

-- ── 직영점(branches) 주소를 260601 PPT 슬라이드 텍스트 기준으로 반영 ──
-- 기존 행만 업데이트(멱등). 매칭되는 행이 없으면 변경 없음.
do $$
begin
  -- 강남본원
  update public.branches
    set address = '서울시 강남구 선릉로 823, 3층'
    where name ilike '%강남%' or subtitle ilike '%강남%';

  -- 대치본점
  update public.branches
    set address = '서울시 강남구 선릉로 324, 5층'
    where name ilike '%대치%' or subtitle ilike '%대치%';

  -- 잠실본점
  update public.branches
    set address = '서울시 송파구 석촌호수로 94, 6층'
    where name ilike '%잠실%' or subtitle ilike '%잠실%';
end $$;
