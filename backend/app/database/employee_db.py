# from sqlalchemy.orm import Session

# # from app.models.employee_model import Employee

# def get_all_employees(db: Session):

#     return db.query(Employee).all()


# def get_employee_by_id(
#     db: Session,
#     employee_id: int
# ):

#     return db.query(Employee).filter(
#         Employee.id == employee_id
#     ).first()


# def create_employee(
#     db: Session,
#     employee_data
# ):

#     employee = Employee(
#         name=employee_data.name,
#         email=employee_data.email,
#         department=employee_data.department,
#         role=employee_data.role,
#         status=employee_data.status
#     )

#     db.add(employee)

#     db.commit()

#     db.refresh(employee)

#     return employee

employees = []

import json

FILE_NAME = "app/database/employees.json"

def save_employees(employees):

    with open(FILE_NAME, "w") as file:

        json.dump(
            employees,
            file,
            indent=4
        )

def load_saved_employees():

    try:

        with open(FILE_NAME, "r") as file:

            return json.load(file)

    except:

        return []