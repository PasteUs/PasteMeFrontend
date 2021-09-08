import flask
import requests

app = flask.Flask(__name__)

FRONTEND = 'http://localhost:8080/'
BACKEND = 'http://localhost:8000/api/'


def proxy(url: str) -> flask.Response:
    request_headers = {}
    for key, value in flask.request.headers:
        request_headers[key] = value

    kwargs = {
        'json': flask.request.get_json(),
        'headers': request_headers,
        'params': flask.request.args
    }

    proxy_response = requests.request(flask.request.method, url, **kwargs)
    headers = [(name, value) for (name, value) in proxy_response.raw.headers.items() if name.lower()]
    response = flask.Response(proxy_response.content, proxy_response.status_code, headers)
    return response


@app.route('/api/<path:path>', methods=['GET', 'POST'])
def index(path: str = ''):
    return proxy(BACKEND + path)


@app.route('/<path:path>', methods=['GET'])
@app.route('/', methods=['GET'])
def api(path: str = ''):
    return proxy(FRONTEND + path)


def main():
    app.run('127.0.0.1', 3000)


if __name__ == '__main__':
    main()
