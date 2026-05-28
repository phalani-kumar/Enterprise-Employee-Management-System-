from app.services.auth_service import fetch_users

# ADMIN CREDENTIALS

ADMIN_EMAIL = "admin@gmail.com"

ADMIN_PASSWORD = "admin123"

def login_user(email, password):

    # ADMIN LOGIN

    if (
        email == ADMIN_EMAIL and
        password == ADMIN_PASSWORD
    ):

        return {

            "success": True,

            "message": "Admin Login Successful",

            "user": {

                "id": 1,

                "name": "Admin",

                "email": ADMIN_EMAIL,

                "role": "Admin"
            }
        }

    # FETCH USERS FROM API

    users = fetch_users()

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

            "message": "User Login Successful",

            "user": {

                "id": matched_user["id"],

                "name": matched_user["name"],

                "email": matched_user["email"],

                "role": "User"
            }
        }

    # INVALID LOGIN

    return {

        "success": False,

        "message":
        "Invalid Email or Password"
    }