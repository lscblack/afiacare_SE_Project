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
    response_model=List[AddRecord]
)
async def get_user_records(user: user_dependency, db: db_dependency):
    if isinstance(user, HTTPException):
        raise user

    records = (
        db.query(Records)
        .filter(Records.record_of == user["user_id"])
        .join(Doctor, Doctor.OwnerId == Records.Doctor_id)
        .join(Users, Users.id == Records.Doctor_id)
        .join(Hospital, Hospital.id == Doctor.hospitalId)
        .add_columns(
            Users.fname.label("doctor_fname"),
            Users.lname.label("doctor_lname"),
            Doctor.specialists.label("doctor_specialization"),
            Hospital.hospital_name.label("hospital_name"),
            Hospital.hospital_address.label("hospital_address")
        )
        .all()
    )

    detailed_records = []
    for record, doctor_fname, doctor_lname, doctor_specialization, hospital_name, hospital_address in records:
        detailed_record = {
            "record": record,
            "doctor_fname": doctor_fname,
            "doctor_lname": doctor_lname,
            "doctor_specialization": doctor_specialization,
            "hospital_name": hospital_name,
            "hospital_address": hospital_address
        }
        detailed_records.append(detailed_record)

    return detailed_records
