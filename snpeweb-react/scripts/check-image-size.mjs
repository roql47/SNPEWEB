import fs from 'node:fs'
import path from 'node:path'

const targets = [
  'public/images/level1/hero.png',
  'public/images/level1/why.png',
  'public/images/level1/philosophy.png',
  'public/images/level1/phase1.png',
  'public/images/level1/phase2.png',
  'public/images/level1/phase3.png',
  'public/images/level1/phase4.png',
  'public/images/level1/instructors.jpg',
  'public/images/level1/benefits.jpg',
  'public/images/sub_banner_1.jpg',
  'public/images/sub_banner2.jpg',
]

for (const rel of targets) {
  const p = path.resolve(rel)
  if (!fs.existsSync(p)) { console.log(rel, '— not found'); continue }
  const buf = fs.readFileSync(p)
  let w = 0, h = 0, type = ''
  if (buf.slice(0,8).equals(Buffer.from([0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a]))) {
    type = 'png'; w = buf.readUInt32BE(16); h = buf.readUInt32BE(20)
  } else if (buf[0]===0xff && buf[1]===0xd8) {
    type = 'jpg'
    let i = 2
    while (i < buf.length) {
      if (buf[i]!==0xff){i++;continue}
      const marker=buf[i+1]; const len=buf.readUInt16BE(i+2)
      if(marker>=0xc0&&marker<=0xc3){h=buf.readUInt16BE(i+5);w=buf.readUInt16BE(i+7);break}
      i+=2+len
    }
  }
  console.log(`${rel.padEnd(45)} ${type} ${w}x${h}  ratio=${(w/h).toFixed(2)}`)
}
