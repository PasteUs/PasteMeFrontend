import logging
import multiprocessing
import os
import signal
import subprocess
import time
import unittest

import requests

from e2e_test import PasteMeDriver, reverse_proxy, backend

logging.getLogger("requests").setLevel(logging.CRITICAL)


def check() -> bool:
    try:
        time.sleep(3)
        response = requests.get('http://localhost:3000')
        return response.status_code == 200
    except (Exception, ):
        pass


class PasteMeEndToEndUnitTest(unittest.TestCase):
    process = subprocess.Popen('npm run serve', subprocess.PIPE, shell=True, preexec_fn=os.setsid)
    api = multiprocessing.Process(target=backend)

    proxy = multiprocessing.Process(target=reverse_proxy)

    @classmethod
    def setUpClass(cls) -> None:
        cls.proxy.start()
        cls.api.start()

        while not check():
            pass

    @classmethod
    def tearDownClass(cls) -> None:
        os.killpg(os.getpgid(cls.process.pid), signal.SIGTERM)

        cls.proxy.terminate()
        cls.api.terminate()

        cls.proxy.join()
        cls.api.join()

    def main(self, password: str = None):
        content = 'print("Hello World!")'

        pasteme = PasteMeDriver(headless=True)
        pasteme.open('http://localhost:3000')

        language_selector = pasteme.get('//a[@role = "button"]')
        language_selector.click()

        chinese_language = pasteme.get('//a[@class = "dropdown-item" and contains(text(), "简体中文")]')
        chinese_language.click()

        python_selection = pasteme.get('//select/option[text() = "Python"]')
        python_selection.click()

        if password is not None:
            password_setter = pasteme.get('//input[@type = "password"]')
            password_setter.clear()
            password_setter.send_keys(password)

        textarea = pasteme.get('//textarea')
        textarea.clear()
        textarea.send_keys(content)

        save_button = pasteme.get('//button[@type = "submit" and contains(text(), "保存")]')
        save_button.click()

        self.assertEqual(pasteme.get('//h2').get_attribute('innerText'), '保存成功')

        key = pasteme.get('//p[contains(text(), "欲访问")]/strong').get_attribute('innerText')

        search_input = pasteme.get('//input[@type = "search"]')
        search_input.clear()
        search_input.send_keys(key)

        search_button = pasteme.get('//button[@type = "submit" and contains(text(), "前往")]')
        search_button.click()

        if password is not None:
            password_validation_input = pasteme.get('//input[@type = "password"]')
            password_validation_input.clear()
            password_validation_input.send_keys(f'wrong_{password}')

            password_submit_button = pasteme.get('//button[@type = "submit" and contains(text(), "提交")]')
            password_submit_button.click()

            password_validation_input = pasteme.get('//input[@type = "password" and @placeholder = "密码错误"]')
            self.assertEqual(password_validation_input.get_attribute('placeholder'), '密码错误')

            password_validation_input.clear()
            password_validation_input.send_keys(password)

            password_submit_button = pasteme.get('//button[@type = "submit" and contains(text(), "提交")]')
            password_submit_button.click()

        line_1 = pasteme.get('//td[@class = "hljs-ln-line hljs-ln-code" and @data-line-number="1"]')
        self.assertEqual(line_1.get_attribute('innerText'), content)

    def test_save_with_password(self):
        self.main(password='password')

    def test_save_without_password(self):
        self.main()


if __name__ == '__main__':
    unittest.main()
