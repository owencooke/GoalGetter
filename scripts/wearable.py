import pandas as pd
import requests


def send_wearable_data(file_path, row_index, api_url):
    # Read the .xlsx file
    df = pd.read_excel(file_path)

    # Select the specified row
    row = df.iloc[row_index]

    # Extract the values from the row and convert them to native Python types
    data = {
        "steps": int(row["steps"]),
        "calories_burned": float(row["calories_burned"]),
        "distance_km": float(row["distance_km"]),
        "active_minutes": int(row["active_minutes"]),
        "sleep_hours": float(row["sleep_hours"]),
        "heart_rate_avg": float(row["heart_rate_avg"]),
        "date": str(row["date"]).split()[0],  # Only get the date part
    }

    # Make the POST request
    response = requests.post(api_url, json=data)

    # Print the response
    print(response.status_code)
    print(response.json())


if __name__ == "__main__":
    file_path = "./fitness_tracker_dataset.xlsx"
    row_index = 0
    api_url = "http://localhost:3000/api/wearable"

    # send_wearable_data(file_path, row_index, api_url)

    for i in range(8):
        send_wearable_data(file_path, i, api_url)
