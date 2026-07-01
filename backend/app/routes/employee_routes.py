# from fastapi import APIRouter

# from app.controllers.employee_controller import (
#     get_all_employees,
#     get_employee_by_id
# )

# from app.utils.response_handler import (
#     success_response,
#     error_response
# )

# employee_router = APIRouter()

# @employee_router.get("/employees")
# def fetch_employees():

#     employees = get_all_employees()

#     return success_response(employees)

# @employee_router.get("/employees/{employee_id}")
# def fetch_employee(employee_id: int):

#     employee = get_employee_by_id(employee_id)

#     if "message" in employee:

#         return error_response(
#             "Employee Not Found"
#         )

#     return success_response(employee)

# from fastapi import APIRouter
# from fastapi import Depends

# from sqlalchemy.orm import Session

# from app.database.connection import (
#     SessionLocal
# )

# from app.services.employee_service import (
#     fetch_employees_service,
#     fetch_employee_service,
#     add_employee_service
# )

# from app.controllers.employee_controller import (
#     EmployeeSchema
# )

# employee_router = APIRouter()

# def get_db():

#     db = SessionLocal()

#     try:

#         yield db

#     finally:

#         db.close()


# @employee_router.get("/employees")
# def get_employees(
#     db: Session = Depends(get_db)
# ):

#     employees = fetch_employees_service(db)

#     return {
#         "success": True,
#         "data": employees
#     }


# @employee_router.get("/employees/{employee_id}")
# def get_employee(
#     employee_id: int,
#     db: Session = Depends(get_db)
# ):

#     employee = fetch_employee_service(
#         db,
#         employee_id
#     )

#     return {
#         "success": True,
#         "data": employee
#     }


# @employee_router.post("/employees")
# def add_employee(
#     employee: EmployeeSchema,
#     db: Session = Depends(get_db)
# ):

#     new_employee = add_employee_service(
#         db,
#         employee
#     )

#     return {
#         "success": True,
#         "data": new_employee
#     }

# from fastapi import APIRouter

# from app.models.employee_model import EmployeeSchema

# import requests

# employee_router = APIRouter()

# API_URL = "https://jsonplaceholder.typicode.com/users"

# # LOCAL MEMORY

# employees = []

# # FETCH API DATA FIRST TIME

# def load_employees():

#     global employees

#     if len(employees) == 0:

#         response = requests.get(API_URL)

#         api_data = response.json()

#         for index, user in enumerate(api_data):

#             employees.append({

#                 "id": user["id"],

#                 "name": user["name"],

#                 "email": user["email"],

#                 "department":
#                     "IT"
#                     if index % 4 == 0
#                     else "HR"
#                     if index % 4 == 1
#                     else "Finance"
#                     if index % 4 == 2
#                     else "Design",

#                 "role":
#                     "Frontend Developer"
#                     if index % 2 == 0
#                     else "Backend Developer",

#                 "status":
#                     "Active"
#             })

# # GET ALL EMPLOYEES

# @employee_router.get("/employees")

# def get_employees():

#     load_employees()

#     return employees

# # ADD EMPLOYEE

# @employee_router.post("/employees")

# def add_employee(
#     employee: EmployeeSchema
# ):

#     load_employees()

#     new_employee = {

#         "id":
#         len(employees) + 1,

#         "name":
#         employee.name,

#         "email":
#         employee.email,

#         "department":
#         employee.department,

#         "role":
#         employee.role,

#         "status":
#         employee.status
#     }

#     employees.append(new_employee)

#     return {

#         "message":
#         "Employee Added Successfully",

#         "employee":
#         new_employee
#     }

# # GET SINGLE EMPLOYEE

# @employee_router.get("/employees/{employee_id}")

# def get_employee(
#     employee_id: int
# ):

#     load_employees()

#     for employee in employees:

#         if employee["id"] == employee_id:

#             return employee

#     return {

#         "message":
#         "Employee Not Found"
#     }

# # UPDATE EMPLOYEE

# @employee_router.put("/employees/{employee_id}")

# def update_employee(
#     employee_id: int,
#     updated_employee: EmployeeSchema
# ):

#     load_employees()

#     for employee in employees:

#         if employee["id"] == employee_id:

#             employee["name"] = updated_employee.name

#             employee["email"] = updated_employee.email

#             employee["department"] = updated_employee.department

#             employee["role"] = updated_employee.role

