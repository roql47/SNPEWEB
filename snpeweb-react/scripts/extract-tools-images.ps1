# SNPE 도구 설명.pptx 에서 도구 이미지 13장을 public/images/tools/ 로 추출하는 스크립트.
# 사용법:
#   1. 파워셸을 열고 프로젝트 루트(snpeweb-react)로 이동
#   2. powershell -ExecutionPolicy Bypass -File scripts\extract-tools-images.ps1
# 또는 cmd.exe 에서:
#   powershell -ExecutionPolicy Bypass -File scripts\extract-tools-images.ps1

$ErrorActionPreference = 'Stop'

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Split-Path -Parent $scriptDir
$destDir = Join-Path $projectRoot 'public\images\tools'

$pptxFile = Get-ChildItem -Path $projectRoot -Filter '*도구*.pptx' -File | Select-Object -First 1
if (-not $pptxFile) {
    $pptxFile = Get-ChildItem -Path $projectRoot -Filter '*.pptx' -File | Select-Object -First 1
}
if (-not $pptxFile) {
    Write-Error ("PPTX 파일을 찾을 수 없습니다. 프로젝트 루트({0})에 .pptx 파일이 있는지 확인하세요." -f $projectRoot)
    exit 1
}
$pptxPath = $pptxFile.FullName
Write-Host ("대상 PPTX: {0}" -f $pptxPath)

if (-not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir | Out-Null
    Write-Host "디렉터리 생성: $destDir"
}

Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::OpenRead($pptxPath)

$count = 0
foreach ($entry in $zip.Entries) {
    if ($entry.FullName -like 'ppt/media/image*.png') {
        $fileName = [System.IO.Path]::GetFileName($entry.FullName)
        $destPath = Join-Path $destDir $fileName
        $inStream = $entry.Open()
        $outStream = [System.IO.File]::Create($destPath)
        $inStream.CopyTo($outStream)
        $outStream.Close()
        $inStream.Close()
        $count++
        Write-Host ("추출: {0} ({1:N0} bytes)" -f $fileName, $entry.Length)
    }
}
$zip.Dispose()

Write-Host ""
Write-Host "총 $count 장의 이미지를 추출했습니다: $destDir"
