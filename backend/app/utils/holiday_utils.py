from datetime import datetime

from app.database.holiday_db import holidays


def is_today_holiday(company_id):

    today = datetime.now()

    today_date = today.strftime("%Y-%m-%d")

    today_month = today.month
    today_day = today.day

    for holiday in holidays:

        if holiday["company_id"] != company_id:
            continue

        if holiday["recurring"]:

            holiday_date = datetime.strptime(
                holiday["holiday_date"],
                "%Y-%m-%d"
            )

            if (
                holiday_date.month == today_month
                and holiday_date.day == today_day
            ):

                return holiday

        else:

            if holiday["holiday_date"] == today_date:

                return holiday

    return None