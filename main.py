from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from dotenv import load_dotenv
import os

from routers.token import refresh_token_router
from routers.auth import login_router

load_dotenv()
app = FastAPI()

origins = [
    os.getenv("CURRENT_HOST"),
    os.getenv("VITE_HOST")
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    router=login_router,
    prefix='/api',
    tags=['Получение JWT токена']
)

app.include_router(
    router=refresh_token_router,
    prefix='/api',
    tags=['Обновление JWT токена']
)
