import numpy as np
import scipy.signal
import librosa
from mido import MidiFile, MidiTrack, MetaMessage, Message
import math

# Load audio file using librosa
y, sr = librosa.load("audio_sample/sample.wav")


# Set min and max frequencies for pitch detection
fmin = librosa.note_to_hz("C2")
fmax = librosa.note_to_hz("C7")

# Perform pitch detection to identify dominant pitch
pitch = librosa.yin(y=y, sr=sr, fmin=fmin, fmax=fmax)

# Find the most frequent pitch
dominant_pitch_index = np.argmax(pitch)

# Convert the detected pitch to frequency
dominant_frequency = librosa.midi_to_hz(dominant_pitch_index)


# Map MIDI note number to key signature
def midi_to_key_signature(midi_note):
    key_map = {
        0: "C",
        1: "C#",
        2: "D",
        3: "D#",
        4: "E",
        5: "F",
        6: "F#",
        7: "G",
        8: "G#",
        9: "A",
        10: "A#",
        11: "B",
    }
    return key_map[midi_note % 12]


# Determine the key signature
key_signature = midi_to_key_signature(int(librosa.hz_to_midi(dominant_frequency)))


# obtain bpm
tempo, beat_frames = librosa.beat.beat_track(y=y, sr=sr)

# obtain time
beat_times = librosa.frames_to_time(beat_frames, sr=sr)


# Function to divide array into segments with variable length based on BPM
def divide_y_variable(array, bpm):
    # Calculate the duration of one beat in seconds
    beat_duration = 60 / bpm

    # Calculate the desired length of each segment based on the beat duration
    desired_len = int(sr * beat_duration * 2)

    # Loop through the array and yield segments of the desired length
    for i in range(0, len(array), desired_len):
        yield array[i : i + desired_len]


# Divide audio into segments with variable length based on BPM
trimmed_frequency = list(divide_y_variable(y, tempo))


# analyze frequency for each time frame
frequency_list = []

# STFT Parameters
window_size = 2048  # Window size
hop_length = 512  # Hop length

# Compute STFT for each segment
for frequency in trimmed_frequency:

    # Adjust nperseg and noverlap based on the length of the segment
    nperseg = min(len(frequency), window_size)
    noverlap = nperseg - hop_length
    _, _, Zxx = scipy.signal.stft(frequency, fs=sr, nperseg=nperseg, noverlap=noverlap)

    # Sum across time axis to get magnitude spectrum
    magnitude_spectrum = np.abs(Zxx).mean(axis=1)

    # Convert to frequency domain
    freq_bins = np.fft.fftfreq(len(magnitude_spectrum)) * sr

    # Weighted mean frequency
    mean_freq = np.sum(freq_bins * magnitude_spectrum) / np.sum(magnitude_spectrum)
    frequency_list.append(mean_freq)


# Calculate MIDI notes
midi_note = []

# filter out invalid frequencies
filtered_frequency_list = [freq for freq in frequency_list if freq > 0]
midi_note = [
    (int(12 * math.log(freq / 440.0) / math.log(2)) + 69)
    for freq in filtered_frequency_list
]


# Create a new MIDI file and track
midi = MidiFile()
track = MidiTrack()
midi.tracks.append(track)

# Set the key signature meta message
key_sig_message = MetaMessage("key_signature", key=key_signature, time=0)
track.append(key_sig_message)

# Define velocity for MIDI messages
velocity = 100

# Calculate MIDI time based on tempo
midi_time = [
    (beat_times[i] - beat_times[i - 1]) * 60 / tempo for i in range(1, len(beat_times))
]

# Reverse the time list
midi_new_time = list(reversed(midi_time))

# Create MIDI messages
for note, time in zip(midi_note, midi_new_time):
    if note > 0:
        # Write MIDI message and append to the MIDI track
        message_on = Message(
            "note_on", note=note, velocity=velocity, time=int(round(time * 1000))
        )
        message_off = Message(
            "note_off", note=note, velocity=velocity, time=int(round(time * 1000))
        )
        track.append(message_on)
        track.append(message_off)

# Save MIDI file
midi_file_name = "midi_output/sample.mid"
midi.save(midi_file_name)
