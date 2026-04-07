import os
import winreg

_CHROME_PATHS = [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    os.path.join(os.environ.get("LOCALAPPDATA", ""), r"Google\Chrome\Application\chrome.exe"),
    os.path.join(os.environ.get("PROGRAMFILES", ""), r"Google\Chrome\Application\chrome.exe"),
]

_REGISTRY_KEYS = [
    (winreg.HKEY_LOCAL_MACHINE, r"SOFTWARE\Google\Chrome\BLBeacon"),
    (winreg.HKEY_LOCAL_MACHINE, r"SOFTWARE\WOW6432Node\Google\Chrome\BLBeacon"),
    (winreg.HKEY_CURRENT_USER,  r"SOFTWARE\Google\Chrome\BLBeacon"),
]


# @TAG: chrome-get-version
def get_chrome_version() -> str | None:
    for hive, key_path in _REGISTRY_KEYS:
        try:
            key = winreg.OpenKey(hive, key_path)
            version, _ = winreg.QueryValueEx(key, "version")
            winreg.CloseKey(key)
            if version:
                return version
        except (OSError, FileNotFoundError):
            continue

    for path in _CHROME_PATHS:
        if os.path.isfile(path):
            return "instalado"

    return None


# @TAG: chrome-is-installed
def is_chrome_installed() -> bool:
    return get_chrome_version() is not None
