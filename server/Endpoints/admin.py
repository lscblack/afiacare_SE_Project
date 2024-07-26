from fastapi import APIRouter, FastAPI, HTTPException
from db.connection import db_dependency
from db.VerifyToken import user_dependency
from starlette import status
from models.userModels import Users, Minister
from typing import List,Optional
from schemas.returnSchemas import ReturnUser
from schemas.schemas import (
    UserTypeDropDown,
    DeleteUserAdmin,
    GetUserAdmin,
    AddMinisterSchema,
)
from functions.send_mail import send_new_email
from emailsTemps.custom_email_send import custom_email

router = APIRouter(prefix="/admin", tags=["Admin Management"])



# -------------------------------get all user info


@router.get(
    "/all_users",
    description="""
    This endpoint is used to get All user information or single User if id Provided if not it gets all users for the for admin user. Pass the admin's token in the headers.
    \n
    Returns 200 if user information is successfully retrieved. Throws an error if authentication fails or user information is not found.
    """,
)
async def get_all_user(user: user_dependency, db: db_dependency,userID:Optional[int]=None):
    if isinstance(user, HTTPException):
        raise user

    if not user or "user_id" not in user:
        raise HTTPException(status_code=404, detail="User information Not Found!")

    if user["acc_type"] != "admin":
        raise HTTPException(status_code=401, detail="Your Not Admin")

    user_id = userID

    if not user_id:
        user_info = db.query(Users).all()
    else:
        user_info = db.query(Users).filter(Users.id == user_id).first()

    if not user_info:
        raise HTTPException(status_code=404, detail="User information Not Found!")

    return user_info


@router.delete(
    "/user/remove/",
    description="""
        This endpoint is used to delete the user. Pass the user's token in the headers.
        Returns 204 if user deletion is successful. Throws an error if authentication fails or user deletion fails.
    """,
    status_code=204,
)
async def delete_user(
    user: user_dependency, userId: DeleteUserAdmin, db: db_dependency
):
    if isinstance(user, HTTPException):
        raise user
    if user["acc_type"] not in ["admin"]:
        raise HTTPException(status_code=403, detail="You Are Not Admin")

    if not user or "user_id" not in user:
        raise HTTPException(status_code=401, detail="Authentication required!")

    user_id = userId.userId  # Extract the actual user ID from DeleteUserAdmin

    db_user = db.query(Users).filter(Users.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    db.delete(db_user)
    db.commit()

    return {"detail": "User deleted successfully"}


@router.post(
    "/add_minister",
    status_code=status.HTTP_201_CREATED,
    description="Add a new minister if the user is an admin.",
)
async def add_new_Minister(
    details: AddMinisterSchema, user: user_dependency, db: db_dependency
):
    if isinstance(user, HTTPException):
        raise user

    # Check if the user is an admin
    if user.get("acc_type") != "admin":
        raise HTTPException(
            status_code=403, detail="You are not authorized to perform this action"
        )

    # Check if the minister already exists
    existing_minister = (
        db.query(Minister).filter(Minister.OwnerId == details.OwnerId).first()
    )
    if existing_minister:
        raise HTTPException(
            status_code=409, detail="Minister with this OwnerId already exists"
        )

    # Fetch the user info to send email
    user_info = db.query(Users).filter(Users.id == details.OwnerId).first()
    if not user_info:
        raise HTTPException(status_code=404, detail="User not found ")
    # Add new minister
    new_minister = Minister(
        OwnerId=details.OwnerId, country=details.country, AdminId=user["user_id"]
    )

    db.add(new_minister)
    db.commit()
    db.refresh(new_minister)
    user_info.acc_type = "minister"  # Update the attribute
    db.commit()

    # Send a confirmation email to the user
    heading = "Welcome to AfiaCare Account Management"
    sub = "Congratulations! You've Been Added as a Minister"
    body = f"""

    <p>Congratulations! You have been added as a minister in our system. Below are the details of your new role:</p>

    <h2>Your Registered Details</h2>
    <ul>
        <li><strong>Name:</strong> {user_info.fname} {user_info.lname}</li>
        <li><strong>Country:</strong> {new_minister.country}</li>
        <li><strong>Email:</strong> {user_info.email}</li>
    </ul>

    <p>We look forward to your valuable contribution to our platform. If you have any questions, please do not hesitate to reach out to us.</p>

    """
    msg = custom_email(user_info.fname, heading, body)
    send_new_email(user_info.email, sub, msg)
    return {"detail": "Minister added successfully and email sent to the user."}


# View All Ministers
@router.get(
    "/all_ministers",
    description="This endpoint retrieves all ministers. Only admins are allowed.",
)
async def view_all_ministers(user: user_dependency, db: db_dependency):
    if isinstance(user, HTTPException):
        raise user

    # Check if the user is an admin
    if user.get("acc_type") != "admin":
        raise HTTPException(
            status_code=403, detail="You are not authorized to perform this action"
        )

    # Join Minister and Users tables
    ministers = db.query(Minister, Users).filter(Minister.OwnerId == Users.id).all()

    if not ministers:
        raise HTTPException(status_code=404, detail="No ministers found")

    # Format the result as a list of dictionaries
    minister_list = [
        {
            "minister_id": minister.id,
            "country": minister.country,
            "minister_names": f"{user_.fname} {user_.lname}",
            "minister_email": user_.email,
            "minister_image": user_.avatar,
            "added_by": user["username"],
        }
        for minister, user_ in ministers
    ]

    return {"ministers": minister_list}


@router.delete(
    "/remove_minister/{minister_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    description="Delete a single minister if the user is an admin.",
)
async def delete_minister(minister_id: int, user: user_dependency, db: db_dependency):
    if isinstance(user, HTTPException):
        raise user

    # Check if the user is an admin
    if user.get("acc_type") != "admin":
        raise HTTPException(
            status_code=403, detail="You are not authorized to perform this action"
        )

    # Fetch the minister record
    existing_minister = db.query(Minister).filter(Minister.id == minister_id).first()
    if not existing_minister:
        raise HTTPException(
            status_code=404, detail="Minister with the given ID doesn't exist"
        )

    # Fetch the user info to send email
    user_info = db.query(Users).filter(Users.id == existing_minister.OwnerId).first()
    if not user_info:
        raise HTTPException(status_code=404, detail="User not found")

    # Delete the minister record
    db.delete(existing_minister)
    db.commit()

    # Send a confirmation email to the user
    heading = "Important Update Regarding Your AfiaCare Account"
    sub = "Your Minister Privileges Have Been Revoked"
    body = f"""
    <p>Dear {user_info.fname} {user_info.lname},</p>

    <p>We are writing to inform you that your minister privileges on the AfiaCare platform have been revoked. We understand this may be unexpected, and we apologize for any inconvenience it may cause.</p>

    <p>Unfortunately, we cannot disclose the specific reason for the revocation at this time. However, if you have any questions or would like to discuss this further, please don't hesitate to contact our support team. We are here to assist you in any way we can.</p>

    <p>Thank you for your understanding. We appreciate your time and contributions to AfiaCare.</p>
    """
    msg = custom_email(user_info.fname, heading, body)
    send_new_email(user_info.email, sub, msg)

    return {"detail": "Minister removed successfully and email sent to the user."}
