from fastapi import APIRouter, HTTPException, status
from typing import List
from db.connection import db_dependency
from db.VerifyToken import user_dependency
from models.userModels import Hospital, Users, Nurse, Doctor, Appointments as ORMAppointments
from schemas.schemas import AppointmentCreate, AppointmentUpdate
from schemas.returnSchemas import AppointmentWithUserDetails  # Assuming this is your Pydantic model
from functions.send_mail import send_new_email
from emailsTemps.custom_email_send import custom_email

router = APIRouter(prefix="/app", tags=["Appointment Management"])

@router.post("/book", status_code=status.HTTP_201_CREATED, description="Book an appointment with a doctor")
async def book_appointment_with_doctor(user: user_dependency, details: AppointmentCreate, db: db_dependency):
    if isinstance(user, HTTPException):
        raise user

    user_info = db.query(Users).filter(Users.id == user["user_id"]).first()
    if not user_info:
        raise HTTPException(status_code=404, detail="User not found")
    
    hospital_doctor = db.query(Hospital, Doctor).filter(
        Hospital.id == details.hospitalId,
        Doctor.hospitalId == details.hospitalId,
        Doctor.id == details.Doctor_id
    ).first()
    if not hospital_doctor:
        raise HTTPException(status_code=404, detail="Hospital and Doctor not found")

    existing_app = db.query(ORMAppointments).filter(
        ORMAppointments.OwnerId == user["user_id"],
        ORMAppointments.Doctor_id == details.Doctor_id
    ).first()
    if existing_app:
        raise HTTPException(status_code=400, detail="You already have an appointment with this doctor")
    # Send email to doctor
    doctor_info = db.query(Users).filter(Users.id == hospital_doctor.Doctor.OwnerId).first()
    if not hospital_doctor:
        raise HTTPException(status_code=404, detail="Doctor Info not found")
    new_app = ORMAppointments(
        OwnerId=user["user_id"],
        hospitalId=details.hospitalId,
        Doctor_id=details.Doctor_id,
        app_status=False,
        reason=details.reason,
        issue_prove=details.issue_prove,
        due_date=details.due_date,
    )
    db.add(new_app)
    db.commit()
    db.refresh(new_app)

    # Send email to user
    user_heading = "Appointment Confirmation"
    user_sub = "Your Appointment Request is Under Review"
    user_body = f"""
    <p>Your appointment request with <strong>Dr. {doctor_info.lname}</strong> at <strong>{hospital_doctor.Hospital.hospital_name}</strong> has been received. It is currently under review.</p>
    <p>Appointment Details:</p>
    <ul>
    <li>- Reason: {details.reason}</li>
    <li>- Date: {details.due_date}</li>
    </ul>
    We will notify you once the appointment is confirmed.
    Thank you for choosing our services.
    """
    user_msg = custom_email(user_info.fname, user_heading, user_body)
    send_new_email(user_info.email, user_sub, user_msg)

    
    if doctor_info:
        doctor_heading = "New Patient Appointment"
        doctor_sub = "New Appointment Request"
        doctor_body = f"""
        <p>You have a new appointment request from <strong>{user_info.fname} {user_info.lname}</strong>.</p>
        <p>Appointment Details:</p>
        <ul>
        <li>- Reason: {details.reason}</li>
        <li>- Date: {details.due_date}</li>
        </ul>
        <p>Please review and confirm the appointment.</p>
        """
        doctor_msg = custom_email(doctor_info.fname, doctor_heading, doctor_body)
        send_new_email(doctor_info.email, doctor_sub, doctor_msg)

    return {"detail": "Appointment booked successfully and email notifications sent"}

