from app.services.employee_service import (
    get_transformed_employees
)

def get_all_employees():

    return get_transformed_employees()

def get_employee_by_id(employee_id: int):

    employees = get_transformed_employees()

    for employee in employees:

        if employee["id"] == employee_id:

            return employee

    return {
        "message": "Employee Not Found"
    }