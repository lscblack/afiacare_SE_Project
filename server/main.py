from enum import Enum
from fastapi import FastAPI
from typing import Optional
from Endpoints import auth, apis
from fastapi import FastAPI

app = FastAPI(
    title="AfiaCare Api Documentaion",  # Replace with your desired title
    description="Afiacare aims to revolutionize healthcare management in Cameroon by providing a comprehensive digital platform. This platform will address common issues like data mismanagement, donor matching, and information sharing between hospitals. By leveraging technology, Afiacare will enhance the accuracy, efficiency, and accessibility of healthcare services.",
)

# Include the routers from auth and apis
app.include_router(auth.router)
app.include_router(apis.router)


@app.get("/")
async def root():
    return {"message": "Hello World!"}
