# Script de publicación para el proyecto Telecom Web
# Uso: haz doble clic o ejecútalo desde PowerShell después de instalar Git.

$git = Get-Command git -ErrorAction SilentlyContinue
if (-not $git) {
    Write-Host "ERROR: Git no está instalado. Instala Git desde https://git-scm.com/download/win y vuelve a ejecutar este script." -ForegroundColor Red
    exit 1
}

Write-Host "Script de publicación para Telecom Web" -ForegroundColor Cyan
$repoUrl = Read-Host "Pega la URL del repositorio remoto de GitHub (por ejemplo: https://github.com/tu-usuario/tu-repo.git)"
if ([string]::IsNullOrWhiteSpace($repoUrl)) {
    Write-Host "No se proporcionó URL. El script se detendrá." -ForegroundColor Yellow
    exit 1
}

Set-Location $PSScriptRoot

if (-not (Test-Path .git)) {
    Write-Host "Inicializando repositorio Git local..."
    git init
}

Write-Host "Agregando archivos al repositorio..."
git add .

try {
    git commit -m "Publicar landing Claro Ecuador" -q
} catch {
    Write-Host "No se creó un nuevo commit porque ya existía uno previo o no había cambios." -ForegroundColor Yellow
}

$existingRemote = git remote get-url origin 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "Remoto existente detectado: $existingRemote"
    git remote remove origin
}

Write-Host "Configurando remoto origin..."
git remote add origin $repoUrl

Write-Host "Enviando la rama main a GitHub..."
git branch -M main
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "Publicación completada. Revisa tu repositorio en GitHub." -ForegroundColor Green
} else {
    Write-Host "Ocurrió un error al enviar al repositorio. Revisa los mensajes de Git y vuelve a intentar." -ForegroundColor Red
}
