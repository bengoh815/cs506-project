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
from app.database import db
from app.test_config import TestingConfig
from app.models.midi_model import MIDI


def read_midi_file(file_path):
    """Read a MIDI file and return its binary data."""
    with open(file_path, "rb") as file:
        return file.read()


@pytest.fixture
def app():
    app = create_app(TestingConfig)
    with app.app_context():
        db.create_all()

        # Pre-populate the database with test data
        midi1_data = read_midi_file("server/tests/resources/midi1.mid")
        midi2_data = read_midi_file("server/tests/resources/midi2.mid")
        midi1 = MIDI(recording_id=1, midi_data=b"midi1_data")
        midi2 = MIDI(recording_id=2, midi_data=b"midi2_data")
        db.session.add(midi1)
        db.session.add(midi2)
        db.session.commit()

        yield app
        db.session.remove()
        db.drop_all()


@pytest.fixture
def client(app):
    return app.test_client()


def test_get_all_midis(client):
    """
    Test retrieving a list of all MIDI files.

    Args:
        client (FlaskClient): The test client for the application.
    """
    MIDIS_API_URL = "api/v1/midis"
    response = client.get(MIDIS_API_URL)
    assert response.status_code == OK
    assert response.json == [{"id": 1, "recording_id": 1}, {"id": 2, "recording_id": 2}]


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
