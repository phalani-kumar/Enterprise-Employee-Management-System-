from fastapi import FastAPI

from app.routes.employee_routes import employee_router

app = FastAPI()

app.include_router(employee_router)

@app.get("/")
def home():

    return {
        "message": "Backend Running Successfully"
    }