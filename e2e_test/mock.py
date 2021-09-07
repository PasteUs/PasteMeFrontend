from flask import Flask, request, jsonify, Response
import requests

app = Flask(__name__)

SITE_NAME = 'http://localhost:8080'

database = {}


@app.route('/api/v3/', methods=['GET'])
def beat():
    return jsonify({
        'status': 200
    })


@app.route('/api/v3/paste', methods=['POST'])
@app.route('/api/v3/paste/', methods=['POST'])
def get():
    database['ofakekey'] = request.get_json()
    return jsonify({
        'status': 201,
        'key': '0fakekey'
    })


@app.route('/<path:path>', methods=['GET'])
@app.route('/', methods=['GET'])
def index(path: str = ''):
    resp = requests.get('/'.join([SITE_NAME, path]))
    headers = [(name, value) for (name, value) in resp.raw.headers.items()]
    response = Response(resp.content, resp.status_code, headers)
    return response


def main():
    app.run('127.0.0.1', 3000)


if __name__ == '__main__':
    main()
