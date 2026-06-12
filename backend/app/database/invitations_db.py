import json
import os

FILE_NAME = "invitations.json"

def load_invitations():

    if os.path.exists(FILE_NAME):

        with open(FILE_NAME, "r") as file:

            return json.load(file)

    return []

def save_invitations(data):

    with open(FILE_NAME, "w") as file:

        json.dump(data, file)

invitations = load_invitations()