// ============================================================
// SNPE Supabase 초기 데이터 시드 스크립트
// 실행: node seed.js
// ============================================================
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ksirihalqznmtjyvymnc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzaXJpaGFscXpubXRqeXZ5bW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5ODk3NjgsImV4cCI6MjA5MTU2NTc2OH0.Fc5cWPgBxPZlfj8N6IVt7bF4j3nJYYUfkFL1N8hEWBY'
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ── 전문센터 ──────────────────────────────────────────────────
const centers = [
  { name: '강서 마곡나루점', region: '서울', address: '서울시 강서구 마곡동 757-3 4층', tel: '010-9833-0359', email: 'snpe_magoknaru@naver.com', naver_url: '' },
  { name: '용산 한남점', region: '서울', address: '서울시 용산구 독서당로 82 2층', tel: '010-9083-2795', email: 'snpe_hee@naver.com', naver_url: '' },
  { name: '목동 오목교점', region: '서울', address: '서울시 양천구 신정동 89-100 3층', tel: '010-4604-3390', email: 'snpemd@naver.com', naver_url: '' },
  { name: '성신여대점', region: '서울', address: '서울시 성북구 보문로 188 3층', tel: '010-2593-3622', email: 'snpe_euni_eun@naver.com', naver_url: '' },
  { name: '강서 화곡점', region: '서울', address: '서울시 강서구 강서로 202 3층', tel: '010-7654-7880', email: 'shimeonhye@naver.com', naver_url: '' },
  { name: '서초방배점', region: '서울', address: '서울 서초구 방배로 200 2층 201호', tel: '010-9174-2777', email: 'iaballet@naver.com', naver_url: '' },
  { name: '영등포구청점', region: '서울', address: '서울시 영등포구 당산동3가 270 우미빌딩 305호', tel: '010-3143-2221', email: 'lsd9628@naver.com', naver_url: '' },
  { name: '서울 낙성대점', region: '서울', address: '서울시 관악구 남부순환로 1903 3층', tel: '010-5294-6691', email: 'gmlwn871@naver.com', naver_url: '' },
  { name: '서울 왕십리점', region: '서울', address: '서울시 성동구 왕십리로 352-1 2층', tel: '010-3619-3699', email: '', naver_url: '' },
  { name: '일산 주엽점', region: '경기', address: '경기도 고양시 일산서구 중앙로 1437 602호', tel: '010-6727-3020', email: 'snpess@naver.com', naver_url: '' },
  { name: '부천 상동점', region: '경기', address: '경기도 부천시 길주로 137, 604-2호', tel: '010-3663-2786', email: 'vivian0813@naver.com', naver_url: '' },
  { name: '경기양평점', region: '경기', address: '경기 양평군 강상면 강남로913번길 3-1 1층', tel: '010-2852-5837', email: 'jini5837@naver.com', naver_url: '' },
  { name: '용인 수지점', region: '경기', address: '경기도 용인시 수지구 풍덕천동 1070-7 302호', tel: '010-4211-9258', email: 'snpe_ys@naver.com', naver_url: '' },
  { name: '고양 삼송원흥점', region: '경기', address: '경기도 고양시 덕양구 권율대로 672 421호', tel: '010-9230-4683', email: '', naver_url: '' },
  { name: '화성 동탄역점', region: '경기', address: '경기도 화성시 동탄대로 446 그란비아스타 3103호', tel: '010-2055-4086', email: 'ykham76@naver.com', naver_url: '' },
  { name: '일산역점', region: '경기', address: '경기도 고양시 일산서구 일산동 627-82번지 3층', tel: '010-8272-5476', email: 'limory@hanmail.net', naver_url: '' },
  { name: '김포 한강점', region: '경기', address: '경기도 김포시 김포한강1로51번길 12 7층', tel: '010-7332-3793', email: 'dkxls007@naver.com', naver_url: '' },
  { name: '분당 정자점', region: '경기', address: '경기도 성남시 분당구 성남대로331번길 3-9 4층', tel: '010-2866-0346', email: 'mnbv0346@naver.com', naver_url: '' },
  { name: '하남 미사점', region: '경기', address: '경기도 하남시 미사강변한강로279 롯데캐슬헤븐시티 1차 309호', tel: '010-3322-6388', email: 'itssum819@gmail.com', naver_url: '' },
  { name: '남양주 화도점', region: '경기', address: '경기도 남양주시 화도읍 비룡로 117 3층', tel: '010-8305-1233', email: 'btyspace@naver.com', naver_url: '' },
  { name: '분당 서현점', region: '경기', address: '경기도 분당구 황새울로 342번길 23 기영프라자 7층', tel: '010-4933-2075', email: 'snpe_seohyun@naver.com', naver_url: '' },
  { name: '의왕 포일점', region: '경기', address: '경기도 의왕시 봇들로 40, 포일프라자 201호', tel: '010-9174-2777', email: 'iaballet@naver.com', naver_url: '' },
  { name: '수원 매탄점', region: '경기', address: '경기도 수원시 영통구 매탄로108번길 28, 504호', tel: '010-7777-2089', email: 'sunshine_snpe@naver.com', naver_url: '' },
  { name: '광교 상현역점', region: '경기', address: '경기도 용인시 수지구 광교중앙로296번길 10, 205호', tel: '010-3122-2745', email: 'snpe_sanghyun@naver.com', naver_url: '' },
  { name: '남양주 다산점', region: '경기', address: '경기도 남양주시 다산중앙로123번길 22-16 샤르망프라자 501호', tel: '010-7900-1749', email: 'snpegoldbody@gmail.com', naver_url: '' },
  { name: '고양 지축점', region: '경기', address: '경기도 고양시 덕양구 지축로 62 지축아인시티프라자 804호', tel: '010-2614-1529', email: 'uensarang@gmail.com', naver_url: '' },
  { name: '인천 계양점', region: '인천', address: '인천 계양구 계산새로 93 밀레니엄프라자 806호', tel: '010-2862-7492', email: 'ok7492@naver.com', naver_url: '' },
  { name: '인천 송도점', region: '인천', address: '인천광역시 연수구 컨벤시아대로 81 드림시티 4층 412호', tel: '010-5347-3498', email: 'alfk222@naver.com', naver_url: '' },
  { name: '인천 검단점', region: '인천', address: '인천광역시 서구 이음대로 378 5층 512호', tel: '010-7425-7172', email: 'boss6989@naver.com', naver_url: '' },
  { name: '대전 유성점', region: '대전', address: '대전광역시 유성구 어은로57 한빛프라자 306호', tel: '010-2933-9161', email: 'snpe-yangks@naver.com', naver_url: '' },
  { name: '대구 이시아점', region: '대구', address: '대구광역시 동구 봉무동 1539-8 4층 405호', tel: '010-5160-7535', email: 'jini1820@naver.com', naver_url: '' },
  { name: '대구 수성점', region: '대구', address: '대구광역시 수성구 들안로 343, 4층', tel: '010-5790-7982', email: 'snpe_victoria@naver.com', naver_url: '' },
  { name: '광주 상무점', region: '광주', address: '광주광역시 서구 상무평화로 79, 303호', tel: '010-9601-0171', email: 'snpegwangju@naver.com', naver_url: '' },
  { name: '부산 경성대', region: '부산', address: '부산광역시 남구 용소로 11 해림빌딩 3층', tel: '010-5116-3806', email: 'snpebusan@naver.com', naver_url: '' },
  { name: '부산 해운대점', region: '부산', address: '부산광역시 해운대구 세실로27번길 21, 902호', tel: '010-5116-3806', email: 'snpebusan@naver.com', naver_url: '' },
  { name: '부산 서면점', region: '부산', address: '부산광역시 부산진구 서전로 11-1 2층', tel: '010-9554-0602', email: 'hongperfect@hanmail.com', naver_url: '' },
  { name: '부산대점', region: '부산', address: '부산광역시 금정구 부산대학로 29 2층', tel: '010-8557-9238', email: 'tasin@naver.com', naver_url: '' },
  { name: '부산 하단점', region: '부산', address: '부산 사하구 낙동대로 466 7층', tel: '010-2034-6627', email: '', naver_url: '' },
  { name: '청주 지웰점', region: '충청', address: '충청북도 청주시 흥덕구 대농로 70 7층', tel: '010-4564-2786', email: 'jsbak18@naver.com', naver_url: '' },
  { name: '아산 탕정점', region: '충청', address: '충청남도 아산시 탕정면 한들물빛5로 25 리앤포레 410,411호', tel: '010-5967-1583', email: 'inaz1624@naver.com', naver_url: '' },
  { name: '천안 불당점', region: '충청', address: '충청남도 천안시 서북구 불당동 1535-1번지 마블러스티타워 201호', tel: '010-7753-7687', email: 'snpe_bd@naver.com', naver_url: '' },
  { name: '통영 무전점', region: '경상', address: '경상남도 통영시 무전4길10번지 주영에이스빌4차상가 115호', tel: '010-2699-8171', email: 'syun44706@gmail.com', naver_url: '' },
  { name: '진주 초전점', region: '경상', address: '경상남도 진주시 초북로20번길 22, 5층', tel: '010-8938-9289', email: '1977younghee@naver.com', naver_url: '' },
  { name: '창원 상남점', region: '경상', address: '경남 창원시 성산구 마디미로3번길 17 가야빌딩 3층', tel: '010-6642-5850', email: 'tjd48@hanmail.net', naver_url: '' },
  { name: '양산 증산점', region: '경상', address: '경상남도 양산시 물금읍 증산역로 163. 재승프라자 702호', tel: '010-2050-6581', email: 'yangsan-snpe@naver.com', naver_url: '' },
  { name: '춘천 퇴계점', region: '강원', address: '강원특별자치도 춘천시 김유정로 1893, 2층', tel: '', email: 'qhqo5416@naver.com', naver_url: '' },
]

