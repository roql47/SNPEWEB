$base = "public\images\about"

# 한글 폴더 내 이미지들을 about 폴더 바로 아래 영문 이름으로 이동
$subdirs = Get-ChildItem -Path $base -Directory

foreach ($d in $subdirs) {
  Write-Host "Found dir: $($d.Name)"
  $imgs = Get-ChildItem -Path $d.FullName -File
  foreach ($img in $imgs) {
    Write-Host "  $($img.Name)"
  }
}

# 1.SNPE소개 docx 이미지 4장 → about/snpe-intro/
$snpeDir = $subdirs | Where-Object { $_.Name -match 'SNPE' -and $_.Name -notmatch '발전' -and $_.Name -notmatch '수정' } | Select-Object -First 1
if ($snpeDir) {
  $outDir = Join-Path $base "snpe-intro"
  New-Item -ItemType Directory -Path $outDir -Force | Out-Null
  Get-ChildItem -Path $snpeDir.FullName -File | ForEach-Object {
    Copy-Item -LiteralPath $_.FullName -Destination (Join-Path $outDir $_.Name) -Force
    Write-Host "copied $($_.Name) to snpe-intro/"
  }
}

# 3.발전과정 docx 이미지 → about/evolution/
$evolDir = $subdirs | Where-Object { $_.Name -match '발전|SNPE.*발전' } | Select-Object -First 1
if ($evolDir) {
  $outDir = Join-Path $base "evolution"
  New-Item -ItemType Directory -Path $outDir -Force | Out-Null
  Get-ChildItem -Path $evolDir.FullName -File | ForEach-Object {
    Copy-Item -LiteralPath $_.FullName -Destination (Join-Path $outDir $_.Name) -Force
    Write-Host "copied $($_.Name) to evolution/"
  }
}

Write-Host "Done."
