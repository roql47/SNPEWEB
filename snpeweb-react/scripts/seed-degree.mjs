/**
 * Degree 페이지 시드 데이터를 Supabase page_contents 테이블에 업로드
 * - 사용 전제: page_contents 테이블이 이미 생성되어 있어야 함 (schema_v2.sql)
 * - 실행: node scripts/seed-degree.mjs
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// .env 파싱
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

if (!SUPABASE_URL || !ANON_KEY) {
  console.error('❌ .env에서 VITE_SUPABASE_URL 또는 VITE_SUPABASE_ANON_KEY를 찾을 수 없습니다.')
  process.exit(1)
}

const DEGREE_CONTENT = {
  _sectionOrder: ['intro', 'philosophy', 'features', 'target', 'roadmap', 'schedule', 'career', 'contact'],
  intro: {
    title: 'SNPE 교육 소개',
    body: 'SNPE 교육은 신체의 구조적 균형을 이해하고 올바른 움직임을 통해 건강한 몸을 만들어가는 교육 프로그램입니다.\n단순한 운동 방법을 배우는 것을 넘어, 신체 구조와 움직임의 원리를 이해하고 스스로 몸을 관리할 수 있도록 돕는 것을 목표로 합니다.',
    image_url: '',
    layout: 'text-only',
    image_ratio: 50,
    hidden: false,
  },
  philosophy: {
    title: 'SNPE 교육 철학',
    items: [
      '신체의 구조적 균형을 회복하고 건강한 움직임을 통해 몸을 관리할 수 있도록 돕는 것을 목표로 합니다.',
      '올바른 자세 인식과 신체 사용 방법을 이해하고 실천할 수 있도록 이론과 실습을 함께 교육합니다.',
      '예방 중심의 건강관리 철학을 바탕으로 지속 가능한 신체 관리 방법을 제시합니다.',
    ],
    image_url: '',
    layout: 'text-only',
    image_ratio: 50,
    hidden: false,
  },
  features: {
    title: 'SNPE 교육 특징',
    items: [
      { icon: 'Layers',   title: '체계적인 단계별 교육 시스템', desc: 'LEVEL 1부터 LEVEL 3까지 단계적으로 구성되어 운동 이해부터 지도 역량까지 체계적으로 학습할 수 있습니다.', image_url: '' },
      { icon: 'BookOpen', title: '이론과 실습이 결합된 교육',  desc: '신체 구조와 운동 원리를 이론으로 이해하고 실제 동작 실습을 통해 몸의 변화를 경험하며 학습합니다.', image_url: '' },
      { icon: 'Users',    title: '티칭 중심 지도자 교육',      desc: 'LEVEL 2부터는 실제 지도 상황을 중심으로 티칭 방법을 배우며 지도자로서 필요한 교육 역량을 강화합니다.', image_url: '' },
      { icon: 'Target',   title: '현장에서 활용 가능한 실전 교육', desc: '센터 수업, 그룹 수업, 개인 지도 등 실제 현장에서 활용할 수 있는 운동 지도 방법을 중심으로 교육이 진행됩니다.', image_url: '' },
    ],
    hidden: false,
  },
  target: {
    title: 'SNPE 교육 대상',
    intro: 'SNPE 교육은 운동을 체계적으로 배우고 싶은 분부터 전문 지도자를 목표로 하는 분까지 다양한 분들이 참여할 수 있습니다.',
    items: [
      'SNPE 운동을 체계적으로 배우고 싶은 분',
      '자신의 자세와 신체 균형을 이해하고 관리하고 싶은 분',
      '건강 관리 및 운동 분야에 관심이 있는 분',
      '운동 지도자로 활동하고 싶은 분',
      '기존 운동 지도 경험에 전문성을 더하고 싶은 분',
    ],
    image_url: '',
    layout: 'text-only',
    image_ratio: 50,
    hidden: false,
  },
  roadmap: {
    title: 'SNPE 교육 구조',
    intro: 'LEVEL 1 → LEVEL 2 → LEVEL 3 순으로 교육이 진행되며, 운동의 이해부터 지도 역량까지 단계적으로 학습할 수 있도록 설계되어 있습니다.',
    items: [
      { level: 'LEVEL 1', name: 'SNPE 기초 수료 과정', desc: '운동 원리 및 기본 동작 이해', path: '/level1', image_url: '' },
      { level: 'LEVEL 2', name: 'SNPE 지도자 자격 과정', desc: '티칭 중심 지도자 교육', path: '/level2', image_url: '' },
      { level: 'LEVEL 3', name: 'SNPE 전문가 과정', desc: '지도 역량 심화 교육', path: '/level3', image_url: '' },
    ],
    hidden: false,
  },
  career: {
    title: '교육 후 진로',
    items: [
      'SNPE 센터 강의, 그룹 운동 지도, 개인 운동 지도 등 다양한 형태로 활동 가능',
      'SNPE 운동을 기반으로 건강 관리와 운동 교육 분야 전문성 확장',
      '지속적인 교육과 경험을 통해 전문 지도자로 성장',
    ],
    image_url: '',
    layout: 'text-only',
    image_ratio: 50,
    hidden: false,
  },
  contact: {
    title: '문의 안내',
    intro: '교육 과정 관련 문의는 아래 채널을 통해 가능합니다.',
    team: '교육 운영팀 문의',
    email: 'contact@mycuring.com',
    phone: '02-539-2925',
    hours: '평일 10:00 ~ 16:00',
    image_url: '',
    layout: 'text-only',
    image_ratio: 50,
    hidden: false,
  },
}

async function main() {
  const url = `${SUPABASE_URL}/rest/v1/page_contents`
  console.log('▶ Supabase URL:', SUPABASE_URL)
  console.log('▶ Upserting page_contents.degree ...')

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'apikey': ANON_KEY,
      'Authorization': `Bearer ${ANON_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates,return=representation',
    },
    body: JSON.stringify({
      slug: 'degree',
      content: DEGREE_CONTENT,
      updated_at: new Date().toISOString(),
    }),
  })

  const text = await res.text()
  if (!res.ok) {
    console.error(`❌ HTTP ${res.status}:`, text)
    if (text.includes('relation') && text.includes('does not exist')) {
      console.error('\n👉 page_contents 테이블이 없습니다. 먼저 schema_v2.sql의 CREATE TABLE 부분을 Supabase SQL Editor에서 실행하세요.')
    }
    process.exit(1)
  }

  console.log('✅ 시드 데이터 입력 완료!')
  console.log(text)
}

main().catch((e) => {
  console.error('❌ 실행 실패:', e)
  process.exit(1)
})