#             employee["status"] = updated_employee.status

#             return {

#                 "message":
#                 "Employee Updated Successfully",

#                 "employee":
#                 employee
#             }

#     return {

#         "message":
#         "Employee Not Found"
#     }

# # DELETE EMPLOYEE

# @employee_router.delete("/employees/{employee_id}")

# def delete_employee(
#     employee_id: int
# ):

#     load_employees()

#     for employee in employees:

#         if employee["id"] == employee_id:

#             employees.remove(employee)

#             return {

#                 "message":
#                 "Employee Deleted Successfully"
#             }

#     return {

#         "message":
#         "Employee Not Found"
#     }

from fastapi import APIRouter

from app.models.employee_model import EmployeeSchema

from app.database.employee_db import (
    employees,
    save_employees,
    load_saved_employees
)

from datetime import datetime

from app.database.audit_logs_db import (
    audit_logs,
    save_audit_logs
)

from app.database.department_transfer_db import (
    department_transfers,
    save_transfers
)

from fastapi import Body

import json


employee_router = APIRouter()

def calculate_profile_completion(user):

    required_fields = [

        "first_name",

        "last_name",

        "email",

        "phone_number",

        "department",

        "designation",

        "profile_picture",

        "address",

        "date_of_joining",

        "employee_id"

    ]

    completed = 0

    missing = []

    for field in required_fields:

        if user.get(field):

            completed += 1

        else:

            missing.append(field)

    percentage = int(

        (completed / len(required_fields)) * 100

    )

    user["profile_completion"] = percentage

    user["missing_fields"] = missing

    return user


def load_employees():

    global employees

    saved_employees = load_saved_employees()


    employees.clear()

    employees.extend(saved_employees)


@employee_router.get("/employees/{company_id}")
def get_employees(company_id: int):

    load_employees()

    filtered_employees = [

        employee

        for employee in employees

        if employee["company_id"] == company_id
    ]

    for employee in filtered_employees:

       calculate_profile_completion(employee)

    return filtered_employees

@employee_router.post("/employees")

def add_employee(employee: EmployeeSchema):

    load_employees()

    new_id = max(
        [emp["id"] for emp in employees],
        default=0
    ) + 1

    new_employee = {

    "id": new_id,

    "name": employee.name,

    "email": employee.email,

    "department": employee.department,

    "role": employee.role,

    "status": employee.status,

    "attendance": 95,

    "company_id": employee.company_id,

"first_name": "",

"last_name": "",

"phone_number": "",

"designation": "",

"profile_picture": "",

"address": "",

"date_of_joining": "",

"employee_id": ""
}

    employees.append(new_employee)

    calculate_profile_completion(new_employee)

    save_employees(employees)

    audit_logs.append({
    "user_name": employee.performed_by,
    "company_id": new_employee["company_id"],
    "action": "Employee Created",
    "related_employee": new_employee["name"],
    "timestamp": str(datetime.now())
})
    
    save_audit_logs(audit_logs)

    return {

        "message":
        "Employee Added Successfully",

        "employee":
        new_employee
    }

@employee_router.put("/employees/{employee_id}")
def update_employee(
    employee_id: int,
    updated_employee: EmployeeSchema
):
    load_employees()

    for employee in employees:

        if employee["id"] == employee_id:

            employee["name"] = updated_employee.name

            employee["email"] = updated_employee.email

            employee["department"] = updated_employee.department

            employee["role"] = updated_employee.role

            employee["status"] = updated_employee.status

            employee["company_id"] = updated_employee.company_id

            calculate_profile_completion(employee)

            save_employees(employees)

            audit_logs.append({
    "user_name": updated_employee.performed_by,
    "company_id": updated_employee.company_id,
    "action": "Employee Updated",
    "related_employee": updated_employee.name,
    "timestamp": str(datetime.now())
})
            
            save_audit_logs(audit_logs)       

            return {

                "message":
                "Employee Updated Successfully",
                "employee":
                employee
            }

    return {

        "message":
        "Employee Not Found"
    }
@employee_router.delete("/employees/{employee_id}")

