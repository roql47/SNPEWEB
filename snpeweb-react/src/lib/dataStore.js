const STORAGE_KEY = 'snpe_admin_data'

const defaultCenters = [
  { id: '1', name: '강서 마곡나루점', region: '서울', address: '서울시 강서구 마곡동 757-3 4층', tel: '010-9833-0359', email: 'snpe_magoknaru@naver.com' },
  { id: '2', name: '용산 한남점', region: '서울', address: '서울시 용산구 독서당로 82 2층', tel: '010-9083-2795', email: 'snpe_hee@naver.com' },
  { id: '3', name: '목동 오목교점', region: '서울', address: '서울시 양천구 신정동 89-100 3층', tel: '010-4604-3390', email: 'snpemd@naver.com' },
  { id: '4', name: '성신여대점', region: '서울', address: '서울시 성북구 보문로 188 3층', tel: '010-2593-3622', email: 'snpe_euni_eun@naver.com' },
  { id: '5', name: '강서 화곡점', region: '서울', address: '서울시 강서구 강서로 202 3층', tel: '010-7654-7880', email: 'shimeonhye@naver.com' },
  { id: '6', name: '서초방배점', region: '서울', address: '서울 서초구 방배로 200 2층 201호', tel: '010-9174-2777', email: 'iaballet@naver.com' },
  { id: '7', name: '영등포구청점', region: '서울', address: '서울시 영등포구 당산동3가 270 우미빌딩 305호', tel: '010-3143-2221', email: 'lsd9628@naver.com' },
  { id: '8', name: '서울 낙성대점', region: '서울', address: '서울시 관악구 남부순환로 1903 3층', tel: '010-5294-6691', email: 'gmlwn871@naver.com' },
  { id: '9', name: '서울 왕십리점', region: '서울', address: '서울시 성동구 왕십리로 352-1 2층', tel: '010-3619-3699', email: '' },
  { id: '10', name: '일산 주엽점', region: '경기', address: '경기도 고양시 일산서구 중앙로 1437 602호', tel: '010-6727-3020', email: 'snpess@naver.com' },
  { id: '11', name: '부천 상동점', region: '경기', address: '경기도 부천시 길주로 137, 604-2호', tel: '010-3663-2786', email: 'vivian0813@naver.com' },
  { id: '12', name: '경기양평점', region: '경기', address: '경기 양평군 강상면 강남로913번길 3-1 1층', tel: '010-2852-5837', email: 'jini5837@naver.com' },
  { id: '13', name: '용인 수지점', region: '경기', address: '경기도 용인시 수지구 풍덕천동 1070-7 302호', tel: '010-4211-9258', email: 'snpe_ys@naver.com' },
  { id: '14', name: '고양 삼송원흥점', region: '경기', address: '경기도 고양시 덕양구 권율대로 672 421호', tel: '010-9230-4683', email: '' },
  { id: '15', name: '화성 동탄역점', region: '경기', address: '경기도 화성시 동탄대로 446 그란비아스타 3103호', tel: '010-2055-4086', email: 'ykham76@naver.com' },
  { id: '16', name: '일산역점', region: '경기', address: '경기도 고양시 일산서구 일산동 627-82번지 3층', tel: '010-8272-5476', email: 'limory@hanmail.net' },
  { id: '17', name: '김포 한강점', region: '경기', address: '경기도 김포시 김포한강1로51번길 12 7층', tel: '010-7332-3793', email: 'dkxls007@naver.com' },
  { id: '18', name: '분당 정자점', region: '경기', address: '경기도 성남시 분당구 성남대로331번길 3-9 4층', tel: '010-2866-0346', email: 'mnbv0346@naver.com' },
  { id: '19', name: '하남 미사점', region: '경기', address: '경기도 하남시 미사강변한강로279 롯데캐슬헤븐시티 1차 309호', tel: '010-3322-6388', email: 'itssum819@gmail.com' },
  { id: '20', name: '남양주 화도점', region: '경기', address: '경기도 남양주시 화도읍 비룡로 117 3층', tel: '010-8305-1233', email: 'btyspace@naver.com' },
  { id: '21', name: '분당 서현점', region: '경기', address: '경기도 분당구 황새울로 342번길 23 기영프라자 7층', tel: '010-4933-2075', email: 'snpe_seohyun@naver.com' },
  { id: '22', name: '의왕 포일점', region: '경기', address: '경기도 의왕시 봇들로 40, 포일프라자 201호', tel: '010-9174-2777', email: 'iaballet@naver.com' },
  { id: '23', name: '수원 매탄점', region: '경기', address: '경기도 수원시 영통구 매탄로108번길 28, 504호', tel: '010-7777-2089', email: 'sunshine_snpe@naver.com' },
  { id: '24', name: '광교 상현역점', region: '경기', address: '경기도 용인시 수지구 광교중앙로296번길 10, 205호', tel: '010-3122-2745', email: 'snpe_sanghyun@naver.com' },
  { id: '25', name: '남양주 다산점', region: '경기', address: '경기도 남양주시 다산중앙로123번길 22-16 샤르망프라자 501호', tel: '010-7900-1749', email: 'snpegoldbody@gmail.com' },
  { id: '26', name: '고양 지축점', region: '경기', address: '경기도 고양시 덕양구 지축로 62 지축아인시티프라자 804호', tel: '010-2614-1529', email: 'uensarang@gmail.com' },
  { id: '27', name: '인천 계양점', region: '인천', address: '인천 계양구 계산새로 93 밀레니엄프라자 806호', tel: '010-2862-7492', email: 'ok7492@naver.com' },
  { id: '28', name: '인천 송도점', region: '인천', address: '인천광역시 연수구 컨벤시아대로 81 드림시티 4층 412호', tel: '010-5347-3498', email: 'alfk222@naver.com' },
  { id: '29', name: '인천 검단점', region: '인천', address: '인천광역시 서구 이음대로 378 5층 512호', tel: '010-7425-7172', email: 'boss6989@naver.com' },
  { id: '30', name: '대전 유성점', region: '대전', address: '대전광역시 유성구 어은로57 한빛프라자 306호', tel: '010-2933-9161', email: 'snpe-yangks@naver.com' },
  { id: '31', name: '대구 이시아점', region: '대구', address: '대구광역시 동구 봉무동 1539-8 4층 405호', tel: '010-5160-7535', email: 'jini1820@naver.com' },
  { id: '32', name: '대구 수성점', region: '대구', address: '대구광역시 수성구 들안로 343, 4층', tel: '010-5790-7982', email: 'snpe_victoria@naver.com' },
  { id: '33', name: '광주 상무점', region: '광주', address: '광주광역시 서구 상무평화로 79, 303호', tel: '010-9601-0171', email: 'snpegwangju@naver.com' },
  { id: '34', name: '부산 경성대', region: '부산', address: '부산광역시 남구 용소로 11 해림빌딩 3층', tel: '010-5116-3806', email: 'snpebusan@naver.com' },
  { id: '35', name: '부산 해운대점', region: '부산', address: '부산광역시 해운대구 세실로27번길 21, 902호', tel: '010-5116-3806', email: 'snpebusan@naver.com' },
  { id: '36', name: '부산 서면점', region: '부산', address: '부산광역시 부산진구 서전로 11-1 2층', tel: '010-9554-0602', email: 'hongperfect@hanmail.com' },
  { id: '37', name: '부산대점', region: '부산', address: '부산광역시 금정구 부산대학로 29 2층', tel: '010-8557-9238', email: 'tasin@naver.com' },
  { id: '38', name: '부산 하단점', region: '부산', address: '부산 사하구 낙동대로 466 7층', tel: '010-2034-6627', email: '' },
  { id: '39', name: '청주 지웰점', region: '충청', address: '충청북도 청주시 흥덕구 대농로 70 7층', tel: '010-4564-2786', email: 'jsbak18@naver.com' },
  { id: '40', name: '아산 탕정점', region: '충청', address: '충청남도 아산시 탕정면 한들물빛5로 25 리앤포레 410,411호', tel: '010-5967-1583', email: 'inaz1624@naver.com' },
  { id: '41', name: '천안 불당점', region: '충청', address: '충청남도 천안시 서북구 불당동 1535-1번지 마블러스티타워 201호', tel: '010-7753-7687', email: 'snpe_bd@naver.com' },
  { id: '42', name: '통영 무전점', region: '경상', address: '경상남도 통영시 무전4길10번지 주영에이스빌4차상가 115호', tel: '010-2699-8171', email: 'syun44706@gmail.com' },
  { id: '43', name: '진주 초전점', region: '경상', address: '경상남도 진주시 초북로20번길 22, 5층', tel: '010-8938-9289', email: '1977younghee@naver.com' },
  { id: '44', name: '창원 상남점', region: '경상', address: '경남 창원시 성산구 마디미로3번길 17 가야빌딩 3층', tel: '010-6642-5850', email: 'tjd48@hanmail.net' },
  { id: '45', name: '양산 증산점', region: '경상', address: '경상남도 양산시 물금읍 증산역로 163. 재승프라자 702호', tel: '010-2050-6581', email: 'yangsan-snpe@naver.com' },
  { id: '46', name: '춘천 퇴계점', region: '강원', address: '강원특별자치도 춘천시 김유정로 1893, 2층', tel: '', email: 'qhqo5416@naver.com' },
]

