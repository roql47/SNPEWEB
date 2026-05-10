# SNPE 홈페이지 3차 피드백 TODO

- **수신일**: 2026년 4월 19일
- **상태 표기**: `[ ]` 미완료 / `[x]` 완료 / `🟡 진행중` / `⏳ 외부 자료 대기`

---

## 0. 진행 완료 (2026-04-19 세션)

> TODO3 항목 외에 디자인/에셋 정합 작업으로 추가 진행된 작업 기록.

- [x] **헤더 리디자인** — 민트 유틸리티 바 + 흰색 반투명 네비게이션 (`bg-white/85 + backdrop-blur-md`)
  - 위치: `src/components/layout/Header.jsx`
- [x] **로고 SVG 적용** — Header / Login / Register 페이지 일괄 교체
  - `/images/기본로고_01.svg` (다크 텍스트 + 민트 심볼)
  - 위치: `Header.jsx`, `pages/auth/Login.jsx`, `pages/auth/Register.jsx`
- [x] **Favicon 민트 버전 교체** — `/images/ver2.svg`
  - 위치: `index.html`
- [x] **서브페이지 배너 5장 카테고리별 매핑** (`sub_banner_1~5.jpg`)
  - SNPE 소개 / 운동정보 / 교육과정 / 소식 / 고객지원
  - 위치: `src/components/common/PageBanner.jsx`
- [x] **서브 배너 4:1 종횡비 고정** — 데스크톱 상하 잘림 해소
- [x] **메인 직영점 카드 사진 적용** (`center1~3.png`)
- [x] **기본동작 4종 신규 에셋 적용** (`position_1~4.png`) — 홈/운동정보 양쪽
- [x] **Core Movement 4종 신규 에셋 적용** (`C/L/T/SC-move.png`)

### 추가 진행 (2026-05-10 세션)
- [x] **#9 푸터 회사정보 접기/펼치기 토글** — 회사명 옆 chevron 아이콘 + grid-rows 슬라이드 애니메이션
  - 위치: `Footer.jsx`
- [x] **#10 카피라이트 연도 동적 처리** — `2024` 하드코딩 → `{{year}}` interpolation (4개 언어)
  - 위치: `Footer.jsx`, `locales/{ko,en,ja,zh}.json`
- [x] **#13 STUDIOS 영문 라벨 제거** — 한글 `SNPE 직영점` 타이틀만 노출
  - 위치: `MainCarousel.jsx`
- [x] **헤더 반투명 frosted glass 적용** — 모든 페이지에서 일관된 `backdrop-blur` + 반투명 흰색 (스크롤 시 자연스러운 불투명 전환)
  - 로고 `기본로고_01.svg` → `기본로고_02.svg` 교체 (데스크톱·모바일)
  - 위치: `Header.jsx`
- [x] **#14 운동정보 메뉴 순서 재정렬 + 신규 메뉴** — 입문자 → 셀프 체형분석 → 기본동작 → 체험사례 → SNPE 운동 경험
  - 위치: `navigation.js`
- [x] **#16 SNPE 운동 경험 페이지 신규 생성** — 3개 하이라이트 카드 + 신문구 배너 + 4개 언어 i18n
  - 위치: `SnpeExperience.jsx` (신규), `App.jsx`, `PageBanner.jsx`, `locales/*.json`
- [x] **#17 셀프 체형분석 — AI 단어 제거 + iOS 추후 안내** — Google Play만 활성, App Store는 비활성 회색 박스
  - 위치: `SnpeApp.jsx`, `AppSection.jsx`, `locales/*.json` (`home.appDesc`)
- [x] **#15 체험사례 페이지 — 상단 전문센터 배너 제거** + 콘텐츠 미등록 시 빈 상태 안내 추가
  - 위치: `ExperienceCase.jsx`
- [x] **#18 인증강사 안내 LEVEL 1~3 → 2~3**
  - 위치: `CertTeacher.jsx`
- [x] **#19 영업권 보장 — 양쪽 컬럼 통일** (전문센터 + STUDIO 모두 반경 1km 이내 보호)
  - 위치: `Franchise.jsx` (km 수치 운영팀 확정 시 1줄 교체)
