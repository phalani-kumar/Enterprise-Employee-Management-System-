import json
import os

FILE_PATH = "app/database/export_history.json"

def load_export_history():

    if not os.path.exists(FILE_PATH):

        return []

    with open(FILE_PATH, "r") as file:

        return json.load(file)

def save_export_history(history):

    with open(FILE_PATH, "w") as file:

        json.dump(
            history,
            file,
            indent=4
        )

export_history = load_export_history()