const defaultStudios = [
  { id: '1', name: '양주옥정점', owner: '심예진', tel: '010-7541-9311', email: 'shim1358@naver.com', address: '경기도 양주시 옥정동로 7다길54, 4층 410호' },
  { id: '2', name: '리셋바디 침산점', owner: '김선정', tel: '010-3494-3278', email: 'sjooosjoo@naver.com', address: '대구광역시 북구 침산로 173, 8층 803호' },
  { id: '3', name: '청사로점', owner: '문계순', tel: '010-8246-1288', email: 'moonsoon1115@hanmail.net', address: '대전광역시 서구 청사로 228, 813호' },
]

const defaultNotices = [
  { id: '1', title: 'SNPE 홈페이지가 새롭게 리뉴얼되었습니다', date: '2026-03-18', content: 'SNPE 공식 홈페이지가 새롭게 리뉴얼되었습니다. 더 나은 서비스를 위해 노력하겠습니다.', pinned: true },
  { id: '2', title: '2026년 상반기 교육 일정 안내', date: '2026-03-15', content: '2026년 상반기 SNPE 교육 과정(LEVEL 1~3) 일정이 확정되었습니다.', pinned: false },
]

const defaultNews = [
  { id: '1', title: '중앙일보 소비자 만족도 선정', date: '2026-01-10', source: '중앙일보', url: '', summary: 'SNPE가 소비자 만족도 조사에서 높은 평가를 받았습니다.' },
  { id: '2', title: '올리브영 입점', date: '2025-12-01', source: '올리브영', url: '', summary: 'SNPE 도구가 올리브영에 입점하였습니다.' },
  { id: '3', title: '차의과대학 SNPE 석사과정 개설', date: '2025-11-15', source: '차의과대학', url: '', summary: '차의과학대학교에서 SNPE 관련 석사과정이 개설되었습니다.' },
]