// ── 스튜디오 ──────────────────────────────────────────────────
const studios = [
  { name: '양주옥정점', owner: '심예진', tel: '010-7541-9311', email: 'shim1358@naver.com', address: '경기도 양주시 옥정동로 7다길54, 4층 410호' },
  { name: '리셋바디 침산점', owner: '김선정', tel: '010-3494-3278', email: 'sjooosjoo@naver.com', address: '대구광역시 북구 침산로 173, 8층 803호' },
  { name: '청사로점', owner: '문계순', tel: '010-8246-1288', email: 'moonsoon1115@hanmail.net', address: '대전광역시 서구 청사로 228, 813호' },
]

// ── 공지사항 ──────────────────────────────────────────────────
const notices = [
  { title: 'SNPE 홈페이지가 새롭게 리뉴얼되었습니다', date: '2026-03-18', content: 'SNPE 공식 홈페이지가 새롭게 리뉴얼되었습니다. 더 나은 서비스를 위해 노력하겠습니다.', pinned: true },
  { title: '2026년 상반기 교육 일정 안내', date: '2026-03-15', content: '2026년 상반기 SNPE 교육 과정(LEVEL 1~3) 일정이 확정되었습니다.', pinned: false },
]

// ── 언론보도 ──────────────────────────────────────────────────
const news = [
  { title: '중앙일보 소비자 만족도 선정', date: '2026-01-10', source: '중앙일보', url: '', summary: 'SNPE가 소비자 만족도 조사에서 높은 평가를 받았습니다.' },
  { title: '올리브영 입점', date: '2025-12-01', source: '올리브영', url: '', summary: 'SNPE 도구가 올리브영에 입점하였습니다.' },
  { title: '차의과대학 SNPE 석사과정 개설', date: '2025-11-15', source: '차의과대학', url: '', summary: '차의과학대학교에서 SNPE 관련 석사과정이 개설되었습니다.' },
]

