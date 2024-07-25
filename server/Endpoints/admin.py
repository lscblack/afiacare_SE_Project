from fastapi import APIRouter, FastAPI, HTTPException
from db.connection import db_dependency
from db.VerifyToken import user_dependency
from models.userModels import Users
from typing import List
from schemas.returnSchemas import ReturnUser
from schemas.schemas import UserTypeDropDown, DeleteUserAdmin,GetUserAdmin

router = APIRouter(prefix="/admin", tags=["Admin Management"])


# -------------------- Change UserType only Admin,Minister,Hospital
@router.post("/me/type/{userid}")
async def change_user_type(
    userid: int, userType: UserTypeDropDown, user: user_dependency, db: db_dependency
):
    if isinstance(user, HTTPException):
        raise user  # Re-raise the HTTPException if user is an instance of it

    if not user or "user_id" not in user:
        raise HTTPException(status_code=401, detail="Authentication required!")

    user_info = db.query(Users).filter(Users.id == userid).first()
    if not user_info:
        raise HTTPException(status_code=404, detail="User Not Found")

    if user["acc_type"] == "admin":
        setattr(user_info, "acc_type", userType.user_type)
    elif user["acc_type"] == "minister":
        if user_info.acc_type not in [
            "admin",
            "minister",
        ] and userType.user_type not in ["minister", "admin"]:
            setattr(user_info, "acc_type", userType.user_type)
        else:
            raise HTTPException(
                status_code=401,
                detail="You don't have permission to change to those categories",
            )
    elif user["acc_type"] == "hospital":
        if user_info.acc_type not in [
            "admin",
            "minister",
            "hospital",
        ] and userType.user_type not in ["minister", "admin", "hospital"]:
            setattr(user_info, "acc_type", userType.user_type)
        else:
            raise HTTPException(
                status_code=401,
                detail="You don't have permission to change to those categories",
            )
    elif user["acc_type"] == "patient":
        raise HTTPException(
            status_code=401, detail="You're not allowed to change user type"
        )

    db.commit()
    db.refresh(user_info)
    return {
        "message": "User type updated successfully",
        "user_type": user_info.acc_type,
    }


# -------------------------------get all user info


@router.post(
    "/all_users",
    description="""
    This endpoint is used to get All user information or single User if id Provided if not it gets all users for the for admin user. Pass the admin's token in the headers.
    \n
    Returns 200 if user information is successfully retrieved. Throws an error if authentication fails or user information is not found.
    """,
)
async def get_all_user(user: user_dependency,userId: GetUserAdmin, db: db_dependency):
    if isinstance(user, HTTPException):
        raise user

    if not user or "user_id" not in user:
        raise HTTPException(status_code=404, detail="User information Not Found!")

    if user["acc_type"] != "admin":
        raise HTTPException(status_code=401, detail="Your Not Admin")
    
    user_id = userId.userId
    
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

    if not user or "user_id" not in user:
        raise HTTPException(status_code=401, detail="Authentication required!")

    user_id = userId.userId  # Extract the actual user ID from DeleteUserAdmin

    db_user = db.query(Users).filter(Users.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    db.delete(db_user)
    db.commit()

    return {"detail": "User deleted successfully"}