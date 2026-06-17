# from fastapi import APIRouter

# from app.models.auth_model import LoginSchema

# import requests

# auth_router = APIRouter()

# API_URL = "https://jsonplaceholder.typicode.com/users"

# ADMIN_EMAIL = "admin@gmail.com"

# ADMIN_PASSWORD = "admin123"

# @auth_router.post("/login")

# def login(data: LoginSchema):

#     email = data.email

#     password = data.password

#     # ADMIN LOGIN

#     if (
#         email == ADMIN_EMAIL and
#         password == ADMIN_PASSWORD
#     ):

#         return {

#             "success": True,

#             "role": "Admin",

#             "message":
#             "Admin Login Successful"
#         }

#     # API USERS

#     response = requests.get(API_URL)

#     users = response.json()

#     matched_user = next(

#         (
#             user for user in users

#             if user["email"].lower()
#             == email.lower()
#         ),

#         None
#     )

#     # USER LOGIN

#     if matched_user and len(password) >= 3:

#         return {

#             "success": True,

#             "role": "User",

#             "message":
#             "User Login Successful",

#             "user":
#             matched_user
#         }

#     return {

#         "success": False,

#         "message":
#         "Invalid Email or Password"
#     }

# from fastapi import APIRouter

# from app.models.auth_model import LoginSchema

# import requests

# auth_router = APIRouter()

# API_URL = "https://jsonplaceholder.typicode.com/users"

# ADMIN_EMAIL = "admin@gmail.com"

# ADMIN_PASSWORD = "admin123"

# @auth_router.post("/login")

# def login(data: LoginSchema):

#     email = data.email

#     password = data.password

#     # ADMIN LOGIN

#     if (
#         email == ADMIN_EMAIL and
#         password == ADMIN_PASSWORD
#     ):

#         return {

#             "success": True,

#             "role": "Admin",

#             "message":
#             "Admin Login Successful"
#         }

#     # API USERS

#     response = requests.get(API_URL)

#     users = response.json()

#     matched_user = next(

#         (
#             user for user in users

#             if user["email"].lower()
#             == email.lower()
#         ),

#         None
#     )

#     # USER LOGIN

#     if matched_user and len(password) >= 3:

#         return {

#             "success": True,

#             "role": "User",

#             "message":
#             "User Login Successful",

#             "user":
#             matched_user
#         }

#     return {

#         "success": False,

#         "message":
#         "Invalid Email or Password"
#     }

from fastapi import APIRouter

from app.models.auth_model import (
    SignupSchema,
    LoginSchema,
    ForgotPasswordSchema
)

from app.database.users_db import users

from app.database.users_db import save_users

auth_router = APIRouter()

# SIGNUP

@auth_router.post("/signup")
def signup(data: SignupSchema):

    existing_user = next(

        (
            user
            for user in users

            if user["email"].lower()
            == data.email.lower()
        ),

        None
    )

    if existing_user:

        return {
            "success": False,
            "message": "Email already exists"
        }

    new_user = {
    "id": len(users) + 1,
    "name": data.name,
    "email": data.email,
    "password": data.password,
    "role": data.role,
    "company_id": data.company_id,
    "company_name":
        "Company A"
        if data.company_id == 1
        else "Company B",
    "status": "Active"
}

    users.append(new_user)
    save_users(users)

    return {

        "success": True,

        "message":
        "Signup Successful"
    }


# LOGIN

@auth_router.post("/login")
def login(data: LoginSchema):

    print("LOGIN REQUEST:", data.email, data.password)

    matched_user = next(

        (
            user
            for user in users

            if user["email"].lower()
            == data.email.lower()

            and user["password"]
            == data.password
        ),

        None
    )

    if matched_user:

        print(matched_user)

        return {

            "success": True,

            "message":
            "Login Successful",

            "role":
            matched_user["role"],

            "user":
            matched_user,

            "status":  matched_user["status"]
        }

    return {

        "success": False,

        "message":
        "Invalid Credentials"
    }


# FORGOT PASSWORD

@auth_router.put("/forgot-password")
def forgot_password(
    data: ForgotPasswordSchema
):

    for user in users:

        if (
            user["email"].lower()
            == data.email.lower()
        ):

            user["password"] = (
                data.new_password
            )

            return {

                "success": True,

                "message":
                "Password Updated Successfully"
            }

    return {

        "success": False,

        "message":
        "User Not Found"
    }

@auth_router.get(
    "/members/{company_id}"
)
def get_members(
    company_id: int
):

    return [

        user

        for user in users

        if user["company_id"]
        == company_id
    ]

@auth_router.put(
    "/users/{user_id}/deactivate"
)
def deactivate_user(
    user_id: int,
    data: dict
):

    for user in users:

        if user["id"] == user_id:

            user["status"] = "Deactivated"

            user["deactivated_by"] = data["admin_name"]

            user["deactivation_reason"] = (
                data.get(
                    "reason",
                    "Account disabled by administrator"
                )
            )

            return {
                "message":
                "User Deactivated"
            }

    return {
        "message":
        "User Not Found"
    }

@auth_router.put(
     "/users/{user_id}/activate"
)
def activate_user(
    user_id: int
):

    for user in users:

        if user["id"] == user_id:

            user["status"] = "Active"

            return {

                "message":
                "User Activated"
            }

    return {

        "message":
        "User Not Found"
    }