- [x] **#20 개설 절차 1단계 라벨** `교육 일정 확인` → `개설 문의`
  - 위치: `Franchise.jsx`
- [x] **#21 Supabase 프로젝트 Resume — 데이터 무손실 복구**
  - 원인: Free Tier 자동 paused (`2026-05-06` 시작, 86일 안에 resume 가능)
  - 처리: 대시보드에서 Resume project 클릭 → 부팅 → schema cache 갱신 후 정상화
  - 모든 테이블 데이터 그대로 보존 (사용자 추가분 포함: news +1, experience_cases +6)
  - 후속 권장: Pro 플랜 업그레이드 또는 주기적 healthcheck로 재발 방지
- [x] **#22 FAQ + 교육과정 관리 페이지 신설**
  - 신규: `AdminFaqs.jsx`, `AdminEducations.jsx`, `dataStore.getFaqs/Educations(...)`
  - DB 신규 테이블 2개 (`schema_v2.sql`로 일괄 적용)
- [x] **#24 전문센터/STUDIO CRUD 동작 검증**
  - `AdminCenters.jsx`, `AdminStudios.jsx` 모두 정상 동작 확인
- [x] **#25 인증강사 엑셀 일괄 업로드 + 이미지 미리보기**
  - `xlsx` 패키지 신규 설치, 양식 다운로드 / 업로드 / 결과 알림 토스트
  - 모달 내 사진 URL 입력 시 실시간 미리보기
- [x] **#26 인증강사 앰배서더 분리**
  - `teachers.ambassador` 컬럼 신설 (`schema_v2.sql` ALTER TABLE)
  - `CertTeacher.jsx`: 앰배서더 = 메인 카드 그리드 노출, 일반 강사는 검색 시에만 노출
  - 관리자 페이지에 `Crown`/`Star` 두 가지 토글 분리
- [x] **#7 Research & Media SNS 통합** — 메인 SNS 행 제거 + 푸터로 일원화
  - 신규: `src/data/socialLinks.js` 단일 source of truth (운영자 URL 변경 시 이 파일 1줄 수정으로 전역 반영)
  - URL 정합성 확보 (Instagram·Blog·Kakao가 메인/푸터 간 달랐던 문제 해결)
  - 교보문고(E-Book) 링크를 검색 결과 페이지로 명확화
- [x] **#7 운동영상 카드 → YouTube 영상 직접 연결** + 호버 재생 버튼 오버레이
  - 위치: `ResearchSlider.jsx`, `App.jsx` (`/snpe-video`/`/snpevideo` 모두 외부 영상으로 redirect)
- [x] **🚨 신청 폼 데이터 손실 문제 해결 — 기업특강 + 가맹점 개설 문의를 DB에 저장**
  - 신규 테이블: `inquiries`, `franchise_inquiries` (`schema_v3.sql` 적용 완료)
  - dataStore: `addInquiry/getInquiries/...`, `addFranchiseInquiry/...` CRUD 추가
  - 사용자 페이지: `CustomerInquiry.jsx`, `Franchise.jsx` 제출 시 실제 DB 저장 (이전엔 화면만 바뀌고 데이터 사라졌음)
  - 관리자 페이지: `AdminInquiries.jsx` 신설 — 탭으로 기업특강/가맹점 분리, 상태(신규→상담중→완료→취소) 관리, 상세 조회 + 관리자 메모
  - 대시보드 카드 + 사이드바 최상단 메뉴 + 신규 건수 빨간 뱃지 표시
  - **운영 영향**: 이전까지 신청자 폼 작성 → "접수되었습니다" 메시지 → 운영자에게 전달 0건이었음. 이제부터 모든 신청이 DB에 누적되어 운영자가 admin에서 처리 가능

---

## 1. 홈페이지 (Main)

### 1-1. SNPE Research & Media — 바로가기 아이콘 통합 (#7) ✅ 완료
- [x] 홈 중간 `SNPE Research & Media` 영역의 SNS 행 **제거**
  - 푸터 SNS 영역과 중복되어 단일 노출로 정리 (메인은 Research·Press·Video 콘텐츠에 집중)
  - 위치: `ResearchSlider.jsx` (SNS `<ul>` 블록 + `snsLinks` 데이터 + 미사용 lucide import 제거)
