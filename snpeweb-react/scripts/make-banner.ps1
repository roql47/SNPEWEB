Add-Type -AssemblyName System.Drawing

$src = (Resolve-Path "public/images/level1/hero.png").Path
$dst = Join-Path (Split-Path $src) "banner.jpg"

$img = [System.Drawing.Image]::FromFile($src)
Write-Host "Source: $($img.Width) x $($img.Height)"

# 타깃 비율 4:1 (2560x640) - 다른 서브배너와 동일
$targetW = 2560
$targetH = 640
$targetRatio = $targetW / $targetH    # 4.0
$srcRatio = $img.Width / $img.Height  # 1.76

# 원본에서 타깃 비율과 일치하는 가운데 가로 띠를 crop
if ($srcRatio -gt $targetRatio) {
    # 원본이 더 가로형 → 좌우 잘라 가운데 사용
    $cropH = $img.Height
    $cropW = [int]($img.Height * $targetRatio)
    $cropX = [int](($img.Width - $cropW) / 2)
    $cropY = 0
} else {
    # 원본이 더 세로형 → 위아래 잘라 가운데 띠
    $cropW = $img.Width
    $cropH = [int]($img.Width / $targetRatio)
    $cropX = 0
    # 인물 중심이 화면 위쪽에 있을 가능성 높음 → 25% 지점
    $cropY = [int](($img.Height - $cropH) * 0.25)
}
Write-Host "Crop: ${cropW} x ${cropH} from ($cropX, $cropY)"

$cropRect = New-Object System.Drawing.Rectangle $cropX, $cropY, $cropW, $cropH

$out = New-Object System.Drawing.Bitmap $targetW, $targetH
$g = [System.Drawing.Graphics]::FromImage($out)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode    = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode  = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

$destRect = New-Object System.Drawing.Rectangle 0, 0, $targetW, $targetH
$g.DrawImage($img, $destRect, $cropRect, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()

# JPEG 85% 품질로 저장
$jpegEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
    Where-Object { $_.MimeType -eq 'image/jpeg' }
$encParams = New-Object System.Drawing.Imaging.EncoderParameters 1
$encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
    [System.Drawing.Imaging.Encoder]::Quality, 85L
)
$out.Save($dst, $jpegEncoder, $encParams)

$out.Dispose()
$img.Dispose()

$len = (Get-Item $dst).Length
Write-Host "Saved: $dst ($([int]($len/1024)) KB)"
