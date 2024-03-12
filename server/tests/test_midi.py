################################################################################
# Filename: test_midi.py
# Purpose:  Test the MIDI-related API endpoints.
# Author:   Benjamin Goh
#
# Description:
# This file contains pytest test cases for testing the CRUD operations on MIDI
# resources provided by the Flask application. It tests the endpoints for
# retrieving all MIDIs, getting a single MIDI by ID, creating a new MIDI,
# updating an existing MIDI, and deleting a MIDI.
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


def test_get_all_midis(client):
    """
    Test retrieving a list of all MIDI files.

    Args:
        client (FlaskClient): The test client for the application.
    """
    response = client.get("api/v1/midis")
    assert response.status_code == OK
    assert response.json == [{"id": 1, "name": "Midi1"}, {"id": 2, "name": "Midi2"}]


def test_get_midi(client):
    """
    Test retrieving a single MIDI file by its ID.

    Args:
        client (FlaskClient): The test client for the application.
    """
    example_id = 92384
    response = client.get(f"api/v1/midis/{example_id}")
    assert response.status_code == OK
    assert response.json == {"id": example_id, "name": "MidiName"}


def test_create_midi(client):
    """
    Test creating a new MIDI file.

    Args:
        client (FlaskClient): The test client for the application.
    """
    response = client.post("api/v1/midis")
    assert response.status_code == CREATED
    assert response.json == {"id": 3, "name": "NewMidi"}


def test_update_midi(client):
    """
    Test updating an existing MIDI file.

    Args:
        client (FlaskClient): The test client for the application.
    """
    example_id = 92384
    response = client.put(f"api/v1/midis/{example_id}")
    assert response.status_code == OK
    assert response.json == {"id": example_id, "name": "UpdatedMidi"}


def test_delete_midi(client):
    """
    Test deleting a MIDI file.

    Args:
        client (FlaskClient): The test client for the application.
    """
    example_id = 92384
    response = client.delete(f"api/v1/midis/{example_id}")
    assert response.status_code == NO_CONTENT
