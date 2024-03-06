from flask import Blueprint
from ..controllers import midi_controller

# Create a Blueprint instance for MIDI routes
midi_bp = Blueprint('midi_bp', __name__)

@midi_bp.route('/midis')
def get_midis():
    return midi_controller.get_all_midis()
