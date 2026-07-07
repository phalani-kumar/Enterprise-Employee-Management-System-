import json
import os

FILE_NAME = "app/database/login_devices.json"


def load_login_devices():

    if os.path.exists(FILE_NAME):

        with open(FILE_NAME, "r") as file:

            return json.load(file)

    return []


def save_login_devices(data):

    with open(FILE_NAME, "w") as file:

        json.dump(data, file, indent=4)


login_devices = load_login_devices()