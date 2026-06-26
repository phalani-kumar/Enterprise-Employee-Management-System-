from fastapi import APIRouter
from datetime import datetime

from app.database.users_db import users
from app.database.audit_logs_db import (
    audit_logs,
    save_audit_logs
)

router = APIRouter()

@router.put("/suspend/{user_id}")
def suspend_user(data: dict, user_id: int):

    for user in users:

        if user["id"] == user_id:

            user["status"] = "Suspended"

            user["suspended_reason"] = data["reason"]

            user["suspended_by"] = data["admin_name"]

            user["suspended_date"] = str(
                datetime.now()
            )

            audit_logs.append({

                "company_id":
                user["company_id"],

                "user_name":
                data["admin_name"],

                "action":
                "User Suspended",

                "related_employee":
                user["name"],

                "timestamp":
                str(datetime.now())
            })

            save_audit_logs(audit_logs)

            return {
                "message":
                "User Suspended"
            }
        
@router.put("/reinstate/{user_id}")
def reinstate_user(
    user_id: int,
    admin_name: str
):

    for user in users:

        if user["id"] == user_id:

            user["status"] = "Active"

            audit_logs.append({

                "company_id":
                user["company_id"],

                "user_name":
                admin_name,

                "action":
                "User Reinstated",

                "related_employee":
                user["name"],

                "timestamp":
                str(datetime.now())
            })

            save_audit_logs(audit_logs)

            return {
                "message":
                "User Reinstated"
            }        