$docxFiles = Get-ChildItem -Path "." -Filter "*.docx"

foreach ($docx in $docxFiles) {
  Write-Host "=== $($docx.Name) ($([int]($docx.Length/1024)) KB) ==="

  $tmpDir = Join-Path $env:TEMP ("docx_img_" + [System.IO.Path]::GetRandomFileName())
  New-Item -ItemType Directory -Path $tmpDir -Force | Out-Null
  $zipPath = Join-Path $tmpDir "doc.zip"
  Copy-Item -LiteralPath $docx.FullName -Destination $zipPath
  Expand-Archive -Path $zipPath -DestinationPath $tmpDir -Force

  $mediaDir = Join-Path $tmpDir "word\media"
  if (Test-Path $mediaDir) {
    $imgs = Get-ChildItem $mediaDir -File
    Write-Host "  Images: $($imgs.Count)"
    foreach ($img in $imgs) {
      Write-Host "    $($img.Name)  $([int]($img.Length/1024)) KB"
    }

    # 파일명 기반으로 출력폴더 결정
    $baseName = $docx.BaseName -replace '^\d+\.\s*', '' -replace '\s', '-'
    $outDir = "public/images/about/$baseName"
    New-Item -ItemType Directory -Path $outDir -Force | Out-Null
    Copy-Item -Path (Join-Path $mediaDir "*") -Destination $outDir -Force
    Write-Host "  → saved to $outDir"
  } else {
    Write-Host "  No images"
  }

  Remove-Item $tmpDir -Recurse -Force
}
