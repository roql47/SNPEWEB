$files = @(
  "1.SNPE소개.docx",
  "2.철학과 핵심원리.docx",
  "3. SNPE의 발전과정.docx"
)

foreach ($f in $files) {
  $src = Resolve-Path $f -ErrorAction SilentlyContinue
  if (-not $src) { Write-Host "NOT FOUND: $f"; continue }

  $tmpDir = Join-Path $env:TEMP ("docx_" + [System.IO.Path]::GetRandomFileName())
  New-Item -ItemType Directory -Path $tmpDir -Force | Out-Null

  Copy-Item $src (Join-Path $tmpDir "doc.zip")
  Expand-Archive -Path (Join-Path $tmpDir "doc.zip") -DestinationPath $tmpDir -Force

  $xmlPath = Join-Path $tmpDir "word\document.xml"
  if (-not (Test-Path $xmlPath)) { Write-Host "NO XML in $f"; continue }

  $xml = Get-Content $xmlPath -Raw -Encoding UTF8
  # 태그 제거 후 텍스트 추출
  $text = $xml -replace '<w:br[^>]*/>', "`n"
  $text = $text -replace '</w:p>', "`n"
  $text = $text -replace '<[^>]+>', ''
  $text = $text -replace '&amp;', '&'
  $text = $text -replace '&lt;', '<'
  $text = $text -replace '&gt;', '>'
  $text = $text -replace '\n{3,}', "`n`n"
  $text = $text.Trim()

  $outFile = $f -replace '\.docx$', '.txt'
  $text | Out-File -FilePath $outFile -Encoding UTF8
  Write-Host "===== $f ====="
  Write-Host ($text.Substring(0, [Math]::Min(3000, $text.Length)))
  Write-Host ""

  Remove-Item $tmpDir -Recurse -Force
}
