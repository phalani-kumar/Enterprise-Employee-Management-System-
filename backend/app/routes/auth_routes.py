from fastapi import APIRouter

from app.models.auth_model import LoginSchema

import requests

auth_router = APIRouter()

API_URL = "https://jsonplaceholder.typicode.com/users"

ADMIN_EMAIL = "admin@gmail.com"

ADMIN_PASSWORD = "admin123"

@auth_router.post("/login")

def login(data: LoginSchema):

    email = data.email

    password = data.password

    # ADMIN LOGIN

    if (
        email == ADMIN_EMAIL and
        password == ADMIN_PASSWORD
    ):

        return {

            "success": True,

            "role": "Admin",

            "message":
            "Admin Login Successful"
        }

    # API USERS

    response = requests.get(API_URL)

    users = response.json()

    matched_user = next(

        (
            user for user in users

            if user["email"].lower()
            == email.lower()
        ),

        None
    )

    # USER LOGIN

    if matched_user and len(password) >= 3:

        return {

            "success": True,

            "role": "User",

            "message":
            "User Login Successful",

            "user":
            matched_user
        }

    return {

        "success": False,

        "message":
        "Invalid Email or Password"
    }