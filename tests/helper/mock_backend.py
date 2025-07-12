from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse, Response
from datetime import datetime, timedelta
from threading import Lock
from fastapi import FastAPI, Request, HTTPException, status
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
from fastapi.staticfiles import StaticFiles


class MockBackend:
    def __init__(self):
        self.database: Dict[str, Dict[str, Any]] = {}
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

    def get(self, key: str, password: str) -> tuple[dict, int]:
        with self.db_lock:
            if key in self.database:
                paste: dict = self.database[key]

                if paste['self_destruct']:
                    if paste['create_time'] + timedelta(seconds=paste['expire_second']) < datetime.now():
                        self.database.pop(key)
                        return {
                            'code': 40402,
                            'message': 'paste not found'
                        }, status.HTTP_404_NOT_FOUND

                if password == paste.get('password', ''):
                    if paste['self_destruct']:
                        paste['expire_count'] -= 1
                        if paste['expire_count'] == 0:
                            self.database.pop(key)
                    return {
                        'code': 200,
                        'lang': paste['lang'],
                        'content': paste['content']
                    }, status.HTTP_200_OK
                else:
                    return {
                        'code': 40301,
                        'message': 'wrong password'
                    }, status.HTTP_403_FORBIDDEN
            return {
                'code': 40402,
                'message': 'paste not found'
            }, status.HTTP_404_NOT_FOUND

