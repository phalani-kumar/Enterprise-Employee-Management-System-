from fastapi import APIRouter
from datetime import datetime

from app.database.users_db import users
from app.database.skills_db import skills
from app.database.certifications_db import certifications

router = APIRouter()


# ======================================================
# EMPLOYEE DASHBOARD SUMMARY
# ======================================================

@router.get("/dashboard/employee-summary/{employee_id}")
def employee_dashboard_summary(employee_id: int):

    employee_skills = [
        s for s in skills
        if s["employee_id"] == employee_id
    ]

    employee_certifications = [
        c for c in certifications
        if c["employee_id"] == employee_id
    ]

    total_skills = len(employee_skills)

    primary_skills = len([
        s for s in employee_skills
        if s["primary_skill"]
    ])

    today = datetime.now().date()

    active_certifications = 0
    expired_certifications = 0

    for cert in employee_certifications:

        if cert["expiry_date"] == "":
            active_certifications += 1
            continue

        expiry = datetime.fromisoformat(
            cert["expiry_date"]
        ).date()

        if expiry >= today:
            active_certifications += 1
        else:
            expired_certifications += 1

    profile_completion = 0

    if total_skills > 0:
        profile_completion += 50

    if len(employee_certifications) > 0:
        profile_completion += 50

    return {

        "total_skills": total_skills,

        "primary_skills": primary_skills,

        "active_certifications": active_certifications,

        "expired_certifications": expired_certifications,

        "profile_completion": profile_completion

    }


# ======================================================
# ADMIN DASHBOARD SUMMARY
# ======================================================

@router.get("/dashboard/admin-summary/{company_id}")
def admin_dashboard_summary(company_id: int):

    company_employees = [

        emp

        for emp in users

        if emp["company_id"] == company_id

    ]

    total_employees = len(company_employees)

    employee_ids = [

        emp["id"]

        for emp in company_employees

    ]

    employees_with_skills = len(set([

        s["employee_id"]

        for s in skills

        if s["company_id"] == company_id

    ]))

    employees_with_certifications = len(set([

        c["employee_id"]

        for c in certifications

        if c["company_id"] == company_id

    ]))

    today = datetime.now().date()

    expired = 0
    expiring_soon = 0
    active = 0

    for cert in certifications:

        if cert["company_id"] != company_id:
            continue

        if cert["expiry_date"] == "":
            active += 1
            continue

        expiry = datetime.fromisoformat(
            cert["expiry_date"]
        ).date()

        days = (expiry - today).days

        if days < 0:
            expired += 1

        elif days <= 30:
            expiring_soon += 1

        else:
            active += 1

    return {

        "total_employees": total_employees,

        "employees_with_skills": employees_with_skills,

        "employees_with_certifications": employees_with_certifications,

        "active_certifications": active,

        "expired_certifications": expired,

        "expiring_soon": expiring_soon

    }


# ======================================================
# TOP SKILLS
# ======================================================

@router.get("/dashboard/top-skills/{company_id}")
def top_skills(company_id: int):

    counter = {}

    for skill in skills:

        if skill["company_id"] != company_id:
            continue

        name = skill["skill_name"]

        if name not in counter:
            counter[name] = 0

        counter[name] += 1

    result = []

    for name, count in counter.items():

        result.append({

            "skill": name,

            "count": count

        })

    result.sort(

        key=lambda x: x["count"],

        reverse=True

    )

    return result[:10]