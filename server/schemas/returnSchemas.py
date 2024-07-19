from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import date

class ReturnUser(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    fname: Optional[str] = None
    lname: Optional[str] = None
    phone: Optional[str] = None
    gender: Optional[str] = None
    country: Optional[str] = None
    dob: Optional[date]
    N_id: Optional[str] = None
    father_id: Optional[str] = None
    father_name: Optional[str] = None
    mother_id: Optional[str] = None
    mother_name: Optional[str] = None
    height: Optional[float]
    weight: Optional[float]
    married: Optional[bool]
    spouse: Optional[str] = None
    acc_type: Optional[str] = None
    acc_status: Optional[bool]
    avatar: Optional[str] = None
    blood_type: Optional[str] = None
    id_prove: Optional[str] = None
    email_confirm: Optional[bool]
    existing_medical_conditions: Optional[str] = None
    allergies: Optional[List[str]] = None
    physical_activity_level: Optional[str] = None
    dietary_preferences: Optional[List[str]] = None
    smoking_status: Optional[str] = None
    alcohol_consumption: Optional[str] = None
    primary_health_goal: Optional[str] = None
    preferred_workout_types: Optional[List[str]] = None
    preferred_workout_times: Optional[str] = None
    emergency_contact: Optional[str] = None
    emergency_contact_name: Optional[str] = None

    class Config:
        orm_mode = True
        from_attributes = True  # Enable this to use from_orm
