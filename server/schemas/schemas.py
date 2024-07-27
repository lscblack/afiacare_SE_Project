from pydantic import BaseModel, EmailStr,validator
from typing import List, Optional, Literal
from datetime import date,datetime
from schemas.returnSchemas import ReturnUser

class CreateUserRequest(BaseModel):  # registeration Schema
    fname: Optional[str] = None
    lname: Optional[str] = None
    username: str
    email: EmailStr
    password: str


class Token(BaseModel):  # token validation schema
    access_token: str
    token_type: str
    UserInfo: ReturnUser

class FromData(BaseModel):  # token validation schema
    username: str
    password: str

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
    Id_type: Optional[str] = None
    N_id: Optional[str] = None
    password: Optional[str] = None
    blood_type: Optional[str] = None
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

class UserTypeDropDown(BaseModel):
    user_type: Literal["admin", "minister", "hospital", "nurse", "labtech", "doctor","patient"]

class DeleteUserAdmin(BaseModel):
    userId:int
    
class GetUserAdmin(BaseModel):
    hospital_status:Optional[Literal[True,False]] = None

class RequestHospitalSchema(BaseModel):
    hospital_name: str
    hospital_type : Literal["public","private"]
    hospital_prove : str
    insurance : Optional[List[str]]
    country : str
    hospital_address: str
    ministerId : int
    
class AddMinisterSchema(BaseModel):
    OwnerId:int
    country:str

class AddHospUser(BaseModel):
    Type:Literal["nurse","doctor"]
    OwnerId:int
    specialists : str
    experience_time:str


class AppointmentCreate(BaseModel):
    hospitalId : int
    Doctor_id : int
    reason : str
    issue_prove: Optional[List[str]] = None
    due_date :str
    
    @validator('due_date')
    def validate_due_date(cls, value):
        try:
            datetime.strptime(value, '%m-%d-%Y')
            return value
        except ValueError:
            raise ValueError('Invalid date format. Please use m-dd-YYYY (12-25-2024-15-30-45) format.')
class AppointmentUpdate(BaseModel):
    hospitalId : int
    Doctor_id : int
    reason : str
    issue_prove: Optional[List[str]] = None
    due_date :str
