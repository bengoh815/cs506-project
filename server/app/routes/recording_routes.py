################################################################################
# Filename: recording_routes.py
# Purpose:  Define routes for recording-related actions in the Flask application.
# Author:   Benjamin Goh
#
# Description:
# This file creates a Blueprint for recording routes and defines endpoints for
# CRUD operations on recording resources, such as retrieving all recordings, getting a
# single recording by ID, creating a new recording, updating an existing recording, and
# deleting a recording. The routes are associated with corresponding view functions
# in the recording_controller module.
#
# Usage (Optional):
# Import this Blueprint in the main application and register it to add the
# recording routes to the application. For example:
#   from recording_routes import recording_bp
#   app.register_blueprint(recording_bp)
#
# Notes:
# Ensure that the recording_controller module contains the necessary view functions
# with the correct signatures to handle requests for these routes.
#
###############################################################################

from flask import Blueprint
from app.controllers import recording_controller

# Create a Blueprint instance for recording routes
recording_bp = Blueprint("recording_bp", __name__, url_prefix="/api/v1")

# Define routes for CRUD operations on recording resources
recording_bp.route("/recordings", methods=["GET"])(
    recording_controller.get_all_recordings
)

recording_bp.route("/recordings/<int:recording_id>", methods=["GET"])(
    recording_controller.get_recording
)

recording_bp.route("/recordings", methods=["POST"])(
    recording_controller.create_recording
)

recording_bp.route("/recordings/<int:recording_id>", methods=["PUT"])(
    recording_controller.update_recording
)

recording_bp.route("/recordings/<int:recording_id>", methods=["DELETE"])(
    recording_controller.delete_recording
)
