import os
import re
import time
import threading
import logging
import undetected_chromedriver as uc

from urllib.parse import quote
from utils.chrome_check import get_chrome_version
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException


QR_WAIT_TIMEOUT      = 90
PAGE_LOAD_TIMEOUT    = 30
SEND_CONFIRM_TIMEOUT = 15

SEL = {
    "main_app": (
        'div[data-testid="default-user"],'
        'div[aria-label="Lista de conversas"],'
        '#app .two'
    ),

    "logged_in": (
        'div[data-testid="chat-list"],'
        'span[data-testid="search"],'
        'div[aria-label="Lista de conversas"]'
    ),

    "send_btn": (
        'button[aria-label="Enviar"],'
        'button[data-tab="11"],'
        'button[data-testid="compose-btn-send"]'
    ),

    "msg_sent_check": (
        'span[data-testid="msg-check"],'
        'span[data-icon="msg-check"],'
        'span[data-testid="msg-dblcheck"],'
        'span[data-icon="msg-dblcheck"]'
    ),

    "invalid_popup": (
        'div[data-testid="confirm-popup"],'
        'div[data-testid="alert-dialog"],'
        'div[role="dialog"]'
    ),
}

INVALID_KEYWORDS = (
    "número de telefone", "phone number", "invalid",
    "inválido", "não existe", "not exist",
    "não foi possível", "unable",
)


