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

from app.routes.activity_routes import router as activity_router

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

app.include_router(activity_router)

# HOME

@app.get("/")

def home():

    return {

        "message":
        "Backend Running Successfully"
    }