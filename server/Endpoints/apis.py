from fastapi import APIRouter,FastAPI, HTTPException
from db.connection import db_dependency
from db.VerifyToken import user_dependency
from models.userModels import Users

router = APIRouter(prefix="/apis", tags=["apis"])
@router.get("/")
async def get_all(user:user_dependency):
    pass