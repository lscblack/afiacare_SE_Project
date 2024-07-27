from pydantic import BaseModel, EmailStr,validator
from typing import List, Optional, Literal
from datetime import date,datetime


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
    id_prove: Optional[str] = None
    Id_type: Optional[str] = None
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

class UpdateHospitalSchema(BaseModel):
    hospital_name: Optional[str] = None
    hospital_type : Optional[Literal["public","private"]] = None
    hospital_prove : Optional[str] = None
    insurance : Optional[List[str]] = None
    country : Optional[str] = None
    hospital_address: Optional[str] = None


class UpdateWorkerRequest(BaseModel):
    Type:Literal["nurse","doctor"]
    specialists: Optional[str] = None
    experience_time: Optional[str] = None

    class Config:
        orm_mode = True
        
class AppointmentWithUserDetails(BaseModel):
    # Fields from Appointments

    app_status: bool
    reason: Optional[str] =None
    issue_prove: Optional[List[str]] = None
    due_date: datetime

    # Fields from Users
    fname: Optional[str] = None
    lname: Optional[str] = None
    phone: Optional[str] = None
    gender: Optional[str] = None
    dob: Optional[date]
    N_id: Optional[str] = None
    id_prove: Optional[str] = None
    Id_type: Optional[str] = None
    father_id: Optional[str] = None
    father_name: Optional[str] = None
    mother_id: Optional[str] = None
    mother_name: Optional[str] = None
    height: Optional[float]
    weight: Optional[float]
    married: Optional[bool]
    spouse: Optional[str] = None
    avatar: Optional[str] = None
    blood_type: Optional[str] = None
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
    hospital_name : Optional[str] = None 
    doctor_name : Optional[str] = None 