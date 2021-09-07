from selenium import webdriver
from selenium.webdriver.common.by import By
from typing import Callable
import os

from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait


class PasteMe:
    def __init__(self, headless: bool = False, timeout: int = 3):
        self.timeout = timeout
        options = webdriver.ChromeOptions()
        for option in ['--disable-gpu', '--no-sandbox']:
            options.add_argument(option)

        if headless:
            options.add_argument('--headless')

        prefs = {
            "credentials_enable_service": False,
            "profile.password_manager_enabled": False
        }
        options.add_experimental_option("prefs", prefs)
        options.add_experimental_option('excludeSwitches', ['enable-automation'])

        executable_path = os.environ.get('CHROMEWEBDRIVER')
        assert executable_path is not None, 'no chrome web driver founded in ENV'
        self.browser = webdriver.Chrome(executable_path=executable_path, options=options)

    def __del__(self):
        try:
            self.browser.close()
        except AttributeError:
            pass

    def open(self, url):
        self.browser.get(url)

    def get(self, pattern: str, by: str = By.XPATH,
            condition: Callable = expected_conditions.visibility_of_element_located) -> WebElement:
        return WebDriverWait(self.browser, self.timeout).until(condition((by, pattern)))
