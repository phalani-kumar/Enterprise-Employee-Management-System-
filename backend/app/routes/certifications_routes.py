from fastapi import APIRouter
from datetime import datetime

from app.models.certification_model import CertificationSchema
from app.database.certifications_db import (
    certifications,
    save_certifications
)
from app.database.audit_logs_db import add_audit_log

router = APIRouter()


# ===========================
# ADD CERTIFICATION
# ===========================

@router.post("/certifications")
def add_certification(data: CertificationSchema):

    # Certification Name Required
    if data.certification_name.strip() == "":
        return {
            "success": False,
            "message": "Certification Name is required"
        }

    # Duplicate Validation
    duplicate = next(

        (
            cert
            for cert in certifications

            if cert["employee_id"] == data.employee_id

            and cert["certification_name"].lower()
            == data.certification_name.lower()

            and cert["issuing_organization"].lower()
            == data.issuing_organization.lower()

        ),

        None

    )

    if duplicate:

        return {

            "success": False,

            "message":
            "Certification already exists"

        }

    # Date Validation

    if data.expiry_date:

        issue = datetime.strptime(
            data.issue_date,
            "%Y-%m-%d"
        )

        expiry = datetime.strptime(
            data.expiry_date,
            "%Y-%m-%d"
        )

        if expiry < issue:

            return {

                "success": False,

                "message":
                "Expiry Date cannot be earlier than Issue Date"

            }

    new_cert = {

        "id": len(certifications) + 1,

        "employee_id": data.employee_id,

        "company_id": data.company_id,

        "certification_name": data.certification_name,

        "issuing_organization": data.issuing_organization,

        "issue_date": data.issue_date,

        "expiry_date": data.expiry_date,

        "document_name": data.document_name,

        "created_at": str(datetime.now())

    }

    certifications.append(new_cert)

    save_certifications(certifications)

    add_audit_log(

        company_id=data.company_id,

        user_name=f"Employee {data.employee_id}",

        action="Certification Added",

        related_employee=data.certification_name

    )

    return {

        "success": True,

        "message": "Certification Added",

        "certification": new_cert

    }


# ===========================
# GET CERTIFICATIONS
# ===========================

@router.get("/certifications/{employee_id}")
def get_certifications(employee_id: int):

    return [

        cert

        for cert in certifications

        if cert["employee_id"] == employee_id

    ]


# ===========================
# UPDATE CERTIFICATION
# ===========================

@router.put("/certifications/{certification_id}")
def update_certification(

    certification_id: int,

    data: CertificationSchema

):

    if data.expiry_date:

        issue = datetime.strptime(

            data.issue_date,

            "%Y-%m-%d"

        )

        expiry = datetime.strptime(

            data.expiry_date,

            "%Y-%m-%d"

        )

        if expiry < issue:

            return {

                "success": False,

                "message":
                "Expiry Date cannot be earlier than Issue Date"

            }

    # Duplicate Validation

    for cert in certifications:

        if (

            cert["id"] != certification_id

            and cert["employee_id"] == data.employee_id

            and cert["certification_name"].lower()

            == data.certification_name.lower()

            and cert["issuing_organization"].lower()

            == data.issuing_organization.lower()

        ):

            return {

                "success": False,

                "message":
                "Duplicate Certification"

            }

    for cert in certifications:

        if cert["id"] == certification_id:

            cert["certification_name"] = data.certification_name

            cert["issuing_organization"] = data.issuing_organization

            cert["issue_date"] = data.issue_date

            cert["expiry_date"] = data.expiry_date

            cert["document_name"] = data.document_name

            save_certifications(certifications)

            add_audit_log(

                company_id=data.company_id,

                user_name=f"Employee {data.employee_id}",

                action="Certification Updated",

                related_employee=data.certification_name

            )

            return {

                "success": True,

                "message":
                "Certification Updated",

                "certification": cert

            }

    return {

        "success": False,

        "message":
        "Certification Not Found"

    }


# ===========================
# DELETE CERTIFICATION
# ===========================

@router.delete("/certifications/{certification_id}")
def delete_certification(certification_id: int):

    for cert in certifications:

        if cert["id"] == certification_id:

            certifications.remove(cert)

            save_certifications(certifications)

            add_audit_log(

                company_id=cert["company_id"],

                user_name=f"Employee {cert['employee_id']}",

                action="Certification Deleted",

                related_employee=cert["certification_name"]

            )

            return {

                "success": True,

                "message":
                "Certification Deleted"

            }

    return {

        "success": False,

        "message":
        "Certification Not Found"

    }