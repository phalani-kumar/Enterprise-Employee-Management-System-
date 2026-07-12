from fastapi import APIRouter
from datetime import datetime

from app.models.skill_model import SkillSchema
from app.database.skills_db import skills, save_skills
from app.database.audit_logs_db import add_audit_log

router = APIRouter()


# ==========================
# ADD SKILL
# ==========================

@router.post("/skills")
def add_skill(data: SkillSchema):

    # Skill Name Mandatory
    if data.skill_name.strip() == "":
        return {
            "success": False,
            "message": "Skill Name is required"
        }

    # Experience Validation
    if data.years_of_experience < 0:
        return {
            "success": False,
            "message": "Experience cannot be negative"
        }

    # Duplicate Validation
    duplicate = next(

        (
            skill
            for skill in skills

            if skill["employee_id"] == data.employee_id
            and skill["skill_name"].lower() == data.skill_name.lower()

        ),

        None

    )

    if duplicate:

        return {

            "success": False,

            "message": "Skill already exists"

        }

    # Only One Primary Skill
    if data.primary_skill:

        for skill in skills:

            if skill["employee_id"] == data.employee_id:

                skill["primary_skill"] = False

    new_skill = {

        "id": len(skills) + 1,

        "employee_id": data.employee_id,

        "company_id": data.company_id,

        "skill_name": data.skill_name,

        "proficiency_level": data.proficiency_level,

        "years_of_experience": data.years_of_experience,

        "primary_skill": data.primary_skill,

        "created_at": str(datetime.now())

    }

    skills.append(new_skill)

    save_skills(skills)

    add_audit_log(

        company_id=data.company_id,

        user_name=f"Employee {data.employee_id}",

        action="Skill Added",

        related_employee=data.skill_name

    )

    return {

        "success": True,

        "message": "Skill Added",

        "skill": new_skill

    }


# ==========================
# GET EMPLOYEE SKILLS
# ==========================

@router.get("/skills/{employee_id}")
def get_skills(employee_id: int):

    return [

        skill

        for skill in skills

        if skill["employee_id"] == employee_id

    ]


# ==========================
# UPDATE SKILL
# ==========================

@router.put("/skills/{skill_id}")
def update_skill(skill_id: int, data: SkillSchema):

    if data.skill_name.strip() == "":

        return {

            "success": False,

            "message": "Skill Name is required"

        }

    if data.years_of_experience < 0:

        return {

            "success": False,

            "message": "Experience cannot be negative"

        }

    # Duplicate Check

    for skill in skills:

        if (

            skill["id"] != skill_id

            and skill["employee_id"] == data.employee_id

            and skill["skill_name"].lower() == data.skill_name.lower()

        ):

            return {

                "success": False,

                "message": "Duplicate Skill"

            }

    for skill in skills:

        if skill["id"] == skill_id:

            if data.primary_skill:

                for s in skills:

                    if s["employee_id"] == data.employee_id:

                        s["primary_skill"] = False

            skill["skill_name"] = data.skill_name

            skill["proficiency_level"] = data.proficiency_level

            skill["years_of_experience"] = data.years_of_experience

            skill["primary_skill"] = data.primary_skill

            save_skills(skills)

            add_audit_log(

                company_id=data.company_id,

                user_name=f"Employee {data.employee_id}",

                action="Skill Updated",

                related_employee=data.skill_name

            )

            return {

                "success": True,

                "message": "Skill Updated",

                "skill": skill

            }

    return {

        "success": False,

        "message": "Skill Not Found"

    }


# ==========================
# DELETE SKILL
# ==========================

@router.delete("/skills/{skill_id}")
def delete_skill(skill_id: int):

    for skill in skills:

        if skill["id"] == skill_id:

            skills.remove(skill)

            save_skills(skills)

            add_audit_log(

                company_id=skill["company_id"],

                user_name=f"Employee {skill['employee_id']}",

                action="Skill Deleted",

                related_employee=skill["skill_name"]

            )

            return {

                "success": True,

                "message": "Skill Deleted"

            }

    return {

        "success": False,

        "message": "Skill Not Found"

    }