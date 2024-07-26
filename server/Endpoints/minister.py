from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from starlette import status
from db.connection import db_dependency
from db.VerifyToken import user_dependency
from models.userModels import Hospital
from schemas.returnSchemas import ReturnHospital  
from schemas.schemas import UserTypeDropDown, GetUserAdmin, ProcessRequestSchema

router = APIRouter(prefix="/minister", tags=["Minister Management"])

# ------------------------------- Get all hospital info

@router.post(
    "/all_hospitals",
    description="""
    This endpoint is used to get all hospital information or a single hospital if an ID is provided. Pass the minister's token in the headers.
    \n
    Returns 200 if hospital information is successfully retrieved. Throws an error if authentication fails or hospital information is not found.
    """,
    response_model=List[ReturnHospital]
)
async def get_all_hospitals(user: user_dependency, hospitalId: GetUserAdmin, db: db_dependency):
    if isinstance(user, HTTPException):
        raise user

    if not user or "user_id" not in user:
        raise HTTPException(status_code=401, detail="Authentication required")

    if user["acc_type"] != "minister":
        raise HTTPException(status_code=403, detail="You are not allowed to access this resource")
    
    hospital_id = hospitalId.hospitalId

    if hospital_id is None:
        hospitals = db.query(Hospital).all()
        if not hospitals:
            raise HTTPException(status_code=404, detail="No hospitals found")
        return hospitals
    else:
        hospital_info = db.query(Hospital).filter(Hospital.id == hospitalId).first()
        if not hospital_info:
            raise HTTPException(status_code=404, detail="Hospital not found")
        return hospital_info

# ------------------------------- Change hospital type

@router.post("/hospital/type/{hospital_id}")
async def change_hospital_type(
    hospital_id: int, userType: UserTypeDropDown, user: user_dependency, db: db_dependency
):
    if isinstance(user, HTTPException):
        raise user  # Re-raise the HTTPException if user is an instance of it

    if not user or "user_id" not in user:
        raise HTTPException(status_code=401, detail="Authentication required!")

    hospital_info = db.query(Hospital).filter(Hospital.id == hospital_id).first()
    if not hospital_info:
        raise HTTPException(status_code=404, detail="Hospital Not Found")

    if user["acc_type"] == "minister":
        setattr(hospital_info, "hospital_type", userType.user_type)
    elif user["acc_type"] == "hospital":
        if hospital_info.hospital_type not in ["admin", "minister"] and userType.user_type not in ["minister", "admin"]:
            setattr(hospital_info, "hospital_type", userType.user_type)
        else:
            raise HTTPException(
                status_code=401,
                detail="You don't have permission to change to those categories",
            )
    elif user["acc_type"] == "patient":
        raise HTTPException(
            status_code=401, detail="You're not allowed to change hospital type"
        )

    db.commit()
    db.refresh(hospital_info)
    return {
        "message": "Hospital type updated successfully",
        "hospital_type": hospital_info.hospital_type,
    }



@router.get("/hospital_requests", status_code=status.HTTP_200_OK)
async def get_hospital_requests(
    user: user_dependency,
    db: db_dependency
):
    if isinstance(user, HTTPException):
        raise user

    if not user or "user_id" not in user:
        raise HTTPException(status_code=401, detail="Authentication required")

    if user["acc_type"] != "minister":
        raise HTTPException(status_code=403, detail="You are not authorized to access this resource")

    requests = db.query(HospitalRequest).filter(HospitalRequest.status == "pending").all()
    return requests

@router.post("/process_request/{request_id}", status_code=status.HTTP_200_OK)
async def process_request(
    request_id: int,
    process_request: ProcessRequestSchema,
    user: user_dependency,
    db: db_dependency
):
    if isinstance(user, HTTPException):
        raise user

    if not user or "user_id" not in user:
        raise HTTPException(status_code=401, detail="Authentication required")

    if user["acc_type"] != "minister":
        raise HTTPException(status_code=403, detail="You are not authorized to access this resource")

    hospital_request = db.query(HospitalRequest).filter(HospitalRequest.id == request_id).first()
    if not hospital_request:
        raise HTTPException(status_code=404, detail="Request not found")

    hospital_request.status = process_request.status
    db.commit()
    db.refresh(hospital_request)

    return {"message": "Request processed successfully", "status": hospital_request.status}
