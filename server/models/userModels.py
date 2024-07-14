from sqlalchemy import Column, Integer, String, Boolean, Float, Date
from db.database import Base
from datetime import date

class Users(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False, default="")  # Non-nullable for uniqueness
    username = Column(String(50), unique=True, nullable=False, default="")  # Non-nullable for uniqueness
    fname = Column(String(50), nullable=True, default="")
    lname = Column(String(50), nullable=True, default="")
    phone = Column(String(15), nullable=True, default="")
    gender = Column(String(10), nullable=True, default="")
    country = Column(String(50), nullable=True, default="")
    dob = Column(Date, default=date.today)
    N_id = Column(String(20), nullable=True, default="")
    father_id = Column(String(20), nullable=True, default="")
    father_name = Column(String(50), nullable=True, default="")
    mother_id = Column(String(20), nullable=True, default="")
    mother_name = Column(String(50), nullable=True, default="")
    height = Column(Float, nullable=True, default=None)  # Use None for numeric types
    weight = Column(Float, nullable=True, default=None)  # Use None for numeric types
    married = Column(Boolean, default=False)
    spouse = Column(String(50), nullable=True, default="")
    acc_type = Column(String, default="patient")
    avatar = Column(String(255), nullable=True, default="")
    password_hash = Column(String(255), nullable=True, default="")
