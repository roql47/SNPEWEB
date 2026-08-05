import fs from 'node:fs'
import path from 'node:path'

const OUT_DIR = path.resolve('public/images/level2')
fs.mkdirSync(OUT_DIR, { recursive: true })

// snpe-level2 Gamma 페이지에서 수집한 이미지 (cdn.gamma.app 원본 → 로컬 파일명)
const MAP = [
  { src: 'https://cdn.gamma.app/xn5jn0wtcx9v8tb/generated-images/6qFgpKyRHHz52ADOs7KVy.png', out: 'why.png' },          // WHY LEVEL 2
  { src: 'https://cdn.gamma.app/xn5jn0wtcx9v8tb/generated-images/r8UCReznIFXrpZULqQa92.png', out: 'philosophy.png' },   // 핵심 이론 (척추 모델)
  { src: 'https://cdn.gamma.app/xn5jn0wtcx9v8tb/generated-images/Oi8TjPALNvtK1pzoLNG1Q.png', out: 'lesson-neck.png' },  // 목·어깨 프로그램
  { src: 'https://cdn.gamma.app/xn5jn0wtcx9v8tb/generated-images/UGCs9USJM4JlMSTAoZaW2.png', out: 'lesson-back.png' },  // 허리·골반 프로그램
  { src: 'https://cdn.gamma.app/xn5jn0wtcx9v8tb/generated-images/5Q6YYEL5PDcF02ZrQi8an.png', out: 'lesson-leg.png' },   // 휜다리 프로그램
  { src: 'https://cdn.gamma.app/xn5jn0wtcx9v8tb/generated-images/EBsckfL22QXlE-5fTv2SI.png', out: 'recommend.png' },    // 추천 대상 (지도 장면)
  { src: 'https://cdn.gamma.app/xn5jn0wtcx9v8tb/generated-images/h3uRfC5ru4GM0MAXCl4iq.png', out: 'schedule.png' },     // 교육일정 배경
]

for (const { src, out } of MAP) {
  const dest = path.join(OUT_DIR, out)
  console.log('Downloading', out, '...')
  const res = await fetch(src, { headers: { 'User-Agent': 'Mozilla/5.0' } })
  if (!res.ok) {
    console.error('FAIL', src, res.status)
    continue
  }
  const buf = Buffer.from(await res.arrayBuffer())
  fs.writeFileSync(dest, buf)
  console.log('  →', dest, `(${(buf.length / 1024).toFixed(1)} KB)`)
}

console.log('\nDone.')
