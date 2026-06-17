import json
import os

FILE_NAME = "attendance_requests.json"

def load_requests():

    if os.path.exists(FILE_NAME):

        with open(FILE_NAME, "r") as file:

            return json.load(file)

    return []

def save_requests(data):

    with open(FILE_NAME, "w") as file:

        json.dump(data, file)

attendance_requests = load_requests()