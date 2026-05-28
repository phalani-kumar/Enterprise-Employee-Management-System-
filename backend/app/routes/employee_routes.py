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

from fastapi import APIRouter

from app.models.employee_model import EmployeeSchema

import requests

employee_router = APIRouter()

API_URL = "https://jsonplaceholder.typicode.com/users"

# LOCAL MEMORY

employees = []

# FETCH API DATA FIRST TIME

def load_employees():

    global employees

    if len(employees) == 0:

        response = requests.get(API_URL)

        api_data = response.json()

        for index, user in enumerate(api_data):

            employees.append({

                "id": user["id"],

                "name": user["name"],

                "email": user["email"],

                "department":
                    "IT"
                    if index % 4 == 0
                    else "HR"
                    if index % 4 == 1
                    else "Finance"
                    if index % 4 == 2
                    else "Design",

                "role":
                    "Frontend Developer"
                    if index % 2 == 0
                    else "Backend Developer",

                "status":
                    "Active"
            })

# GET ALL EMPLOYEES

@employee_router.get("/employees")

def get_employees():

    load_employees()

    return employees

# ADD EMPLOYEE

@employee_router.post("/employees")

def add_employee(
    employee: EmployeeSchema
):

    load_employees()

    new_employee = {

        "id":
        len(employees) + 1,

        "name":
        employee.name,

        "email":
        employee.email,

        "department":
        employee.department,

        "role":
        employee.role,

        "status":
        employee.status
    }

    employees.append(new_employee)

    return {

        "message":
        "Employee Added Successfully",

        "employee":
        new_employee
    }

# GET SINGLE EMPLOYEE

@employee_router.get("/employees/{employee_id}")

def get_employee(
    employee_id: int
):

    load_employees()

    for employee in employees:

        if employee["id"] == employee_id:

            return employee

    return {

        "message":
        "Employee Not Found"
    }

# UPDATE EMPLOYEE

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

# DELETE EMPLOYEE

@employee_router.delete("/employees/{employee_id}")

def delete_employee(
    employee_id: int
):

    load_employees()

    for employee in employees:

        if employee["id"] == employee_id:

            employees.remove(employee)

            return {

                "message":
                "Employee Deleted Successfully"
            }

    return {

        "message":
        "Employee Not Found"
    }