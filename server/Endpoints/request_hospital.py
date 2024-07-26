from fastapi import APIRouter, HTTPException, Depends
from starlette import status
from db.connection import db_dependency
from db.VerifyToken import user_dependency
from models.userModels import Users,Minister,Hospital
from schemas.schemas import RequestHospitalSchema,GetUserAdmin
from schemas.returnSchemas import UpdateHospitalSchema
from functions.send_mail import send_new_email
from emailsTemps.custom_email_send import custom_email

router = APIRouter(prefix="/hospital", tags=["Hospital Management"])


@router.post("/add", status_code=status.HTTP_201_CREATED, description="""
    This endpoint registers a new hospital after checking that the user doesn't already own a hospital and verifying the chosen minister is on the system.
    You need to provide the following data:
    ```
    {
       "hospital_type":"",
       "hospital_name":"",
       "hospital_address":"",
       "hospital_status":"",
       "hospital_prove":"",
       "insurance":"",
       "country":"",
       "ministerId":"",
   }
    ```
   After successful registration, the user will receive an email for request confirmation.
""")
async def request_hospital(
    request_hospital: RequestHospitalSchema, user: user_dependency, db: db_dependency
):
    if isinstance(user, HTTPException):
        raise user

    if not user or "user_id" not in user:
        raise HTTPException(status_code=401, detail="Authentication required")

    user_info = db.query(Users).filter(Users.id == user["user_id"]).first()
    if not user_info:
        raise HTTPException(status_code=404, detail="User Not Found")

    check_hosp = db.query(Hospital).filter(Hospital.OwnerId == user["user_id"]).first()
    if check_hosp:
        raise HTTPException(status_code=403, detail="You already registered a hospital")

    check_minister = db.query(Minister).filter(Minister.id == request_hospital.ministerId).first()
    if not check_minister:
        raise HTTPException(status_code=404, detail="Minister Not Found")

    hospital_request = Hospital(
        OwnerId=user["user_id"],
        hospital_type=request_hospital.hospital_type,
        hospital_name=request_hospital.hospital_name,
        hospital_address=request_hospital.hospital_address,
        hospital_status=False,
        hospital_prove=request_hospital.hospital_prove,
        insurance=request_hospital.insurance,
        country=request_hospital.country,
        ministerId=request_hospital.ministerId,
    )

    db.add(hospital_request)
    db.commit()
    db.refresh(hospital_request)

    heading = "Welcome to Afiacare Hospital Management!"
    sub = "Your Afiacare Hospital Request is Under Review"
    body = f"""
        <p>Thank you for choosing Afiacare to partner with your hospital! We appreciate your interest in joining our network.</p>

        <p>We have received your request to add <strong>{request_hospital.hospital_name}</strong> to the Afiacare platform. Your provided information is currently under review.</p>

        <h2>Hospital Request Summary</h2>
        <table border='1' style='border-collapse: collapse; border: 1px solid lightgray; width: 100%;'>
        <tr>
        <th style='padding:2px;text-align: left;'>Hospital Name</th>
        <td style='padding:2px'>{request_hospital.hospital_name}</td>
        </tr>
        <tr>
        <th style='padding:2px;text-align: left;'>Owner </th>
        <td style='padding:2px'>{user_info.fname} {user_info.lname}</td>
        </tr>
        <tr>
        <th style='padding:2px;text-align: left;'>Hospital Type</th>
        <td style='padding:2px'>{request_hospital.hospital_type}</td>
        </tr>
        <tr>
        <th style='padding:2px;text-align: left;'>Country</th>
        <td style='padding:2px'>{request_hospital.country}</td>
        </tr>
        <tr>
        <th style='padding:2px;text-align: left;'>Full Address</th>
        <td style='padding:2px'>{request_hospital.hospital_address}</td>
        </tr>
        </table>

        <p>We understand the importance of timely responses and will provide you with an update within 2-7 business days. If you have any questions or require further assistance, please don't hesitate to contact our support team.</p>

        <p>Thank you for your patience and continued interest in Afiacare.</p>   
    """
    msg = custom_email(user_info.fname, heading, body)
    send_new_email(user_info.email, sub, msg)
    return {"detail": "Hospital request submitted successfully"}

# View Hospital
@router.get("/view/{hospital_id}", description="View details of a specific hospital only Admin and Minister Can")
async def view_hospital(hospital_id: int, user: user_dependency, db: db_dependency):
    if isinstance(user, HTTPException):
        raise user
    if user["acc_type"] not in ["minister","admin"]:
        raise HTTPException(status_code=403, detail="You Are Not Allowed To Do This")
      
    hospital = db.query(Hospital).filter(Hospital.id == hospital_id).first()
    if not hospital:
        raise HTTPException(status_code=404, detail="Hospital Not Found")

    return hospital



