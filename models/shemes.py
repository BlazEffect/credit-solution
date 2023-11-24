from decimal import Decimal
from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    hashed_password: str
    is_active: bool = True


class User(BaseModel):
    id: int
    name: str
    email: EmailStr
    is_active: bool

    class Config:
        orm_mode = True


class CreditsCreate(BaseModel):
    sum: Decimal
    percentage: Decimal
    user_id: int


class Credits(BaseModel):
    id: int
    sum: Decimal
    percentage: Decimal
    user_id: int

    class Config:
        orm_mode = True
