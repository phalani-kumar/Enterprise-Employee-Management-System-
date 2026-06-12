from fastapi import APIRouter

from app.database.users_db import (
    users,
    save_users
)
from fastapi import Body

from datetime import datetime

from app.database.audit_logs_db import (
    audit_logs,
    save_audit_logs
)

member_router = APIRouter()

@member_router.get("/members/{company_id}")
def get_members(company_id: int):

    return [

        user

        for user in users

        if user["company_id"] == company_id
    ]

@member_router.put(
    "/members/{user_id}/deactivate"
)
def deactivate_user(
    user_id: int,
    data: dict = Body(...)
):

    for user in users:

        if user["id"] == user_id:

            user["status"] = "Deactivated"

            user["deactivated_by"] = data["admin_name"]

            user["deactivation_reason"] = (
                "Account disabled by administrator"
            )

            save_users(users)

            # AUDIT LOG
            audit_logs.append({

                "user_name": data["admin_name"],

                "company_id": user["company_id"],

                "action": "User Deactivated",

                "related_employee": user["name"],

                "timestamp": str(datetime.now())

            })

            save_audit_logs(audit_logs)

            return {

                "message":
                "User Deactivated"
            }

    return {

        "message":
        "User Not Found"
    }

@member_router.put(
    "/members/{user_id}/activate"
)
def activate_user(user_id: int):

    for user in users:

        if user["id"] == user_id:

            user["status"] = "Active"

            save_users(users)

            # AUDIT LOG
            audit_logs.append({

                "user_name": user["name"],

                "company_id": user["company_id"],

                "action": "User Activated",

                "related_employee": user["name"],

                "timestamp": str(datetime.now())

            })

            save_audit_logs(audit_logs)

            return {

                "message":
                "User Activated"
            }

    return {

        "message":
        "User Not Found"
    }