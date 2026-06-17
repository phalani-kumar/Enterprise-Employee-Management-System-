from fastapi import APIRouter

from datetime import datetime

from app.database.leave_requests_db import (
    leave_requests,
    save_leave_requests
)

from app.database.audit_logs_db import (
    audit_logs,
    save_audit_logs
)

router = APIRouter()

def add_audit_log(

    company_id,
    user_name,
    action

):
    print(
        "AUDIT LOG CREATED:",
        company_id,
        user_name,
        action
    )

    audit_logs.append({

        "company_id":
        company_id,

        "user_name":
        user_name,

        "action":
        action,

        "related_employee":
        "",

        "timestamp":
        str(datetime.now())

    })

    save_audit_logs(
        audit_logs
    )

@router.post("/leave/request")
def submit_leave(data: dict):

    print("LEAVE REQUEST API HIT")

    leave = {

        "id":
        len(leave_requests) + 1,

        "user_id":
        data["user_id"],

        "user_name":
        data["user_name"],

        "company_id":
        data["company_id"],

        "leave_type":
        data["leave_type"],

        "from_date":
        data["from_date"],

        "to_date":
        data["to_date"],

        "reason":
        data["reason"],

        "status":
        "Pending",

        "timestamp":
        str(datetime.now())
    }

    leave_requests.append(leave)

    save_leave_requests(
        leave_requests
    )

    add_audit_log(

        data["company_id"],

        data["user_name"],

        "Leave Request Submitted"
    )

    return leave

@router.get(
    "/leave/company/{company_id}"
)
def get_company_leaves(
    company_id: int
):

    return [

        leave

        for leave in leave_requests

        if leave["company_id"]
        == company_id

    ]

@router.put(
    "/leave/{leave_id}/approve"
)
def approve_leave(
    leave_id: int
):

    for leave in leave_requests:

        if leave["id"] == leave_id:

            leave["status"] = "Approved"

            save_leave_requests(
                leave_requests
            )

            add_audit_log(

              leave["company_id"],
          
              leave["user_name"],
          
              "Leave Request Approved"
            )

            return {
                "message":
                "Approved"
            }
        
@router.put(
    "/leave/{leave_id}/reject"
)
def reject_leave(
    leave_id: int
):

    for leave in leave_requests:

        if leave["id"] == leave_id:

            leave["status"] = "Rejected"

            save_leave_requests(
                leave_requests
            )

            add_audit_log(

              leave["company_id"],
          
              leave["user_name"],
          
              "Leave Request Rejected"
            )

            return {
                "message":
                "Rejected"
            }        