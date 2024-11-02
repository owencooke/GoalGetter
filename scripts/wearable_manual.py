import requests


def send_hardcoded_wearable_data(api_url: str):
    data = {
        "date": "2024-11-03",
        "steps": 11613,
        "calories_burned": 1720.76,
        "distance_km": 8.1,
        "active_minutes": 352,
        "sleep_hours": 6.3,
        "heart_rate_avg": 128,
    }

    # Make the POST request
    response = requests.post(api_url, json=data)

    # Print the response
    print(response.status_code)
    print(response.json())


if __name__ == "__main__":
    api_url = "http://localhost:3000/api/wearable"
    send_hardcoded_wearable_data(api_url)
