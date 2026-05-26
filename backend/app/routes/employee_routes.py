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

employee_router = APIRouter()

employees = [

    {
        "id": 1,
        "name": "Kumar",
        "email": "kumar@gmail.com",
        "department": "IT",
        "role": "Frontend Developer",
        "status": "Active"
    },

    {
        "id": 2,
        "name": "Rahul",
        "email": "rahul@gmail.com",
        "department": "HR",
        "role": "HR Manager",
        "status": "Inactive"
    }
]

# GET ALL EMPLOYEES

@employee_router.get("/employees")
def get_employees():

    return employees

# ADD EMPLOYEE

@employee_router.post("/employees")
def add_employee(employee: dict):

    employee["id"] = len(employees) + 1

    employees.append(employee)

    return {
        "message":
        "Employee Added Successfully"
    }

# UPDATE EMPLOYEE

@employee_router.put("/employees/{employee_id}")
def update_employee(
    employee_id: int,
    updated_employee: dict
):

    for employee in employees:

        if employee["id"] == employee_id:

            employee.update(
                updated_employee
            )

            return {
                "message":
                "Employee Updated Successfully"
            }

# DELETE EMPLOYEE

@employee_router.delete(
    "/employees/{employee_id}"
)
def delete_employee(
    employee_id: int
):

    for employee in employees:

        if employee["id"] == employee_id:

            employees.remove(employee)

            return {
                "message":
                "Employee Deleted Successfully"
            }