from fastapi import APIRouter

from datetime import datetime

from app.database.user_activity_db import (
    user_activity,
    save_activity
)

from app.database.audit_logs_db import (
    audit_logs,
    save_audit_logs
)

from fastapi import Request

router = APIRouter()

@router.post("/activity/login")
def login_activity(
    data: dict,
    request: Request
    ):

    client_ip = request.client.host

    existing = next(

        (
            item
            for item in user_activity

            if item["user_id"]
            == data["user_id"]
        ),

        None
    )

    browser_changed = False
    ip_changed = False

    if existing:

        if existing["browser"] != data["browser"]:

            browser_changed = True

        if existing["ip_address"] != client_ip:

            ip_changed = True

        existing["last_login"] = str(datetime.now())

        existing["browser"] = data["browser"]

        existing["ip_address"] = client_ip

    else:

        user_activity.append({

            "user_id":
            data["user_id"],

            "company_id":
            data["company_id"],

            "user_name":
            data["user_name"],

            "email":
            data["email"],

            "last_login":
            str(datetime.now()),

            "last_logout":
            "",

            "browser":
            data["browser"],

            "ip_address":
            client_ip
        })

    save_activity(user_activity)

    audit_logs.append({

        "company_id":
        data["company_id"],

        "user_name":
        data["user_name"],

        "action":
        "User Login",

        "related_employee":
        data["user_name"],

        "timestamp":
        str(datetime.now())

    })

    if browser_changed:

        audit_logs.append({

            "company_id":
            data["company_id"],

            "user_name":
            data["user_name"],

            "action":
            "New Device Detected",

            "related_employee":
            data["user_name"],

            "timestamp":
            str(datetime.now())

        })

    if ip_changed:

        audit_logs.append({

            "company_id":
            data["company_id"],

            "user_name":
            data["user_name"],

            "action":
            "New IP Address Detected",

            "related_employee":
            data["user_name"],

            "timestamp":
            str(datetime.now())

        })

    save_audit_logs(audit_logs)

    return {
        "message":
        "Login tracked"
    }


@router.post("/activity/logout")
def logout_activity(data: dict):

    for item in user_activity:

        if item["user_id"] == data["user_id"]:

            item["last_logout"] = str(datetime.now())

            save_activity(user_activity)

            audit_logs.append({

                "company_id":
                data["company_id"],

                "user_name":
                data["user_name"],

                "action":
                "User Logout",

                "related_employee": 
                data["user_name"],

                "timestamp":
                str(datetime.now())

            })

            save_audit_logs(audit_logs)

            return {
                "message":
                "Logout tracked"
            }

    return {
        "message":
        "User not found"
    }


@router.get("/activity/{company_id}")
def get_company_activity(company_id: int):

    return [

        item

        for item in user_activity

        if item["company_id"]
        == company_id

    ]