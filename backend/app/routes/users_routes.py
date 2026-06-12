from fastapi import APIRouter
from app.database.users_db import users

user_router = APIRouter()

@user_router.get("/users")
def get_users():
    return users

@user_router.put(
    "/users/{user_id}/deactivate"
)
def deactivate_user(user_id: int):

    for user in users:

        if user["id"] == user_id:

            user["status"] = "Deactivated"

            return {
                "message":
                "User Deactivated"
            }

    return {
        "message":
        "User Not Found"
    }