from fastapi import APIRouter

from app.controllers.employee_controller import (
    get_all_employees,
    get_employee_by_id
)

from app.utils.response_handler import (
    success_response,
    error_response
)

employee_router = APIRouter()

@employee_router.get("/employees")
def fetch_employees():

    employees = get_all_employees()

    return success_response(employees)

@employee_router.get("/employees/{employee_id}")
def fetch_employee(employee_id: int):

    employee = get_employee_by_id(employee_id)

    if "message" in employee:

        return error_response(
            "Employee Not Found"
        )

    return success_response(employee)