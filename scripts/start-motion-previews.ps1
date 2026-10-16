$ErrorActionPreference = 'Stop'
$portfolioRoot = Split-Path -Parent $PSScriptRoot
$previewNode = (Get-Command node.exe).Source
$previewServer = Join-Path $PSScriptRoot 'serve-motion-preview.mjs'
$variants = @('battle', 'cinema', 'inventory')
for ($index = 0; $index -lt $variants.Count; $index++) {
    $previewVariant = $variants[$index]
    $previewPort = 3001 + $index
    $previewDirectory = Join-Path $portfolioRoot ".artifacts/motion-previews/$previewVariant"
    if (!(Test-Path -LiteralPath (Join-Path $previewDirectory 'index.html'))) {
        throw 'Build the previews first: ./scripts/build-motion-previews.ps1'
    }
    if (Get-NetTCPConnection -State Listen -LocalPort $previewPort -ErrorAction SilentlyContinue) {
        Write-Host "Port $previewPort is already running. Open http://localhost:$previewPort to check it."
        continue
    }
    $previewArguments = @('"' + $previewServer + '"', '"' + $previewDirectory + '"', "$previewPort")
    Start-Process -FilePath $previewNode -ArgumentList $previewArguments -WorkingDirectory $portfolioRoot -WindowStyle Hidden -RedirectStandardOutput (Join-Path $previewDirectory 'server.log') -RedirectStandardError (Join-Path $previewDirectory 'server-error.log') | Out-Null
    Write-Host "$previewVariant : http://localhost:$previewPort"
}
