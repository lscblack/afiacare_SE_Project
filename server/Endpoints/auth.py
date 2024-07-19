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

from schemas.schemas import CreateUserRequest, Token,FromData

from dotenv import load_dotenv
import os
# Load environment variables from .env file
load_dotenv()

router = APIRouter(prefix="/auth", tags=["Authentication"])

#load env values
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

# setup token gen and pass encrpty 
bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_bearer = OAuth2PasswordBearer(tokenUrl="auth/token")


#handel register User
@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register_user(db: db_dependency, create_user_request: CreateUserRequest):
    try:
        # Check if username or email already exists
        check_username = db.query(Users).filter(Users.username == create_user_request.username).first()
        check_email = db.query(Users).filter(Users.email == create_user_request.email).first()

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
async def login_for_access_token(form_data:FromData, db: db_dependency):
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="No Account found with the given credentials"
        )
    token = create_access_token(user.username, user.id, user.acc_type, timedelta(minutes=60*24*30))

    return {"access_token": token, "token_type": "bearer"}


def authenticate_user(username: str, password: str, db):
    user = db.query(userModels.Users).filter(userModels.Users.username == username).first()
    if not user:
        return False
    if not bcrypt_context.verify(password, user.password_hash):
        return False
    return user

def create_access_token(username:str, user_id:int,acc_type:str,expires_delta:timedelta):
    encode = {'uname':username,'id':user_id,'acc_type':acc_type}
    expires = datetime.utcnow()+expires_delta
    encode.update({'exp':expires})
    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)
    

async def get_current_user(token: Annotated[str, Depends(oauth2_bearer)]):
    try:
        playload = jwt.decode(token,SECRET_KEY, algorithms=[ALGORITHM])
        username:str = playload.get('uname')
        acc_type:str = playload.get('acc_type')
        user_id:str = playload.get('id')
        if username is None or user_id is None or acc_type is None:
            return HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail ="Authentication required!")
        return {"username":username, "user_id":user_id, 'acc_type':acc_type}
    except JWTError:
        return HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication failed. Your token is invalid or has expired. Please re-authenticate.")
        