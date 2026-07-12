import json
import os

DB_FILE = "skills.json"

if os.path.exists(DB_FILE):
    with open(DB_FILE, "r") as file:
        skills = json.load(file)
else:
    skills = []


def save_skills(data):
    with open(DB_FILE, "w") as file:
        json.dump(data, file, indent=4)