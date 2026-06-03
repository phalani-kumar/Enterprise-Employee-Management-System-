from fastapi import APIRouter

from app.database.role_request_db import role_requests

from app.database.users_db import users

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

    role_request = {

        "id":
        len(role_requests) + 1,

        "user_name":
        request.user_name,

        "user_email":
        request.user_email,

        "admin_email":
        request.admin_email,

        "requested_role":
        request.requested_role,

        "status":
        "Pending"
    }

    role_requests.append(
        role_request
    )

    return {

        "message":
        "Role Change Request Submitted",

        "request":
        role_request
    }


# GET ALL REQUESTS

@role_request_router.get(
    "/role-request"
)
def get_requests():

    return role_requests


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

            for user in users:

                if (
                    user["email"]
                    ==
                    request["user_email"]
                ):

                    user["role"] = "Admin"

                    break

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

            return {

                "message":
                "Request Rejected"
            }

    return {

        "message":
        "Request Not Found"
    }