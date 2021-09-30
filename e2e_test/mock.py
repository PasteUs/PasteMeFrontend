from datetime import datetime, timedelta
from threading import Lock

from flask import Flask, request, jsonify


class MockBackend:
    def __init__(self):
        self.database = {}
        self.key = 0
        self.key_lock = Lock()
        self.db_lock = Lock()

    def get_key(self) -> str:
        with self.key_lock:
            self.key += 1
            key = self.key
        return f'{key:08d}'

    @classmethod
    def beat(cls) -> dict:
        return {
            'code': 200
        }

    def create(self, body: dict) -> dict:
        key = self.get_key()
        body['create_time'] = datetime.now()
        with self.db_lock:
            self.database[key] = body
        return {
            'code': 201,
            'key': key
        }

    def get(self, key: str, password: str) -> (dict, int):
        with self.db_lock:
            if key in self.database:
                paste: dict = self.database[key]

                if paste['self_destruct']:
                    if paste['create_time'] + timedelta(minutes=paste['expire_minute']) < datetime.now():
                        self.database.pop(key)
                        return {
                            'code': 40402,
                            'message': 'paste not found'
                        }, 404

                if password == paste.get('password', ''):
                    if paste['self_destruct']:
                        paste['expire_count'] -= 1
                        if paste['expire_count'] == 0:
                            self.database.pop(key)
                    return {
                        'code': 200,
                        'lang': paste['lang'],
                        'content': paste['content']
                    }, 200
                else:
                    return {
                        'code': 40301,
                        'message': 'wrong password'
                    }, 403
            return {
                'code': 40402,
                'message': 'paste not found'
            }, 404


app = Flask(__name__)
backend = MockBackend()


@app.route('/api/v3/', methods=['GET'])
def beat():
    return jsonify(backend.beat())


@app.route('/api/v3/paste/', methods=['POST'])
def create():
    return jsonify(backend.create(request.get_json()))


@app.route('/api/v3/paste/<key>', methods=['GET'])
def get(key: str):
    response, code = backend.get(key, request.args.get('password', ''))
    return jsonify(response), code


def main():
    app.run('127.0.0.1', 8000)


if __name__ == '__main__':
    main()
