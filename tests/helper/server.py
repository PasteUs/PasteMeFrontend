from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse, Response
from datetime import datetime, timedelta
from threading import Lock
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, HTTPException, status
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
from fastapi.staticfiles import StaticFiles
from tests.helper.mock_backend import MockBackend


backend: MockBackend = ...


@asynccontextmanager
async def lifespan(_: FastAPI):
    global backend
    backend = MockBackend()
    yield


app = FastAPI(lifespan=lifespan)


for dir_name in ["css", "js", "img", "usr"]:
    app.mount(f"/{dir_name}", StaticFiles(directory=f"pasteme/{dir_name}"), name=dir_name)


class PasteCreateBody(BaseModel):
    lang: str
    content: str
    password: Optional[str] = Field(default='')
    self_destruct: bool
    expire_second: Optional[int] = Field(default=0)
    expire_count: Optional[int] = Field(default=0)


backend = MockBackend()


@app.get("/")
async def index():
    return Response(content=open('pasteme/index.html').read(), media_type='text/html')


@app.get('/api/v3/')
async def beat():
    return backend.beat()


@app.post('/api/v3/paste/')
async def create(body: PasteCreateBody):
    return backend.create(body.model_dump())


@app.get('/api/v3/paste/{key}')
async def get(key: str, password: Optional[str] = ''):
    try:
        response, code = backend.get(key, password)
        return JSONResponse(content=response, status_code=code)
    except Exception as e:
        return JSONResponse(content={'code': 500, 'message': str(e)}, status_code=500)
