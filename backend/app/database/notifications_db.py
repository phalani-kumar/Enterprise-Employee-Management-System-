import json
import os

FILE_PATH = "app/database/notifications.json"

def load_notifications():

    if not os.path.exists(FILE_PATH):
        return []

    with open(FILE_PATH, "r") as file:
        return json.load(file)

def save_notifications(data):

    with open(FILE_PATH, "w") as file:
        json.dump(data, file, indent=4)

notifications = load_notifications()