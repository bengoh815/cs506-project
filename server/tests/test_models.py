################################################################################
# Filename: test_models.py
# Purpose:  Test the ORM models for User and MIDIs tables.
# Author:   Darren Seubert
#
# Description:
# This file contains pytest test cases for testing the ORM models
# for User and MIDIs tables.
#
# Usage (Optional):
# Run the tests using the pytest command:
#   python -m pytest
#
# Notes:
# - The tests assume that the application is configured for testing and that
#   the test database is properly set up.
# - The test cases include tests for the User and MIDI models,
#   including creation, insertion, and retrieval from the database.
#
################################################################################

import pytest
from app import create_app
from app.database import db
from app.test_config import TestingConfig
from app.models.user_model import User
from app.models.midi_model import MIDI
from datetime import datetime


@pytest.fixture
def app():
    app = create_app(TestingConfig)
    yield app


@pytest.fixture
def client(app):
    return app.test_client()


def test_user_model(client):
    with client.application.app_context():
        # Create a user
        user = User(name="John Doe", email="john@example.com")

        # Add the user to the session
        db.session.add(user)
        db.session.commit()

        # Retrieve the user from the session
        retrieved_user = User.query.filter_by(email="john@example.com").first()

        assert retrieved_user.name == "John Doe"
        assert retrieved_user.email == "john@example.com"


def test_midi_model(client):
    with client.application.app_context():
        # Create a user
        user = User(name="John Doe", email="john@example.com")

        # Add the user to the session
        db.session.add(user)
        db.session.commit()

        # Create a MIDI entry
        date_str = "2024-04-10"
        date_obj = datetime.strptime(date_str, "%Y-%m-%d")
        midi_entry = MIDI(
            user_id=user.user_id,  # Assign the user's id as the author_id
            title="Sample MIDI",
            date=date_obj,
            midi_data=b"Some binary data",
        )

        # Add the MIDI entry to the session
        db.session.add(midi_entry)
        db.session.commit()

        # Retrieve the MIDI entry from the session
        retrieved_midi_entry = MIDI.query.filter_by(title="Sample MIDI").first()

        assert retrieved_midi_entry.title == "Sample MIDI"
        assert retrieved_midi_entry.date == date_obj
        assert retrieved_midi_entry.midi_data == b"Some binary data"
