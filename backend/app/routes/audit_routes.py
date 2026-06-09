from fastapi import APIRouter
from app.database.audit_logs_db import load_audit_logs

audit_router = APIRouter()

@audit_router.get("/audit-logs/{company_id}")
def get_audit_logs(company_id: int):

    logs = load_audit_logs()

    filtered_logs = [

        log

        for log in logs

        if log.get("company_id") == company_id
    ]

    return filtered_logs