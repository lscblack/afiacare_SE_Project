from sqlalchemy import Column, Integer, String, Boolean, Float, Date, ARRAY, ForeignKey
from db.database import Base
from datetime import date

class Users(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False, default="")  # Non-nullable for uniqueness
    username = Column(String(50), unique=True, nullable=False, default="")  # Non-nullable for uniqueness
    acc_type = Column(String, default="patient")
    acc_status = Column(Boolean, default=False)
    email_confirm = Column(Boolean, default=False)
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
    avatar = Column(String(255), nullable=True, default="")
    id_prove = Column(String(255), nullable=True, default="")
    blood_type = Column(String(255), nullable=True, default="")
    password_hash = Column(String(255), nullable=True, default="")
    existing_medical_conditions = Column(String(255), nullable=True, default="")
    allergies = Column(ARRAY(String), nullable=True, default="")
    physical_activity_level = Column(String(255), nullable=True, default="")
    dietary_preferences = Column(ARRAY(String), nullable=True, default="")
    smoking_status = Column(String(255), nullable=True, default="")
    alcohol_consumption = Column(String(255), nullable=True, default="")
    primary_health_goal = Column(String(255), nullable=True, default="")
    preferred_workout_types = Column(ARRAY(String), nullable=True, default="")
    preferred_workout_times = Column(String(255), nullable=True, default="")
    emergency_contact = Column(String(50), nullable=True, default="")
    emergency_contact_name = Column(String(255), nullable=True, default="") 


class Minister(Base):
    __tablename__ = "minister_admins"
    id = Column(Integer, primary_key=True, index=True)
    userId = Column(Integer, ForeignKey("users.id"))
    ministry_id = Column(Integer)

class Doctor(Base):
    __tablename__ = "Doctors"
    id = Column(Integer, primary_key=True, index=True)
    userId = Column(Integer, ForeignKey("users.id"))
    doctor_id = Column(Integer)

class Nurse(Base):
    __tablename__ = "Nurses"
    id = Column(Integer, primary_key=True, index=True)
    userId = Column(Integer, ForeignKey("users.id"))
    nurse_id = Column(Integer)

class Hospital(Base):
    __tablename__ = "hospital_admins"
    id = Column(Integer, primary_key=True, index=True)
    userId = Column(Integer, ForeignKey("users.id"))
    hospital_id = Column(Integer)

class Records(Base):
    __tablename__ = "records"
    id = Column(Integer, primary_key=True, index=True)
    userId = Column(Integer, ForeignKey("users.id"))
    username = Column(String(50), unique=True, nullable=False, default="")
    existing_medical_conditions = Column(String(255), nullable=True, default="")
    hospital_transfer_status = Column(Boolean, default=False)
    hospital_transfer_name = Column(String(255), nullable=True, default="")
    hospital_transfer_reason  = Column(String(255), nullable=True, default="")
    hospital_transfer_date = Column(Date, default=date.today)