// ── 활동소식 ──────────────────────────────────────────────────
const activities = [
  { title: '제3회 건강한삶학회 학술대회', date: '2024-03-15', location: '서울 코엑스', description: 'SNPE 운동의 과학적 효과와 최신 연구 결과를 발표하는 학술대회', category: '학술대회', image_url: '' },
  { title: 'SNPE 인증강사 워크숍', date: '2024-02-20', location: '강남 SNPE 센터', description: '전국 인증강사 대상 스킬업 워크숍 및 네트워킹', category: '워크숍', image_url: '' },
  { title: '2024 SNPE 신년회', date: '2024-01-20', location: '강남 SNPE 센터', description: '전국 센터 대표 및 인증강사 신년 모임', category: '행사', image_url: '' },
  { title: 'SNPE × 서울시 건강증진 캠페인', date: '2023-11-25', location: '서울광장', description: '시민 대상 무료 바른자세 체험 및 체형분석 이벤트', category: '캠페인', image_url: '' },
  { title: 'Global SNPE Summit 2023', date: '2023-10-10', location: '서울 JW메리어트', description: '해외 파트너 대학 및 글로벌 강사진과 함께하는 서밋', category: '국제행사', image_url: '' },
]

// ── 인증강사 ──────────────────────────────────────────────────
const teachers = [
  { name: '김영희', level: 'Level 1', region: '서울', photo_url: '', intro: 'SNPE 인증강사', featured: true },
  { name: '이수진', level: 'Level 1', region: '서울', photo_url: '', intro: 'SNPE 인증강사', featured: true },
  { name: '박지현', level: 'Level 2', region: '경기', photo_url: '', intro: 'SNPE 인증강사', featured: true },
  { name: '정민서', level: 'Level 2', region: '부산', photo_url: '', intro: 'SNPE 인증강사', featured: true },
  { name: '최은아', level: 'Level 1', region: '대구', photo_url: '', intro: 'SNPE 인증강사', featured: true },
  { name: '한소연', level: 'Level 2', region: '대전', photo_url: '', intro: 'SNPE 인증강사', featured: false },
  { name: '강미래', level: 'Level 1', region: '인천', photo_url: '', intro: 'SNPE 인증강사', featured: false },
  { name: '나윤정', level: 'Level 3', region: '서울', photo_url: '', intro: 'SNPE 인증강사', featured: false },
  { name: '도현수', level: 'Level 1', region: '경기', photo_url: '', intro: 'SNPE 인증강사', featured: false },
  { name: '라혜진', level: 'Level 2', region: '충청', photo_url: '', intro: 'SNPE 인증강사', featured: false },
]

