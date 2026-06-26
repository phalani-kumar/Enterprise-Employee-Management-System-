from app.database.users_db import users

def is_user_suspended(user_id):

    for user in users:

        if user["id"] == user_id:

            return user["status"] == "Suspended"

    return False