from fastapi import APIRouter
from datetime import datetime

from app.database.export_history_db import (
    export_history,
    save_export_history
)

router = APIRouter()

@router.post("/exports/log")
def log_export(data: dict):

    record = {

        "id":
        len(export_history) + 1,

        "company_id":
        data["company_id"],

        "exported_by":
        data["exported_by"],

        "data_type":
        data["data_type"],

        "format":
        data["format"],

        "timestamp":
        str(datetime.now())

    }

    export_history.append(record)

    save_export_history(export_history)

    return {
        "message":
        "Export Logged"
    }


@router.get(
    "/exports/history/{company_id}"
)
def get_export_history(
    company_id: int
):

    return [

        item

        for item in export_history

        if item["company_id"]
        == company_id

    ]