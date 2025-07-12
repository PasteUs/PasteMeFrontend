import uvicorn
import time
import multiprocessing
import socket
import asyncio
import pytest
from tests.helper.server import app
from tests.helper.driver import PasteMeDriver


async def start_fastapi():
    config = uvicorn.Config(app, host="127.0.0.1", port=8000, log_level="info")
    server = uvicorn.Server(config)
    await server.run()


def check_port(port) -> bool:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        return sock.connect_ex(('127.0.0.1', port)) == 0


def check() -> bool:
    time.sleep(3)
    for port in [8000]:
        if not check_port(port):
            print(f'port {port} not ready')
            return False
    return True


@pytest.fixture(scope="session")
def pasteme() -> PasteMeDriver:
    p = multiprocessing.Process(target=start_fastapi)
    p.start()

    cnt = 0
    retry = 10

    while not check() and cnt < retry:
        cnt += 1

    if cnt == retry:
        p.terminate()
        raise RuntimeError("Failed to start FastAPI server after multiple retries")

    pasteme = PasteMeDriver(headless=True)
    pasteme.open('http://localhost:8000')

    yield pasteme

    # TODO Teardown
    pasteme.quit()
    p.terminate()


def run_main(pasteme: PasteMeDriver, password: str = None):
    content = 'print("Hello World!")'

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

    assert pasteme.get('//h2').get_attribute('innerText') == '保存成功'

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
        assert password_validation_input.get_attribute('placeholder') == '密码错误'

        password_validation_input.clear()
        password_validation_input.send_keys(password)

        password_submit_button = pasteme.get('//button[@type = "submit" and contains(text(), "提交")]')
        password_submit_button.click()

    line_1 = pasteme.get('//td[@class = "hljs-ln-line hljs-ln-code" and @data-line-number="1"]')
    assert line_1.get_attribute('innerText') == content


def test_save_with_password(pasteme: PasteMeDriver):
    run_main(pasteme=pasteme, password='password')


def test_save_without_password(pasteme: PasteMeDriver):
    run_main(pasteme=pasteme)
