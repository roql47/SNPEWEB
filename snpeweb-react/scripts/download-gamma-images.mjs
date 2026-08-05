import fs from 'node:fs'
import path from 'node:path'

const OUT_DIR = path.resolve('public/images/level1')
fs.mkdirSync(OUT_DIR, { recursive: true })

// 카드 매핑 결과를 기반으로 한 파일 (gamma.site → 로컬 파일명)
const MAP = [
  { src: 'https://cdn.gamma.app/xn5jn0wtcx9v8tb/generated-images/jma6av-6lBuKkKNaF8T5h.png', out: 'hero.png' },
  { src: 'https://cdn.gamma.app/xn5jn0wtcx9v8tb/generated-images/QcEzOhWgYzl7j2-btPk-R.png', out: 'why.png' },
  { src: 'https://cdn.gamma.app/xn5jn0wtcx9v8tb/generated-images/a3z0fb9KMA3OiD-WfZRFr.png', out: 'philosophy.png' },
  { src: 'https://cdn.gamma.app/xn5jn0wtcx9v8tb/generated-images/zKhMtw3CIfdmfFunXV405.png', out: 'phase1.png' },
  { src: 'https://cdn.gamma.app/xn5jn0wtcx9v8tb/generated-images/HzXjBnKhsp0xJd8FFeb1i.png', out: 'phase2.png' },
  { src: 'https://cdn.gamma.app/xn5jn0wtcx9v8tb/generated-images/-d2n0TUaHzdnrfASDPTbv.png', out: 'phase3.png' },
  { src: 'https://cdn.gamma.app/xn5jn0wtcx9v8tb/generated-images/cEv6natUoSDQaI9qMTX2N.png', out: 'phase4.png' },
  { src: 'https://cdn.gamma.app/xn5jn0wtcx9v8tb/f88e800194e24e2383151b046ca3e264/original/kadeunyuseu-9.jpg', out: 'instructors.jpg' },
  { src: 'https://cdn.gamma.app/xn5jn0wtcx9v8tb/cb6e9253689748e1a6a137a32eb24534/original/suganghyetaeg-kadeu.jpg', out: 'benefits.jpg' },
]

for (const { src, out } of MAP) {
  const dest = path.join(OUT_DIR, out)
  // imgproxy 경유 시 크기 조정된 이미지를 받기 위해 원본 cdn URL 사용
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
