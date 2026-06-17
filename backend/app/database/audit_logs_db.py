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