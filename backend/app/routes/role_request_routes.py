from fastapi import APIRouter

from app.database.role_request_db import role_requests

from app.database.users_db import users

from app.database.audit_logs_db import (
    audit_logs,
    save_audit_logs
)

from datetime import datetime

from app.models.role_request_model import (
    RoleRequestSchema
)

role_request_router = APIRouter()


# CREATE REQUEST

@role_request_router.post(
    "/role-request"
)
def create_request(
    request: RoleRequestSchema
):

    user_company_id = None

    for user in users:

     if user["email"] == request.user_email:

        user_company_id = user["company_id"]

        break

    role_request = {
    "id": len(role_requests) + 1,
    "user_name": request.user_name,
    "user_email": request.user_email,
    "admin_email": request.admin_email,
    "requested_role": request.requested_role,
    "status": "Pending",
    "company_id": user_company_id
}

    role_requests.append(
        role_request
    )

    user_company_id = None
    for user in users:
    
      if user["email"] == request.user_email:
    
            user_company_id = user["company_id"]
    
            break

    audit_logs.append({
    "user_name": request.user_name,
    "company_id": user_company_id,
    "action": "Role Change Requested",
    "related_employee": request.user_name,
    "timestamp": str(datetime.now())
})
    
    save_audit_logs(audit_logs)

    return {

        "message":
        "Role Change Request Submitted",

        "request":
        role_request
    }


# GET ALL REQUESTS

@role_request_router.get("/role-request/{company_id}")
def get_requests(company_id: int):

    return [

        request

        for request in role_requests

        if request.get("company_id") == company_id
    ]


# APPROVE REQUEST

@role_request_router.put(
    "/role-request/{request_id}/approve"
)
def approve_request(
    request_id: int
):

    for request in role_requests:

        if request["id"] == request_id:

            request["status"] = "Approved"

            # UPDATE USER ROLE

            user_company_id = None
            for user in users:

                if user["email"] == request["user_email"]:
                   user_company_id = user["company_id"]
                   break

        audit_logs.append({
            "user_name":
                "Admin A"
                if request["admin_email"] == "admina@gmail.com"
                else "Admin B",
            "company_id": user_company_id,    
            "action": "Role Change Approved",
            "related_employee": request["user_name"],
            "timestamp": str(datetime.now())
        })

        save_audit_logs(audit_logs)

        return {

                "message":
                "Request Approved",

                "user_role":
                "Admin"
        }

    return {

        "message":
        "Request Not Found"
    }

# REJECT REQUEST

@role_request_router.put(
    "/role-request/{request_id}/reject"
)
def reject_request(
    request_id: int
):

    for request in role_requests:

        if request["id"] == request_id:

            request["status"] = "Rejected"
            user_company_id = None

            for user in users:
            
                if user["email"] == request["user_email"]:
            
                    user_company_id = user["company_id"]
            
                    break
            
            audit_logs.append({
                "user_name":
                    "Admin A"
                    if request["admin_email"] == "admina@gmail.com"
                    else "Admin B",
    "company_id": user_company_id,                
    "action": "Role Change Rejected",
    "related_employee": request["user_name"],
    "timestamp": str(datetime.now())
})
            
            save_audit_logs(audit_logs)
            
            return {

                "message":
                "Request Rejected"
            }

    return {

        "message":
        "Request Not Found"
    }