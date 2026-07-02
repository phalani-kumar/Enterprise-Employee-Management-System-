from fastapi import APIRouter

from datetime import datetime

from app.database.holiday_db import load_holidays

from app.database.attendance_requests_db import (
    attendance_requests,
    save_requests
)

from app.database.attendance_records_db import (
    attendance_records,
    save_records
)

from app.database.users_db import (
    users,
    save_users
)

from app.database.audit_logs_db import (
    audit_logs,
    save_audit_logs
)

router = APIRouter()

def add_audit_log(

    company_id,
    user_name,
    action,
    related_employee=""

):
    print(
        "AUDIT LOG CREATED:",
        company_id,
        user_name,
        action
    )


    audit_logs.append({

        "company_id":
        company_id,

        "user_name":
        user_name,

        "action":
        action,

        "related_employee":
        related_employee,

        "timestamp":
        str(datetime.now())

    })

    save_audit_logs(
        audit_logs
    )

def is_today_holiday(company_id):

    holidays = load_holidays()

    today = datetime.now().strftime("%Y-%m-%d")

    current_year = datetime.now().year

    for holiday in holidays:

        if holiday["company_id"] != company_id:
            continue

        if holiday["recurring"]:

            month_day = holiday["holiday_date"][5:]

            if today[5:] == month_day:
                return holiday

        else:

            if holiday["holiday_date"] == today:
                return holiday

    return None

@router.post(
    "/attendance/request-access"
)
def request_access(data: dict):
    print("ATTENDANCE ACCESS API HIT")    

    existing = next(

        (
            request
            for request in attendance_requests

            if request["user_id"]
            == data["user_id"]
        ),

        None
    )

    if existing:

        return existing

    request = {

        "id":
        len(attendance_requests)+1,

        "user_id":
        data["user_id"],

        "user_name":
        data["user_name"],

        "user_email":
        data["user_email"],

        "company_id":
        data["company_id"],

        "timestamp":
        str(datetime.now()),

        "status":
        "Pending"
    }

    attendance_requests.append(
        request
    )

    add_audit_log(

    data["company_id"],

    data["user_name"],

    "Attendance Access Requested",

    data["user_name"]
    )

    notification = (
    f"Attendance Access Request | "
    f"{data['user_name']} | "
    f"{data['user_email']} | "
    f"{request['timestamp']}"
)

    request["notification"] = notification

    save_requests(
        attendance_requests
    )

    return request

# ==========================
# GET ATTENDANCE REQUESTS
# ==========================

@router.get(
    "/attendance/requests/{company_id}"
)
def get_requests(
    company_id: int
):

    return [

        request

        for request in attendance_requests

        if request["company_id"]
        == company_id

        and request["status"]
        == "Pending"
    ]


# ==========================
# APPROVE REQUEST
# ==========================

@router.put(
    "/attendance/request/{request_id}/approve"
)
def approve_request(
    request_id: int
):

    for request in attendance_requests:

        if request["id"] == request_id:

            request["status"] = "Approved"

            save_requests(
                attendance_requests
            )

            for user in users:

                if (
                    user["id"]
                    == request["user_id"]
                ):

                    user[
                        "attendance_access"
                    ] = True

                    save_users(users)
                    add_audit_log(

                       request["company_id"],

                        "Admin",

                       "Attendance Access Approved",

                        request["user_name"]
                    )    

            return {
                "message":
                "Approved"
            }


# ==========================
# REJECT REQUEST
# ==========================

@router.put(
    "/attendance/request/{request_id}/reject"
)
def reject_request(
    request_id: int
):

    for request in attendance_requests:

        if request["id"] == request_id:

            request["status"] = "Rejected"

            save_requests(
                attendance_requests
            )

            add_audit_log(

               request["company_id"],
           
               "Admin",
           
               "Attendance Access Rejected",

                request["user_name"]
            )

            return {
                "message":
                "Rejected"
            }


@router.get(
    "/attendance-request/{company_id}"
)
def get_requests(
    company_id: int
):

    return [

        request

        for request in
        attendance_requests

        if request["company_id"]
        ==
        company_id

        and

        request["status"]
        ==
        "Pending"
    ]


       
@router.post("/attendance/checkin")
def check_in(data: dict):
    print("CHECK IN API HIT")

    holiday = is_today_holiday(data["company_id"])

    if holiday:
    
        return {
    
            "holiday": True,
    
            "message": f"Today is {holiday['holiday_name']}. Attendance is not required."
    
        }

    record = {

        "user_id": data["user_id"],

        "user_name": data["user_name"],

        "company_id": data["company_id"],

        "check_in":
            str(datetime.now()),

        "check_out":
            None,

        "hours":
            0
    }

    attendance_records.append(record)

    save_records(attendance_records)

    add_audit_log(

       data["company_id"],
   
       data["user_name"],
   
       "Check-In",

       data["user_name"]
    )

    return {
        "message":
        "Checked In"
    }        


@router.put(
    "/attendance/checkout/{user_id}"
)
def check_out(user_id: int):
    print("CHECK OUT API HIT")

    user = next(

    (

        u

        for u in users

        if u["id"] == user_id

    ),

    None

    )
    
    if user:
    
        holiday = is_today_holiday(user["company_id"])
    
        if holiday:
    
            return {
    
                "holiday": True,
    
                "message": "Holiday. Check-Out not required."
    
            }

    for record in reversed(
        attendance_records
    ):

        if (
            record["user_id"]
            == user_id

            and

            record["check_out"]
            is None
        ):

            checkout_time = datetime.now()

            checkin_time = datetime.fromisoformat(
                    record["check_in"]
                )

            time_difference = (
                checkout_time -
                checkin_time
            )
            
            total_minutes = int(
                time_difference.total_seconds() / 60
            )
            
            hours = total_minutes // 60
            
            minutes = total_minutes % 60
            
            record["check_out"] = (
                str(checkout_time)
            )
            
            record["hours"] = (
                f"{hours}h {minutes}m"
            )

            save_records(
                attendance_records
            )

            add_audit_log(

              record["company_id"],
          
              record["user_name"],
          
              "Check-Out",

              record["user_name"]

            )

            return {
                "message":
                "Checked Out"
            }

    return {
        "message":
        "No Check-In Found"
    }

@router.get(
    "/attendance/history/{user_id}"
)
def attendance_history(
    user_id: int
):
    
    print(attendance_records)

    return [

        record

        for record in attendance_records

        if record["user_id"]
        == user_id
    ]

@router.get("/attendance/status/{company_id}")
def attendance_status(company_id: int):

    holiday = is_today_holiday(company_id)

    if holiday:

        return {

            "holiday": True,

            "holiday_name": holiday["holiday_name"]

        }

    return {

        "holiday": False

    }