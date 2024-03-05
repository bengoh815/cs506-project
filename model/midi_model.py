import re

class MIDI:
    def __init__(self, midi_id, recording_id, midi_data):
        self.midi_id = self.setMIDIID(midi_id)
        self.recording_id = self.setRecording(recording_id)
        self.midi_data = self.setMidiData(midi_data)

    def setMidiID(self, midi_id):
        if re.match("^[\d]+$", midi_id):
            self.midi_id = midi_id
    
    def getMidiID(self):
        return self.midi_id

    def setRecording(self, recording_id):
        if re.match("^[\d]+$", recording_id):
            self.recording_id = recording_id
    
    def getRecording(self):
        return self.recording_id
    
    def setMidiData(self, midi_data):

        # TODO: Validate MIDI Data

        self.midi_data = bytearray(midi_data)

    def getMidiData(self):
        return self.midi_data
