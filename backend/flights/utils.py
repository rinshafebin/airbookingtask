from itertools import permutations
import requests
from decouple import config

def fetch_flight_data():
    response = requests.get("https://opensky-network.org/api/states/all")
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"OpenSky API error: {response.status_code} {response.text}")
