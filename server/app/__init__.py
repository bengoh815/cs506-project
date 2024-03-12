################################################################################
# Filename: [File Name]
# Purpose:  [Brief description of the purpose or functionality of the file]
# Author:   Benjamin Goh
#
# Description:
# [Detailed description of the contents and functionality of the file.]
#
# Usage (Optional):
# [Instructions or examples demonstrating how to use the code in this file.
# Include any dependencies or prerequisites required for proper usage.]
#
# Notes:
# [Any additional notes, considerations, or important information
# about the file that may be relevant to developers or users.]
#
###############################################################################


from flask import Flask
from flask_cors import CORS
from app.routes.midi_routes import midi_bp
from app.routes.recording_routes import recording_bp
from app.routes.user_routes import user_bp


def create_app():
    """
    Create and configure a new Flask application instance.

    Returns:
        Flask: A new Flask application instance.
    """
    app = Flask(__name__)
    app.debug = True
    CORS(
        app,
        resources={r"/api/*": {"origins": "*"}},
        methods=["GET", "POST", "PUT", "DELETE"],
    )

    # Configure your app, register blueprints, etc.
    # app.config['SECRET_KEY'] = 'your_secret_key'

    app.register_blueprint(midi_bp)
    app.register_blueprint(recording_bp)
    app.register_blueprint(user_bp)

    return app
