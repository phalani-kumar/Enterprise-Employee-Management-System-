from fastapi import APIRouter

from datetime import datetime

from app.database.audit_logs_db import (
    audit_logs,
    save_audit_logs
)

from app.database.reactivation_requests_db import (
    reactivation_requests
)

from app.database.users_db import users

router = APIRouter()

@router.post("/reactivation-request")
def create_request(data: dict):

    request = {

        "id": len(reactivation_requests) + 1,

        "user_id": data["user_id"],

        "user_email": data["user_email"],

        "company_id": data["company_id"],

        "message": data["message"],

        "status": "Pending"
    }

    reactivation_requests.append(request)

    # AUDIT LOG

    audit_logs.append({

        "user_name": data["user_email"],

        "company_id": data["company_id"],

        "action": "Reactivation Request Submitted",

        "related_employee": data["user_email"],

        "timestamp": str(datetime.now())

    })

    save_audit_logs(audit_logs)

    return request


@router.get(
"/reactivation-request/{company_id}"
)
def get_requests(
    company_id: int
):

    return [

        request

        for request in
        reactivation_requests

        if request["company_id"]
        == company_id
    ]


@router.put(
"/reactivation/{request_id}/approve"
)
def approve_request(
    request_id: int
):

    for request in reactivation_requests:

        if request["id"] == request_id:

            request["status"] = (
                "Approved"
            )

            for user in users:

                if (
                    user["id"]
                    ==
                    request["user_id"]
                ):

                    user["status"] = (
                        "Active"
                    )
                    audit_logs.append({

                       "user_name": "Admin",
                   
                       "company_id": user["company_id"],
                   
                       "action": "Reactivation Approved",
                   
                       "related_employee": user["email"],
                   
                       "timestamp": str(datetime.now())

                    })

                    save_audit_logs(audit_logs)

            return {
                "message":
                "Approved"
            }


@router.put(
"/reactivation/{request_id}/reject"
)
def reject_request(
    request_id: int
):

    for request in reactivation_requests:

        if request["id"] == request_id:

            request["status"] = (
                "Rejected"
            )

            audit_logs.append({

                "user_name": "Admin",
            
                "company_id": request["company_id"],
            
                "action": "Reactivation Rejected",
            
                "related_employee": request["user_email"],
            
                "timestamp": str(datetime.now())
            
            })
            
            save_audit_logs(audit_logs)

            return {
                "message":
                "Rejected"
            }