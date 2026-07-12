# from fastapi import FastAPI

# from fastapi.middleware.cors import CORSMiddleware

# from app.routes.employee_routes import employee_router

# app = FastAPI(
#     title="Enterprise Employee Management System API"
# )

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# app.include_router(employee_router)

# @app.get("/")
# def home():

#     return {
#         "message": "Backend Running Successfully"
#     }

# from fastapi import FastAPI

# from fastapi.middleware.cors import CORSMiddleware

# from app.routes.employee_routes import (
#     employee_router
# )

# from app.database.connection import (
#     engine,
#     Base
# )

# Base.metadata.create_all(bind=engine)

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,

#     allow_origins=["*"],

#     allow_credentials=True,

#     allow_methods=["*"],

#     allow_headers=["*"],
# )

# app.include_router(employee_router)

# @app.get("/")
# def home():

#     return {
#         "message":
#         "Employee Management Backend Running"
#     }

from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from app.routes.employee_routes import employee_router

from app.routes.auth_routes import auth_router

from app.routes.role_request_routes import (
    role_request_router
)

from app.routes.company_routes import company_router

from app.routes.dashboard_routes import dashboard_router

from app.routes.audit_routes import audit_router

from app.routes.users_routes import user_router

from app.routes.invitation_routes import router as invitation_router

from app.routes.reactivation_routes import router as reactivation_router

from app.routes.member_routes import member_router

from app.routes.leave_routes import router as leave_router

from app.routes.attendance_routes import (
    router as attendance_router
)

from app.routes.export_routes import router as export_router

# from app.routes.export_download_routes import (
#     router as export_download_router
# )

from app.routes.activity_routes import router as activity_router

from app.routes.suspension_routes import router as suspension_router

from app.routes.holiday_routes import holiday_router

from app.routes.login_devices_routes import router as login_device_router

from app.routes.skills_routes import router as skills_router

from app.routes.certifications_routes import router as certifications_router

from app.routes.admin_competency_routes import router as admin_competency_router

from app.routes.dashboard_competency_routes import router as dashboard_competency_router

from app.routes.certification_notification_routes import router as notification_router


app = FastAPI()

# CORS

app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

# ROUTES

app.include_router(employee_router)

app.include_router(auth_router)

app.include_router(
    role_request_router
)

app.include_router(
    company_router
)

app.include_router(
    dashboard_router
)

app.include_router(audit_router)

app.include_router(user_router)

app.include_router(invitation_router)

app.include_router(
    reactivation_router
)

app.include_router(member_router)

app.include_router(
    leave_router
)

app.include_router(attendance_router)

app.include_router(export_router)

# app.include_router(
#     export_download_router
# )

app.include_router(activity_router)

app.include_router(suspension_router)

app.include_router(holiday_router)

app.include_router(login_device_router)

app.include_router(skills_router)

app.include_router(certifications_router)

app.include_router(admin_competency_router)

app.include_router(dashboard_competency_router)

app.include_router(notification_router)


# HOME

@app.get("/")

def home():

    return {

        "message":
        "Backend Running Successfully"
    }