from fastapi import APIRouter

from app.models.holiday_model import (
    HolidaySchema,
    HolidayUpdateSchema
)

from app.database.holiday_db import (
    holidays,
    save_holidays
)

from app.database.audit_logs_db import (
    add_audit_log
)

holiday_router = APIRouter()

@holiday_router.post("/holidays")
def create_holiday(data: HolidaySchema):

    for holiday in holidays:

        if (

            holiday["company_id"] == data.company_id

            and

            holiday["holiday_date"] == data.holiday_date

        ):

            return {

                "success": False,

                "message": "Holiday already exists on this date."

            }

    holiday = {

        "id": len(holidays) + 1,

        "holiday_name": data.holiday_name,

        "holiday_date": data.holiday_date,

        "description": data.description,

        "holiday_type": data.holiday_type,

        "recurring": data.recurring,

        "company_id": data.company_id,

        "created_by": data.created_by,

        "is_deleted": False

    }

    holidays.append(holiday)

    save_holidays(holidays)

    add_audit_log(

        company_id=data.company_id,

        user_name=data.created_by,

        action="Holiday Created",

        related_employee=data.holiday_name

    )

    return {

        "success": True,

        "holiday": holiday

    }

@holiday_router.get("/holidays/{company_id}")
def get_holidays(company_id: int):

    return [

    holiday

    for holiday in holidays

    if (

        holiday["company_id"] == company_id

        and

        holiday.get("is_deleted", False) is False

    )

    ]

@holiday_router.put("/holidays/{holiday_id}")
def update_holiday(

    holiday_id: int,

    data: HolidayUpdateSchema

):

    for holiday in holidays:

        if holiday["id"] == holiday_id:

            holiday["holiday_name"] = data.holiday_name

            holiday["holiday_date"] = data.holiday_date

            holiday["description"] = data.description

            holiday["holiday_type"] = data.holiday_type

            holiday["recurring"] = data.recurring

            save_holidays(holidays)

            add_audit_log(

                company_id=holiday["company_id"],

                user_name=holiday["created_by"],

                action="Holiday Updated",

                related_employee=holiday["holiday_name"]

            )

            return {

                "success": True,

                "holiday": holiday

            }

    return {

        "success": False,

        "message": "Holiday not found"

    }

@holiday_router.delete("/holidays/{holiday_id}")
def delete_holiday(holiday_id: int):

    for holiday in holidays:

        if holiday["id"] == holiday_id:

            holiday["is_deleted"] = True

            save_holidays(holidays)

            add_audit_log(

                company_id=holiday["company_id"],

                user_name=holiday["created_by"],

                action="Holiday Deleted",

                related_employee=holiday["holiday_name"]

            )

            return {

                "success": True,

                "message": "Holiday deleted"

            }

    return {

        "success": False,

        "message": "Holiday not found"

    }

@holiday_router.get("/holidays/search/{company_id}/{keyword}")
def search_holiday(

    company_id: int,

    keyword: str

):

    keyword = keyword.lower()

    return [

        holiday

        for holiday in holidays

        if (

            holiday["company_id"] == company_id

            and

            keyword in holiday["holiday_name"].lower()

        )

    ]

@holiday_router.get("/holidays/type/{company_id}/{holiday_type}")
def filter_type(

    company_id: int,

    holiday_type: str

):

    return [

        holiday

        for holiday in holidays

        if (

            holiday["company_id"] == company_id

            and

            holiday["holiday_type"] == holiday_type

        )

    ]

from datetime import datetime

@holiday_router.get("/holiday/check/{company_id}")

def check_today_holiday(company_id: int):

    today = datetime.now()

    for holiday in holidays:

        if holiday["company_id"] != company_id:
            continue

        holiday_date = datetime.strptime(
            holiday["holiday_date"],
            "%Y-%m-%d"
        )

        if holiday["recurring"]:

            if (
                holiday_date.month == today.month
                and holiday_date.day == today.day
            ):

                return holiday

        else:

            if holiday["holiday_date"] == today.strftime("%Y-%m-%d"):

                return holiday

    return None

@holiday_router.put("/holidays/{holiday_id}/restore")
def restore_holiday(holiday_id: int):

    for holiday in holidays:

        if holiday["id"] == holiday_id:

            holiday["is_deleted"] = False

            save_holidays(holidays)

            add_audit_log(

                company_id=holiday["company_id"],

                user_name=holiday["created_by"],

                action="Holiday Restored",

                related_employee=holiday["holiday_name"]

            )

            return {

                "success": True,

                "message": "Holiday Restored"

            }

    return {

        "success": False,

        "message": "Holiday Not Found"

    }