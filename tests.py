import unittest

from e2e_test import PasteMeDriver


class PasteMeEndToEndUnitTest(unittest.TestCase):
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
