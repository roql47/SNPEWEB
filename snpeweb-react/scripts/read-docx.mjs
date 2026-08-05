import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'

// docx = zip 파일. document.xml 에서 텍스트 추출
const files = [
  '1.SNPE소개.docx',
  '2.철학과 핵심원리.docx',
  '3. SNPE의 발전과정.docx',
]

for (const f of files) {
  const src = path.resolve(f)
  if (!fs.existsSync(src)) { console.log('NOT FOUND:', f); continue }

  // PowerShell로 zip 압축 해제 후 document.xml 읽기
  const outDir = path.resolve(`_docx_tmp_${Date.now()}`)
  fs.mkdirSync(outDir, { recursive: true })

  try {
    execSync(`powershell -Command "Expand-Archive -Path '${src}' -DestinationPath '${outDir}' -Force"`, { stdio: 'ignore' })
    const xmlPath = path.join(outDir, 'word', 'document.xml')
    if (!fs.existsSync(xmlPath)) { console.log('NO document.xml in', f); continue }

    const xml = fs.readFileSync(xmlPath, 'utf8')
    // XML 태그 제거, 텍스트만 추출
    const text = xml
      .replace(/<w:br[^/]*/g, '\n')
      .replace(/<\/w:p>/g, '\n')
      .replace(/<[^>]+>/g, '')
      .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ')
      .replace(/\n{3,}/g, '\n\n')
      .trim()

    const outTxt = f.replace('.docx', '.txt')
    fs.writeFileSync(outTxt, text)
    console.log(`\n===== ${f} =====`)
    console.log(text.slice(0, 3000))
  } finally {
    fs.rmSync(outDir, { recursive: true, force: true })
  }
}
