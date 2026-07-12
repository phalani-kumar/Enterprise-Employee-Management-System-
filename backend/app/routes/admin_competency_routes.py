from fastapi import APIRouter, Query
from datetime import datetime

from app.database.skills_db import skills
from app.database.certifications_db import certifications
from app.database.users_db import users

router = APIRouter()


# ===========================================
# SEARCH EMPLOYEES BY SKILL
# ===========================================

@router.get("/admin/skills/search/{company_id}/{skill_name}")
def search_employees_by_skill(company_id: int, skill_name: str):

    employee_ids = []

    for skill in skills:

        if (
            skill["company_id"] == company_id
            and skill_name.lower() in skill["skill_name"].lower()
        ):

            employee_ids.append(skill["employee_id"])

    result = []

    for employee in users:

        if employee["id"] in employee_ids:

            employee_skills = [
                s for s in skills
                if s["employee_id"] == employee["id"]
            ]
            
            employee_certifications = [
                c for c in certifications
                if c["employee_id"] == employee["id"]
            ]
            
            today = datetime.now().date()
            
            primary_skills = [
                s["skill_name"]
                for s in employee_skills
                if s["primary_skill"]
            ]
            
            active = 0
            
            for cert in employee_certifications:
            
                if cert["expiry_date"]:
            
                    expiry = datetime.fromisoformat(
                        cert["expiry_date"]
                    ).date()
            
                    if expiry >= today:
                        active += 1
            
                else:
                    active += 1
            
            profile_completion = 0
            
            if len(employee_skills) > 0:
                profile_completion += 50
            
            if len(employee_certifications) > 0:
                profile_completion += 50
            
            result.append({
            
                "employee_id": employee["id"],
            
                "employee_name": employee["name"],
            
                "total_skills": len(employee_skills),
            
                "primary_skills": primary_skills,
            
                "total_certifications": len(employee_certifications),
            
                "active_certifications": active,
            
                "profile_completion": profile_completion
            
            })

    return result


# ===========================================
# FILTER EMPLOYEES
# ===========================================

@router.get("/admin/skills/filter/{company_id}")
def filter_employees(

    company_id: int,

    skill: str = Query(""),

    level: str = Query(""),

    experience: int = Query(None),

    certification_status: str = Query("")

):

    results = []

    for employee in users:

        if employee["company_id"] != company_id:
            continue

        employee_skills = [

            s for s in skills

            if (
                s["employee_id"] == employee["id"]
                and s["company_id"] == company_id
            )
        ]

        employee_certifications = [

            c for c in certifications

            if (
                c["employee_id"] == employee["id"]
                and c["company_id"] == company_id
            )
        ]

        # -----------------------
        # Skill Filter
        # -----------------------

        if skill:

            if not any(
                skill.lower() in s["skill_name"].lower()
                for s in employee_skills
            ):
                continue

        # -----------------------
        # Level Filter
        # -----------------------

        if level:

            if not any(
                s["proficiency_level"] == level
                for s in employee_skills
            ):
                continue

        # -----------------------
        # Experience Filter
        # -----------------------

        if experience is not None:

            if not any(
                s["years_of_experience"] >= experience
                for s in employee_skills
            ):
                continue

        # -----------------------
        # Certification Status
        # -----------------------

        if certification_status:

            found = False

            today = datetime.now().date()

            for cert in employee_certifications:

                if not cert["expiry_date"]:
                    continue

                expiry = datetime.fromisoformat(
                    cert["expiry_date"]
                ).date()

                days = (expiry - today).days

                status = "Valid"

                if days < 0:
                    status = "Expired"

                elif days <= 30:
                    status = "Expiring Soon"

                if status == certification_status:

                    found = True

            if not found:
                continue

        today = datetime.now().date()

        primary_skills = [
            s["skill_name"]
            for s in employee_skills
            if s["primary_skill"]
        ]
        
        active = 0
        
        for cert in employee_certifications:
        
            if cert["expiry_date"]:
        
                expiry = datetime.fromisoformat(
                    cert["expiry_date"]
                ).date()
        
                if expiry >= today:
                    active += 1
        
            else:
                active += 1
        
        profile_completion = 0
        
        if len(employee_skills) > 0:
            profile_completion += 50
        
        if len(employee_certifications) > 0:
            profile_completion += 50
        
        results.append({
        
            "employee_id": employee["id"],
        
            "employee_name": employee["name"],
        
            "total_skills": len(employee_skills),
        
            "primary_skills": primary_skills,
        
            "total_certifications": len(employee_certifications),
        
            "active_certifications": active,
        
            "profile_completion": profile_completion
        
        })
    return results


# ===========================================
# EMPLOYEE COMPETENCY PROFILE
# ===========================================

@router.get("/admin/skills/profile/{employee_id}")
def competency_profile(employee_id: int):

    employee = next(

        (
            emp
            for emp in users
            if emp["id"] == employee_id
        ),

        None

    )

    if not employee:

        return {

            "message": "Employee Not Found"

        }

    employee_skills = [

        s

        for s in skills

        if s["employee_id"] == employee_id

    ]

    employee_certifications = [

        c

        for c in certifications

        if c["employee_id"] == employee_id

    ]

    primary_skills = [

        s

        for s in employee_skills

        if s["primary_skill"]

    ]

    today = datetime.now().date()

    active = 0

    expired = 0

    for cert in employee_certifications:

        if not cert["expiry_date"]:

            active += 1

            continue

        expiry = datetime.fromisoformat(

            cert["expiry_date"]

        ).date()

        if expiry >= today:

            active += 1

        else:

            expired += 1

    profile_completion = 0

    if len(employee_skills) > 0:

        profile_completion += 50

    if len(employee_certifications) > 0:

        profile_completion += 50

    return {

        "employee": employee,

        "skills": employee_skills,

        "primary_skills": primary_skills,

        "certifications": employee_certifications,

        "total_skills": len(employee_skills),

        "active_certifications": active,

        "expired_certifications": expired,

        "profile_completion": profile_completion

    }


# ===========================================
# EXPORT REPORT
# ===========================================

@router.get("/admin/skills/export/{company_id}")
def export_competency(company_id: int):

    report = []

    for employee in users:

        if employee["company_id"] != company_id:

            continue

        employee_skills = [

            s["skill_name"]

            for s in skills

            if s["employee_id"] == employee["id"]

        ]

        employee_certifications = [

            c["certification_name"]

            for c in certifications

            if c["employee_id"] == employee["id"]

        ]

        report.append({

            "employee": employee["name"],

            "skills": employee_skills,

            "certifications": employee_certifications

        })

    return report