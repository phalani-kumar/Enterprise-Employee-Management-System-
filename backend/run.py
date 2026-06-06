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

# HOME

@app.get("/")

def home():

    return {

        "message":
        "Backend Running Successfully"
    }