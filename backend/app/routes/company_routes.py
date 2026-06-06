from fastapi import APIRouter

from app.database.company_db import companies

from app.database.employee_db import load_saved_employees

from app.database.users_db import users

company_router = APIRouter()

@company_router.get("/companies")
def get_companies():

    employees = load_saved_employees()

    company_data = []

    for company in companies:

        total_employees = len([
            employee
            for employee in employees
            if employee["company_id"] == company["id"]
        ])

        total_users = len([
            user
            for user in users
            if user["company_id"] == company["id"]
          ])

        company_data.append({

            "id": company["id"],

            "name": company["name"],

            "location": company["location"],

            "total_employees": total_employees,
             
            "total_users": total_users,

            "admin_email":
                "admina@gmail.com"
                if company["id"] == 1
                else "adminb@gmail.com"
        })

    return company_data


@company_router.post("/companies")
def add_company(company: dict):

    company["id"] = len(companies) + 1

    companies.append(company)

    return {
        "message":
        "Company Added Successfully"
    }