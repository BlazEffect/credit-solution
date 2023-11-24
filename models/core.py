from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DECIMAL
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)


class Credits(Base):
    __tablename__ = "credits"

    id = Column(Integer, primary_key=True, index=True)
    sum = Column(DECIMAL)
    percentage = Column(DECIMAL)
    user_id = Column(Integer, ForeignKey("users.id"))