// ── 체험사례 ──────────────────────────────────────────────────
const experience_cases = [
  { name: '김○○', age: '40대 여성', issue: '만성 허리 통증', period: '6개월', content: 'SNPE 2번 동작을 꾸준히 하면서 만성적이었던 허리 통증이 크게 줄었습니다.' },
  { name: '이○○', age: '30대 남성', issue: '거북목 증후군', period: '3개월', content: 'C-MOVE 동작과 바른자세벨트를 병행하며 거북목이 많이 개선되었습니다.' },
  { name: '박○○', age: '50대 여성', issue: '척추측만증', period: '1년', content: 'T-MOVE와 기본동작 4번을 꾸준히 하면서 척추측만이 개선되고 있습니다.' },
  { name: '정○○', age: '30대 여성', issue: '산후 골반 불균형', period: '4개월', content: '출산 후 골반이 틀어져 고생했는데, SNPE 3번 동작으로 골반 정렬이 많이 좋아졌습니다.' },
  { name: '최○○', age: '60대 남성', issue: '퇴행성 관절염', period: '8개월', content: '무릎 관절이 안 좋아 운동이 어려웠는데, SNPE는 도구를 활용해 무릎에 부담 없이 운동할 수 있어 좋습니다.' },
  { name: '한○○', age: '20대 여성', issue: '오다리 교정', period: '5개월', content: 'SNPE 3번 동작과 벨트 착용으로 오다리가 눈에 띄게 좋아졌어요.' },
]