class WhatsAppBot:
    # @TAG: bot-init
    def __init__(self, profile_dir: str = "./wa_session"):
        self.profile_dir = profile_dir
        self.driver = None

    # @TAG: bot-check-session
    @staticmethod
    def has_existing_session(profile_dir: str = "./wa_session") -> bool:
        default_path = os.path.join(profile_dir, "Default")
        return os.path.isdir(default_path)

    # @TAG: bot-launch
    def open_whatsapp(self):
        abs_profile = os.path.abspath(self.profile_dir)
        os.makedirs(abs_profile, exist_ok=True)

        opts = uc.ChromeOptions()
        opts.add_argument(f"--user-data-dir={abs_profile}")
        opts.add_argument("--remote-debugging-port=9222")
        opts.add_argument("--no-sandbox")
        opts.add_argument("--disable-dev-shm-usage")
        opts.add_argument("--disable-blink-features=AutomationControlled")
        opts.add_argument("--start-maximized")

        chrome_ver = get_chrome_version()
        version_main = None
        if chrome_ver and chrome_ver != "instalado":
            try:
                version_main = int(chrome_ver.split(".")[0])
                logging.info(f"Chrome detectado: versão {chrome_ver} (version_main={version_main})")
            except (ValueError, IndexError):
                logging.warning(f"Versão do Chrome inválida: {chrome_ver}, usando detecção automática")

        self.driver = uc.Chrome(options=opts, use_subprocess=True, version_main=version_main)
        self.driver.get("https://web.whatsapp.com")
        self.driver.maximize_window()
        self._await_main_app()

    # @TAG: bot-wait-login
    def _await_main_app(self):
        logging.info("Aguardando login no WhatsApp Web...")
        try:
            WebDriverWait(self.driver, QR_WAIT_TIMEOUT).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, SEL["main_app"]))
            )
            time.sleep(2.5)
            logging.info("WhatsApp Web carregado.")
        except TimeoutException:
            raise TimeoutError("Timeout aguardando login. Escaneie o QR Code.")

    # @TAG: bot-send
    def send_message(self, phone_raw: str, message: str) -> str:
        phone = self.normalize_phone(phone_raw)
        if not phone:
            logging.error(f"Numero invalido: '{phone_raw}'")
            return "error"

        logging.info(f"Enviando -> {phone}")

        for attempt in range(2):
            try:
                url = (
                    "https://web.whatsapp.com/send"
                    f"?phone={phone}"
                    f"&text={quote(message, safe='')}"
                    "&app_absent=0"
                )
                self.driver.get(url)

                status = self._wait_for_page_ready()

                if status == "invalid":
                    self._dismiss_popup()
                    logging.warning(f"Número sem WhatsApp: {phone}")
                    return "wpp_not_found"

                if status == "timeout":
                    if attempt == 0:
                        logging.warning(f"Timeout no chat de {phone} — tentando novamente...")
                        self._go_home()
                        time.sleep(2)
                        continue
                    logging.error(f"Timeout carregando chat de {phone} (apos retry)")
                    self._go_home()
                    return "error"

                send_btn = self.driver.find_element(By.CSS_SELECTOR, SEL["send_btn"])
                send_btn.click()
                logging.info("Botão Enviar clicado.")

                confirmed = self._wait_for_sent_confirmation()
                if confirmed:
                    logging.info(f"Confirmado enviado -> {phone}")
                else:
                    logging.warning(f"Enviado (nao detectado no tempo limite) -> {phone}")
                return "sent"

            except Exception as exc:
                if attempt == 0:
                    logging.warning(f"Erro transitorio ao enviar para {phone} — retry: {exc}")
                    self._go_home()
                    time.sleep(2)
                    continue
                logging.error(f"Erro ao enviar para {phone} (apos retry): {exc}", exc_info=True)
                self._go_home()
                return "error"

        return "error"

    # @TAG: bot-wait-page
    def _wait_for_page_ready(self) -> str:
        deadline = time.time() + PAGE_LOAD_TIMEOUT
        while time.time() < deadline:
            if self._has_invalid_popup():
                return "invalid"

            btns = self.driver.find_elements(By.CSS_SELECTOR, SEL["send_btn"])
            if btns:
                return "ready"

            time.sleep(0.6)

        return "timeout"

    # @TAG: bot-detect-popup
    def _has_invalid_popup(self) -> bool:
        popups = self.driver.find_elements(By.CSS_SELECTOR, SEL["invalid_popup"])
        for popup in popups:
            try:
                if any(k in popup.text.lower() for k in INVALID_KEYWORDS):
                    return True
            except Exception:
                pass
        return False

    # @TAG: bot-dismiss-popup
    def _dismiss_popup(self):
        try:
            popups = self.driver.find_elements(By.CSS_SELECTOR, SEL["invalid_popup"])
            for popup in popups:
                try:
                    btn = popup.find_element(
                        By.CSS_SELECTOR, 'button, div[role="button"]'
                    )
                    btn.click()
                    time.sleep(0.4)
                    return
                except NoSuchElementException:
                    pass
        except Exception:
            pass
        try:
            self.driver.find_element(By.TAG_NAME, "body").send_keys(Keys.ESCAPE)
            time.sleep(0.4)
        except Exception:
            pass

    # @TAG: bot-wait-confirm
    def _wait_for_sent_confirmation(self) -> bool:
        deadline = time.time() + SEND_CONFIRM_TIMEOUT
        while time.time() < deadline:
            checks = self.driver.find_elements(By.CSS_SELECTOR, SEL["msg_sent_check"])
            if checks:
                return True
            time.sleep(0.5)
        return False

    # @TAG: bot-go-home
    def _go_home(self):
        try:
            self.driver.get("https://web.whatsapp.com")
            WebDriverWait(self.driver, 15).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, SEL["main_app"]))
            )
            time.sleep(1.0)
        except Exception:
            try:
                self.driver.find_element(By.TAG_NAME, "body").send_keys(Keys.ESCAPE)
                time.sleep(0.5)
            except Exception:
                pass

    # @TAG: bot-clean-phone
    @staticmethod
    def _clean_phone(phone: str) -> str:
        digits = re.sub(r"\D", "", str(phone))
        if not digits:
            raise ValueError(f"Número inválido: '{phone}'")
        return digits

    # @TAG: bot-is-connected
    def is_connected(self) -> bool:
        if not self.driver:
            return False
        try:
            self.driver.current_url
            title = self.driver.title
            if title is None:
                return False

            logged_in = self.driver.find_elements(By.CSS_SELECTOR, SEL["logged_in"])
            return len(logged_in) > 0
        except Exception:
            return False

    # @TAG: bot-normalize-phone
    @staticmethod
    def normalize_phone(phone_raw: str) -> str | None:
        digits = re.sub(r"\D", "", str(phone_raw))

        digits = digits.lstrip("0")

        if not digits:
            return None

        if not digits.startswith("55") and 10 <= len(digits) <= 13:
            digits = "55" + digits

        if len(digits) < 12:
            logging.warning(f"Numero invalido apos normalizacao: '{phone_raw}' -> '{digits}'")
            return None

        return digits

    # @TAG: bot-close
    def close(self):
        if self.driver:
            try:
                self.driver.quit()
            except Exception:
                pass
            self.driver = None
