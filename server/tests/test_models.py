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
# - The test fixtures are provided for creating an in-memory SQLite database
#   engine and a session for database interactions.
# - The test cases include tests for the User and MIDI models,
#   including creation, insertion, and retrieval from the database.
#
################################################################################

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import pytest
from app.models.user_model import User
from app.models.midi_model import MIDI
from datetime import datetime


@pytest.fixture
def engine():
    # Create an in-memory SQLite database engine
    engine = create_engine("sqlite:///:memory:")
    return engine


@pytest.fixture
def session(engine):
    # Create a session
    Session = sessionmaker(bind=engine)
    session = Session()

    # Create all tables
    User.metadata.create_all(engine)
    MIDI.metadata.create_all(engine)

    return session


def test_user_model(session):
    # Create a user
    user = User(name="John Doe", email="john@example.com")

    # Add the user to the session
    session.add(user)
    session.commit()

    # Retrieve the user from the session
    retrieved_user = session.query(User).filter_by(email="john@example.com").first()

    assert retrieved_user.name == "John Doe"
    assert retrieved_user.email == "john@example.com"


def test_midi_model(session):
    # Create a user
    user = User(name="John Doe", email="john@example.com")

    # Add the user to the session
    session.add(user)
    session.commit()

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
    session.add(midi_entry)
    session.commit()

    # Retrieve the MIDI entry from the session
    retrieved_midi_entry = session.query(MIDI).filter_by(title="Sample MIDI").first()

    assert retrieved_midi_entry.title == "Sample MIDI"
    assert retrieved_midi_entry.date == date_obj
    assert retrieved_midi_entry.midi_data == b"Some binary data"
