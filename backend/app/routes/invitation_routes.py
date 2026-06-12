from fastapi import APIRouter
from uuid import uuid4

from app.models.invitation_model import InvitationSchema
from app.database.invitations_db import (invitations, save_invitations)

router = APIRouter()

# CREATE INVITATION

@router.post("/invitations")
def create_invitation(data: InvitationSchema):

    invitation = {

"id": max(
    [invite["id"] for invite in invitations],
    default=0
) + 1,
        "email": data.email,

        "role": data.role,

        "company_id": data.company_id,

        "company_name": data.company_name,

        "status": "Pending",

        "token": str(uuid4())
    }

    invitations.append(invitation)

    save_invitations(invitations)

    return invitation


# COMPANY INVITATIONS

@router.get("/invitations/{company_id}")
def get_company_invitations(company_id: int):

    return [

        invite

        for invite in invitations

        if invite["company_id"] == company_id
        and invite["status"] == "Pending"
    ]


# TOKEN LOOKUP

@router.get("/invitation/{token}")
def get_invitation(token: str):

    for invitation in invitations:

        if invitation["token"] == token:

            return {
                "email":
                    invitation["email"],

                "role":
                    invitation["role"],

                "company_name":
                    "Company A"
                    if invitation["company_id"] == 1
                    else "Company B"
            }

    return {
        "message":
        "Invitation Not Found"
    }

# REVOKE

@router.put("/invitations/{invite_id}/revoke")
def revoke_invitation(invite_id: int):

    for invite in invitations:

        if invite["id"] == invite_id:

            invite["status"] = "Revoked"

            save_invitations(invitations)

            return invite

    return {"message": "Not Found"}