from app.database.db import fetch_employee_data

def get_transformed_employees():

    employees = fetch_employee_data()

    updated_employees = []

    for index, employee in enumerate(employees):

        updated_employees.append({
            "id": employee["id"],

            "name": employee["name"],

            "email": employee["email"],

            "department":
                "IT" if index % 4 == 0
                else "HR" if index % 4 == 1
                else "Finance" if index % 4 == 2
                else "Design",

            "role":
                "Frontend Developer"
                if index % 2 == 0
                else "Backend Developer",

            "status":
                "Active"
                if index % 2 == 0
                else "Inactive"
        })

    return updated_employees