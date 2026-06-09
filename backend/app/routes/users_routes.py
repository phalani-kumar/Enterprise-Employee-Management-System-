from fastapi import APIRouter
from app.database.users_db import users

user_router = APIRouter()

@user_router.get("/users")
def get_users():
    return users