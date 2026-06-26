import json
import os

FILE_NAME = "users.json"

def load_users():

    if os.path.exists(FILE_NAME):

        with open(FILE_NAME, "r") as file:

            return json.load(file)

    return []

def save_users(data):

    with open(FILE_NAME, "w") as file:

        json.dump(data, file, indent=4)

users = load_users()

for user in users:

    user.setdefault(
        "status",
        "Active"
    )

    user.setdefault(
        "suspended_reason",
        ""
    )

    user.setdefault(
        "suspended_by",
        ""
    )

    # user.setdefault(
    #     "suspended_date",
    #     ""
    # )

save_users(users)