from fastapi import APIRouter

from app.database.employee_db import employees
from app.database.role_request_db import role_requests

dashboard_router = APIRouter()

# TOTAL EMPLOYEES

@dashboard_router.get("/dashboard/total-employees")
def total_employees():

    return {
        "total_employees": len(employees)
    }


# ACTIVE EMPLOYEES

@dashboard_router.get("/dashboard/active-employees")
def active_employees():

    active_count = len([

        employee

        for employee in employees

        if employee["status"] == "Active"
    ])

    return {
        "active_employees": active_count
    }


# DEPARTMENT WISE COUNT

@dashboard_router.get("/dashboard/departments")
def department_data():

    department_counts = {}

    for employee in employees:

        department = employee["department"]

        department_counts[department] = (

            department_counts.get(
                department,
                0
            ) + 1
        )

    return department_counts


# ROLE WISE COUNT

@dashboard_router.get("/dashboard/roles")
def role_data():

    role_counts = {}

    for employee in employees:

        role = employee["role"]

        role_counts[role] = (

            role_counts.get(
                role,
                0
            ) + 1
        )

    return role_counts


# STATUS OVERVIEW

@dashboard_router.get("/dashboard/status")
def status_data():

    status_counts = {}

    for employee in employees:

        status = employee["status"]

        status_counts[status] = (

            status_counts.get(
                status,
                0
            ) + 1
        )

    return status_counts


# PENDING ROLE REQUESTS

@dashboard_router.get("/dashboard/pending-requests")
def pending_requests():

    pending = len([

        request

        for request in role_requests

        if request["status"] == "Pending"
    ])

    return {
        "pending_requests": pending
    }