- [x] **데이터 단일화** — `src/data/socialLinks.js` 신규 생성
  - Footer + 향후 어떤 페이지에서든 import해서 동일 URL/라벨 자동 일치
  - 운영자가 URL 변경 시 이 파일만 1줄 수정 → 전역 자동 반영
- [x] **URL 정합성 확인 및 통일** — 두 곳에 분산되어 있던 SNS URL이 서로 달랐던 문제 해결
  - 통일 전 불일치: Instagram(`snpe_official` vs `snpe_korea`), Blog(`snpe` vs `snpekorea`), Kakao(`snpe` vs `_Tqyxib` placeholder)
  - 운영 검증된 Footer 기준으로 통일 (실제 운영 URL): `snpe_korea` / `snpekorea` / `_Tqyxib`
  - ※ Instagram 공식 계정이 `snpe_korea`가 아니라면 운영팀이 `socialLinks.js` 1줄 교체 필요
- [x] 교보문고(E-Book) 링크 **명확화** — `kyobobook.co.kr` 메인 → `search.kyobobook.co.kr/search?keyword=SNPE` 검색 결과 페이지
  - ※ 운영팀이 SNPE 대표 도서 상세 URL을 확정하면 `socialLinks.js` 1줄 교체 권장

### 1-2. SNS / 외부 채널 링크 점검 (#8) 🟡 부분 진행
- [x] 블로그 URL 코드 연결 (`Footer.jsx` L9: `https://blog.naver.com/snpekorea`)
- [x] 카카오채널 URL 코드 연결 (`Footer.jsx` L11: `http://pf.kakao.com/_Tqyxib`)
- [ ] **배포 환경에서 실제 클릭 동작 검증 필요** (PD 보고: 클릭 불가)
- [ ] 기타 SNS 아이콘(YouTube/Instagram/Naver Cafe/E-Book/Shop) 전수 점검

### 1-3. 푸터 회사정보 접어두기 (#9) ✅ 완료
- [x] 푸터 ㈜큐링 회사 정보 영역에 **접기/펼치기 토글** 추가
  - 회사명(`(주)큐링 Curing Co.`) 옆 `ChevronDown` 아이콘 → 클릭 시 회전(180°) + 본문 펼침
  - 위치: `Footer.jsx` (회사명 영역을 `<button>`으로 변환, `aria-expanded`/`aria-controls` 접근성 속성 부여)
- [x] 기본 상태는 접힘, 클릭 시에만 펼쳐지도록
  - `useState(false)` 초기값, `grid-rows-[0fr↔1fr]` + `opacity` 트랜지션으로 부드러운 슬라이드 애니메이션 적용

### 1-4. 카피라이트 문구 검토 (#10) ✅ 완료
- [x] `© 2026 SNPE. All rights reserved.` 문구 **유지** (운영팀 결정: 삭제 X, 연도 갱신만)
- [x] 최신 홈페이지 트렌드 기준으로 정리 — **연도 동적 처리** 적용
  - `Footer.jsx`: `new Date().getFullYear()` 값을 i18next interpolation으로 주입
  - `ko/en/ja/zh.json`: `"copyright": "ⓒ {{year}} SNPE. All rights reserved."` 로 4개 언어 일괄 변경
  - 매년 자동 갱신되어 수동 업데이트 불필요 (현재 표시: `ⓒ 2026 SNPE. All rights reserved.`)

### 1-5. SNPE Partners — 파트너 로고 교체 (#11)
- [ ] **삭제**: Society for Healthy Life (건강생활학회)
- [ ] **추가**: 차의과대학 스포츠의학대학원

### 1-6. 직영점 섹션 헤더 정리 (#13) ✅ 완료
- [x] `STUDIOS` 영문 라벨 **삭제** (`SNPE 직영점` 한글 타이틀만 유지)
  - 위치: `MainCarousel.jsx` (기존 `<p>Studios</p>` 블록 제거)
  - 한글 타이틀 + 서브카피만 노출되어 한국어 사용자 가독성 우선 정렬

---

## 2. 운동정보 (Exercise)

