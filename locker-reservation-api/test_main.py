import pytest
from fastapi.testclient import TestClient
from main import app
from main import supabase
from datetime import datetime, timedelta
from main import generate_locker_id
from main import BaseModel

client = TestClient(app)

def test_hello():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello"}

def test_get_reservations():
    response = client.get("/reservations")
    assert response.status_code == 200
    assert len(response.json()) > 0

def test_get_available_lockers():
    response = client.get("/available_lockers")
    assert response.status_code == 200
    assert len(response.json()) > 0

def test_get_locker_codes():
    response = client.get("/lockers")
    assert response.status_code == 200
    assert len(response.json()) > 0

def test_generate_locker_id():
    locker_id = generate_locker_id()
    assert len(locker_id) == 5
    assert locker_id.isalnum()

def test_datetime():
    current_time = datetime.now()
    past_time = current_time - timedelta(minutes=1)
    future_time = current_time + timedelta(minutes=1)
    assert current_time > past_time
    assert current_time < future_time

def test_user_login_valid_credentials():
    user_data = {
        "regNo": "123456",
        "password": "password",
    }
    response = client.post("/login", json=user_data)
    assert response.status_code == 200
    assert "fullname" in response.json()

def test_get_reservations():
    response = client.get("/reservations")
    assert response.status_code == 200
    assert len(response.json()) > 0

def test_update_reservation_status_to_reserved():
    locker_id = 1
    response = client.put(f"/confirm_reservation", json={"locker_id": locker_id})
    assert response.status_code == 200
    assert response.json()["message"] == "Column updated successfully"

def test_update_reservation_status_to_pending():
    locker_id = 1
    response = client.put(f"/create_reservation/{1}", json={"locker_id": locker_id})
    assert response.status_code == 200
    assert response.json()["reservation_id"] is not None
    assert response.json()["message"] == "Column updated successfully"

def test_get_user_reservations():
    user_id = 1
    response = client.get(f"/reservations/{user_id}")
    assert response.status_code == 200
    assert len(response.json()) == 0
