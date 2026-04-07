import os
import sys
import logging
import threading
import subprocess
import urllib.request
from tkinter import messagebox

import requests
from packaging.version import Version

from utils.version import VERSION

GITHUB_USER = "mattospedrof"
GITHUB_REPO = "Automated-WPP"
GITHUB_API  = f"https://api.github.com/repos/{GITHUB_USER}/{GITHUB_REPO}/releases/latest"
EXE_NAME    = "app.exe"


# @TAG: updater-fetch-release
def _get_latest_release():
    try:
        resp = requests.get(GITHUB_API, timeout=8)
        resp.raise_for_status()
        data = resp.json()
        tag  = data.get("tag_name", "").lstrip("v")
        url  = next(
            (a["browser_download_url"]
             for a in data.get("assets", [])
             if a["name"] == EXE_NAME),
            None,
        )
        return tag, url
    except Exception as e:
        logging.warning(f"[updater] Falha ao consultar GitHub: {e}")
        return None, None


# @TAG: updater-download
def _download_exe(url, dest_path, progress_callback=None):
    try:
        with urllib.request.urlopen(url, timeout=60) as resp:
            total = int(resp.headers.get("Content-Length", 0))
            downloaded = 0
            chunk = 8192
            with open(dest_path, "wb") as f:
                while True:
                    buf = resp.read(chunk)
                    if not buf:
                        break
                    f.write(buf)
                    downloaded += len(buf)
                    if progress_callback and total:
                        progress_callback(int(downloaded / total * 100))
        return True
    except Exception as e:
        logging.error(f"[updater] Erro no download: {e}")
        return False


# @TAG: updater-apply
def _apply_update(new_exe_path):
    current = sys.executable
    bat_path = os.path.join(os.path.dirname(current), "_updater.bat")

    with open(bat_path, "w", encoding="utf-8") as f:
        f.write(
            "@echo off\n"
            "timeout /t 2 /nobreak >nul\n"
            f'move /y "{new_exe_path}" "{current}"\n'
            f'start "" "{current}"\n'
            'del "%~f0"\n'
        )

    subprocess.Popen(bat_path, shell=True)
    sys.exit(0)


# @TAG: updater-check
def check_for_updates(app):
    latest_tag, download_url = _get_latest_release()

    if not latest_tag or not download_url:
        return

    try:
        is_newer = Version(latest_tag) > Version(VERSION)
    except Exception:
        return

    if not is_newer:
        return

    def _prompt():
        answer = messagebox.askyesno(
            "Atualização disponível",
            f"Nova versão disponível: v{latest_tag}\n"
            f"Versão atual: v{VERSION}\n\n"
            "Deseja atualizar agora?\n"
            "(O app será reiniciado automaticamente)",
        )
        if not answer:
            return

        threading.Thread(target=_run_update, args=(download_url,), daemon=True).start()

    def _run_update(url):
        dest = os.path.join(
            os.path.dirname(sys.executable),
            f"_{EXE_NAME}.new",
        )

        app._log(f"⬇️ Baixando atualização v{latest_tag}...")

        def _on_progress(pct):
            app._log(f"   📦 {pct}%...")

        success = _download_exe(url, dest, progress_callback=_on_progress)

        if success:
            app._log("✅ Download concluído. Reiniciando...")
            logging.info(f"[updater] Atualizado para v{latest_tag}")
            app.after(500, lambda: _apply_update(dest))
        else:
            app.after(0, lambda: messagebox.showerror(
                "Erro",
                "Não foi possível baixar a atualização.\n"
                "Verifique sua conexão e tente novamente.",
            ))
            if os.path.exists(dest):
                os.remove(dest)

    app.after(0, _prompt)