### 2-1. 메뉴 순서 변경 (#14) ✅ 완료
- [x] 운동정보 하위 메뉴 순서 재정렬
  1. **입문자 가이드** → `/beginnerguide`
  2. **셀프 체형분석** (재배치 4번 → 2번) → `/snpeapp`
  3. **기본동작** → `/baseexercise`
  4. **체험사례** → `/experiencecase`
  5. **SNPE 운동 경험** (신규) → `/snpe-experience`
- 위치: `src/data/navigation.js`

### 2-2. 체험사례 페이지 정리 (#15) 🟡 부분 진행
- [x] 페이지 상단 **전문센터 배너 삭제** — `ExperienceCase.jsx` 상단 박스 제거
- [x] 콘텐츠 미등록 시 빈 상태 안내(empty state) 추가 — "곧 다양한 회복 이야기로 찾아뵙겠습니다"
- [ ] **실제 체험사례 등록** (허리 통증/거북목/다이어트 등)
- ⏳ 콘텐츠 자료 — 교육팀 대기 (수령 즉시 `/admin/experience-cases` CRUD로 등록)

### 2-3. SNPE 운동 경험 페이지 신규 생성 (#16) ✅ 완료
- [x] 신규 메뉴 페이지 생성 — `src/pages/exercise/SnpeExperience.jsx`
  - 인트로(체형 변화/통증 완화/몸의 균형 3개 하이라이트 카드)
  - 라우트: `App.jsx` `/snpe-experience` 추가
  - PageBanner 매핑: `ROUTE_TO_CATEGORY['/snpe-experience'] = 'exercise'` (sub_banner2 자동 적용)
  - i18n: `subnav.snpeExperience`, `pages.snpeExperience(Sub)` 4개 언어 추가 (ko/en/ja/zh)
- [x] 전문센터 찾기 배너 신문구 적용
  - "몸이 달라지는 경험, 직접 느껴보고 싶다면 / 가까운 SNPE 전문센터에서 체험해보세요."

### 2-4. 셀프 체형분석 — 바른자세 APP 안내 수정 (#17) ✅ 완료
- [x] **AI 자세분석** 라벨에서 `AI` 단어 삭제 → `자세분석`
  - `SnpeApp.jsx` h2 + 본문, `home.appDesc` 4개 언어, `AppSection.jsx` 메인 섹션 일괄 정리
  - History.jsx 2021년 연혁의 `SNPE AI 자세분석 APP 업데이트`는 당시 사실 기록이므로 보존
- [x] 현재 **Google Play만 가능** + **App Store 추후 지원 예정** 안내 표기
  - Google Play 링크 그대로 / iOS 버튼은 비활성 회색 박스(`Apple` 아이콘 + "App Store 추후 지원 예정")
  - 하단에 안내 문구 추가: "현재 SNPE 앱은 Google Play(Android)에서만 제공되며, iOS는 추후 사용 가능 예정입니다."

---

## 3. 고객지원 (Support)

### 3-1. 인증강사 검색 안내 문구 수정 (#18) ✅ 완료
- [x] 변경 전: `SNPE 바른자세 척추운동 전문 교육과정(LEVEL 1~3)을 이수하고`
- [x] 변경 후: `SNPE 바른자세 척추운동 전문 교육과정(LEVEL 2~3)을 이수하고`
  - 위치: `CertTeacher.jsx` L36

### 3-2. 가맹점·인증점 영업권 보장 추가 (#19) ✅ 완료 (km 수치 변경 시 1줄 교체)
- [x] 가맹점·인증점 안내에 **영업권 보장 항목** 존재 (`Franchise.jsx` L13)
- [x] **문구 변경**: SNPE 전문센터 + SNPE STUDIO **양쪽 컬럼 모두** 동일 문구 적용
  - 변경 전: center=`반경 1km 이내 입점 제한 보호` / studio=`-`
  - 변경 후: center=studio=`반경 1km 이내 입점 제한 보호` (양쪽 통일)
- ※ 정확한 반경 거리(km) 수치는 운영팀 확인 시 `Franchise.jsx` L13의 `1km` 값 두 곳만 일괄 수정

### 3-3. 가맹점·인증점 개설 절차 아이콘 수정 (#20) ✅ 완료
- [x] 페이지 하단 **개설 문의 양식 섹션** 존재 (`Franchise.jsx` L127)
- [x] **단계 아이콘 라벨 변경**: `Franchise.jsx` L24 `교육 일정 확인` → `개설 문의`

