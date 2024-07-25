from datetime import timedelta, datetime
from fastapi import APIRouter, HTTPException, Depends
from starlette import status
from typing import Annotated
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from jose import jwt, JWTError
from db.connection import db_dependency
from models import userModels
from models.userModels import Users
from sqlalchemy import or_

from schemas.schemas import CreateUserRequest, Token, FromData
from schemas.returnSchemas import ReturnUser
from functions.send_mail import send_new_email
from emailsTemps.custom_email_send import custom_email

from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

router = APIRouter(prefix="/auth", tags=["Authentication"])

# load env values
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

# setup token gen and pass encrpty
bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_bearer = OAuth2PasswordBearer(tokenUrl="auth/token")


# handel register User
@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register_user(db: db_dependency, create_user_request: CreateUserRequest):
    try:
        # Check if username or email already exists
        check_username = (
            db.query(Users)
            .filter(Users.username == create_user_request.username)
            .first()
        )
        check_email = (
            db.query(Users).filter(Users.email == create_user_request.email).first()
        )

        if check_username:
            return HTTPException(status_code=400, detail="Username already taken")

        if check_email:
            return HTTPException(status_code=400, detail="Email already taken")

        # Create the user model
        create_user_model = Users(
            fname=create_user_request.fname,
            lname=create_user_request.lname,
            email=create_user_request.email,
            username=create_user_request.username,
            password_hash=bcrypt_context.hash(create_user_request.password),
        )

        # Add to the database and commit
        db.add(create_user_model)
        db.commit()
        db.refresh(create_user_model)
        heading = "Welcome to Afiacare!"
        sub = "Complete your onboarding for a personalized experience."
        body = """
        <p>Thank you for joining Afiacare! We're excited to have you on board. You've created your account, and now you can complete your onboarding process to unlock the full benefits of Afiacare.</p>
        <h2>Why is onboarding important?</h2>
        <p>We ask for some information during onboarding to create a personalized experience just for you. This means:</p>
        <ul>
        <li><b>A tailored view:</b> We'll set up your dashboard to show the information most relevant to you.</li>
        <li><b>Easier access to help:</b> With complete information, doctors can understand your medical history better and provide the best possible care.</li>
        </ul>
        <h2>What if I don't complete onboarding?</h2>
        <p>While you can still use some features of Afiacare, there are some limitations without completing onboarding. For example, if you don't provide details about your parents, you won't be able to see your family medical history, which can be important for doctors.</p>
        <h2>Benefits of completing onboarding:</h2>
        <ul>
        <li>Get personalized medical advice based on your health profile.</li>
        <li>Allow doctors to understand your medical history for a more accurate diagnosis.</li>
        <li>Simplify the process of getting the help you need.</li>
        </ul>
        <p><b>Ready to get started?</b></p>
        <p>Head over to the Afiacare app and complete your onboarding process today! It's quick and easy.</p>

        """
        msg = custom_email(create_user_model.fname,heading,body)
        if send_new_email(create_user_model.email, sub, msg):
            # Return the created user data (optional)
            return create_user_request

    except Exception as e:
        # Log the error or handle it as needed
        print(f"Error occurred: {e}")
        # Rollback the transaction if an error occurs
        db.rollback()
        # Raise an appropriate HTTPException or handle it accordingly
        return HTTPException(status_code=500, detail="Internal server error")


# ------Login user and create token
@router.post("/login", response_model=Token)
async def login_for_access_token(form_data: FromData, db: db_dependency):
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No Account found with the given credentials",
        )

    token = create_access_token(
        user.username, user.id, user.acc_type, timedelta(minutes=60 * 24 * 30)
    )

    # Serialize the user object to match the ReturnUser schema
    user_info = ReturnUser.from_orm(user)

    return {"access_token": token, "token_type": "bearer", "UserInfo": user_info}


def authenticate_user(username: str, password: str, db):
    user = (
        db.query(userModels.Users)
        .filter(
            or_(
                userModels.Users.username == username,
                userModels.Users.email == username,
            )
        )
        .first()
    )
    if not user:
        return False
    if not bcrypt_context.verify(password, user.password_hash):
        return False
    return user


def create_access_token(
    username: str, user_id: int, acc_type: str, expires_delta: timedelta
):
    encode = {"uname": username, "id": user_id, "acc_type": acc_type}
    expires = datetime.utcnow() + expires_delta
    encode.update({"exp": expires})
    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)


