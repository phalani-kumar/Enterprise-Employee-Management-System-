from fastapi import APIRouter

from datetime import datetime,timedelta

from fastapi import Query

import uuid

from app.models.session_model import SessionSchema

from app.database.login_devices_db import (

    login_devices,

    save_login_devices

)

from app.database.audit_logs_db import (

    audit_logs,

    save_audit_logs

)

router = APIRouter()

def add_audit_log(

    company_id,

    user_name,

    action,

    device_name,

    browser,

    ip_address,

    session_id,

    performed_by

):

    audit_logs.append({

        "company_id": company_id,

        "user_name": user_name,

        "device_name": device_name,

        "browser": browser,

        "ip_address": ip_address,

        "session_identifier": session_id,

        "action": action,

        "performed_by": performed_by,

        "timestamp": str(datetime.now())

    })

    save_audit_logs(audit_logs)

SESSION_TIMEOUT = 30

def expire_sessions():

    current_time = datetime.now()

    updated = False

    for session in login_devices:

        if session["status"] != "Active":

            continue

        last_activity = datetime.fromisoformat(

            session["last_activity"]

        )

        difference = current_time - last_activity

        if difference > timedelta(

            minutes=SESSION_TIMEOUT

        ):

            session["status"] = "Expired"

            session["termination_reason"] = "Session Expired"

            add_audit_log(

                session["company_id"],
            
                session["user_name"],
            
                "Session Expired",
            
                session["device_name"],
            
                session["browser"],
            
                session["ip_address"],
            
                session["session_id"],
            
                "System"
            
            )

            updated = True

    if updated:

        save_login_devices(login_devices)

@router.post("/login-devices/session")
def create_session(data: SessionSchema):

    expire_sessions()

    if data.trusted:

        existing = next(
    
            (
    
                device
    
                for device in login_devices
    
                if (
    
                    device["user_id"] == data.user_id
    
                    and
    
                    device["device_name"] == data.device_name
    
                    and
    
                    device["trusted"]
    
                    and
    
                    device["status"] == "Active"
    
                )
    
            ),
    
            None
    
        )
    
        if existing:
    
            return {
    
                "message": "Trusted Device Already Exists"
    
            }
        

    session = {

        "session_id": str(uuid.uuid4()),

        "user_id": data.user_id,

        "company_id": data.company_id,

        "user_name": data.user_name,

        "email": data.email,

        "browser": data.browser,

        "ip_address": data.ip_address,

        "device_name": data.device_name,

        "login_time": str(datetime.now()),

        "last_activity": str(datetime.now()),

        "status": "Active",

        "trusted": data.trusted,

        "termination_reason": ""

    }

    login_devices.append(session)

    save_login_devices(login_devices)

    add_audit_log(

    session["company_id"],

    session["user_name"],

    "User Login",

    session["device_name"],

    session["browser"],

    session["ip_address"],

    session["session_id"],

    session["user_name"]

    )

    if session["trusted"]:
    
        add_audit_log(
    
            session["company_id"],
    
            session["user_name"],
    
            "Trusted Device Added",
    
            session["device_name"],
    
            session["browser"],
    
            session["ip_address"],
    
            session["session_id"],
    
            session["user_name"]
    
        )

    return session

@router.get("/login-devices/user/{company_id}/{user_id}")
def get_user_devices(

    company_id: int,

    user_id: int

):

    expire_sessions()

    return [

        device

        for device in login_devices

        if(

        device["company_id"] == company_id

        and

        device["user_id"] == user_id
        )
    ]

@router.get("/login-devices/company/{company_id}")
def get_company_devices(company_id: int):

    expire_sessions()

    return [

        device

        for device in login_devices

        if device["company_id"] == company_id

    ]

@router.put("/login-devices/logout/{session_id}")
def logout_device(

    session_id:str,

     user_id: int = Query(...)

):

    expire_sessions()

    for device in login_devices:

        if device["session_id"]==session_id:

            if device["user_id"] != user_id:

                return{

                    "message":"Unauthorized"

                }

            device["status"]="Logged Out"

            device["termination_reason"]="User Logout"

            save_login_devices(login_devices)

            return{

                "message":"Logged Out"

            }

    return{

        "message":"Session Not Found"

    }

@router.put("/login-devices/revoke/{session_id}")
def revoke_session(session_id: str):

    expire_sessions()

    for device in login_devices:

        if device["session_id"] == session_id:

            if device["status"] != "Active":
        
                return {
        
                    "message":
        
                    "Session Already Closed"
        
                }

            device["status"] = "Revoked"

            device["termination_reason"] = "Force Logout"

            add_audit_log(

                device["company_id"],
            
                device["user_name"],
            
                "Session Revoked",
            
                device["device_name"],
            
                device["browser"],
            
                device["ip_address"],
            
                device["session_id"],
            
                "Admin"
            
            )
            
            add_audit_log(
            
                device["company_id"],
            
                device["user_name"],
            
                "Force Logout Initiated",
            
                device["device_name"],
            
                device["browser"],
            
                device["ip_address"],
            
                device["session_id"],
            
                "Admin"
            
            )

            save_login_devices(login_devices)

            return {

                "message": "Session Revoked"

            }

    return {

        "message": "Session Not Found"

    }

