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
    ForgotPasswordSchema,
    ProfileUpdateSchema
)

from app.database.users_db import users

from app.database.users_db import save_users

from datetime import datetime

from app.database.audit_logs_db import add_audit_log

from app.database.notifications_db import (
    notifications,
    save_notifications
)

# from app.database.reinstatement_requests_db import (
#     reinstatement_requests,
#     save_reinstatement_requests
# )

auth_router = APIRouter()

reinstatement_requests = []

def calculate_profile_completion(user):

    required_fields = [

        "first_name",
        "last_name",
        "email",
        "phone_number",
        "department",
        "designation",
        "profile_picture",
        "address",
        "date_of_joining",
        "employee_id"

    ]

    completed = 0
    missing = []

    for field in required_fields:

        if user.get(field):

            completed += 1

        else:

            missing.append(field)

    user["profile_completion"] = int(
        completed / len(required_fields) * 100
    )

    user["missing_fields"] = missing

    return user

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

    # SUSPENDED CHECK
      if matched_user["status"] == "Suspended":

        return {

            "success": True,

            "message":
            "Account Suspended",

            "role":
            matched_user["role"],

            "user":
            matched_user,

            "status":
            "Suspended"
        }

      return {

        "success": True,

        "message":
        "Login Successful",

        "role":
        matched_user["role"],

        "user":
        matched_user,

        "status":
        matched_user["status"]
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

@auth_router.get("/profile-completion/{company_id}")
def profile_completion(company_id: int):

    result = []

    required_fields = [

        "first_name",
        "last_name",
        "email",
        "phone_number",
        "department",
        "designation",
        "profile_picture",
        "address",
        "date_of_joining",
        "employee_id"

    ]

    for user in users:

        if user["company_id"] != company_id:
            continue

        completed = 0

        for field in required_fields:

            if user.get(field):

                completed += 1

        percentage = int(

            completed / len(required_fields) * 100

        )

        result.append({

            "id": user["id"],

            "name": user["name"],

            "role": user["role"],

            "profile_completion": percentage

        })

    return result

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

            save_users(users)

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

            save_users(users)

            return {

                "message":
                "User Activated"
            }

    return {

        "message":
        "User Not Found"
    }


@auth_router.put(
    "/users/{user_id}/suspend"
)
def suspend_user(
    user_id: int,
    data: dict
):

    for user in users:

        if user["id"] == user_id:

            user["status"] = "Suspended"

            user["suspended_by"] = data["admin_name"]

            user["suspension_reason"] = data["reason"]

            user["suspension_date"] = datetime.now().strftime("%d-%m-%Y %H:%M")

            save_users(users)

            add_audit_log(

                company_id=user["company_id"],
            
                user_name=data["admin_name"],
            
                action=f"{user['role']} Suspended",
            
                related_employee=user["name"]
            
            )

            return {
                "message":
                "User Suspended"
            }

    return {
        "message":
        "User Not Found"
    }


@auth_router.put(
    "/users/{user_id}/reinstate"
)
def reinstate_user(
    user_id: int
):

    for user in users:

        if user["id"] == user_id:

            user["status"] = "Active"

            save_users(users)

            return {
                "message":
                "User Reinstated"
            }

    return {
        "message":
        "User Not Found"
    }

@auth_router.post(
    "/reinstatement-request"
)
def create_reinstatement_request(
    data: dict
):

    request = {

        "id":
        len(reinstatement_requests) + 1,

        "user_id":
        data["user_id"],

        "user_email":
        data["user_email"],

        "company_id":
        data["company_id"],

        "message":
        data["message"],

        "status":
        "Pending"

    }

    reinstatement_requests.append(
        request
    )

    add_audit_log(

        company_id=data["company_id"],
    
        user_name=data["user_email"],
    
        action="Reinstatement Request Submitted",
    
        related_employee=data["user_email"]
    
    )

    # save_reinstatement_requests(
    #     reinstatement_requests
    # )

    notifications.append({

    "id":
    len(notifications) + 1,

    "company_id":
    data["company_id"],

    "title":
    "Reinstatement Request",

    "message":
    f"{data['user_email']} requested reinstatement.",

    "read":
    False

   })

    save_notifications(
    notifications
    )

    return {
        "message":
        "Request Submitted"
    }

@auth_router.get(
    "/reinstatement-request/{company_id}"
)
def get_reinstatement_requests(
    company_id: int
):

    return [

        request

        for request in reinstatement_requests

        if request["company_id"]
        == company_id

    ]

@auth_router.put(
    "/reinstatement/{request_id}/approve"
)
def approve_reinstatement(
    request_id: int
):

    for request in reinstatement_requests:

        if request["id"] == request_id:

            request["status"] = "Approved"

            for user in users:

                if (
                    user["id"]
                    ==
                    request["user_id"]
                ):

                    user["status"] = "Active"

                    save_users(users)

                    add_audit_log(

                        company_id=user["company_id"],
                    
                        user_name="Admin",
                    
                        action="Reinstatement Approved",
                    
                        related_employee=user["name"]
                    
                    )

                    break

                # reinstatement_requests.remove(
                #     request
                # )

                

            # save_reinstatement_requests(
            #     reinstatement_requests
            # )
            

            return {
                "message":
                "Approved"
            }

    return {
        "message":
        "Request Not Found"
    }

@auth_router.put(
    "/reinstatement/{request_id}/reject"
)
def reject_reinstatement(
    request_id: int
):

    for request in reinstatement_requests:

        if request["id"] == request_id:

            request["status"] = "Rejected"

            add_audit_log(
            
                company_id=request["company_id"],
            
                user_name="Admin",
            
                action="Reinstatement Rejected",
            
                related_employee=request["user_email"]
            
            )

            # reinstatement_requests.remove(
            #     request
            # )


            # save_reinstatement_requests(
            #     reinstatement_requests
            # )

            return {
                "message":
                "Rejected"
            }

    return {
        "message":
        "Request Not Found"
    }

@auth_router.get(
    "/notifications/{company_id}/{role}"
)
def get_notifications(
    company_id: int, role: str
):

    result = [

    n

    for n in notifications

    if n["company_id"] == company_id

]

# Hide admin-only notifications from normal users
    if role != "Admin":
    
        result = [
    
            n
    
            for n in result
    
            if n["title"] not in [
    
                "Low Profile Completion",
    
                "Profile Completed"
    
            ]
    
        ]
    
    return result


@auth_router.put(
    "/notifications/read/{notification_id}"
)
def mark_notification_read(
    notification_id: int
):

    for notification in notifications:

        if notification["id"] == notification_id:

            notification["read"] = True

            save_notifications(
                notifications
            )

            return {
                "message":
                "Notification Read"
            }

    return {
        "message":
        "Notification Not Found"
    }

@auth_router.get("/profile/{user_id}")
def get_profile(user_id: int):

    for user in users:

        if user["id"] == user_id:

           calculate_profile_completion(user)

           return user
        
    return {
        "message": "User Not Found"
    }

@auth_router.put(
    "/profile/{user_id}"
)
def update_profile(
    user_id: int,
    data: ProfileUpdateSchema
):

    for user in users:

        if user["id"] == user_id:

            if data.first_name is not None:
                user["first_name"] = data.first_name

            if data.last_name is not None:
                user["last_name"] = data.last_name

            if data.phone_number is not None:
                user["phone_number"] = data.phone_number

            if data.department is not None:
                user["department"] = data.department

            if data.designation is not None:
                user["designation"] = data.designation

            if data.profile_picture is not None:
                user["profile_picture"] = data.profile_picture

            if data.address is not None:
                user["address"] = data.address

            if data.date_of_joining is not None:
                user["date_of_joining"] = data.date_of_joining

            if data.employee_id is not None:
                user["employee_id"] = data.employee_id

            old_completion = user.get("profile_completion", 0)

            calculate_profile_completion(user)

            new_completion = user["profile_completion"]

            if old_completion != new_completion:

                add_audit_log(
            
                    company_id=user["company_id"],
            
                    user_name=user["name"],
            
                    action=f"Completion Changed ({old_completion}% → {new_completion}%)",
            
                    related_employee=user["name"]
            
                )

            if old_completion < 100 and new_completion == 100:

                add_audit_log(
            
                    company_id=user["company_id"],
            
                    user_name=user["name"],
            
                    action="Profile 100% Completed",
            
                    related_employee=user["name"]
            
                )

            print("Old Completion:", old_completion)
            print("New Completion:", new_completion)

            company_notifications = notifications

            if old_completion >= 80 and new_completion < 80:


                # print("Adding LOW completion notification")

                
                company_notifications.append({
            
                    "id": len(company_notifications) + 1,
            
                    "company_id": user["company_id"],
            
                    "title": "Low Profile Completion",
            
                    "message":
                    f"{user['name']}'s profile completion is only {new_completion}%",
            
                    "read": False
            
                })
            
            elif new_completion == 100 and old_completion != 100:
                print("Adding 100% completion notification")
            
                company_notifications.append({
            
                    "id": len(company_notifications) + 1,
            
                    "company_id": user["company_id"],
            
                    "title": "Profile Completed",
            
                    "message":
                    f"{user['name']} completed their profile.",
            
                    "read": False
            
                })
            
            save_notifications(company_notifications)

            save_users(users)

            add_audit_log(

                company_id=user["company_id"],

                user_name=user["name"],

                action="Profile Updated",

                related_employee=user["name"]

            )

            return {

                "message": "Profile Updated",

                "user": user

            }

    return {

        "message": "User Not Found"

    }

@auth_router.delete("/notifications/{notification_id}")
def delete_notification(notification_id: int):

    global notifications

    notification = next(
        (
            n
            for n in notifications
            if n["id"] == notification_id
        ),
        None
    )

    if notification is None:

        return {
            "message": "Notification Not Found"
        }

    notifications.remove(notification)

    save_notifications(notifications)

    return {
        "message": "Notification Deleted"
    }