from fastapi import APIRouter, FastAPI, HTTPException
from db.connection import db_dependency
from db.VerifyToken import user_dependency
from models.userModels import Users,Doctor
from typing import List
from schemas.returnSchemas import ReturnUser
from schemas.schemas import UserTypeDropDown

router = APIRouter(prefix="/minister", tags=["Minister Management"])


# -------------------------------get all user info


@router.get("/all_users", description="""
    This endpoint is used to get All user information for the for admin user. Pass the admin's token in the headers.
    \n
    Returns 200 if user information is successfully retrieved. Throws an error if authentication fails or user information is not found.
    """, response_model=List[ReturnUser])
async def get_all_hospitals(user: user_dependency, db: db_dependency):
    if isinstance(user, HTTPException):
        raise user

    if not user or "user_id" not in user:
        raise HTTPException(
            status_code=404, detail="User information Not Found!")

    if user['acc_type'] != "minister":
        raise HTTPException(status_code=401, detail="Your Not allowed")

    user_info = db.query(Users,Doctor,).filter(Users.id == Doctor.OwnerId,Doctor.hospitalId == user.id).all()
    if not user_info:
        raise HTTPException(
            status_code=404, detail="No Doctors Found!")

    return user_info
