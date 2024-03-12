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

from app.utils.status_codes import OK, CREATED, NO_CONTENT
from flask import jsonify


def get_all_midis():
    """
    Retrieve a list of all MIDI files.

    Returns:
        tuple: A JSON list of MIDI files and the HTTP status code OK (200).
    """
    midis = [{"id": 1, "name": "Midi1"}, {"id": 2, "name": "Midi2"}]
    return jsonify(midis), OK


def get_midi(midi_id):
    """
    Retrieve a single MIDI file by its ID.

    Args:
        midi_id (int): The ID of the MIDI file to retrieve.

    Returns:
        tuple: A JSON representation of the MIDI file and the HTTP status code OK (200).
    """
    midi = {"id": midi_id, "name": "MidiName"}
    return jsonify(midi), OK


def create_midi():
    """
    Create a new MIDI file.

    Returns:
        tuple: A JSON representation of the newly created MIDI file and the HTTP status code CREATED (201).
    """
    new_midi = {"id": 3, "name": "NewMidi"}
    return jsonify(new_midi), CREATED


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
