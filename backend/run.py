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

from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from app.routes.employee_routes import (
    employee_router
)

from app.database.connection import (
    engine,
    Base
)

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

app.include_router(employee_router)

@app.get("/")
def home():

    return {
        "message":
        "Employee Management Backend Running"
    }