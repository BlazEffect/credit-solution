from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from dotenv import load_dotenv
import os

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

