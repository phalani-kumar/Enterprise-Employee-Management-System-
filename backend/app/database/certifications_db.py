import json
import os

DB_FILE = "certifications.json"

if os.path.exists(DB_FILE):
    with open(DB_FILE, "r") as file:
        certifications = json.load(file)
else:
    certifications = []


def save_certifications(data):
    with open(DB_FILE, "w") as file:
        json.dump(data, file, indent=4)