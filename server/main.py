from enum import Enum
from fastapi import FastAPI
from typing import Optional
from Endpoints import auth, apis
from fastapi import FastAPI

app = FastAPI()

# Include the routers from auth and apis
app.include_router(auth.router)
app.include_router(apis.router)


@app.get("/")
async def root():
    return {"message": "Hello World!"}
