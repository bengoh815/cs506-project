from ..models.midi_model import Midi
from flask import jsonify

def get_all_midis():
    # midis = Midi.query.all()
    # return jsonify([midi.to_dict() for midi in midis])
    return "List of MIDIs"