import os

from dotenv import load_dotenv
from fastapi import Depends, HTTPException, status, APIRouter
from jose import JWTError, jwt
from datetime import datetime, timedelta

load_dotenv()

ACCESS_TOKEN_SECRET_KEY = os.getenv("SECRET_KEY")
REFRESH_SECRET_KEY = os.getenv("REFRESH_SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_DAYS = 7

refresh_token_router = APIRouter()

revoked_tokens_db = set()


def create_jwt_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, ACCESS_TOKEN_SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def create_refresh_token(user_id: str, expires_delta: timedelta):
    to_encode = {"sub": user_id}
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire})
    refresh_token = jwt.encode(to_encode, REFRESH_SECRET_KEY, algorithm=ALGORITHM)
    return refresh_token


@refresh_token_router.post('/token/refresh')
def refresh_jwt_token(refresh_token: str):
    if is_token_revoked(refresh_token):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has been revoked",
            headers={"WWW-Authenticate": "Bearer"},
        )

    try:
        payload = jwt.decode(refresh_token, REFRESH_SECRET_KEY, algorithms=[ALGORITHM])
        sub: str = payload.get("sub")
        if sub is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid refresh token",
                headers={"WWW-Authenticate": "Bearer"},
            )

        refresh_token_exp = payload.get("exp")
        now = datetime.utcnow()
        refresh_token_exp_datetime = datetime.utcfromtimestamp(refresh_token_exp)
        if refresh_token_exp_datetime < now:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Refresh token has expired",
                headers={"WWW-Authenticate": "Bearer"},
            )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_jwt_token(data={"sub": str(sub)}, expires_delta=access_token_expires)

    refresh_token_expires = timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    new_refresh_token = create_refresh_token(user_id=str(sub), expires_delta=refresh_token_expires)

    revoke_token(refresh_token)

    return {"access_token": access_token, "refresh_token": new_refresh_token, "token_type": "bearer"}


def is_token_revoked(token: str):
    return token in revoked_tokens_db


# Функция для отзыва токенов
def revoke_token(token: str):
    revoked_tokens_db.add(token)

# {
#  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZXhwIjoxNzAwOTE1NzE1fQ.qezA3274zEgdPQ-cs3XgkWxtzeT9_d0LJ-ohc5bqXpE",
#  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZXhwIjoxNzAxNTE4NzE1fQ.o1hPNitHOtFA5F7f-ch32RWV5cgs49tsxeB8b3oJi4I",
#  "token_type": "bearer"
# }
