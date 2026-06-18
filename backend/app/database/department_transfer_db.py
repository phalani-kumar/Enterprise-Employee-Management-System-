import json
import os

FILE_PATH = "app/database/department_transfers.json"

def load_transfers():

    if not os.path.exists(FILE_PATH):
        return []

    with open(FILE_PATH, "r") as file:
        return json.load(file)

def save_transfers(transfers):

    with open(FILE_PATH, "w") as file:
        json.dump(
            transfers,
            file,
            indent=4
        )

department_transfers = load_transfers()