import multiprocessing
import os
import signal
import subprocess
import time
import unittest
import socket

from e2e_test import PasteMeDriver, reverse_proxy, backend


def check_port(port) -> True:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        return sock.connect_ex(('127.0.0.1', port)) == 0


def check() -> bool:
    time.sleep(3)
    for port in [8080, 8000, 3000]:
        if not check_port(port):
            print(f'port {port} not ready')
            return False
    return True


class PasteMeEndToEndUnitTest(unittest.TestCase):
    process = subprocess.Popen('npm run serve', subprocess.PIPE, shell=True, preexec_fn=os.setsid)
    api = multiprocessing.Process(target=backend)

    proxy = multiprocessing.Process(target=reverse_proxy)

    @classmethod
    def setUpClass(cls) -> None:
        cls.proxy.start()
        cls.api.start()

        cnt = 0
        retry = 100

        while not check() and cnt < retry:
            cnt += 1

        if cnt == retry:
            cls.tearDownClass()
            raise ChildProcessError

    @classmethod
    def tearDownClass(cls) -> None:
        try:
            os.killpg(os.getpgid(cls.process.pid), signal.SIGTERM)
        except ProcessLookupError:
            pass

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
