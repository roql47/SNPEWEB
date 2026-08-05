import fs from 'node:fs'

const html = fs.readFileSync('gamma_page.html', 'utf8')

// 페이지를 슬라이드/섹션 단위로 분리 (data-card-id 기준)
const cardChunks = html.split(/data-card-id="[^"]+"/)

// 모든 이미지 URL과 그 주변 텍스트 컨텍스트
const imgRegex = /https:\/\/cdn\.gamma\.app\/[^"'\\<>\s]+\.(?:jpg|jpeg|png|webp|gif|avif)/gi

const results = []
let m
let idx = 0
while ((m = imgRegex.exec(html)) !== null) {
  const url = m[0]
  const start = Math.max(0, m.index - 800)
  const end = Math.min(html.length, m.index + 200)
  // 주변 텍스트만 추출 (HTML 태그 제거)
  const snippet = html
    .slice(start, end)
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .trim()
  results.push({ idx: idx++, url, snippet: snippet.slice(-400) })
}

// 중복 URL 제거 (첫 등장 기준)
const seen = new Set()
const unique = results.filter((r) => {
  if (seen.has(r.url)) return false
  seen.add(r.url)
  return true
})

for (const r of unique) {
  console.log('---')
  console.log(r.url)
  console.log(r.snippet)
}
