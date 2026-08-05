$files = @(
  @{ name="1.SNPE소개.docx"; outDir="public/images/about" },
  @{ name="2.철학과 핵심원리.docx"; outDir="public/images/philosophy" },
  @{ name="3. SNPE의 발전과정.docx"; outDir="public/images/evolution" }
)

foreach ($f in $files) {
  $docx = Get-Item -LiteralPath $f.name -ErrorAction SilentlyContinue
  if (-not $docx) { Write-Host "NOT FOUND: $($f.name)"; continue }

  $tmpDir = Join-Path $env:TEMP ("docx_img_" + [System.IO.Path]::GetRandomFileName())
  New-Item -ItemType Directory -Path $tmpDir -Force | Out-Null
  $zipPath = Join-Path $tmpDir "doc.zip"
  Copy-Item -LiteralPath $docx.FullName -Destination $zipPath
  Expand-Archive -Path $zipPath -DestinationPath $tmpDir -Force

  $mediaDir = Join-Path $tmpDir "word\media"
  if (-not (Test-Path $mediaDir)) {
    Write-Host "No images in: $($f.name)"
    Remove-Item $tmpDir -Recurse -Force
    continue
  }

  $imgFiles = Get-ChildItem $mediaDir -File
  Write-Host "Found $($imgFiles.Count) images in $($f.name)"
  foreach ($img in $imgFiles) {
    Write-Host "  $($img.Name)  ($([int]($img.Length/1024)) KB)"
  }

  # 출력 폴더 생성 후 복사
  New-Item -ItemType Directory -Path $f.outDir -Force | Out-Null
  Copy-Item -Path (Join-Path $mediaDir "*") -Destination $f.outDir -Force
  Write-Host "  → copied to $($f.outDir)"

  Remove-Item $tmpDir -Recurse -Force
}
