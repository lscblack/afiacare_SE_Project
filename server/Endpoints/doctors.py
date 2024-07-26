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

router = APIRouter(prefix="/hosp", tags=["Doctors Nurse Management"])

@router.post("/add_worker", status_code=status.HTTP_201_CREATED)
async def add_hospital_worker(details: AddHospUser, user: user_dependency, db: db_dependency):
    if isinstance(user, HTTPException):
        raise user
    
    if user["acc_type"] not in ["hospital"]:
        raise HTTPException(status_code=403, detail="You are not allowed to perform this action")

    hospital = db.query(Hospital).filter(Hospital.OwnerId == user["user_id"]).first()
    if not hospital:
        raise HTTPException(status_code=404, detail="Hospital not found or you do not have access to this hospital")
   
    user_info = db.query(Users).filter(Users.id == details.OwnerId).first()
    if not user_info:
        raise HTTPException(status_code=404, detail="User not found")
        
    if details.Type == "nurse":
        existing_nurse = db.query(Nurse).filter(Nurse.OwnerId == details.OwnerId).first()
        if existing_nurse:
            raise HTTPException(status_code=400, detail="Nurse already exists")
        new_worker = Nurse(
            OwnerId=details.OwnerId,
            hospitalId=hospital.id,
            specialists=details.specialists,
            experience_time=details.experience_time
        )
    elif details.Type == "doctor":
        existing_doctor = db.query(Doctor).filter(Doctor.OwnerId == details.OwnerId).first()
        if existing_doctor:
            raise HTTPException(status_code=400, detail="Doctor already exists")
        new_worker = Doctor(
            OwnerId=details.OwnerId,
            hospitalId=hospital.id,
            specialists=details.specialists,
            experience_time=details.experience_time
        )

    db.add(new_worker)
    db.commit()
    db.refresh(new_worker)
    user_info.acc_type = details.Type  # Update the attribute
    db.commit()




    heading = "Welcome to AfiaCare Hospital Management!"
    sub = "You have been added as a new worker"
    body = f"""
    <p>Dear {user_info.fname} {user_info.lname},</p>

    <p>We are pleased to inform you that you have been added as a <strong>{details.Type}</strong> at <strong>{hospital.hospital_name}</strong>.</p>

    <p><strong>Specialists:</strong> {details.specialists}</p>
    <p><strong>Experience Time:</strong> {details.experience_time}</p>

    <p>Welcome to the team!</p>
    """
    msg = custom_email(user_info.fname, heading, body)
    send_new_email(user_info.email, sub, msg)

    return {"detail": f"{details.Type.capitalize()} added successfully"}

@router.get("/workers", description="Get all doctors and nurses of the logged-in hospital owner")
async def view_hospital_workers(worker_type: Literal["nurse", "doctor"], user: user_dependency, db: db_dependency):
    if isinstance(user, HTTPException):
        raise user

    if user["acc_type"] not in ["hospital"]:
        raise HTTPException(status_code=403, detail="You are not allowed to perform this action")

    hospital = db.query(Hospital).filter(Hospital.OwnerId == user["user_id"]).first()
    if not hospital:
        raise HTTPException(status_code=404, detail="You have no hospital")

    if worker_type == "nurse":
        workers = db.query(Nurse, Users).join(Users, Nurse.OwnerId == Users.id).filter(Nurse.hospitalId == hospital.id).all()
    elif worker_type == "doctor":
        workers = db.query(Doctor, Users).join(Users, Doctor.OwnerId == Users.id).filter(Doctor.hospitalId == hospital.id).all()
    else:
        raise HTTPException(status_code=400, detail="Invalid worker type")

    if not workers:
        raise HTTPException(status_code=404, detail="No workers found")

    worker_list = []
    for worker, user_info in workers:
        worker_data = {
            "worker_id": worker.id,
            "hospital_id": worker.hospitalId,
            "specialists": worker.specialists,
            "experience_time": worker.experience_time,
            "fname": user_info.fname,
            "lname": user_info.lname,
            "email": user_info.email,
            "dob": user_info.dob,
            "country": user_info.country
        }
        worker_list.append(worker_data)

    return {"workers": worker_list}


# Update Doctor or Nurse
@router.patch("/update_worker/{worker_id}", description="Update doctor or nurse details")
async def update_worker(worker_id: int, details: UpdateWorkerRequest, user: user_dependency, db: db_dependency):
    if isinstance(user, HTTPException):
        raise user

    if user["acc_type"] not in ["hospital"]:
        raise HTTPException(status_code=403, detail="You are not allowed to perform this action")

    if details.Type == "nurse":
        worker = db.query(Nurse).filter(Nurse.id == worker_id).first()
    elif details.Type == "doctor":
        worker = db.query(Doctor).filter(Doctor.id == worker_id).first()
    else:
        raise HTTPException(status_code=400, detail="Invalid worker type")

    if not worker:
        raise HTTPException(status_code=404, detail="Worker not found")

    worker.specialists = details.specialists
    worker.experience_time = details.experience_time

    db.commit()
    db.refresh(worker)

    return {"detail": f"{details.Type.capitalize()} updated successfully"}

# Delete Doctor or Nurse
@router.delete("/remove_worker/{worker_id}", status_code=status.HTTP_204_NO_CONTENT, description="Delete doctor or nurse")
async def delete_worker(worker_id: int, worker_type: Literal["nurse", "doctor"], user: user_dependency, db: db_dependency):
    if isinstance(user, HTTPException):
        raise user

    if user["acc_type"] not in ["hospital"]:
        raise HTTPException(status_code=403, detail="You are not allowed to perform this action")
    hospital = db.query(Hospital).filter(Hospital.OwnerId == user["user_id"]).first()
    if not hospital:
        raise HTTPException(status_code=404, detail="Hospital not found or you do not have access to this hospital")
    if worker_type == "nurse":
        worker = db.query(Nurse).filter(Nurse.id == worker_id).first()
    elif worker_type == "doctor":
        worker = db.query(Doctor).filter(Doctor.id == worker_id).first()
    else:
        raise HTTPException(status_code=400, detail="Invalid worker type")
    if not worker:
        raise HTTPException(status_code=404, detail="Worker not found")
    
    user_info = db.query(Users).filter(Users.id == worker.OwnerId).first()
    if not user_info:
        raise HTTPException(status_code=404, detail="User not found")

    db.delete(worker)
    db.commit()
    user_info.acc_type = worker_type  # Update the attribute
    db.commit()
    heading = "Important Information Regarding Your Employment at AfiaCare"  # New heading
    sub = "Employment Update at AfiaCare"  # Updated subject

    body = f"""
    <p>Dear {user_info.fname} {user_info.lname},</p>

    <p>This email is to inform you that your employment as a <strong>{worker_type}</strong> at <strong>{hospital.hospital_name}</strong> has been terminated.</p>

    <p>We appreciate your contributions to the hospital during your time here.</p>

    <p>If you have any questions regarding this update, please don't hesitate to contact the hospital administration.</p>

    """
    msg = custom_email(user_info.fname, heading, body)
    send_new_email(user_info.email, sub, msg)

    return {"detail": f"{worker_type.capitalize()} deleted successfully"}
