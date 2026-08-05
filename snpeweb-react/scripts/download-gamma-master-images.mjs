import fs from 'node:fs'
import path from 'node:path'

const OUT_DIR = path.resolve('public/images/master')
fs.mkdirSync(OUT_DIR, { recursive: true })

// snpe-master-course Gamma 페이지에서 수집한 이미지 (cdn.gamma.app 원본 → 로컬 파일명)
const MAP = [
  { src: 'https://cdn.gamma.app/xn5jn0wtcx9v8tb/generated-images/EMuQQB5W7_vO9wKZl9PSf.png', out: 'intro.png' },  // 마스터강사란 / MASTER COURSE
  { src: 'https://cdn.gamma.app/xn5jn0wtcx9v8tb/generated-images/NBIfb8ZO6zMNjIFmzeqcG.png', out: 'learn.png' },  // What You Will Learn
  { src: 'https://cdn.gamma.app/xn5jn0wtcx9v8tb/generated-images/NVu5CG3nzqLywbT2TbR5W.png', out: 'vision.png' }, // Vision
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
