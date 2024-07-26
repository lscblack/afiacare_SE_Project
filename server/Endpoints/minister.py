from fastapi import APIRouter, HTTPException
from typing import List
from starlette import status
from db.connection import db_dependency
from db.VerifyToken import user_dependency
from models.userModels import Hospital

from schemas.schemas import GetUserAdmin

router = APIRouter(prefix="/minister", tags=["Minister Management"])

# ------------------------------- Get all hospital info

@router.post(
    "/all_hospitals",
    description="""
    this endpoint gets all hospital with filter option for the status true/false 
    \n
    Returns 200 if hospital information is successfully retrieved. Throws an error if authentication fails or hospital information is not found.
    only Admin and Minister Can
    """,
   
)
async def get_all_hospitals(user: user_dependency, detail: GetUserAdmin, db: db_dependency):
    if isinstance(user, HTTPException):
        raise user

    if not user or "user_id" not in user:
        raise HTTPException(status_code=401, detail="Authentication required")

    if user["acc_type"] not in ["minister","admin"]:
        raise HTTPException(status_code=403, detail="You Are Not Allowed To Do This")
      
    hospital_id = detail.hospital_status

    if hospital_id is None:
        hospitals = db.query(Hospital).all()
        if not hospitals:
            raise HTTPException(status_code=404, detail="No hospitals found")
        return hospitals
    else:
        
        hospital_info = db.query(Hospital).filter(Hospital.hospital_status == hospital_id).all()
        if not hospital_info:
            raise HTTPException(status_code=404, detail="Hospital not found")
        return hospital_info

# ------------------------------- Change hospital type



