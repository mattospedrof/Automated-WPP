import logging
import os
import subprocess
import sys
import threading
import urllib.request

import requests
from packaging.version import Version

from utils.paths import data_path
from utils.version import VERSION

GITHUB_USER = "mattospedrof"
GITHUB_REPO = "Automated-WPP"
GITHUB_API = f"https://api.github.com/repos/{GITHUB_USER}/{GITHUB_REPO}/releases/latest"
INSTALLER_PREFIX = "WA_Sender_Setup"


# @TAG: updater-fetch-release
def _get_latest_release():
    try:
        resp = requests.get(GITHUB_API, timeout=8)
        resp.raise_for_status()
        data = resp.json()
        tag = data.get("tag_name", "").lstrip("v")
        assets = data.get("assets", [])

        installer = next(
            (
                asset for asset in assets
                if asset.get("name", "").startswith(INSTALLER_PREFIX)
                and asset.get("name", "").lower().endswith(".exe")
            ),
            None,
        )
        if not installer:
            installer = next(
                (
                    asset for asset in assets
                    if "setup" in asset.get("name", "").lower()
                    and asset.get("name", "").lower().endswith(".exe")
                ),
                None,
            )

        url = installer.get("browser_download_url") if installer else None
        name = installer.get("name") if installer else None
        return tag, url, name
    except Exception as exc:
        logging.warning(f"[updater] Falha ao consultar GitHub: {exc}")
        return None, None, None


# @TAG: updater-download
def _download_exe(url, dest_path, progress_callback=None):
    try:
        with urllib.request.urlopen(url, timeout=60) as resp:
            total = int(resp.headers.get("Content-Length", 0))
            downloaded = 0
            chunk = 8192
            with open(dest_path, "wb") as file:
                while True:
                    buf = resp.read(chunk)
                    if not buf:
                        break
                    file.write(buf)
                    downloaded += len(buf)
                    if progress_callback and total:
                        progress_callback(int(downloaded / total * 100))
        return True
    except Exception as exc:
        logging.error(f"[updater] Erro no download: {exc}")
        return False


# @TAG: updater-apply
def _apply_update(installer_path):
    current = sys.executable
    bat_path = os.path.join(os.path.dirname(current), "_updater.bat")

    with open(bat_path, "w", encoding="utf-8") as file:
        file.write(
            "@echo off\n"
            "timeout /t 2 /nobreak >nul\n"
            f'start /wait "" "{installer_path}" /VERYSILENT /SUPPRESSMSGBOXES /NORESTART /CLOSEAPPLICATIONS\n'
            f'del /f /q "{installer_path}" >nul 2>nul\n'
            f'start "" "{current}"\n'
            'del "%~f0"\n'
        )

    subprocess.Popen(bat_path, shell=True)
    sys.exit(0)


# @TAG: updater-check
def check_for_updates(app):
    if not getattr(sys, "frozen", False):
        logging.info("[updater] Ignorado fora do executavel empacotado.")
        return

    threading.Thread(target=_check_and_update, args=(app,), daemon=True).start()


def _check_and_update(app):
    latest_tag, download_url, asset_name = _get_latest_release()

    if not latest_tag or not download_url:
        logging.info("[updater] Nenhuma release valida encontrada.")
        return

    try:
        is_newer = Version(latest_tag) > Version(VERSION)
    except Exception:
        logging.warning(f"[updater] Versao invalida na release: {latest_tag}")
        return

    if not is_newer:
        return

    dest = data_path("tmp", asset_name or f"{INSTALLER_PREFIX}_v{latest_tag}.exe")
    app._log(f"⬇️ Atualização v{latest_tag} encontrada. Baixando...")

    def _on_progress(pct):
        app._log(f"   📦 {pct}%...")

    success = _download_exe(download_url, dest, progress_callback=_on_progress)

    if success:
        app._log("✅ Download concluído. Instalando atualização...")
        logging.info(f"[updater] Instalando {asset_name} para v{latest_tag}")
        app.after(500, lambda: _apply_update(dest))
    else:
        app._log("⚠️ Não foi possível baixar a atualização.")
        if os.path.exists(dest):
            os.remove(dest)
