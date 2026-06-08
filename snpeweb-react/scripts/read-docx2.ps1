$docxFiles = Get-ChildItem -Path "." -Filter "*.docx" | Where-Object { $_.Name -ne "수정사항 20260524.docx" }

foreach ($file in $docxFiles) {
  $src = $file.FullName
  Write-Host "Processing: $($file.Name)"

  $tmpDir = Join-Path $env:TEMP ("docx_" + [System.IO.Path]::GetRandomFileName())
  New-Item -ItemType Directory -Path $tmpDir -Force | Out-Null

  $zipPath = Join-Path $tmpDir "doc.zip"
  Copy-Item -LiteralPath $src -Destination $zipPath

  Expand-Archive -Path $zipPath -DestinationPath $tmpDir -Force

  $xmlPath = Join-Path $tmpDir "word\document.xml"
  if (-not (Test-Path $xmlPath)) { Write-Host "NO XML"; continue }

  $xml = [System.IO.File]::ReadAllText($xmlPath, [System.Text.Encoding]::UTF8)
  $text = $xml -replace '<w:br[^>]*/>', "`n"
  $text = $text -replace '</w:p>', "`n"
  $text = $text -replace '<[^>]+>', ''
  $text = $text -replace '&amp;', '&'
  $text = $text -replace '&lt;', '<'
  $text = $text -replace '&gt;', '>'
  $text = $text -replace '\n{3,}', "`n`n"
  $text = $text.Trim()

  $outFile = $file.Name -replace '\.docx$', '.txt'
  [System.IO.File]::WriteAllText($outFile, $text, [System.Text.Encoding]::UTF8)
  Write-Host "===== $($file.Name) ====="
  Write-Host $text.Substring(0, [Math]::Min(4000, $text.Length))
  Write-Host ""

  Remove-Item $tmpDir -Recurse -Force
}