---

## 4. 관리자 모드 (Admin)

### 4-1. 수정/저장 기능 복구 (#21) 🟢 **근본 원인 해결**
- [x] 관리자 모드 **CRUD 동작 불가** 현상 진단 완료
  - 원인: **Supabase Free Tier 자동 일시정지(paused)** — 7일 이상 미접속 시 발생
  - 정지 시점: `2026-05-06` / Resume 가능 기한: `2026-08-04` (90일 후 영구 삭제)
- [x] 프로젝트 Resume 처리 완료 (`ksirihalqznmtjyvymnc.supabase.co`)
  - 모든 시드 데이터(centers 44 / studios 3 / notices 2 / news 4 / activities 5 / teachers 10 / experience_cases 12 / research_papers 39) **무손실 복구**
  - 사용자가 관리자 모드에서 추가한 데이터(news +1, experience_cases +6)도 그대로 보존됨
- [ ] **재발 방지 대책** (택1)
  - **(권장)** Pro 플랜 업그레이드 — $25/월, paused 정책 면제
  - 또는 GitHub Actions로 주 1회 healthcheck 자동 호출 (무료 유지하면서 paused 방지)
  - 또는 운영자 수동 점검 루틴 마련 (월 1회 이상 접속)
- [ ] 추가 점검 항목 (배포 환경)
  - Vercel 환경변수(`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) 정합성 재확인
  - Supabase RLS 정책 anon 키 권한 점검
  - 데브 서버에서 `/admin` 직접 접속 → CRUD 동작 검증

### 4-2. 관리자 권한 영역 확장 (#22) ✅ 완료
- [x] **고객지원 > 자주하는 질문(FAQ)** 관리자 모드 CRUD 추가
  - 신규: `AdminFaqs.jsx` (카테고리 5종 / 정렬 순서 / 펼침 미리보기 / CRUD)
  - DB: `faqs` 테이블 신설 (`schema_v2.sql`) + 기존 9건 시드 자동 등록
  - 사용자 페이지 `Faq.jsx` 동적화 — 하드코딩 제거 → `dataStore.getFaqs()` 호출
- [x] **교육과정 내 모든 카테고리** 통합 관리 페이지 신설
  - 신규: `AdminEducations.jsx` (LEVEL 1·2·3 / 마스터 / 기업특강 / 문화센터 / 직무교육 7개 카테고리)
  - 회차별 일정·정원·장소·모집 상태(open/closing/closed/done)·신청 URL 관리
  - DB: `educations` 테이블 신설
  - ※ 각 교육 페이지(`Level1.jsx` 등) 내부 콘텐츠는 추후 dynamic 적용 가능 — 1차는 일정 관리만

### 4-3. 전문센터 / STUDIO 리스트 관리 (#24) ✅ 완료 (검증)
- [x] 관리자 모드에서 **삭제/생성** 기능 정상 동작 확인
  - `AdminCenters.jsx`: 추가/수정/삭제·검색·지역 select 정상
  - `AdminStudios.jsx`: 추가/수정/삭제·빈 상태 안내 정상
  - 폼 검증(필수 필드 disabled 처리) 이미 적용됨
- [x] 신규 등록 폼 자체는 보완 불필요 — 추가적인 보완은 운영 중 피드백 시 반영

### 4-4. 인증강사 검색 — 일괄 관리 기능 (#25) ✅ 완료
- [x] **엑셀 일괄 업로드** 기능 신규 구현 (`xlsx` 패키지 추가)
  - `AdminCertTeachers.jsx`: 엑셀 업로드 버튼 + 양식 다운로드 버튼
  - 컬럼: 이름·레벨·지역·사진URL·소개·우수강사·앰배서더 (한글/영문 헤더 모두 인식)
  - bulk insert 후 결과 메시지 표시 (성공/오류)
- [x] **강사 이미지 첨부** 기능 — 기존 `photo_url` URL 입력 + 모달 내 미리보기 추가
  - 향후 Supabase Storage 직접 업로드 원하면 storage 버킷 생성 후 dataStore 확장 가능 (선택 사항)

### 4-5. 인증강사 — 앰배서더 표기 분리 (#26) ✅ 완료
- [x] 현행 **우수강사 체크 버튼** 유지 (`featured` 컬럼)
- [x] **앰배서더 체크 버튼** 신규 추가 (`ambassador` 컬럼 신설)
  - 체크 시 **메인 강사 카드로 노출** — `CertTeacher.jsx`에 `Crown` 아이콘 + 카드 그리드
- [x] **그 외 일반 강사**는 검색 시에만 노출
  - 검색어 비어있을 때: 앰배서더 카드만 + "강사명/지역/레벨로 검색하세요" 안내
  - 검색어 입력 시: 결과 표(`featured`는 별 아이콘, `ambassador`는 왕관 아이콘으로 라벨링)
- DB: `teachers.ambassador` 컬럼 신설 (`schema_v2.sql`의 ALTER TABLE)

---

## 우선순위 정리

| 우선순위 | 항목 | 비고 |
|:---:|---|---|
| 🟢 근본 해결 | **#21 관리자 모드 CRUD 복구** | Supabase paused가 원인 — Resume 완료, 데이터 무손실 복구. 재발 방지 대책 결정 필요 |
| ✅ 완료 | #13 STUDIOS 라벨 삭제 | `MainCarousel.jsx` 영문 라벨 블록 제거 |
| ✅ 완료 | #14 운동정보 메뉴 순서 변경 | `navigation.js` 5단계 재정렬 + `snpeExperience` 추가 |
| ✅ 완료 | #18 인증강사 안내 문구 (LEVEL 2~3) | `CertTeacher.jsx` L36 LEVEL 1~3 → 2~3 |
| ✅ 완료 | #20 개설 문의 아이콘 | `Franchise.jsx` L24 `교육 일정 확인` → `개설 문의` |
| 🟠 P1 | #8 블로그/카카오채널 연결 | URL은 연결됨 — 배포 동작 검증 🟡 부분 진행 |
| 🟠 P1 | #11 파트너 로고 교체 | ⏳ 차의대 로고 수령 대기 |
| ✅ 완료 | #9 푸터 회사정보 접기 | 토글 + 슬라이드 애니메이션 적용 (`Footer.jsx`) |
| ✅ 완료 | #17 자세분석 / iOS 안내 | `SnpeApp.jsx` AI 제거 + iOS 비활성 안내 + `home.appDesc` 4개 언어 정리 |
| ✅ 완료 | #19 영업권 보장 문구 | `Franchise.jsx` L13 양쪽 컬럼 통일 (km 수치는 운영팀 확정 시 1줄 교체) |
| ✅ 완료 | #7 Research & Media 통합 | SNS 행 푸터로 일원화 + `data/socialLinks.js` 단일 source 적용 |
| ✅ 완료 | #16 SNPE 운동 경험 페이지 신규 | `SnpeExperience.jsx` + 라우트 + i18n 4개 언어 + 신문구 배너 |
| ✅ 완료 | #22 FAQ/교육 관리자 권한 확장 | `AdminFaqs.jsx` + `AdminEducations.jsx` 신설, DB 테이블 신설 |
| ✅ 완료 | #25 엑셀 일괄 업로드 | `xlsx` 패키지 + 양식 다운로드 + 일괄 등록 + 이미지 미리보기 |
| ✅ 완료 | #26 앰배서더 분리 | `teachers.ambassador` 컬럼, 메인 카드 노출, 일반 강사는 검색 시만 |
| ✅ 완료 | #24 전문센터/STUDIO 리스트 관리 | CRUD 정상 동작 확인 (별도 보완 불필요) |
| 🟡 부분 진행 | #15 체험사례 페이지 | 상단 배너 제거 + empty state 추가 완료, 콘텐츠는 교육팀 자료 대기 |
| ✅ 완료 | #10 카피라이트 검토 | 운영팀 결정: 유지 + 연도 동적 처리 (`ⓒ 2026 SNPE...`) |

### 즉시 작업 묶음 (10분 내 완료 가능)
- ✅ 즉시 작업 묶음 모두 완료 — 남은 운영 항목은 #21(관리자 CRUD)·외부 의존 항목

---

## 외부 의존 항목 (자료/결정 대기)

### 콘텐츠팀
- [ ] **#11**: 차의과대학 스포츠의학대학원 로고 (PNG/SVG, 권장 1:1 또는 16:10 비율)
  - 수령 시 처리: `public/images/partner_chamed.png` 저장 → `PartnerSlider.jsx` `partners` 배열에 5번째 항목 추가 (또는 `society.png` 자리 교체)
  - 동시 작업: 기존 `Society for Healthy Life` 로고 제거
- [ ] **#15**: 실제 체험사례 콘텐츠 (사진 + 텍스트, 5~10건 권장)
  - 수령 시 처리: 관리자 모드 `/admin/experience-cases` 접속 → CRUD로 일괄 등록
  - 컴포넌트는 이미 `ExperienceCase.jsx`에서 `dataStore.getExperienceCases()`로 불러오므로 코드 수정 없이 노출 가능
- [ ] **#19**: 영업권 보장 반경(km) 정확한 수치 (예: 1km / 1.5km / 2km)
  - 현재 임시값: `1km` (양쪽 컬럼 통일 적용 완료)
  - 수령 시 처리: `Franchise.jsx` L13 두 곳의 `1km` 수치만 일괄 교체

### 운영팀 / 마케팅
- [ ] **#8**: 공식 블로그 / 카카오채널 URL 확정 (현재 코드값 유지 가능 여부)
- [x] **#10**: 카피라이트 정책 결정 — **유지 + 연도 동적 처리** 확정 (`ⓒ 2026 SNPE...`)
- [ ] **#7**: Instagram 공식 계정 확정 — 현재 `snpe_korea` 사용. 만약 `snpe_official`이 정답이면 `socialLinks.js` 1줄 교체
- [ ] **#7**: 교보문고(E-Book) 대표 도서 URL — 현재 검색 결과 페이지(`search.kyobobook.co.kr/search?keyword=SNPE`)로 임시 연결. 대표 도서가 정해지면 해당 상세 페이지 URL로 변경

### 디자인팀
- [x] **#7**: Research & Media 영역 통합 — 메인 SNS 행 제거(푸터로 일원화) 적용 완료
  - 추후 메인에 SNS 다시 노출이 필요하면 `data/socialLinks.js`를 import해서 어떤 페이지든 추가 가능

---

## 작업 시 참고 파일

| 항목 | 관련 파일 |
|---|---|
| #11 파트너 | `src/components/home/PartnerSlider.jsx` |
| #13 STUDIOS 라벨 | `src/components/home/MainCarousel.jsx` |
| #14 메뉴 순서 | `src/data/navigation.js` |
| #7 / #8 / #9 / #10 푸터 | `src/components/layout/Footer.jsx`, `src/data/socialLinks.js` |
| #7 SNS 단일 source | `src/data/socialLinks.js` (운영자 URL 변경 시 이 파일만 수정) |
| #15 체험사례 | `src/pages/exercise/ExperienceCase.jsx` (관리자: `/admin/experience-cases`) |
| #16 SNPE 운동 경험 | `src/pages/exercise/SnpeExperience.jsx` |
| #17 셀프 체형분석 | `src/pages/exercise/SnpeApp.jsx`, `src/components/home/AppSection.jsx` |
| #18 인증강사 안내 | `src/pages/support/CertificationTeacher.jsx` |
| #19 / #20 가맹점 | `src/pages/support/Franchise.jsx` |
| #21~#26 관리자 | `src/pages/admin/Admin*.jsx`, `src/lib/dataStore.js` |
| 신청·문의 (기업특강/가맹) | `pages/support/CustomerInquiry.jsx`, `pages/support/Franchise.jsx`, `pages/admin/AdminInquiries.jsx`, `inquiries`/`franchise_inquiries` 테이블 |
| #22 FAQ 사용자 페이지 | `src/pages/support/Faq.jsx` (`dataStore.getFaqs()`) |
| #22 교육과정 관리 (admin) | `src/pages/admin/AdminEducations.jsx`, `educations` 테이블 |
| #25 엑셀 업로드 | `xlsx` 패키지 + `AdminCertTeachers.jsx` `bulkAddTeachers` |
| DB 마이그레이션 | `snpeweb-react/schema_v2.sql` (Supabase SQL Editor에서 1회 실행) |
