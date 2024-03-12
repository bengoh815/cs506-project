################################################################################
# Filename: audio_conversion.py
# Purpose:  Convert mp3 and m4a files into wav, and convert wav file to MIDI
#           files.
# Author:   Livia Chandra
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

from pydub import AudioSegment as auseg
import wave
import aubio
import numpy as np
import mido
from mido import MidiFile, MidiTrack, Message
import midi_model as mm

def convert_to_midi(audio):
    """
    Function that convert all audio files into WAV files and return MIDI object.

    Args:
        audio (String): Path to the audio file that in the format of mp3, m4a and wav

    Returns:
        midi: MIDI object that storing the audio file info in MIDI
    """

    available_extension = ['m4a', 'mp3', 'wav']

    # Get the name and the extension type of the audio file
    file_name, extension = audio.split(".")

    # Check the extension of the audio file
    if extension not in available_extension:
        return None

    # Convert audio files other to wav file
    wav_file = auseg.from_file(audio, extension).export(
        file_name + ".wav", format = "wav"
    )

    # Convert wav files into MIDI file
    midi_file_name = file_name + '.mid'
    midi = wav_to_midi(wav_file, midi_file_name)

    # Create midi object
    midi_obj = mm.MIDI(0, 0, midi)

    return midi_obj



def wav_to_midi(wav_file, midi_file):
    """
    Helper function to help converting WAV files to MIDI files.

    Args:
        wav_file (String): Path to the wav audio file as input for conversion
        midi_file (String): Desired output MIDI file name

    Returns:
        midi: MIDI object that storing the audio file info in MIDI
    """

    # Read wav file for sample rate and number of frames
    with wave.open(wav_file, 'rb') as wav:
        params = wav.getparams()

    #_wave_params(nchannels=2, sampwidth=2, framerate=44100, nframes=845568, comptype='NONE', compname='not compressed')

    # Initialize aubio pitch detection
    frame_rate = params.framerate
    window_size = 4096
    hop_size = 512
    pitches = aubio.pitch("default", window_size, hop_size, frame_rate)
    pitches.set_unit("midi")

    # Open the audio file
    s = aubio.source(audio_file, frame_rate, hop_size)

    # Create a new MIDI file and track
    midi = MidiFile()
    track = MidiTrack()
    midi.tracks.append(track)

    # Process the audio and extract MIDI notes    
    while True:
        samples, curr_size = s()
        pitch = pitches(samples)[0]

        # Add MIDI notes only with a positive pitch value
        if p > 0:  
            midi_note = int(round(pitch))

            # Write MIDI message and append to the MIDI track
            message_on = Message("note_on", note = midi_note, velocity = 64, time = 0)
            message_off = Message("note_off", note = midi_note, velocity = 64, time = 128)
            
            track.append(message_on)
            track.append(message_off)
        
        if curr_size < hop_size:
            break

    # Save the MIDI file
    midi.save(midi_file)

    return midi
