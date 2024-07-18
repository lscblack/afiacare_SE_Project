from pydantic import BaseModel, EmailStr
from typing import List, Optional, Literal
from datetime import date


class CreateUserRequest(BaseModel):  # registeration Schema
    fname: Optional[str] = None
    lname: Optional[str] = None
    username: str
    email: EmailStr
    password: str


class Token(BaseModel):  # token validation schema
    access_token: str
    token_type: str

# Define your Pydantic schema for partial updates


class UpdateUserSchema(BaseModel):
    fname: Optional[str] = None
    lname: Optional[str] = None
    phone: Optional[str] = None
    gender: Optional[str] = None
    country: Optional[str] = None
    dob: Optional[str] = None
    father_id: Optional[str] = None
    father_name: Optional[str] = None
    mother_id: Optional[str] = None
    mother_name: Optional[str] = None
    height: Optional[float] = None
    weight: Optional[float] = None
    married: Optional[bool] = None
    spouse: Optional[str] = None
    avatar: Optional[str] = None
    id_prove: Optional[str] = None
    password: Optional[str] = None
    blood_type: Optional[str] = None
    existing_medical_conditions: Optional[str] = None
    allergies: Optional[str] = None
    physical_activity_level: Optional[str] = None
    dietary_preferences: Optional[str] = None
    smoking_status: Optional[str] = None
    alcohol_consumption: Optional[str] = None
    primary_health_goal: Optional[str] = None
    preferred_workout_types: Optional[str] = None
    preferred_workout_times: Optional[str] = None
    emergency_contact: Optional[str] = None
    emergency_contact_name: Optional[str] = None


class UserTypeDropDown(BaseModel):
    user_type: Literal["admin", "minister", "hospital", "nurse", "doctor","patient"]
