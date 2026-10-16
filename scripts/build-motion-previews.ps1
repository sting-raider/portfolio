param([ValidateSet('all', 'battle', 'cinema', 'inventory', 'retro')][string]$Variant = 'all')
$ErrorActionPreference = 'Stop'
$portfolioRoot = Split-Path -Parent $PSScriptRoot
Push-Location -LiteralPath $portfolioRoot
$previousVariant = $env:NEXT_PUBLIC_MOTION_VARIANT
$previousDist = $env:NEXT_PREVIEW_DIST_DIR
try {
    $variants = if ($Variant -eq 'all') { @('battle', 'cinema', 'inventory') } else { @($Variant) }
    foreach ($previewVariant in $variants) {
        Write-Host "Building optimized preview: $previewVariant"
        $env:NEXT_PUBLIC_MOTION_VARIANT = $previewVariant
        $env:NEXT_PREVIEW_DIST_DIR = ".next-lab-$previewVariant"
        & npm.cmd run build
        if ($LASTEXITCODE -ne 0) { throw "Preview build failed: $previewVariant" }
        # With output: export, Next uses a custom distDir as its export destination.
        $exportSource = Join-Path $portfolioRoot ".next-lab-$previewVariant"
        $previewTarget = Join-Path $portfolioRoot ".artifacts/motion-previews/$previewVariant"
        New-Item -ItemType Directory -Path $previewTarget -Force | Out-Null
        Get-ChildItem -LiteralPath $exportSource -Force | Copy-Item -Destination $previewTarget -Recurse -Force
        Write-Host "Exported $previewVariant to $previewTarget"
    }
} finally {
    $env:NEXT_PUBLIC_MOTION_VARIANT = $previousVariant
    $env:NEXT_PREVIEW_DIST_DIR = $previousDist
    Pop-Location
}
