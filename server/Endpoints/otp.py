from fastapi import APIRouter, HTTPException
from dotenv import load_dotenv
import random
from db.connection import db_dependency
from models.userModels import Users, OTP
from functions.send_mail import send_new_email
from emailsTemps.MainTemp import otp_temp
from schemas.emailSchemas import EmailSchema, OtpVerify

# Load environment variables from .env file
load_dotenv()

router = APIRouter(prefix="/email", tags=["Send Notifications and OTP"])


# send Otp
@router.post(
    "/send-otp/",
    description="""\
    Sends an OTP (One-Time Password) to the specified email address for verification purposes.
    ### Request Body
    Provide the following JSON object:

    ```
    {
    "purpose": "login",
    "toEmail": "user@example.com"
    }
    ```
    The Otp type can be in this Choose on of above purpose
    ```
    ["login", "email", "notification"]
    """,
)
async def send_email(details: EmailSchema, db: db_dependency):
    user = db.query(Users).filter(Users.email == details.toEmail).first()
    if not user:
        raise HTTPException(status_code=404, detail="Email Id Not Found")

    otp_subjet = {
        "login": "Afia Care Login OTP Verification",
        "email": "Afia Care Account Verification Code",
        "notification": "Afia Care Important Updates",
    }
    otp = random.randint(100000, 999999)  # Generates a 6-digit OTP
    verification = random.randint(
        1000000, 9999999
    )  # Generates a 7-digit Verification OTP
    purpose = details.purpose
    # Remove existing OTPs for the user if any
    otp_user = db.query(OTP).filter(OTP.account_id == user.id).first()
    # If record exists, delete it
    if otp_user:
        db.delete(otp_user)
        db.commit()
    # Create and store the new OTP
    new_otp = OTP(account_id=user.id, otp_code=otp, verification_code=verification, purpose=purpose)
    db.add(new_otp)
    db.commit()
    db.refresh(new_otp)

    msg = otp_temp(new_otp.otp_code, user.fname)
    if send_new_email(details.toEmail, otp_subjet[purpose], msg, verification):
        return {"message": "Email sent successfully", "verification_Code": verification}


@router.post(
    "/verify-otp",
    summary="Verify OTP Code",
    description="""\
    This endpoint is used to verify an OTP code. Example JSON request body:
    
    ```json
    {
        "otp_code": "string",
        "verification_code": "string",
        "email": "user@example.com"
    }
    ```
    """,
)
async def verify_opt(data: OtpVerify, db: db_dependency):
    user_info = db.query(Users).filter(Users.email == data.email).first()
    if not user_info:
        raise HTTPException(status_code=404, detail="Email Id Not Found")
    
    valid_otp = db.query(OTP).filter(
        OTP.otp_code == data.otp_code,
        OTP.verification_code == data.verification_code,
        OTP.account_id == user_info.id
    ).first()
    
    if not valid_otp:
        raise HTTPException(status_code=404, detail="OTP Not found")
    
    if valid_otp.purpose == "email":
        user_info.email_confirm = True
        db.commit()
        db.refresh(user_info)
        return {"detail": "Successfully Verified"}
    
    db.delete(valid_otp)
    db.commit()
    return {"detail": "Successfully Verified"}