def delete_employee(employee_id: int,
                    data: dict = Body(...)):

    for employee in employees:

        if employee["id"] == employee_id:

            employees.remove(employee)

            save_employees(employees)

            audit_logs.append({
    "user_name": data["performed_by"],
    "company_id": employee["company_id"],
    "action": "Employee Deleted",
    "related_employee": employee["name"],
    "timestamp": str(datetime.now())
})
            save_audit_logs(audit_logs)

            return {

                "message":
                "Employee Deleted Successfully"
            }

    return {

        "message":
        "Employee Not Found"
    }

@employee_router.put(
    "/employees/{employee_id}/status"
)
def update_employee_status(
    employee_id: int,
    data: dict
):

    load_employees()

    for employee in employees:

        if employee["id"] == employee_id:

            employee["status"] = data["status"]

            save_employees(employees)

            return {
                "message":
                "Status Updated Successfully"
            }

    return {
        "message":
        "Employee Not Found"
    }

@employee_router.get(
    "/department-transfers/{company_id}"
)
def get_department_transfers(
    company_id: int
):

    return [

        transfer

        for transfer in department_transfers

        if transfer["company_id"]
        == company_id

    ]   

@employee_router.get(
    "/attendance-report"
)
def attendance_report():

    report = []

    for employee in employees:

        report.append({

            "id":
            employee["id"],

            "name":
            employee["name"],

            "department":
            employee["department"],

            "attendance":
            employee["attendance"]
        })

    return report

@employee_router.put(
    "/employees/{employee_id}/transfer"
)
def transfer_employee(
    employee_id: int,
    data: dict
):

    load_employees()

    print("TRANSFER REQUEST:", data)

    for employee in employees:

        if employee["id"] == employee_id:

            old_department = employee["department"]

            employee["department"] = data[
                "new_department"
            ]

            save_employees(
                employees
            )

            department_transfers.append({

                "employee_id":
                employee["id"],
            
                "employee_name":
                employee["name"],
            
                "from_department":
                old_department,
            
                "to_department":
                data["new_department"],
            
                "transferred_by":
                data["performed_by"],
            
                "company_id":
                employee["company_id"],
            
                "timestamp":
                str(datetime.now())
            })
            
            save_transfers(
                department_transfers
            )

            audit_logs.append({

                "user_name":
                data["performed_by"],

                "company_id":
                employee["company_id"],

                "action":
                f"Department Transfer ({old_department} → {data['new_department']})",

                "related_employee":
                employee["name"],

                "timestamp":
                str(datetime.now())
            })

            save_audit_logs(
                audit_logs
            )

            return {

                "message":
                "Department transferred successfully"
            }

    return {

        "message":
        "Employee not found"
    }

@employee_router.put(
    "/employees/{employee_id}/profile"
)
def update_profile(
    employee_id: int,
    data: dict
):

    load_employees()

    for employee in employees:

        if employee["id"] == employee_id:

            employee["first_name"] = data.get(
                "first_name",
                employee.get("first_name", "")
            )

            employee["last_name"] = data.get(
                "last_name",
                employee.get("last_name", "")
            )

            employee["phone_number"] = data.get(
                "phone_number",
                employee.get("phone_number", "")
            )

            employee["department"] = data.get(
                "department",
                employee.get("department", "")
            )

            employee["designation"] = data.get(
                "designation",
                employee.get("designation", "")
            )

            employee["profile_picture"] = data.get(
                "profile_picture",
                employee.get("profile_picture", "")
            )

            employee["address"] = data.get(
                "address",
                employee.get("address", "")
            )

            employee["date_of_joining"] = data.get(
                "date_of_joining",
                employee.get("date_of_joining", "")
            )

            employee["employee_id"] = data.get(
                "employee_id",
                employee.get("employee_id", "")
            )

            old_score = employee.get(
                "profile_completion",
                0
            )

            calculate_profile_completion(employee)

            save_employees(employees)

            if old_score != employee["profile_completion"]:

                audit_logs.append({

                    "user_name": employee["name"],

                    "company_id": employee["company_id"],

                    "action": f"Profile Completion Changed ({old_score}% → {employee['profile_completion']}%)",

                    "related_employee": employee["name"],

                    "timestamp": str(datetime.now())

                })

                if employee["profile_completion"] == 100:

                    audit_logs.append({

                        "user_name": employee["name"],

                        "company_id": employee["company_id"],

                        "action": "Profile Reached 100% Completion",

                        "related_employee": employee["name"],

                        "timestamp": str(datetime.now())

                    })

                save_audit_logs(audit_logs)

            return employee

    return {

        "message": "Employee Not Found"

    }

