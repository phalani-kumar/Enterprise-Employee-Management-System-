import requests

from app.config.api_config import API_URL

def fetch_users():

    response = requests.get(API_URL)

    return response.json()