################################################################################
# Filename: recording_controller.py
# Purpose:  Handles RESTful API routes for recording operations
# Author:   Benjamin Goh
#
# Description:
# This module is responsible for defining and handling all RESTful API routes
# related to recording operations in the application. It includes functions for
# creating, reading, updating, and deleting recording data.
#
# Usage (Optional):
# This module is not intended to be run as a standalone script. Instead, it should
# be imported and used in conjunction with a Flask application. For example:
#
#     from recording_controller import create_recording, get_recording
#     app.route('/recordings', methods=['POST'])(create_recording)
#     app.route('/recordings/<int:recording_id>', methods=['GET'])(get_recording)
# Notes:
# Ensure that the required dependencies, such as Flask and any database
# libraries, are installed and properly configured in your environment.
################################################################################

from app.utils.status_codes import OK, CREATED, NO_CONTENT, BAD_REQUEST
from flask import jsonify, request, send_file
import io
from app.database import db
from app.models.user_model import User
from sqlalchemy.exc import SQLAlchemyError


def get_all_recordings():
    """
    Retrieve a list of all recording files.

    Returns:
        tuple: A JSON list of recording files and the HTTP status code OK (200).
    """
    recordings = [{"id": 1, "name": "Recording1"}, {"id": 2, "name": "Recording2"}]
    return jsonify(recordings), OK


def get_recording(recording_id):
    """
    Retrieve a single recording file by its ID.

    Args:
        recording_id (int): The ID of the recording file to retrieve.

    Returns:
        tuple: A JSON representation of the recording file and the HTTP status code OK (200).
    """
    recording = {"id": recording_id, "name": "RecordingName"}
    return jsonify(recording), OK


def create_recording():
    """
    Create a new recording file.

    Returns:
        tuple: A JSON representation of the newly created recording file and the HTTP status code CREATED (201).
    """
    # print(request.files)
    audio_file = request.files["audio-file"]
    if audio_file:
        # Process the audio file, save it, etc.
        # # Process the audio file in memory
        # audio_data = io.BytesIO(audio_file.read())
        # # Perform any processing or conversion to MP3 on audio_data

        # # Prepare the audio_data for sending back
        # audio_data.seek(0)  # Move to the beginning of the BytesIO buffer

        # # Send the processed audio file back as an MP3 response
        # return send_file(
        #     audio_data,
        #     as_attachment=True,
        #     download_name="processed_audio.mp3",
        #     mimetype="audio/mpeg",
        # )

        midi_data = io.BytesIO(audio_file.read())

        new_user = User(name="John Doe", email="johndoe@example.com")
        try:
            db.session.add(new_user)
            db.session.commit()
            print("Changes committed successfully.")
        except SQLAlchemyError as e:
            print(f"An error occurred: {e}")
            db.session.rollback()
        # midi_data.seek(0)  # Rewind the BytesIO object to the beginning

        file_path = "../converted-example.midi"
        return send_file(
            file_path,
            as_attachment=True,
            download_name="processed_audio.midi",
        )

        return jsonify({"message": "File uploaded successfully"}), CREATED
    else:
        return jsonify({"error": "No file provided"}), BAD_REQUEST

    new_recording = {"id": 3, "name": "NewRecording"}
    return jsonify(new_recording), CREATED


def update_recording(recording_id):
    """
    Update an existing recording file.

    Args:
        recording_id (int): The ID of the recording file to update.

    Returns:
        tuple: A JSON representation of the updated recording file and the HTTP status code OK (200).
    """
    updated_recording = {"id": recording_id, "name": "UpdatedRecording"}
    return jsonify(updated_recording), OK


def delete_recording(recording_id):
    """
    Delete a recording file.

    Args:
        recording_id (int): The ID of the recording file to delete.

    Returns:
        tuple: A JSON message confirming the deletion of the recording file and the HTTP status code NO CONTENT (204).
    """
    return (
        jsonify({"message": f"Recording file {recording_id} deleted successfully"}),
        NO_CONTENT,
    )
