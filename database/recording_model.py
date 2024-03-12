import re
import MIDI_model as midi

class Recording:
    def __init__(self, recording_id, name):
        self.recording_id = self.setRecording(recording_id)
        self.name = self.setName(name)

    def setRecording(self, recording_id):
        if re.match("^[\d]+$", recording_id):
            self.recording_id = recording_id
    
    def getRecording(self):
        return self.recording_id
    
    def setName(self, name):
        if re.match("^[A-Za-z\s]+$", name):
            self.name = name
    
    def getName(self):
        return self.name
    
    def convertToMidi(self, midi_id, midi_data):
        return midi.MIDI(midi_id, self.recording_id, midi_data)