@router.put("/login-devices/rename/{session_id}")
def rename_device(

    session_id: str,

    data: dict

):
    expire_sessions()

    for device in login_devices:

        if device["session_id"] == session_id:

            if device["user_id"] != data["user_id"]:

                return {

                    "message":

                    "Unauthorized"

                }
            if device["status"] != "Active":

                return {
            
                    "message": "Cannot Rename Closed Session"
            
                }

            device["device_name"] = data["device_name"]

            add_audit_log(

                device["company_id"],
            
                device["user_name"],
            
                "Trusted Device Renamed",
            
                device["device_name"],
            
                device["browser"],
            
                device["ip_address"],
            
                device["session_id"],
            
                device["user_name"]
            
            )

            save_login_devices(login_devices)

            return device

    return {

        "message": "Session Not Found"

    }

@router.delete("/login-devices/remove/{session_id}")
def remove_device(

    session_id: str,

    user_id: int = Query(...),
    current_session: str = Query(...)

):

    expire_sessions()

    print("session_id =", session_id)
    print("user_id =", user_id)
    print("current_session =", current_session)

    for device in login_devices:

        if device["session_id"] == session_id:

            if session_id == current_session:

                return {

                    "message": "Cannot Remove Current Device"

                }

            if device["user_id"] != user_id:

                return {

                    "message":

                    "Unauthorized"

                }
            
            add_audit_log(

                device["company_id"],
            
                device["user_name"],
            
                "Trusted Device Removed",
            
                device["device_name"],
            
                device["browser"],
            
                device["ip_address"],
            
                device["session_id"],
            
                device["user_name"]
            
            )

            login_devices.remove(device)

            save_login_devices(login_devices)

            return {

                "message":

                "Device Removed"

            }

    return {

        "message":

        "Session Not Found"

    }
@router.put("/login-devices/activity/{session_id}")
def update_activity(session_id: str):

    expire_sessions()

    for session in login_devices:

        if (

            session["session_id"] == session_id

            and

            session["status"] == "Active"

        ):

            session["last_activity"] = str(

                datetime.now()

            )

            save_login_devices(login_devices)

            return {

                "message": "Activity Updated"

            }

    return {

        "message": "Session Not Found"

    }

@router.get("/login-devices/current/{session_id}")
def get_current_session(session_id: str):

    expire_sessions()

    for device in login_devices:

        if device["session_id"] == session_id:

            return device

    return {

        "message": "Session Not Found"

    }

@router.put("/login-devices/logout-all/{user_id}/{current_session}")
def logout_all_devices(

    user_id: int,

    current_session: str

):
    
    expire_sessions()

    updated = False

    for device in login_devices:

        if (

            device["user_id"] == user_id

            and

            device["session_id"] != current_session

            and

            device["status"] == "Active"

        ):

            device["status"] = "Logged Out"

            device["termination_reason"] = "Logout All Devices"

            add_audit_log(

                device["company_id"],

                device["user_name"],

                "User Logout",

                device["device_name"],

                device["browser"],

                device["ip_address"],

                device["session_id"],

                device["user_name"]

            )

            updated = True

    if updated:

        save_login_devices(login_devices)

    return {

        "message": "Other Devices Logged Out"

    }

@router.get("/login-devices/search/{company_id}/{keyword}")
def search_devices(

    company_id: int,

    keyword: str

):

    keyword = keyword.lower()

    return [

        device

        for device in login_devices

        if (

            device["company_id"] == company_id

            and

            (

                keyword in device["user_name"].lower()

                or

                keyword in device["device_name"].lower()

            )

        )

    ]

@router.get("/login-devices/filter/{company_id}")
def filter_devices(

    company_id: int,

    browser: str = "",

    status: str = ""

):

    result = [

        device

        for device in login_devices

        if device["company_id"] == company_id

    ]

    if browser:

        result = [

            device

            for device in result

            if browser.lower()

            in device["browser"].lower()

        ]

    if status:

        result = [

            device

            for device in result

            if device["status"] == status

        ]

    return result

@router.get("/login-devices/history/{company_id}")
def session_history(company_id:int):

    return [

        session

        for session in login_devices

        if session["company_id"]==company_id

    ]

@router.put("/login-devices/revoke-multiple")
def revoke_multiple(data: dict):

    expire_sessions()

    session_ids = data["sessions"]

    updated = False

    for device in login_devices:

        if (
            device["session_id"] in session_ids
            and device["status"] == "Active"
        ):

            device["status"] = "Revoked"
            device["termination_reason"] = "Force Logout"

            add_audit_log(

                device["company_id"],

                device["user_name"],

                "Session Revoked",

                device["device_name"],

                device["browser"],

                device["ip_address"],

                device["session_id"],

                "Admin"

            )

            updated = True

    if updated:

        save_login_devices(login_devices)

    return {

        "message": "Selected Sessions Revoked"

    }    