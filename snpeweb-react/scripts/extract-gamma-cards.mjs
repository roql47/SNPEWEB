import fs from 'node:fs'

const html = fs.readFileSync('gamma_page.html', 'utf8')

// gamma 페이지의 카드 JSON 데이터 추출 (__NEXT_DATA__ 또는 cards JSON)
// 1) cards JSON 객체에서 image src 와 인접 text 노드 매칭

const cards = []
// `"type":"card"` 단위로 분할
const cardBlocks = html.split(/"type":"card"/)

for (let i = 1; i < cardBlocks.length; i++) {
  const block = cardBlocks[i].slice(0, 12000)

  // image src
  const imgs = [...block.matchAll(/"src":"(https:\/\/cdn\.gamma\.app\/[^"]+\.(?:jpg|jpeg|png|webp|gif|avif))"/g)].map(m => m[1])
  // text 노드
  const texts = [...block.matchAll(/"text":"([^"]+)"/g)].map(m => m[1])

  cards.push({ cardIdx: i, images: [...new Set(imgs)], texts: texts.slice(0, 30) })
}

console.log('CARDS:', cards.length)
for (const c of cards) {
  console.log('\n=== Card', c.cardIdx, '===')
  console.log('IMAGES:')
  c.images.forEach(u => console.log('  -', u))
  console.log('TEXTS:')
  c.texts.slice(0, 12).forEach(t => console.log('  -', t.slice(0, 80)))
}
