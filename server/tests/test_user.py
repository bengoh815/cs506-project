################################################################################
# Filename: test_user.py
# Purpose:  Test the user-related API endpoints.
# Author:   Benjamin Goh
#
# Description:
# This file contains pytest test cases for testing the CRUD operations on user
# resources provided by the Flask application. It tests the endpoints for
# retrieving all users, getting a single user by ID, creating a new user,
# updating an existing user, and deleting a user.
#
# Usage (Optional):
# Run the tests using the pytest command:
#   python -m pytest
#
# Notes:
# The tests assume that the application is configured for testing and that
# the test database is properly set up.
#
###############################################################################

import pytest
from app import create_app
from app.utils.status_codes import OK, CREATED, NO_CONTENT


@pytest.fixture
def client():
    """
    Create a test client for the Flask application.

    Yields:
        FlaskClient: A test client for the application.
    """
    app = create_app()

    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


def test_get_all_users(client):
    """
    Test retrieving a list of all user.

    Args:
        client (FlaskClient): The test client for the application.
    """
    response = client.get("api/v1/users")
    assert response.status_code == OK
    assert response.json == [
        {"id": 1, "name": "User1"},
        {"id": 2, "name": "User2"},
    ]


def test_get_midi(client):
    """
    Test retrieving a single user by its ID.

    Args:
        client (FlaskClient): The test client for the application.
    """
    example_id = 92384
    response = client.get(f"api/v1/users/{example_id}")
    assert response.status_code == OK
    assert response.json == {"id": example_id, "name": "UserName"}


def test_create_midi(client):
    """
    Test creating a new user.

    Args:
        client (FlaskClient): The test client for the application.
    """
    response = client.post("api/v1/users")
    assert response.status_code == CREATED
    assert response.json == {"id": 3, "name": "NewUser"}


def test_update_midi(client):
    """
    Test updating an existing user.

    Args:
        client (FlaskClient): The test client for the application.
    """
    example_id = 92384
    response = client.put(f"api/v1/users/{example_id}")
    assert response.status_code == OK
    assert response.json == {"id": example_id, "name": "UpdatedUser"}


def test_delete_midi(client):
    """
    Test deleting a user.

    Args:
        client (FlaskClient): The test client for the application.
    """
    example_id = 92384
    response = client.delete(f"api/v1/users/{example_id}")
    assert response.status_code == NO_CONTENT
