# Cloudflare Pages 배포 가이드

> 운영 사이트를 Vercel(Free Tier paused)에서 Cloudflare Pages로 이전하기 위한 단계별 가이드.
> 코드 변경 사항: `_redirects` (SPA fallback), `_headers` (캐싱 정책) 추가 완료.

## 1. 사전 준비

- [ ] Cloudflare 계정 (없으면 https://dash.cloudflare.com/sign-up 가입, 무료)
- [ ] GitHub `roql47/SNPEWEB` repo 접근 권한 (사용자 계정)
- [ ] 환경변수 4개 값 (`snpeweb-react/.env`에 있음):
  - `VITE_SUPABASE_URL` = `https://ksirihalqznmtjyvymnc.supabase.co`
  - `VITE_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
  - `VITE_ADMIN_ID` = `admin`
  - `VITE_ADMIN_PW` = `snpe2026!`

## 2. 새 Pages 프로젝트 만들기

1. https://dash.cloudflare.com → 좌측 사이드바 **`Workers & Pages`** 클릭
2. **`Create`** 버튼 → **`Pages`** 탭 → **`Connect to Git`**
3. **GitHub** 선택 → 권한 승인 (처음일 경우 GitHub OAuth)
4. 저장소 선택: **`roql47/SNPEWEB`**
5. **`Begin setup`** 클릭

## 3. 빌드 설정 (정확히 입력)

| 항목 | 값 |
|---|---|
| **Project name** | `snpe-web` (운영 도메인이 `snpe-web.pages.dev`로 됨, 기존 vercel과 같은 이름) |
| **Production branch** | `react-migration` |
| **Framework preset** | `Vite` (자동 감지될 것) |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory (advanced)** | `snpeweb-react` |
| **Node.js version** | `20` (또는 자동) |

## 4. 환경변수 등록

`Environment variables (advanced)` 섹션 펼치기 → **Production** 환경에 4개 모두 추가:

```
VITE_SUPABASE_URL=https://ksirihalqznmtjyvymnc.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzaXJpaGFscXpubXRqeXZ5bW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5ODk3NjgsImV4cCI6MjA5MTU2NTc2OH0.Fc5cWPgBxPZlfj8N6IVt7bF4j3nJYYUfkFL1N8hEWBY
VITE_ADMIN_ID=admin
VITE_ADMIN_PW=snpe2026!
```

⚠️ `VITE_SUPABASE_ANON_KEY`는 **anon 공개 키**라 Pages 환경변수에 그대로 둬도 안전 (Supabase RLS로 보호됨). 절대 노출하면 안 되는 건 `service_role` 키이고, 우리는 그걸 사용하지 않음.

## 5. Save and Deploy

- **`Save and Deploy`** 클릭
- 약 2~5분 빌드 (xlsx 패키지 + Vite 빌드)
- 빌드 로그 확인: 에러 없이 `dist`에 결과물 생성되어야 함

## 6. 배포 확인

성공 시 자동으로 다음 URL이 발급됨:
- `https://snpe-web.pages.dev/` (또는 다른 이름이면 그에 맞는 URL)

확인할 것:
- [ ] 메인 페이지 로딩 (hero 영상, 헤더 frosted glass)
- [ ] `/admin/login` 직접 입력 → 로그인 화면 정상 (SPA fallback 동작 확인)
- [ ] 로그인 후 `/admin/inquiries` 접근 가능
- [ ] 푸터 SNS 클릭 → 새 탭 열림 (URL 통일됨 확인)
- [ ] 헤더 메뉴 → SNPE 운동 경험 등 신규 페이지 진입

## 7. 커스텀 도메인 (선택)

기존 `snpe-web.vercel.app`은 Vercel 도메인이라 그대로 못 옮김. 다른 옵션:

**옵션 A — `pages.dev` 서브도메인 그대로 운영**
- `snpe-web.pages.dev` (Cloudflare 무료 제공)
- 운영자가 외부 노출 시 이 URL 사용

**옵션 B — 커스텀 도메인 연결** (예: `snpe.kr`, `snpe.co.kr`)
- Cloudflare Pages 프로젝트 → Custom domains → Set up a custom domain
- DNS 설정 (Cloudflare가 도메인 관리하면 자동, 외부 도메인이면 CNAME 추가)
- HTTPS 자동 발급 (무료)
- 광고/명함/SNS 등에 사용할 도메인 결정 필요

## 8. 자동 배포 동작 확인

이번 setup 후부터는:
- `git push origin react-migration` → 자동으로 production 빌드 + 배포
- Pull request 생성 → 자동 preview 빌드 (PR별 고유 URL)
- 빌드 실패 시 Cloudflare 알림 메일

## 9. Vercel 정리 (이전 완료 후)

확인 끝나면:
- Vercel 프로젝트 그대로 둬도 됨 (paused 상태로 비용 0)
- 또는 Vercel 대시보드 → Projects → `snpeweb-react-mu` 삭제

## 10. Free Tier 한도 (참고)

| 항목 | Cloudflare Pages | Vercel Free |
|---|---|---|
| 빌드/월 | **500회** | 6,000분 (paused됨) |
| 대역폭 | **무제한** | 100GB |
| 사이트 수 | **무제한** | 무제한 |
| 동시 빌드 | 1 | 1 |
| 함수 호출 | 100K/일 | 1M/월 |

→ SNPE 트래픽 규모로는 Cloudflare Free Tier 사용량 거의 사용 안 함. **paused 걱정 사실상 없음**.

---

## 트러블슈팅

### 빌드 실패: `Cannot find module 'xlsx'`
- Root directory가 정확히 `snpeweb-react`로 설정됐는지 확인
- `package.json`에 xlsx 있어야 함 (확인 완료)

### `/admin/login` 직접 입력 시 404
- `_redirects` 파일이 빌드 결과물 `dist/_redirects`에 포함됐는지 확인
- Vite는 `public/_redirects`를 자동 복사함 (확인 완료)

### Supabase 연결 실패
- 환경변수 4개 모두 입력했는지 확인
- `VITE_` prefix 빠지면 안 됨 (Vite 빌드 시 client 코드에 주입되는 조건)
- Cloudflare Pages → Settings → Environment Variables에서 재확인 후 재배포

### 빌드는 성공했는데 사이트가 안 뜬다
- Cloudflare Pages → Deployments → 최신 배포 → View deployment 직접 클릭
- 브라우저 콘솔(F12) → Network 탭에서 어떤 리소스가 실패하는지 확인
