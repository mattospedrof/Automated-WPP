@echo off
chcp 65001 >nul
echo ========================================
echo   Fkz Tech - Release Builder
echo ========================================
echo.

REM ── Le VERSION do codigo automaticamente ──────────────────────
for /f "tokens=*" %%v in ('python -c "from utils.version import VERSION; print(VERSION)"') do set RAW_VER=%%v

REM Remove espacos e aspas
for /f "tokens=* delims= " %%a in ("%RAW_VER%") do set RAW_VER=%%a
set TAG=v%RAW_VER:"=%

REM ───────────────────────────────────────────────────────────────

REM Detecta remote URL e extrai user/repo
for /f "tokens=2 delims=/" %%a in ('git remote get-url origin 2^>nul ^| findstr /r "github.com"') do set GH_USER=%%a
for /f "tokens=3 delims=/" %%a in ('git remote get-url origin 2^>nul ^| findstr /r "github.com"') do set GH_REPO=%%a

REM Remove .git se existir
if defined GH_REPO set GH_REPO=%GH_REPO:.git=%

if not defined GH_USER (
    echo AVISO: Nao foi possivel detectar user/repo do git remote.
    echo Preencha manualmente as variaveis GH_USER e GH_REPO neste script.
    pause
    exit /b 1
)

echo GitHub: %GH_USER%/%GH_REPO%
echo Tag:    %TAG%
echo.

REM Verifica se o GitHub CLI esta instalado
gh --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERRO: GitHub CLI (gh) nao encontrado.
    echo Instale em: https://cli.github.com/
    pause
    exit /b 1
)

REM Verifica se esta autenticado
gh auth status >nul 2>&1
if %errorlevel% neq 0 (
    echo ERRO: Nao autenticado no GitHub CLI.
    echo Execute: gh auth login
    pause
    exit /b 1
)

REM Roda o build normal
echo [1/3] Gerando executavel...
call build.bat
if %errorlevel% neq 0 (
    echo ERRO: Build falhou.
    pause
    exit /b 1
)

echo.
echo [2/3] Procurando executavel em dist\...
set EXE_PATH=
for /r "dist" %%f in (*.exe) do set EXE_PATH=%%f

if "%EXE_PATH%"=="" (
    echo ERRO: Nenhum .exe encontrado em dist\
    pause
    exit /b 1
)

echo Encontrado: %EXE_PATH%
echo.

REM Deleta a release/tag existente se ja existir (para re-release)
echo [3/3] Criando release %TAG% no GitHub...
gh release delete %TAG% --yes --cleanup-tag 2>nul

gh release create %TAG% ^
    "%EXE_PATH%" ^
    --title "WhatsApp Sender %TAG%" ^
    --generate-notes ^
    --draft

if %errorlevel% neq 0 (
    echo.
    echo ERRO: Falha ao criar release.
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Release %TAG% criada com sucesso!
echo   https://github.com/%GH_USER%/%GH_REPO%/releases/tag/%TAG%
echo ========================================
echo.
pause
