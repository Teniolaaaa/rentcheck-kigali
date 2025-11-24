from fastapi import HTTPException
import requests
import os
import json

class DataService:
    def __init__(self):
        self.external_api_url = os.getenv("EXTERNAL_API_URL")
        self.local_data_file = os.path.join(os.path.dirname(__file__), '../../data/kigali_rental_sample.json')

    def fetch_external_data(self):
        try:
            response = requests.get(self.external_api_url)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.HTTPError as http_err:
            raise HTTPException(status_code=response.status_code, detail=str(http_err))
        except Exception as err:
            raise HTTPException(status_code=500, detail=str(err))

    def fetch_local_data(self):
        try:
            with open(self.local_data_file, 'r') as file:
                return json.load(file)
        except FileNotFoundError:
            raise HTTPException(status_code=404, detail="Local data file not found.")
        except json.JSONDecodeError:
            raise HTTPException(status_code=500, detail="Error decoding JSON from local data file.")
        except Exception as err:
            raise HTTPException(status_code=500, detail=str(err))

    def get_data(self):
        external_data = self.fetch_external_data()
        local_data = self.fetch_local_data()
        return {
            "external_data": external_data,
            "local_data": local_data
        }