const defaultActivities = [
  { id: '1', title: '제3회 건강한삶학회 학술대회', date: '2024-03-15', location: '서울 코엑스', desc: 'SNPE 운동의 과학적 효과와 최신 연구 결과를 발표하는 학술대회', category: '학술대회' },
  { id: '2', title: 'SNPE 인증강사 워크숍', date: '2024-02-20', location: '강남 SNPE 센터', desc: '전국 인증강사 대상 스킬업 워크숍 및 네트워킹', category: '워크숍' },
  { id: '3', title: '2024 SNPE 신년회', date: '2024-01-20', location: '강남 SNPE 센터', desc: '전국 센터 대표 및 인증강사 신년 모임', category: '행사' },
  { id: '4', title: 'SNPE × 서울시 건강증진 캠페인', date: '2023-11-25', location: '서울광장', desc: '시민 대상 무료 바른자세 체험 및 체형분석 이벤트', category: '캠페인' },
  { id: '5', title: 'Global SNPE Summit 2023', date: '2023-10-10', location: '서울 JW메리어트', desc: '해외 파트너 대학 및 글로벌 강사진과 함께하는 서밋', category: '국제행사' },
]

function getStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return null
}

function saveStore(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

function initStore() {
  const existing = getStore()
  if (!existing) {
    const initial = {
      centers: defaultCenters,
      studios: defaultStudios,
      notices: defaultNotices,
      news: defaultNews,
      activities: defaultActivities,
    }
    saveStore(initial)
    return initial
  }
  return existing
}

let _cache = null
function getData() {
  if (!_cache) _cache = initStore()
  return _cache
}

function persist() {
  saveStore(_cache)
}

function genId(list) {
  const max = list.reduce((m, item) => Math.max(m, parseInt(item.id) || 0), 0)
  return String(max + 1)
}

export const dataStore = {
  getCenters: () => [...getData().centers],
  getCenter: (id) => getData().centers.find((c) => c.id === id),
  addCenter: (center) => {
    const d = getData()
    const item = { ...center, id: genId(d.centers) }
    d.centers.push(item)
    persist()
    return item
  },
  updateCenter: (id, updates) => {
    const d = getData()
    const idx = d.centers.findIndex((c) => c.id === id)
    if (idx === -1) return null
    d.centers[idx] = { ...d.centers[idx], ...updates, id }
    persist()
    return d.centers[idx]
  },
  deleteCenter: (id) => {
    const d = getData()
    d.centers = d.centers.filter((c) => c.id !== id)
    persist()
  },

  getStudios: () => [...getData().studios],
  addStudio: (studio) => {
    const d = getData()
    const item = { ...studio, id: genId(d.studios) }
    d.studios.push(item)
    persist()
    return item
  },
  updateStudio: (id, updates) => {
    const d = getData()
    const idx = d.studios.findIndex((s) => s.id === id)
    if (idx === -1) return null
    d.studios[idx] = { ...d.studios[idx], ...updates, id }
    persist()
    return d.studios[idx]
  },
  deleteStudio: (id) => {
    const d = getData()
    d.studios = d.studios.filter((s) => s.id !== id)
    persist()
  },

  getNotices: () => [...getData().notices].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || b.date.localeCompare(a.date)),
  addNotice: (notice) => {
    const d = getData()
    const item = { ...notice, id: genId(d.notices) }
    d.notices.push(item)
    persist()
    return item
  },
  updateNotice: (id, updates) => {
    const d = getData()
    const idx = d.notices.findIndex((n) => n.id === id)
    if (idx === -1) return null
    d.notices[idx] = { ...d.notices[idx], ...updates, id }
    persist()
    return d.notices[idx]
  },
  deleteNotice: (id) => {
    const d = getData()
    d.notices = d.notices.filter((n) => n.id !== id)
    persist()
  },

  getNews: () => [...getData().news].sort((a, b) => b.date.localeCompare(a.date)),
  addNews: (news) => {
    const d = getData()
    const item = { ...news, id: genId(d.news) }
    d.news.push(item)
    persist()
    return item
  },
  updateNews: (id, updates) => {
    const d = getData()
    const idx = d.news.findIndex((n) => n.id === id)
    if (idx === -1) return null
    d.news[idx] = { ...d.news[idx], ...updates, id }
    persist()
    return d.news[idx]
  },
  deleteNews: (id) => {
    const d = getData()
    d.news = d.news.filter((n) => n.id !== id)
    persist()
  },

  getActivities: () => {
    const d = getData()
    if (!d.activities) { d.activities = defaultActivities; persist() }
    return [...d.activities].sort((a, b) => b.date.localeCompare(a.date))
  },
  addActivity: (activity) => {
    const d = getData()
    if (!d.activities) d.activities = []
    const item = { ...activity, id: genId(d.activities) }
    d.activities.push(item)
    persist()
    return item
  },
  updateActivity: (id, updates) => {
    const d = getData()
    if (!d.activities) return null
    const idx = d.activities.findIndex((a) => a.id === id)
    if (idx === -1) return null
    d.activities[idx] = { ...d.activities[idx], ...updates, id }
    persist()
    return d.activities[idx]
  },
  deleteActivity: (id) => {
    const d = getData()
    if (!d.activities) return
    d.activities = d.activities.filter((a) => a.id !== id)
    persist()
  },

  resetAll: () => {
    _cache = null
    localStorage.removeItem(STORAGE_KEY)
    _cache = initStore()
  },
}