// ── 연구논문 (39건) ───────────────────────────────────────────
const research_papers = [
  { title: 'Efficacy of Self-Natural Posture Exercise (SNPE) programs on chronic low back pain: A randomized controlled feasibility trial with waitlist control', authors: 'Billings Clinic, City of Hope 연구팀', journal: 'Journal of Back and Musculoskeletal Rehabilitation', year: '2024', category: '해외', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11612993/', description: '만성 요통 환자 대상 12주간 대면·비대면 SNPE RCT. ODI, VAS, SF-36 개선 확인.' },
  { title: 'A Healthy Life with Self-Natural Posture Exercise', authors: 'Yongsuk Seo, Dae Taek Lee', journal: 'IntechOpen — New Horizons of Exercise Medicine', year: '2024', category: '해외', url: 'https://www.intechopen.com/chapters/1178063', description: 'SNPE 운동법의 원리, 도구, 효과를 정리한 국제 학술 서적 챕터.' },
  { title: 'SNPE 프로그램이 만성 요통 환자의 장애지수, 관절가동범위, 근력, 골반 통증에 미치는 영향', authors: '이희진, 윤지유, 윤소미 외 3명', journal: '한국웰니스학회지 제17권 1호 pp.245~252', year: '2022', category: '국내', url: 'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002815282', description: '만성 요통 여성 25명 대상 12주 연구. 장애지수 감소, ROM 개선, 배근력 증가, 골반 통증 감소.' },
  { title: 'SNPE 운동이 만성 근골격계 통증 여성의 체력, 기능적 움직임, 관절가동범위 및 통증에 미치는 효과', authors: 'Lee, H., Yoon, J., Kyeong, J., Jeon, J., Kim, H., Kim, S., Lee, H., Lee, D.T.', journal: '유럽스포츠과학회 (ECSS) 2021', year: '2021', category: '해외', url: '', description: 'ECSS 2021 국제학회 발표.' },
  { title: 'SNPE 프로그램이 만성 요통 여성의 장애지수, 관절가동범위, 근력에 미치는 영향', authors: 'Lee, Heejin; Yoon, Jiyoo; Kyeong, Jihye; Jeon, Jeongmin; Kim, Heeju; Kim, Seyoung; Lee, Hyojung; Lee, Dae Taek', journal: '미국스포츠의학회 (ACSM) 2021', year: '2021', category: '해외', url: '', description: 'ACSM 2021 국제학회 발표.' },
  { title: 'SNPE(Self Natural Posture Exercise) 프로그램이 여성의 만성 통증, 기능적 움직임 및 자기효능감에 미치는 영향', authors: '노수연 (가톨릭대), 경지혜, 신명진 (강원대)', journal: '한국여성체육학회지 제35권 1호 pp.33~52', year: '2021', category: '국내', url: '', description: '' },
  { title: 'SNPE 프로그램이 중년여성의 요부 안정화, 균형 능력 및 요통에 미치는 영향', authors: '공민희 (울산대), 윤소미 (국민대), 김기정 (울산대)', journal: '한국웰니스학회지 제16권 4호 pp.371~376', year: '2021', category: '국내', url: '', description: '' },
  { title: 'SNPE 운동 프로그램이 만성 근골격계 통증 여성의 통증, 관절가동범위, 체력에 미치는 영향 (석사학위논문)', authors: '김세영 (국민대학교)', journal: '국민대학교 석사학위논문', year: '2021', category: '국내', url: '', description: '' },
  { title: 'SNPE 프로그램이 만성 요통 여성의 장애지수, 관절가동범위, 근력에 미치는 영향 (석사학위논문)', authors: '박서은 (국민대학교)', journal: '국민대학교 석사학위논문', year: '2021', category: '국내', url: '', description: '' },
  { title: 'SNPE 프로그램이 만성 통증 여성의 정서적 복잡성과 자기조절에 미치는 영향 (석사학위논문)', authors: '신연화 (국민대학교)', journal: '국민대학교 석사학위논문', year: '2021', category: '국내', url: '', description: '' },
  { title: 'SNPE 프로그램이 만성 요통 여성의 골반 통증, 배근력에 미치는 영향 (석사학위논문)', authors: '이보배 (국민대학교)', journal: '국민대학교 석사학위논문', year: '2021', category: '국내', url: '', description: '' },
  { title: 'SNPE 프로그램이 만성 요통 여성의 기능적 움직임과 체력에 미치는 영향 (석사학위논문)', authors: '이효진 (국민대학교)', journal: '국민대학교 석사학위논문', year: '2021', category: '국내', url: '', description: '' },
  { title: 'SNPE 프로그램이 만성 근골격계 통증 여성의 관절가동범위에 미치는 영향 (석사학위논문)', authors: '장윤미 (국민대학교)', journal: '국민대학교 석사학위논문', year: '2021', category: '국내', url: '', description: '' },
  { title: 'SNPE 프로그램이 만성 통증 여성의 통증 감소와 심리적 효과에 미치는 영향 (석사학위논문)', authors: '채선화 (국민대학교)', journal: '국민대학교 석사학위논문', year: '2021', category: '국내', url: '', description: '' },
  { title: 'SNPE 프로그램이 중년여성의 요부 안정화, 균형 능력 및 요통에 미치는 영향 (석사학위논문)', authors: '공민희 (울산대학교)', journal: '울산대학교 석사학위논문', year: '2021', category: '국내', url: '', description: '' },
  { title: 'Effects of Pain Reduction by Self-Natural Posture Exercise on Affective Complexity in Women: The Moderating Effect of Self-Regulation', authors: 'Jungki Choi, Jiyoo Yoon, Myoungjin Shin', journal: 'Frontiers in Psychology (SSCI)', year: '2020', category: '해외', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7344201/', description: 'SNPE 통증 감소가 여성의 정서적 복잡성에 미치는 영향. SSCI 등재, TOP 10 인기 논문 선정.' },
  { title: 'SNPE 운동이 체력, ROM, 통증 인식에 미치는 영향 (ECSS 2020 발표 1)', authors: 'Son, Y., Yoon, J., Choi, J., Choi, U.M.', journal: '유럽스포츠과학회 (ECSS) 2020', year: '2020', category: '해외', url: '', description: '' },
  { title: 'SNPE 운동이 만성 통증 여성의 체력 및 관절가동범위에 미치는 영향 (ECSS 2020 발표 2)', authors: 'Lee, H., Yoon, J., Choi, J., Yun, S., Lee, Y., Hwang, J., Lee, D.T.', journal: '유럽스포츠과학회 (ECSS) 2020', year: '2020', category: '해외', url: '', description: '' },
  { title: 'SNPE 운동 프로그램이 만성 통증 여성의 체력과 통증에 미치는 영향 (ACSM 2020 발표 1)', authors: 'Lee, Heejin; Yoon, Jiyoo; Choi, Jungki; Kyeong, Jihye; Yun, Somi; Lee, Yoonbin; Hwang, Jae Gu; Lee, Dae Taek', journal: '미국스포츠의학회 (ACSM) 2020', year: '2020', category: '해외', url: '', description: '' },
  { title: 'SNPE 프로그램이 만성 통증 여성의 기능적 움직임, 관절가동범위에 미치는 영향 (ACSM 2020 발표 2)', authors: 'Lee, Dae Taek; Yoon, Jiyoo; Choi, Jungki; Kyeong, Jihye; Yun, Somi; Lee, Yoonbin; Hwang, Jae Gu; Jung, Ah-Reum; Lee, Boram; Lee, Heejin', journal: '미국스포츠의학회 (ACSM) 2020', year: '2020', category: '해외', url: '', description: '' },
  { title: 'SNPE 프로그램 참가자의 만성통증 감소가 정서조절에 미치는 영향', authors: '윤지유, 신명진', journal: '한국스포츠심리학회지 제31권 4호 pp.89~100', year: '2020', category: '국내', url: '', description: '' },
  { title: 'SNPE 프로그램이 만성 근골격계 통증 여성의 통증, 관절가동범위, 체력에 미치는 영향', authors: '이희진, 윤지유, 최중기 외 4명', journal: '한국웰니스학회지 제15권 2호 pp.565~573', year: '2020', category: '국내', url: '', description: '' },
  { title: 'SNPE 효과 검증을 위한 체험사례 분석 (연구보고서)', authors: '고지현, 신명진, 김가현', journal: '연구보고서', year: '2020', category: '국내', url: '', description: '2006년부터 2018년의 약 1,000건의 자료를 분석.' },
  { title: 'SNPE 효과에 관한 종합 연구보고서', authors: '권성호, 신명진, 김영호, 김용세, 장도진, 이도흥, 이승주, 김태우', journal: '연구보고서', year: '2020', category: '국내', url: '', description: '만성통증, 교정 치료, 생리학, 정서적/임상적, 심리학적 증상 효과 검증.' },
  { title: 'Self-natural posture exercise and chronic pain reduction', authors: 'Jiyoo Yoon, Jungki Choi, Myoungjin Shin', journal: 'An international journal, Volume 47, Issue 11, e8273 (SSCI)', year: '2019', category: '해외', url: '', description: 'SSCI 등재 국제학술지. 2019년 11월호 인기 TOP 10 논문 선정.' },
  { title: 'SNPE 프로그램이 경추와 어깨의 만성 근골격계 통증 및 관절가동범위에 미치는 영향', authors: '윤지유, 이희진, 윤소미 외 4명', journal: '한국체육학회지 제58권 6호 pp.377~387', year: '2019', category: '국내', url: 'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002531908', description: '만성 근골격계 통증 여성 39명 대상 12주 연구. 경추·어깨 통증 감소 및 ROM 개선.' },
  { title: 'Effects of SNPE on Fitness, Functional Movement, Range of Motion, and Pain Perception', authors: 'Lee, H., Yoon, J., Choi, J., Yun, S., Lim, D., Hwang, E., Lee, D.T. (Kookmin University)', journal: '유럽스포츠과학회 (ECSS) 2019, Prague', year: '2019', category: '해외', url: '', description: 'ECSS 2019 체코 프라하 국제학회 포스터 발표.' },
  { title: 'SNPE 프로그램 참가자의 통증 감소에 따른 정서 특성과 자기조절', authors: '신명진, 고지현, 윤지유', journal: '한국체육학회지 제58권 4호 pp.165~174', year: '2019', category: '국내', url: '', description: '' },
  { title: 'SNPE(Self Natural Posture Exercise) 프로그램이 만성 통증에 미치는 영향', authors: '윤지유, 최중기, 신명진', journal: '한국스포츠학회지 제17권 2호 pp.91~99', year: '2019', category: '국내', url: '', description: '' },
  { title: 'SNPE 프로그램이 만성 통증 감소에 미치는 효과 분석', authors: '최중기, 윤지유, 신명진', journal: '한국스포츠학회지 제17권 4호 pp.661~671', year: '2019', category: '국내', url: '', description: '' },
  { title: 'SNPE 바른자세 척추운동의 생리학적 효과 연구 (1차)', authors: '서울대학교 스포츠과학 연구소', journal: '서울대학교 연구보고서', year: '2018', category: '국내', url: '', description: '' },
  { title: 'SNPE 바른자세 척추운동의 생리학적 효과 연구 (2차)', authors: '서울대학교 스포츠과학 연구소', journal: '서울대학교 연구보고서', year: '2017', category: '국내', url: '', description: '' },
  { title: 'SNPE 바른자세 척추운동의 생리학적 효과 연구 (3차)', authors: '서울대학교 스포츠과학 연구소', journal: '서울대학교 연구보고서', year: '2016', category: '국내', url: '', description: '' },
  { title: 'SNPE 바른자세 척추운동의 생리학적 효과 연구 (4차)', authors: '서울대학교 스포츠과학 연구소', journal: '서울대학교 연구보고서', year: '2015', category: '국내', url: '', description: '' },
  { title: 'SNPE 바른자세 척추운동의 생리학적 효과 연구 (5차)', authors: '서울대학교 스포츠과학 연구소', journal: '서울대학교 연구보고서', year: '2014', category: '국내', url: '', description: '' },
  { title: 'SNPE 바른자세 척추운동의 생리학적 효과 연구 (6차)', authors: '서울대학교 스포츠과학 연구소', journal: '서울대학교 연구보고서', year: '2013', category: '국내', url: '', description: '' },
  { title: 'SNPE 바른자세 척추운동의 생리학적 효과 연구 (7차)', authors: '서울대학교 스포츠과학 연구소', journal: '서울대학교 연구보고서', year: '2012', category: '국내', url: '', description: '' },
  { title: 'SNPE 바른자세 척추운동의 생리학적 효과 연구 (8차)', authors: '서울대학교 스포츠과학 연구소', journal: '서울대학교 연구보고서', year: '2011', category: '국내', url: '', description: '' },
  { title: 'SNPE 바른자세 척추운동의 생리학적 효과 연구 (9차)', authors: '서울대학교 스포츠과학 연구소', journal: '서울대학교 연구보고서', year: '2010', category: '국내', url: '', description: '' },
]

async function seed() {
  console.log('🌱 SNPE 초기 데이터 시딩 시작...\n')

  const tables = [
    { name: 'centers', data: centers },
    { name: 'studios', data: studios },
    { name: 'notices', data: notices },
    { name: 'news', data: news },
    { name: 'activities', data: activities },
    { name: 'teachers', data: teachers },
    { name: 'experience_cases', data: experience_cases },
    { name: 'research_papers', data: research_papers },
  ]

  for (const { name, data } of tables) {
    // 이미 데이터가 있으면 건너뜀
    const { count } = await supabase.from(name).select('*', { count: 'exact', head: true })
    if (count > 0) {
      console.log(`⏭️  ${name}: 이미 ${count}건 존재 → 건너뜀`)
      continue
    }

    const { error } = await supabase.from(name).insert(data)
    if (error) {
      console.error(`❌ ${name} 오류:`, error.message)
    } else {
      console.log(`✅ ${name}: ${data.length}건 삽입 완료`)
    }
  }

  console.log('\n🎉 시딩 완료!')
}

seed().catch(console.error)
