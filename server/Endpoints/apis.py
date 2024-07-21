from fastapi import APIRouter, FastAPI, HTTPException
from db.connection import db_dependency
from db.VerifyToken import user_dependency
from models.userModels import Users
from typing import List
from schemas.returnSchemas import ReturnUser
from schemas.schemas import UpdateUserSchema
from schemas.schemas import UserTypeDropDown

router = APIRouter(prefix="/apis", tags=["User Management"])

# -------------------------------get user info


@router.get("/me", description="""
    This endpoint is used to get user information for the currently logged-in user. Pass the user's token in the headers.
    \n
    Returns 200 if user information is successfully retrieved. Throws an error if authentication fails or user information is not found.
    """, response_model=ReturnUser)
async def get_current_user(user: user_dependency, db: db_dependency):
    if isinstance(user, HTTPException):
        raise user

    if not user or "user_id" not in user:
        raise HTTPException(
            status_code=404, detail="User information Not Found!")

    user_info = db.query(Users).filter(Users.id == user["user_id"]).first()
    if not user_info:
        raise HTTPException(
            status_code=404, detail="User information Not Found!")

    return ReturnUser.from_orm(user_info)

# -------------------------------get all user info


@router.get("/all_users", description="""
    This endpoint is used to get All user information for the for admin user. Pass the admin's token in the headers.
    \n
    Returns 200 if user information is successfully retrieved. Throws an error if authentication fails or user information is not found.
    """, response_model=List[ReturnUser])
async def get_all_user(user: user_dependency, db: db_dependency):
    if isinstance(user, HTTPException):
        raise user

    if not user or "user_id" not in user:
        raise HTTPException(
            status_code=404, detail="User information Not Found!")

    if user['acc_type'] != "admin":
        raise HTTPException(status_code=401, detail="Your Not Admin")

    user_info = db.query(Users).all()
    if not user_info:
        raise HTTPException(
            status_code=404, detail="User information Not Found!")

    return user_info


# ------------------------------patial update user
@router.patch(
    "/me",
    description="""
        This endpoint is used to update an existing user either for changing the password or for completing the account setup. It allows partial updates.
        Example:\n
        {
            "fname": "New First Name",
            "lname": "New Last Name"
        }
    """,
)
async def patch_current_user(user_data: UpdateUserSchema, user: user_dependency, db: db_dependency):
    if isinstance(user, HTTPException):
        raise user  # Re-raise the HTTPException if user is an instance of it

    if not user or "user_id" not in user:
        raise HTTPException(status_code=401, detail="Authentication required!")

    db_user = db.query(Users).filter(Users.id == user["user_id"]).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    # Update user fields based on provided data using dynamic attribute assignment
    for field_name, value in user_data.dict(exclude_unset=True).items():
        setattr(db_user, field_name, value)

    db.commit()
    db.refresh(db_user)

    return ReturnUser.from_orm(db_user)
# ------------------------ Delete User One


@router.delete("/me", description="""
        This endpoint is used to delete the current logged-in user. Pass the user's token in the headers.
        \n
        Returns 204 if user deletion is successful. Throws an error if authentication fails or user deletion fails.
    """, status_code=204)
async def delete_current_user(user: user_dependency, db: db_dependency):
    if isinstance(user, HTTPException):
        raise user  # Re-raise the HTTPException if user is an instance of it

    if not user or "user_id" not in user:
        raise HTTPException(status_code=401, detail="Authentication required!")

    db_user = db.query(Users).filter(Users.id == user["user_id"]).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    db.delete(db_user)
    db.commit()

    return None  # Returning None with status_code 204 indicates successful deletion

# -------------------- Change UserType only Admin,Minister,Hospital


@router.post("/me/type/{userid}")
async def change_user_type(
        userid: int,
        userType: UserTypeDropDown,
        user: user_dependency, 
        db: db_dependency
    ):
    if isinstance(user, HTTPException):
        raise user  # Re-raise the HTTPException if user is an instance of it

    if not user or "user_id" not in user:
        raise HTTPException(status_code=401, detail="Authentication required!")

    user_info = db.query(Users).filter(Users.id == userid).first()
    if not user_info:
        raise HTTPException(status_code=404, detail="User Not Found")

    if user['acc_type'] == "admin":
        setattr(user_info, "acc_type", userType.user_type)
    elif user['acc_type'] == "minister":
        if user_info.acc_type not in ["admin","minister"] and userType.user_type not in ["minister", "admin"]:
            setattr(user_info, "acc_type", userType.user_type)
        else:
            raise HTTPException(
                status_code=401, detail="You don't have permission to change to those categories"
            )
    elif user['acc_type'] == "hospital":
        if user_info.acc_type not in ["admin","minister","hospital"] and userType.user_type not in ["minister", "admin", "hospital"]:
            setattr(user_info, "acc_type", userType.user_type)
        else:
            raise HTTPException(
                status_code=401, detail="You don't have permission to change to those categories"
            )
    elif user['acc_type'] == "patient":
        raise HTTPException(
            status_code=401, detail="You're not allowed to change user type"
        )

    db.commit()
    db.refresh(user_info)
    return {"message": "User type updated successfully", "user_type": user_info.acc_type}
