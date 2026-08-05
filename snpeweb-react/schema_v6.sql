-- ============================================================
-- SNPE Supabase 마이그레이션 v6 (20260529 수정사항)
-- 실행 방법:
--   1. Supabase 대시보드 → snpe-web 프로젝트
--   2. 좌측 SQL Editor → New query
--   3. 이 파일 전체 복사 → Run
-- ※ schema_v2.sql 의 popup_* 컬럼이 아직 적용되지 않았다면 함께 실행됩니다.
-- ============================================================

-- ── 1) 공지사항 컬럼 보강 ─────────────────────────────────────
-- 공지 추가가 실패하던 원인: content_html / popup_* 컬럼이 DB에 없을 수 있음
-- (관리 화면은 항상 해당 필드를 전송하므로 컬럼이 없으면 INSERT 실패)
alter table public.notices
  add column if not exists content_html     text,
  add column if not exists popup_active     boolean default false,
  add column if not exists popup_image_url  text,
  add column if not exists popup_link_url   text,
  add column if not exists popup_start_date date,
  add column if not exists popup_end_date   date;

-- ── 2) "홈페이지 리뉴얼" 공지를 팝업으로 노출 ──────────────────
-- 기간 제한 없이(무기한) 노출되도록 설정. 필요 시 관리 화면에서 기간/해제 조정.
update public.notices
set popup_active = true,
    popup_start_date = null,
    popup_end_date = null
where title like '%리뉴얼%';

-- ── 3) 인증강사(teachers) 컬럼 보강 ──────────────────────────
-- 엑셀 업로드/삭제 기능이 사용하는 컬럼. 과거 마이그레이션(v2/v5)에 포함돼 있으나
-- 누락된 환경을 대비해 멱등(if not exists)하게 재확인합니다.
alter table public.teachers
  add column if not exists phone      text default '',
  add column if not exists birth_date text default '',
  add column if not exists ambassador boolean default false;

-- ── 4) (참고) 콘텐츠는 코드에 하드코딩되었습니다 ─────────────────
-- /level2, /master, /programs, /assessment 페이지는 React 컴포넌트로 렌더링되며
-- Gamma 이미지(public/images/level2, /master)를 포함합니다. 별도 DB 시드가 필요 없습니다.