# Update Hospital
@router.patch("/update/{hospital_id}", description="Update details of a specific hospital only Admin and The Specific Minister Choosed By user can")
async def update_hospital(
    hospital_id: int,
    update_data: GetUserAdmin,
    user: user_dependency,
    db: db_dependency
):
    if isinstance(user, HTTPException):
        raise user

    hospital = db.query(Hospital).filter(Hospital.id == hospital_id).first()
    if not hospital:
        raise HTTPException(status_code=404, detail="Hospital Not Found")
    if user["acc_type"] not in ["minister","admin"]:
        raise HTTPException(status_code=403, detail="You Are Not Allowed To Do This")
    
    # Fetch the user info to send email
    user_info = db.query(Users).filter(Users.id == hospital.OwnerId).first() # get user info
    if not user_info:
         raise HTTPException(status_code=404, detail="Failed To Get User Info")
    if user["acc_type"] in ["minister"]:
        approved_by = db.query(Minister).filter(Minister.OwnerId == hospital.ministerId).first() # get seted minister
        if not approved_by:
            raise HTTPException(status_code=404, detail="Failed To Get Minister Info")
            
        supposed_by = db.query(Users).filter(Users.id == user["user_id"]).first() # chek the logged in user
        if not supposed_by:
            raise HTTPException(status_code=404, detail="Failed To Get Minister All Info")
        
        if approved_by.country != supposed_by.country:
            raise HTTPException(status_code=403, detail="You Are Not Allowed To Do This")
     
    # Update hospital details based on provided data
    for key, value in update_data.dict(exclude_unset=True).items():
        setattr(hospital, key, value)

    db.commit()
    db.refresh(hospital)
    user_info.acc_type = "hospital"
    db.commit()
    
    heading = "Welcome to Afiacare Hospital Management!"
    sub = "Your Afiacare Hospital Request Has Been Approved!"  # Updated subject

    body = f"""
    <p>Dear {user_info.fname} {user_info.lname},</p>

    <p>We are pleased to inform you that your request to add <strong>{hospital.hospital_name}</strong> to the Afiacare platform has been reviewed and approved!</p>

    <p>Congratulations! Your hospital is now part of our growing network, and you can start offering your services to patients on the Afiacare platform.</p>

    <h2>Hospital Request Summary</h2>
    <table border='1' style='border-collapse: collapse; border: 1px solid lightgray; width: 100%;'>
    <tr>
        <th style='padding:2px;text-align: left;'>Hospital Name</th>
        <td style='padding:2px'>{hospital.hospital_name}</td>
    </tr>
    <tr>
        <th style='padding:2px;text-align: left;'>Owner </th>
        <td style='padding:2px'>{user_info.fname} {user_info.lname}</td>
    </tr>
    <tr>
        <th style='padding:2px;text-align: left;'>Hospital Type</th>
        <td style='padding:2px'>{hospital.hospital_type}</td>
    </tr>
    <tr>
        <th style='padding:2px;text-align: left;'>Country</th>
        <td style='padding:2px'>{hospital.country}</td>
    </tr>
    <tr>
        <th style='padding:2px;text-align: left;'>Full Address</th>
        <td style='padding:2px'>{hospital.hospital_address}</td>
    </tr>
    </table>

    <p>We look forward to a successful partnership with your hospital. To get started, please visit our Help Center for resources and instructions on onboarding your hospital and staff to the Afiacare platform.</p>

    <p>If you have any questions or require further assistance, please don't hesitate to contact our support team. We are here to help you every step of the way.</p>

    <p>Thank you for choosing Afiacare!</p>

    """

    msg = custom_email(user_info.fname, heading, body)
    send_new_email(user_info.email, sub, msg)
    return hospital


# Delete Hospital
@router.delete("/delete/{hospital_id}", status_code=status.HTTP_204_NO_CONTENT, description="Delete a specific hospital only Admin and Minister Can")
async def delete_hospital(hospital_id: int, user: user_dependency, db: db_dependency):
    if isinstance(user, HTTPException):
        raise user
    if user["acc_type"] not in ["minister","admin"]:
        raise HTTPException(status_code=403, detail="You Are Not Allowed To Do This")
      
    hospital = db.query(Hospital).filter(Hospital.id == hospital_id).first()
    if not hospital:
        raise HTTPException(status_code=404, detail="Hospital Not Found")

    db.delete(hospital)
    db.commit()
    return {"detail": "Hospital deleted successfully"}
# Update Hospital
@router.patch("/me/update/", description="Update details of a Logged in USer hospital ")
async def update_hospital_for_logged_in(
    update_data: UpdateHospitalSchema,
    user: user_dependency,
    db: db_dependency
):
    if isinstance(user, HTTPException):
        raise user

    hospital = db.query(Hospital).filter(Hospital.OwnerId == user["user_id"]).first()
    if not hospital:
        raise HTTPException(status_code=404, detail="Hospital Not Found")

    if update_data.hospital_status:
        raise HTTPException(status_code=403, detail="You Are Not Allowed To Change This")
    # Update hospital details based on provided data
    for key, value in update_data.dict(exclude_unset=True).items():
        setattr(hospital, key, value)

    db.commit()
    db.refresh(hospital)
    return hospital



# Delete Hospital
@router.delete("/me/delete/", status_code=status.HTTP_204_NO_CONTENT, description="Delete a specific hospital")
async def delete_hospital_for_logged_in( user: user_dependency, db: db_dependency):
    if isinstance(user, HTTPException):
        raise user

    hospital = db.query(Hospital).filter(Hospital.OwnerId == user["user_id"]).first()
    if not hospital:
        raise HTTPException(status_code=404, detail="Hospital Not Found")

    db.delete(hospital)
    db.commit()
    return {"detail": "Hospital deleted successfully"}

# View Hospital
@router.get("/me/view/", description="View details of a Logged in User hospital")
async def view_hospital_for_logged_in( user: user_dependency, db: db_dependency):
    if isinstance(user, HTTPException):
        raise user

    hospital = db.query(Hospital).filter(Hospital.OwnerId == user["user_id"]).first()
    if not hospital:
        raise HTTPException(status_code=404, detail="Hospital Not Found")

    return hospital

# View Hospital
@router.get("/all/", description="this Endpoint Is used To show all avaliable hospitals to user")
async def view_hospital_all( user: user_dependency, db: db_dependency):
    if isinstance(user, HTTPException):
        raise user

    hospital = db.query(Hospital).filter(Hospital.hospital_status == True).first()
    if not hospital:
        raise HTTPException(status_code=404, detail="Hospital Not Found")

    return hospital
