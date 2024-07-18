from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date

class ReturnUser(BaseModel):
    id: Optional[int]
    username: Optional[str]
    email: Optional[str]
    fname: Optional[str]
    lname: Optional[str]
    phone: Optional[str]
    gender: Optional[str]
    country: Optional[str]
    dob: Optional[date]
    N_id: Optional[str]
    father_id: Optional[str]
    father_name: Optional[str]
    mother_id: Optional[str]
    mother_name: Optional[str]
    height: Optional[float]
    weight: Optional[float]
    married: Optional[bool]
    spouse: Optional[str]
    acc_type: Optional[str]
    acc_status: Optional[bool]
    avatar: Optional[str]
    blood_type: Optional[str]
    id_prove: Optional[str]
    email_confirm: Optional[bool]
    password_hash: Optional[str]
    existing_medical_conditions: Optional[str]
    allergies: Optional[str]
    physical_activity_level: Optional[str]
    dietary_preferences: Optional[str]
    smoking_status: Optional[str]
    alcohol_consumption: Optional[str]
    primary_health_goal: Optional[str]
    preferred_workout_types: Optional[str]
    preferred_workout_times: Optional[str]
    emergency_contact: Optional[str]
    emergency_contact_name: Optional[str]

    class Config:
        orm_mode = True
        from_attributes = True  # Enable this to use from_orm
