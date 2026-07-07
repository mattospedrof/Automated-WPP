import os
import sys


APP_NAME = "WA_Sender"


def app_install_dir() -> str:
    if getattr(sys, "frozen", False):
        return os.path.dirname(sys.executable)
    return os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))


def resource_dir() -> str:
    if getattr(sys, "frozen", False) and hasattr(sys, "_MEIPASS"):
        return sys._MEIPASS
    return app_install_dir()


def app_data_dir() -> str:
    base = os.environ.get("APPDATA")
    if not base:
        base = os.path.expanduser(os.path.join("~", "AppData", "Roaming"))
    path = os.path.join(base, APP_NAME)
    os.makedirs(path, exist_ok=True)
    return path


def data_path(*parts: str) -> str:
    path = os.path.join(app_data_dir(), *parts)
    parent = os.path.dirname(path)
    if parent:
        os.makedirs(parent, exist_ok=True)
    return path


def resource_path(*parts: str) -> str:
    return os.path.join(resource_dir(), *parts)


def media_path(filename: str) -> str:
    return resource_path("media", filename)


def ensure_runtime_dirs() -> None:
    for folder in ("data", "tmp", "wa_session"):
        os.makedirs(data_path(folder), exist_ok=True)
