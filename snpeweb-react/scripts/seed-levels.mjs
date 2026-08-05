/**
 * Level 1/2/3/Master 페이지 시드 데이터를 Supabase page_contents에 업로드
 * 실행: node scripts/seed-levels.mjs
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const envPath = resolve(__dirname, '..', '.env')
const env = readFileSync(envPath, 'utf8')
  .split('\n')
  .filter((l) => l.trim() && !l.startsWith('#'))
  .reduce((acc, line) => {
    const [k, ...rest] = line.split('=')
    acc[k.trim()] = rest.join('=').trim()
    return acc
  }, {})

const SUPABASE_URL = env.VITE_SUPABASE_URL
const ANON_KEY = env.VITE_SUPABASE_ANON_KEY

const LEVELS = [
  {
    slug: 'level1',
    content: {
      label: 'LEVEL 1',
      course_name: 'SNPE 기초 수료 과정',
      intro: [
        'LEVEL 1 과정은 SNPE 운동의 기본 원리와 핵심 동작을 배우는 기초 수료 과정입니다.',
        '신체 정렬과 자세 인식을 통해 SNPE 운동의 기초를 이해하고 몸의 변화를 경험할 수 있습니다.',
      ],
      goals: [
        'SNPE 운동 기본 원리 이해',
        '신체 정렬 및 바른 자세 인식',
        'SNPE 기본 동작 학습',
        '스스로 몸을 관리할 수 있는 기초 운동 습득',
      ],
      targets: [
        'SNPE 운동을 처음 배우는 분',
        '자신의 자세와 신체 균형을 이해하고 싶은 분',
        'SNPE 운동을 체계적으로 배우고 싶은 분',
      ],
      summary: [
        { label: '과정 유형', value: '수료 과정' },
        { label: '이수 결과', value: '교육 이수 시 LEVEL 1 수료' },
      ],
    },
  },
  {
    slug: 'level2',
    content: {
      label: 'LEVEL 2',
      course_name: 'SNPE 지도자 자격 과정',
      intro: [
        'LEVEL 2 과정은 SNPE 지도자로 활동하기 위한 지도자 자격 과정입니다.',
        'SNPE 운동 원리와 동작을 보다 깊이 이해하고 실제 지도에 필요한 티칭 중심 교육이 진행됩니다.',
        '누구나 수강할 수 있지만 SNPE 운동 경험이 없는 경우 교육을 따라가기에 다소 어려울 수 있습니다.',
      ],
      goals: [
        'SNPE 운동 원리 심화 이해',
        '동작 지도 방법 학습',
        '티칭 능력 향상',
        '지도자로서의 기본 역량 습득',
      ],
      targets: [
        'SNPE 지도자로 활동하고 싶은 분',
        '운동 지도 경험에 전문성을 더하고 싶은 분',
        'SNPE 운동 경험이 있는 분',
      ],
      summary: [
        { label: '과정 유형', value: '지도자 자격 과정' },
        { label: '이수 결과', value: '평가를 통해 SNPE 지도자 자격 취득 가능' },
      ],
    },
  },
  {
    slug: 'level3',
    content: {
      label: 'LEVEL 3',
      course_name: 'SNPE 전문가 과정',
      intro: [
        'LEVEL 3 과정은 SNPE 지도자를 위한 심화 전문가 과정입니다.',
        'LEVEL 2 과정을 이수한 지도자를 대상으로 진행되며 보다 깊이 있는 신체 이해와 지도 역량을 강화하는 교육입니다.',
      ],
      goals: [
        '신체 구조 및 운동 원리 심화 이해',
        '전문 지도 역량 강화',
        '다양한 상황에 맞는 지도 능력 향상',
      ],
      targets: [
        'LEVEL 2 과정을 이수한 SNPE 지도자',
      ],
      summary: [
        { label: '과정 유형', value: '지도자 심화 과정' },
        { label: '참여 조건', value: 'LEVEL 2 이수자만 참여 가능' },
      ],
    },
  },
  {
    slug: 'master',
    content: {
      label: 'MASTER',
      course_name: 'SNPE 마스터 과정',
      intro: [
        'LEVEL 3 이수 후 더 깊은 전문성을 쌓고자 하는 지도자를 위한 최고 심화 과정입니다.',
        '차의과학대·국민대 출신 석·박사급 전문 강사진이 직접 교육하며, 기능해부학부터 실전 워크숍까지 아우릅니다.',
      ],
      goals: [],
      targets: [],
      summary: [
        { label: '참여 조건', value: 'LEVEL 3 전문가 과정 이수자만 참여 가능합니다.' },
        { label: '문의', value: 'snpeedu@mycuring.com' },
      ],
      features: [
        { title: '전문 강사진 직강', desc: '차의과학대, 국민대 출신 석·박사급 전문 강사진이 직접 교육합니다.', icon: 'Award' },
        { title: '기능해부학·신경해부학', desc: '기능해부학, 인체해부학, 신경해부학 등 심화 이론을 학습합니다.', icon: 'BookOpen' },
        { title: '고급 티칭 스킬', desc: '다양한 케이스에 맞는 맞춤형 지도 역량을 체계적으로 심화합니다.', icon: 'Users' },
        { title: '실전 워크숍', desc: '강사 전용 클래스와 실전 워크숍을 통해 현장 적용 능력을 강화합니다.', icon: 'Zap' },
      ],
      curriculum: [
        '기능해부학', '인체해부학', '기초영양학', '신경해부학',
        'SNPE 기본동작 8가지 심화', '지도사 과정 심화', '강사전용 클래스',
      ],
      instructors: [
        { name: '홍정기', title: '차의과학대 스포츠의학원장' },
        { name: '이재훈', title: '차의과학대 박사' },
        { name: '문나람', title: '차의과학대 박사' },
        { name: '이섬결', title: '차의과학대 박사' },
        { name: '정대영', title: '국민대 석사' },
        { name: '김세영', title: '국민대 석사' },
        { name: '김희주', title: '국민대 석사' },
        { name: '박서은', title: '국민대 석사' },
        { name: '최언미', title: 'PIC대학 교육학 박사' },
        { name: '신연화', title: '차의과학대 박사 / 국민대 석사' },
      ],
    },
  },
]

async function upsert(slug, content) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/page_contents`, {
    method: 'POST',
    headers: {
      'apikey': ANON_KEY,
      'Authorization': `Bearer ${ANON_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates,return=representation',
    },
    body: JSON.stringify({ slug, content, updated_at: new Date().toISOString() }),
  })
  const text = await res.text()
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${text}`)
  return JSON.parse(text)
}

async function main() {
  console.log('▶ Seeding level pages...')
  for (const { slug, content } of LEVELS) {
    try {
      await upsert(slug, content)
      console.log(`  ✅ ${slug}`)
    } catch (e) {
      console.error(`  ❌ ${slug}:`, e.message)
    }
  }
  console.log('Done.')
}

main()
