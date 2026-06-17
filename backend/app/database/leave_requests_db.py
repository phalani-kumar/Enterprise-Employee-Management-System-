import json
import os

FILE_NAME = "leave_requests.json"

def load_leave_requests():

    if os.path.exists(FILE_NAME):

        with open(FILE_NAME, "r") as file:

            return json.load(file)

    return []

def save_leave_requests(data):

    with open(FILE_NAME, "w") as file:

        json.dump(data, file)

leave_requests = load_leave_requests()