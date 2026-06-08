$base = "public\images\about"
$subdirs = Get-ChildItem -Path $base -Directory

# 첫 번째 디렉토리(이미지 4장) → snpe-intro
$d1 = $subdirs[0]
Write-Host "Dir1: $($d1.Name)"
$out1 = Join-Path $base "snpe-intro"
New-Item -ItemType Directory -Path $out1 -Force | Out-Null
Get-ChildItem -Path $d1.FullName -File | ForEach-Object {
  Copy-Item -LiteralPath $_.FullName -Destination (Join-Path $out1 $_.Name) -Force
  Write-Host "  copied $($_.Name)"
}

# 두 번째 디렉토리(이미지 1장, evolution) → evolution
$d2 = $subdirs[1]
Write-Host "Dir2: $($d2.Name)"
$out2 = Join-Path $base "evolution"
New-Item -ItemType Directory -Path $out2 -Force | Out-Null
Get-ChildItem -Path $d2.FullName -File | ForEach-Object {
  Copy-Item -LiteralPath $_.FullName -Destination (Join-Path $out2 $_.Name) -Force
  Write-Host "  copied $($_.Name)"
}

Write-Host "Done."
