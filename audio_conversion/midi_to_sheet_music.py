import mido

# Open the MIDI file
mid = mido.MidiFile("example.mid")

# Initialize variables to store notes, key signature, and tempo
notes = []
key_signature = None
tempo = None

# Iterate through MIDI messages
for msg in mid:
    # Note on message
    if msg.type == "note_on":
        # Append note information (note number and velocity) to notes list
        notes.append((msg.note, msg.time))
    # Meta message (includes key signature information)
    elif msg.type == "key_signature":
        # Store key signature information
        key_signature = msg.key
    # Meta message (includes tempo information)
    elif msg.type == "set_tempo":
        # Calculate tempo in beats per minute (BPM)
        tempo = mido.tempo2bpm(msg.tempo)

# Print extracted notes, key signature, and tempo
print("Notes:", notes)
print("Key Signature:", key_signature)
print("Tempo (BPM):", tempo)
