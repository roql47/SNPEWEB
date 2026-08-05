import fs from 'node:fs'
import path from 'node:path'

const html = fs.readFileSync(path.resolve('gamma_page.html'), 'utf8')

// 모든 이미지/CDN URL 패턴 추출
const patterns = [
  /https:\/\/[^"'\\<>\s]+?\.(?:jpg|jpeg|png|webp|gif|avif|svg)(?:\?[^"'\\<>\s]*)?/gi,
  /https:\/\/cdn\.gamma\.app\/[^"'\\<>\s]+/gi,
  /https:\/\/assets\.api\.gamma\.app\/[^"'\\<>\s]+/gi,
  /https:\/\/[^"'\\<>\s]*gamma[^"'\\<>\s]*/gi,
]

const found = new Set()
for (const re of patterns) {
  const matches = html.match(re) || []
  for (const m of matches) found.add(m)
}

const sorted = [...found].sort()
console.log('TOTAL:', sorted.length)
for (const u of sorted) console.log(u)

fs.writeFileSync('gamma_image_urls.txt', sorted.join('\n'))
