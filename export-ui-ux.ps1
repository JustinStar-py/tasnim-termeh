# Exports all UI/UX source files (src/**/*.tsx, *.ts, *.css) into a single txt file.
param(
  [string]$SrcDir = (Join-Path $PSScriptRoot "src"),
  [string]$OutFile = (Join-Path $PSScriptRoot "ui-ux-codes.txt")
)

$extensions = @(".tsx", ".ts", ".css")

$files = Get-ChildItem -Path $SrcDir -Recurse -File |
  Where-Object { $extensions -contains $_.Extension } |
  Sort-Object FullName

if ($files.Count -eq 0) {
  Write-Warning "No UI/UX files found in $SrcDir"
  exit 1
}

$sb = New-Object System.Text.StringBuilder
[void]$sb.AppendLine("UI/UX code bundle - generated $(Get-Date -Format 'yyyy-MM-dd HH:mm')")
[void]$sb.AppendLine("Source: src/ | Files: $($files.Count)")
[void]$sb.AppendLine("=" * 80)

foreach ($f in $files) {
  $relative = $f.FullName.Substring($PSScriptRoot.Length + 1)
  [void]$sb.AppendLine("")
  [void]$sb.AppendLine("=" * 80)
  [void]$sb.AppendLine("FILE: $relative")
  [void]$sb.AppendLine("=" * 80)
  [void]$sb.AppendLine([System.IO.File]::ReadAllText($f.FullName))
}

[System.IO.File]::WriteAllText($OutFile, $sb.ToString(), (New-Object System.Text.UTF8Encoding $false))
Write-Output "Bundled $($files.Count) files -> $OutFile"
