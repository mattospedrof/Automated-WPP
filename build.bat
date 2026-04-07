@echo off
chcp 65001 >nul
echo ========================================
echo   Fkz Tech - WhatsApp Sender Builder
echo ========================================
echo.

REM Verifica se o PyInstaller esta instalado
python -m pip show pyinstaller >nul 2>&1
if %errorlevel% neq 0 (
    echo [1/3] Instalando PyInstaller...
    python -m pip install pyinstaller
    REM pip pode retornar 1 por avisos (ex: pip upgrade), verificar instalacao diretamente
    python -m pip show pyinstaller >nul 2>&1
    if %errorlevel% neq 0 (
        echo ERRO: Falha ao instalar PyInstaller.
        pause
        exit /b 1
    )
) else (
    echo [1/3] PyInstaller ja instalado.
)
echo.

REM Garante que o .venv esta ativo (se existir)
if exist ".venv\Scripts\activate.bat" (
    echo [2/3] Ativando .venv...
    call .venv\Scripts\activate.bat
) else (
    echo [2/3] Sem .venv - usando Python global.
)
echo.

echo [3/3] Gerando executavel...
echo.

REM Cria o diretorio de output se nao existir
if not exist "dist" mkdir dist

REM Build com PyInstaller
pyinstaller --noconfirm ^
    --onedir ^
    --windowed ^
    --name "WA_Sender" ^
    --icon=media\icon-config.png ^
    --add-data "configs;configs" ^
    --add-data "views;views" ^
    --add-data "utils;utils" ^
    --add-data "src;src" ^
    --add-data "media;media" ^
    --hidden-import=pandas ^
    --hidden-import=openpyxl ^
    --hidden-import=customtkinter ^
    --hidden-import=undetected_chromedriver ^
    --hidden-import=selenium ^
    app.py

if %errorlevel% neq 0 (
    echo.
    echo ERRO: Falha ao gerar o executavel.
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Build concluido com sucesso!
echo   Output: dist\WhatsApp Sender\
echo ========================================
echo.
pause