async def get_current_user(token: Annotated[str, Depends(oauth2_bearer)]):
    try:
        playload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = playload.get("uname")
        acc_type: str = playload.get("acc_type")
        user_id: str = playload.get("id")
        if username is None or user_id is None or acc_type is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Authentication required!",
            )
        return {"username": username, "user_id": user_id, "acc_type": acc_type}
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication failed. Your token is invalid or has expired. Please re-authenticate.",
        )


@router.post("/google-auth", status_code=200, response_model=Token)
async def sign_up_with_google(
    create_user_request: CreateUserRequest,
    avatar: str,
    db: db_dependency,
):
    # Check if username or email already exists
    check_username = (
        db.query(Users).filter(Users.username == create_user_request.username).first()
    )
    check_email = (
        db.query(Users).filter(Users.email == create_user_request.email).first()
    )

    if check_email:  # if email exists, log the user into the system
        token = create_access_token(
            check_email.username,
            check_email.id,
            check_email.acc_type,
            timedelta(minutes=60 * 24 * 30),
        )

        # Serialize the user object to match the ReturnUser schema
        user_info = ReturnUser.from_orm(check_email)

        return {"access_token": token, "token_type": "bearer", "UserInfo": user_info}

    if check_username:
        raise HTTPException(status_code=400, detail="Username already taken")

    try:
        # Create the user model
        create_user_model = Users(
            fname=create_user_request.fname,
            lname=create_user_request.lname,
            email=create_user_request.email,
            username=create_user_request.username,
            avatar=avatar,
            email_confirm=True,
            password_hash=bcrypt_context.hash(create_user_request.password),
        )

        # Add to the database and commit
        db.add(create_user_model)
        db.commit()
        db.refresh(create_user_model)

        # Return the token of the created user
        token = create_access_token(
            create_user_model.username,
            create_user_model.id,
            create_user_model.acc_type,
            timedelta(minutes=60 * 24 * 30),
        )

        # Serialize the user object to match the ReturnUser schema
        user_info = ReturnUser.from_orm(create_user_model)
        heading = "Welcome to Afiacare!"
        sub = "Complete your onboarding for a personalized experience."
        body = """
        <p>Thank you for joining Afiacare! We're excited to have you on board. You've created your account, and now you can complete your onboarding process to unlock the full benefits of Afiacare.</p>
        <h2>Why is onboarding important?</h2>
        <p>We ask for some information during onboarding to create a personalized experience just for you. This means:</p>
        <ul>
        <li><b>A tailored view:</b> We'll set up your dashboard to show the information most relevant to you.</li>
        <li><b>Easier access to help:</b> With complete information, doctors can understand your medical history better and provide the best possible care.</li>
        </ul>
        <h2>What if I don't complete onboarding?</h2>
        <p>While you can still use some features of Afiacare, there are some limitations without completing onboarding. For example, if you don't provide details about your parents, you won't be able to see your family medical history, which can be important for doctors.</p>
        <h2>Benefits of completing onboarding:</h2>
        <ul>
        <li>Get personalized medical advice based on your health profile.</li>
        <li>Allow doctors to understand your medical history for a more accurate diagnosis.</li>
        <li>Simplify the process of getting the help you need.</li>
        </ul>
        <p><b>Ready to get started?</b></p>
        <p>Head over to the Afiacare app and complete your onboarding process today! It's quick and easy.</p>

        """
        msg = custom_email(user_info.fname,heading,body)
        if send_new_email(user_info.email, sub, msg):
            # Return the created user data (optional)
            return {"access_token": token, "token_type": "bearer", "UserInfo": user_info}

    except Exception as e:
        # Log the error or handle it as needed
        print(f"Error occurred: {e}")
        # Rollback the transaction if an error occurs
        db.rollback()
        # Raise an appropriate HTTPException or handle it accordingly
        raise HTTPException(status_code=500, detail="Internal server error")


@router.post("/google-auth-token", status_code=200, response_model=Token)
async def Create_Token_For_sign_up_with_google(
    Email: str,
    db: db_dependency,
):
    # Check if email already exists
    check_email = db.query(Users).filter(Users.email == Email).first()

    if not check_email:  # if email exists, log the user into the system
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No Account found with the given credentials",
        )

    token = create_access_token(
        check_email.username,
        check_email.id,
        check_email.acc_type,
        timedelta(minutes=60 * 24 * 30),
    )

    # Serialize the user object to match the ReturnUser schema
    user_info = ReturnUser.from_orm(check_email)
    # Return the created user data (optional)
    return {"access_token": token, "token_type": "bearer", "UserInfo": user_info}