@router.get("/all", response_model=List[AppointmentWithUserDetails], description="View all appointments with user, hospital, and doctor details")
async def view_all_appointments(user: user_dependency, db: db_dependency):
    if isinstance(user, HTTPException):
        raise user

    if user["acc_type"] not in ["hospital", "admin", "doctor"]:
        raise HTTPException(status_code=403, detail="You are not authorized to view all appointments")

    appointments = db.query(ORMAppointments).all()
    if not appointments:
        raise HTTPException(status_code=404, detail="No appointments found")

    combined_data = []
    for appointment in appointments:
        user_info = db.query(Users).filter(Users.id == appointment.OwnerId).first()
        hospital = db.query(Hospital).filter(Hospital.id == appointment.hospitalId).first()
        doctor = db.query(Doctor).filter(Doctor.id == appointment.Doctor_id).first()
        doctor_info = db.query(Users).filter(Users.id == doctor.OwnerId).first()
        
        if user_info and hospital and doctor and doctor_info:
            combined_data.append({
                **appointment.__dict__,
                **user_info.__dict__,
                "hospital_name": hospital.hospital_name,
                "doctor_name": f"{doctor_info.fname} {doctor_info.lname}"
            })

    return combined_data
@router.get("/me/all", response_model=List[AppointmentWithUserDetails], description="View all appointments For Logged In User")
async def view_all_appointments_me(user: user_dependency, db: db_dependency):
    if isinstance(user, HTTPException):
        raise user

    appointments = db.query(ORMAppointments).filter(ORMAppointments.OwnerId == user["user_id"]).all()
    if not appointments:
        raise HTTPException(status_code=404, detail="No appointments found")

    combined_data = []
    for appointment in appointments:
        user_info = db.query(Users).filter(Users.id == appointment.OwnerId).first()
        hospital = db.query(Hospital).filter(Hospital.id == appointment.hospitalId).first()
        doctor = db.query(Doctor).filter(Doctor.id == appointment.Doctor_id).first()
        doctor_info = db.query(Users).filter(Users.id == doctor.OwnerId).first()
        
        if user_info and hospital and doctor and doctor_info:
            combined_data.append({
                **appointment.__dict__,
                **user_info.__dict__,
                "hospital_name": hospital.hospital_name,
                "doctor_name": f"{doctor_info.fname} {doctor_info.lname}"
            })

    return combined_data

@router.get("/{appointment_id}", response_model=AppointmentWithUserDetails, description="View a single appointment with user, hospital, and doctor details")
async def view_appointment(appointment_id: int, user: user_dependency, db: db_dependency):
    if isinstance(user, HTTPException):
        raise user

    appointment = db.query(ORMAppointments).filter(ORMAppointments.id == appointment_id).first()
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")

    user_info = db.query(Users).filter(Users.id == appointment.OwnerId).first()
    hospital = db.query(Hospital).filter(Hospital.id == appointment.hospitalId).first()
    doctor = db.query(Doctor).filter(Doctor.id == appointment.Doctor_id).first()
    doctor_info = db.query(Users).filter(Users.id == doctor.OwnerId).first()
        
    if not (user_info and hospital and doctor and doctor_info):
        raise HTTPException(status_code=404, detail="User, Hospital, or Doctor not found")

    combined_data = {
        **appointment.__dict__,
        **user_info.__dict__,
        "hospital_name": hospital.hospital_name,
        "doctor_name": f"{doctor_info.fname} {doctor_info.lname}"
    }

    return combined_data
@router.patch("/update_status/{appointment_id}", description="Update appointment status")
async def update_appointment_status(appointment_id: int, status: bool, user: user_dependency, db: db_dependency):
    if isinstance(user, HTTPException):
        raise user

    appointment = db.query(ORMAppointments).filter(ORMAppointments.id == appointment_id).first()
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")

    if user["acc_type"] == "doctor" and appointment.Doctor_id != user["user_id"]:
        raise HTTPException(status_code=403, detail="You are not authorized to update this appointment")

    appointment.app_status = status
    db.commit()
    db.refresh(appointment)

    return {"detail": "Appointment status updated successfully"}

@router.delete("/delete/{appointment_id}", status_code=status.HTTP_204_NO_CONTENT, description="Delete an appointment")
async def delete_appointment(appointment_id: int, user: user_dependency, db: db_dependency):
    if isinstance(user, HTTPException):
        raise user

    appointment = db.query(ORMAppointments).filter(ORMAppointments.id == appointment_id).first()
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")

    if appointment.OwnerId != user["user_id"]:
        raise HTTPException(status_code=403, detail="You are not authorized to delete this appointment")

    db.delete(appointment)
    db.commit()

    return {"detail": "Appointment deleted successfully"}
