from fastapi import APIRouter, HTTPException, Depends
from starlette import status
from db.connection import db_dependency
from db.VerifyToken import user_dependency
from models.userModels import Users
from models.userModels import Hospital
from schemas.schemas import RequestHospitalSchema

router = APIRouter(prefix="/request_hospital", tags=["Hospital Registration"])

@router.post("/request_hospital", status_code=status.HTTP_200_OK)
async def request_hospital(
    request_hospital: RequestHospitalSchema,
    user: user_dependency,
    db: db_dependency
):
    try:
        if isinstance(user, HTTPException):
            raise user

        if not user or "user_id" not in user:
            raise HTTPException(status_code=401, detail="Authentication required")

        # Retrieve the user from the Users table
        user_info = db.query(Users).filter(Users.id == user["user_id"]).first()

        if not user_info:
            raise HTTPException(status_code=404, detail="User not found")

        # Create the hospital_request object
        hospital_request = {
            "user_id": user_info.id,
            "hospital_name": request_hospital.hospital_name,
            "hospital_address": request_hospital.hospital_address
        }

        return {"message": "Request submitted successfully, status: pending", "hospital_request": hospital_request}

    except Exception as e:
        print(f"Error occurred: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")





