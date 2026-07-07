@echo off
chcp 65001 >nul
echo ========================================
echo   Fkz Tech - WA Sender Installer
echo ========================================
echo.

for /f "tokens=*" %%v in ('python -c "from utils.version import VERSION; print(VERSION)"') do set RAW_VER=%%v
for /f "tokens=* delims= " %%a in ("%RAW_VER%") do set RAW_VER=%%a
set APP_VER=%RAW_VER:"=%

echo Versao: %APP_VER%
echo.

echo [1/2] Gerando pasta dist\WA_Sender...
call build.bat /nopause
if %errorlevel% neq 0 (
    echo ERRO: Build falhou.
    pause
    exit /b 1
)

echo.
echo [2/2] Gerando instalador com Inno Setup...

set ISCC_EXE=
if exist "%LOCALAPPDATA%\Programs\Inno Setup 6\ISCC.exe" set ISCC_EXE=%LOCALAPPDATA%\Programs\Inno Setup 6\ISCC.exe
if exist "%ProgramFiles(x86)%\Inno Setup 6\ISCC.exe" set ISCC_EXE=%ProgramFiles(x86)%\Inno Setup 6\ISCC.exe
if exist "%ProgramFiles%\Inno Setup 6\ISCC.exe" set ISCC_EXE=%ProgramFiles%\Inno Setup 6\ISCC.exe

if "%ISCC_EXE%"=="" (
    echo ERRO: Inno Setup 6 nao encontrado.
    echo Instale em: https://jrsoftware.org/isdl.php
    if /I not "%~1"=="/nopause" pause
    exit /b 1
)

"%ISCC_EXE%" /DMyAppVersion=%APP_VER% installer\WA_Sender.iss
if %errorlevel% neq 0 (
    echo ERRO: Falha ao gerar instalador.
    if /I not "%~1"=="/nopause" pause
    exit /b 1
)

echo.
echo ========================================
echo   Instalador criado com sucesso!
echo   Output: installer\output\WA_Sender_Setup.exe
echo ========================================
echo.
if /I not "%~1"=="/nopause" pause
