import json
import os

FILE_NAME = "app/database/holidays.json"


def load_holidays():

    if os.path.exists(FILE_NAME):

        with open(FILE_NAME, "r") as file:

            return json.load(file)

    return []


def save_holidays(data):

    with open(FILE_NAME, "w") as file:

        json.dump(data, file, indent=4)


holidays = load_holidays()