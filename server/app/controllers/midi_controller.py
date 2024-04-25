################################################################################
# Filename: midi_controller.py
# Purpose:  Handles RESTful API routes for MIDI operations
# Author:   Benjamin Goh
#
# Description:
# This module is responsible for defining and handling all RESTful API routes
# related to MIDI operations in the application. It includes functions for
# creating, reading, updating, and deleting MIDI data.
#
# Usage (Optional):
# This module is not intended to be run as a standalone script. Instead, it should
# be imported and used in conjunction with a Flask application. For example:
#
#     from midi_controller import create_midi, get_midi
#     app.route('/midi', methods=['POST'])(create_midi)
#     app.route('/midi/<midi_id>', methods=['GET'])(get_midi)
#
# Notes:
# Ensure that the required dependencies, such as Flask and any database
# libraries, are installed and properly configured in your environment.
################################################################################

from app.database import db
from app.models.midi_model import MIDI
from app.models.user_model import User
from app.utils.status_codes import OK, CREATED, NO_CONTENT, NOT_FOUND
from app.utils.base64_converter import BinaryConverter
from app.utils.isodate_converter import DateConverter
from flask import jsonify, request


def get_all_midis():
    """
    Retrieve a list of all MIDI files.

    Returns:
        tuple: A JSON list of MIDI files and the HTTP status code OK (200).
    """
    midis = MIDI.query.all()
    midis_list = []
    for midi in midis:
        # Parse date
        midi_date = midi.date.isoformat()

        # Parse binary data
        midi_encode = BinaryConverter.encode_binary(midi.midi_data)

        # Create midi json
        midis_list.append(
            {
                "midi_id": midi.midi_id,
                "user_id": midi.user_id,
                "title": midi.title,
                "date": midi_date,
                "midi_data": midi_encode,
            }
        )

    return jsonify(midis_list), OK


def get_midi(midi_id):
    """
    Retrieve a single MIDI file by its ID.

    Args:
        midi_id (int): The ID of the MIDI file to retrieve.

    Returns:
        tuple: A JSON representation of the MIDI file and the HTTP status code OK (200).
    """
    midi = db.session.get(MIDI, midi_id)

    # Parse date
    midi_date = midi.date.isoformat()

    # Parse binary data
    midi_encode = BinaryConverter.encode_binary(midi.midi_data)

    if midi:
        midi_data = {
            "midi_id": midi.midi_id,
            "user_id": midi.user_id,
            "title": midi.title,
            "date": midi_date,
            "midi_data": midi_encode,
        }
        return jsonify(midi_data), OK
    else:
        return jsonify({"message": "MIDI not found"}), NOT_FOUND


def create_midi():
    """
    Create a new MIDI entry in the database.

    Returns:
        tuple: A JSON representation of the newly created MIDI entry and the HTTP status code CREATED (201).
    """
    name = request.form['name']
    email = request.form['email']
    title = request.form['title']
    file = request.files['file']

    # Create User
    new_user = User(name=name, email=email)
    db.session.add(new_user)
    db.session.commit()

    # Create MIDI
    user_id = new_user.user_id
    date = DateConverter.current_time()

    new_midi = MIDI(user_id=user_id, title=title, midi_data=file, date=date)

    db.session.add(new_midi)
    db.session.commit()

    return (
        jsonify(
            {
                "midi_id": new_midi.midi_id,
                "user_id": new_midi.user_id,
                "title": new_midi.title,
                "date": new_midi.date.isoformat(),
                # "midi_data": midi_data_encoded,  # Return the base64-encoded MIDI data
            }
        ),
        CREATED,
    )


def update_midi(midi_id):
    """
    Update an existing MIDI file.

    Args:
        midi_id (int): The ID of the MIDI file to update.

    Returns:
        tuple: A JSON representation of the updated MIDI file and the HTTP status code OK (200).
    """
    updated_midi = {"id": midi_id, "name": "UpdatedMidi"}
    return jsonify(updated_midi), OK


def delete_midi(midi_id):
    """
    Delete a MIDI file.

    Args:
        midi_id (int): The ID of the MIDI file to delete.

    Returns:
        tuple: A JSON message confirming deletion and the HTTP status code NO CONTENT (204).
    """
    return jsonify({"message": f"MIDI file {midi_id} deleted successfully"}), NO_CONTENT
