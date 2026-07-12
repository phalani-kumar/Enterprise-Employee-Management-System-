from fastapi import APIRouter
from datetime import datetime

from app.database.users_db import users
from app.database.certifications_db import certifications

router = APIRouter()


# ============================================================
# EMPLOYEE CERTIFICATION NOTIFICATIONS
# ============================================================

@router.get("/notifications/certifications/{employee_id}")
def employee_notifications(employee_id: int):

    today = datetime.now().date()

    expiring_soon = []
    expired = []

    for cert in certifications:

        if cert["employee_id"] != employee_id:
            continue

        if cert["expiry_date"] == "":
            continue

        expiry = datetime.fromisoformat(
            cert["expiry_date"]
        ).date()

        days = (expiry - today).days

        notification = {

            "id": cert["id"],
            "certification_name": cert["certification_name"],
            "expiry_date": cert["expiry_date"],
            "days_remaining": days

        }

        if days < 0:

            expired.append(notification)

        elif days <= 30:

            expiring_soon.append(notification)

    return {

        "expiring_soon": expiring_soon,
        "expired": expired

    }


# ============================================================
# COMPANY NOTIFICATIONS (ADMIN)
# ============================================================

@router.get("/notifications/company/{company_id}")
def company_notifications(company_id: int):

    today = datetime.now().date()

    expiring_soon = []
    expired = []

    for cert in certifications:

        if cert["company_id"] != company_id:
            continue

        employee = next(

            (
                user
                for user in users
                if user["id"] == cert["employee_id"]
            ),

            None

        )

        if cert["expiry_date"] == "":
            continue

        expiry = datetime.fromisoformat(
            cert["expiry_date"]
        ).date()

        days = (expiry - today).days

        notification = {

            "employee_name": employee["name"] if employee else "",
            "employee_id": cert["employee_id"],
            "certification_name": cert["certification_name"],
            "expiry_date": cert["expiry_date"],
            "days_remaining": days

        }

        if days < 0:

            expired.append(notification)

        elif days <= 30:

            expiring_soon.append(notification)

    return {

        "expiring_soon": expiring_soon,
        "expired": expired

    }


# ============================================================
# EMPLOYEE NOTIFICATION COUNT
# ============================================================

@router.get("/notifications/count/{employee_id}")
def employee_notification_count(employee_id: int):

    today = datetime.now().date()

    count = 0

    for cert in certifications:

        if cert["employee_id"] != employee_id:
            continue

        if cert["expiry_date"] == "":
            continue

        expiry = datetime.fromisoformat(
            cert["expiry_date"]
        ).date()

        days = (expiry - today).days

        if days <= 30:

            count += 1

    return {

        "count": count

    }


# ============================================================
# ADMIN NOTIFICATION COUNT
# ============================================================

@router.get("/notifications/admin-count/{company_id}")
def admin_notification_count(company_id: int):

    today = datetime.now().date()

    count = 0

    for cert in certifications:

        if cert["company_id"] != company_id:
            continue

        if cert["expiry_date"] == "":
            continue

        expiry = datetime.fromisoformat(
            cert["expiry_date"]
        ).date()

        days = (expiry - today).days

        if days <= 30:

            count += 1

    return {

        "count": count

    }