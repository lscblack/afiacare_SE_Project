from fastapi import APIRouter, HTTPException, Depends, status
from typing import List
from db.connection import db_dependency
from db.VerifyToken import user_dependency
from models.userModels import Records, Users, Doctor, Hospital
from schemas.schemas import AddRecord
from functions.send_mail import send_new_email
from emailsTemps.custom_email_send import custom_email

router = APIRouter(prefix="/doc", tags=["Doctors Board"])

@router.post(
    "/add_record",
    description="Add a medical record for a patient.",
    status_code=status.HTTP_201_CREATED
)
async def add_record(user: user_dependency, db: db_dependency,detail:AddRecord ):
    if isinstance(user, HTTPException):
        raise user

    if not user or "user_id" not in user:
        raise HTTPException(status_code=401, detail="Authentication required")

    if user["acc_type"] != "doctor":
        raise HTTPException(status_code=403, detail="You are not authorized to perform this action")

    patient = db.query(Users).filter(Users.id == detail.record_of).first()
    if not patient:
        raise HTTPException(status_code=404, detail="The patient you are trying to add a record for is not found")

    doctor = db.query(Doctor,Users).filter(Doctor.OwnerId == user["user_id"], Users.id== user["user_id"]).first()
    if not doctor: 
        raise HTTPException(status_code=404, detail="Doctor account not found")

    hospital = db.query(Hospital).filter(Hospital.id == doctor.Doctor.hospitalId).first()
    if not hospital:
        raise HTTPException(status_code=404, detail="Hospital not found")

    new_record = Records(
        record_of=detail.record_of,
        consultations=detail.consultations,
        tests=detail.tests,
        tests_results=detail.tests_results,
        presciptions=detail.presciptions,
        diseases=detail.diseases,
        Doctor_id=doctor.Doctor.id,
        date_taken=detail.date_taken,
        hospitalId=hospital.id
    )
    db.add(new_record)
    db.commit()
    db.refresh(new_record)

    # Prepare and send email
    heading = "Welcome To AfiaCare Medical Records"
    sub = "New Medical Record Added"
    body = f"""
    <p>Hi Again {patient.fname} {patient.lname},</p>

    <p>A new medical record has been added to your history by Dr. {doctor.Users.fname}  {doctor.Users.lname}  at {hospital.hospital_name}.</p>

    <h2>Record Details</h2>
    <table border="1" style="border-collapse: collapse; border: 1px solid lightgray; width: 100%;">
        <tr>
            <th style="padding: 8px; text-align: left;">Consultations</th>
            <td style="padding: 8px;">{', '.join(detail.consultations)}</td>
        </tr>
        <tr>
            <th style="padding: 8px; text-align: left;">Tests</th>
            <td style="padding: 8px;">{', '.join(detail.tests)}</td>
        </tr>
        <tr>
            <th style="padding: 8px; text-align: left;">Test Results</th>
            <td style="padding: 8px;">{detail.tests_results}</td>
        </tr>
        <tr>
            <th style="padding: 8px; text-align: left;">Prescriptions</th>
            <td style="padding: 8px;">{', '.join(detail.presciptions)}</td>
        </tr>
        <tr>
            <th style="padding: 8px; text-align: left;">Diseases</th>
            <td style="padding: 8px;">{', '.join(detail.diseases)}</td>
        </tr>
    </table>

    <p>To view more details, please log in to your account.</p>

    <p>From,<br>Afiacare Hospital Management Team</p>
    """
    msg = custom_email(patient.fname, heading, body)
    send_new_email(patient.email, sub, msg)

    return {"success": "Record added successfully"}
@router.get(
    "/user_records",
    description="Get all records of the logged-in user.",
)
async def get_user_records(user: user_dependency, db: db_dependency):
    if isinstance(user, HTTPException):
        raise user

    records = db.query(Records).filter(Records.record_of == user["user_id"]).all()
    if not records:
        raise HTTPException(status_code=404, detail="You have no records")

    detailed_records = []
    
    for record in records:
        doctor = db.query(Doctor).filter(Doctor.id == record.Doctor_id).first()
        if not doctor:
            raise HTTPException(status_code=404, detail="Doctor account not found")

        doctor_info = db.query(Users).filter(Users.id == doctor.OwnerId).first()
        if not doctor_info:
            raise HTTPException(status_code=404, detail="Doctor info account not found")

        hospital = db.query(Hospital).filter(Hospital.id == doctor.hospitalId).first()
        if not hospital:
            raise HTTPException(status_code=404, detail="Hospital not found")

        detailed_record = {
            "record": record.id,
            "doctor_name": f"{doctor_info.fname} {doctor_info.lname}",
            "doctor_specialization": doctor.specialists,
            "exp_time": doctor.experience_time,
            "hospital_name": hospital.hospital_name,
            "hospital_address": hospital.hospital_address,
            "consultations": record.consultations,
            "tests": record.tests,
            "tests_results": record.tests_results,
            "prescriptions": record.presciptions,  # Corrected spelling from 'presciptions' to 'prescriptions'
            "diseases": record.diseases,
        }
        
        detailed_records.append(detailed_record)
  
    return detailed_records

@router.get(
    "/all_records/{hospitalId}",
    description="Get all records of the lthe spe.. Hospital.",
)
async def all_Records(user: user_dependency, db: db_dependency,hospitalId:int):
    if isinstance(user, HTTPException):
        raise user

    records = db.query(Records).filter(Records.hospitalId == hospitalId).all()
    if not records:
        raise HTTPException(status_code=404, detail="No records Fo This Hospital")

    detailed_records = []
    
    for record in records:
        doctor = db.query(Doctor).filter(Doctor.id == record.Doctor_id).first()
        if not doctor:
            raise HTTPException(status_code=404, detail="Doctor account not found")

        doctor_info = db.query(Users).filter(Users.id == doctor.OwnerId).first()
        if not doctor_info:
            raise HTTPException(status_code=404, detail="Doctor info account not found")

        hospital = db.query(Hospital).filter(Hospital.id == doctor.hospitalId).first()
        if not hospital:
            raise HTTPException(status_code=404, detail="Hospital not found")

        detailed_record = {
            "record": record.id,
            "doctor_name": f"{doctor_info.fname} {doctor_info.lname}",
            "doctor_specialization": doctor.specialists,
            "exp_time": doctor.experience_time,
            "hospital_name": hospital.hospital_name,
            "hospital_address": hospital.hospital_address,
            "consultations": record.consultations,
            "tests": record.tests,
            "tests_results": record.tests_results,
            "prescriptions": record.presciptions,  # Corrected spelling from 'presciptions' to 'prescriptions'
            "diseases": record.diseases,
        }
        
        detailed_records.append(detailed_record)
  
    return detailed_records
