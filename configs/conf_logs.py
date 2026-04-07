import os
import logging
from datetime import datetime


# @TAG: conf-logging
def conf_logging():
    today = datetime.now()
    month_year = today.strftime("%m-%Y")
    day = today.strftime("%d_%m_%Y")

    dir_logs = os.path.join("tmp", "logs", month_year)
    os.makedirs(dir_logs, exist_ok=True)

    file_log = f"log_{day}.txt"
    path_log = os.path.join(dir_logs, file_log)

    if not logging.getLogger().hasHandlers():
        logging.basicConfig(
            filename=path_log,
            level=logging.INFO,
            format="%(asctime)s - %(levelname)s - %(message)s",
            encoding="utf-8"
        )

    if not os.path.exists(path_log) or os.stat(path_log).st_size == 0:
        logging.info("=== LOG INICIADO ===")
