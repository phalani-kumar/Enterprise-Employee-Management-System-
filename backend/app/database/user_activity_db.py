import json
import os

FILE_PATH = "app/database/user_activity.json"

def load_activity():

    if not os.path.exists(FILE_PATH):
        return []

    with open(FILE_PATH, "r") as file:
        return json.load(file)

def save_activity(activity):

    with open(FILE_PATH, "w") as file:
        json.dump(
            activity,
            file,
            indent=4
        )

user_activity = load_activity()