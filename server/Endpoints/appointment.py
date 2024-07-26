from fastapi import APIRouter, HTTPException
from starlette import status
from typing import Literal
from db.connection import db_dependency
from db.VerifyToken import user_dependency
from models.userModels import Hospital, Users, Nurse, Doctor
from schemas.schemas import AddHospUser
from schemas.returnSchemas import UpdateWorkerRequest
from functions.send_mail import send_new_email
from emailsTemps.custom_email_send import custom_email

router = APIRouter(prefix="/app", tags=["Appointment Management"])

@router.post("/book", status_code=status.HTTP_201_CREATED,description="""
             book appointment
             """)
async def book_appointment_with_doctor(user: user_dependency, db: db_dependency):
