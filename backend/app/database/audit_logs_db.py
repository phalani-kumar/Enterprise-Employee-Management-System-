import json
import os

FILE_PATH = os.path.join(
    os.path.dirname(__file__),
    "audit_logs.json"
)


def load_audit_logs():

    if not os.path.exists(FILE_PATH):

        return []

    with open(
        FILE_PATH,
        "r"
    ) as file:

        return json.load(file)


def save_audit_logs(audit_logs):

    with open(
        FILE_PATH,
        "w"
    ) as file:

        json.dump(
            audit_logs,
            file,
            indent=4
        )
        


audit_logs = load_audit_logs()

from datetime import datetime

def add_audit_log(
    company_id,
    user_name,
    action,
    related_employee=""
):

    audit_logs.append({

        "company_id": company_id,

        "user_name": user_name,

        "action": action,

        "related_employee": related_employee,

        "timestamp": str(datetime.now())

    })

    save_audit_logs(audit_logs)