################################################################################
# Filename: test_conversion.py
# Purpose:  Contains pytest test cases for audio conversion functions.
# Author:   Livia Chandra
#
# Description:
# This file contains pytest test cases for audio conversion functions,
# including tests for converting audio files to WAV format, dividing audio
# data into segments, and converting WAV files to MIDI format.
#
# Usage (Optional):
#
# Notes:
#
###############################################################################

import pytest

@pytest.fixture
def audio_files():
    # Fixture to provide sample audio files for testing
    files = {
        'mp3': "audio_sample/sample.mp3",
        'm4a': "audio_sample/sample.m4a",
        'wav': "audio_sample/sample.wav",
        'flac': "audio_sample/sample.flac"
    }
    return files

@pytest.fixture
def expected_midi_output():
    # Fixture to provide a sample midi file for testing
    return "audio_sample/sample.mid"

def test_audio_input(audio_files):

      # Valid test case 1 - mp3
    mp3_output = audio_to_wav(audio_files['mp3'])
    assert mp3_output is not None

    # Valid test case 2 - m4a
    m4a_output = audio_to_wav(audio_files['m4a'])
    assert m4a_output is not None

    # Valid test case 3 - wav
    wav_output = audio_to_wav(audio_files['wav'])
    assert wav_output is not None

    # Invalid test case - flac
    flac_output = audio_to_wav(audio_files['flac'])
    assert flac_output is None

# Test cases for divide_audio_data helper function
def test_divide_audio_data():

    # Audio data, sample rate and bpm setup
    sample_rate = 44100
    audio_data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    tempo = 120 

    # Expected output
    expected_num_segments = len(audio_data) // (sample_rate * 60 / tempo * 2) + 1

    segments = list(divide_audio_data(audio_data, sample_rate, tempo))
    assert len(segments) == expected_num_segments

# Test cases for wav to midi conversion
def test_midi_conversion(audio_wav, expected_midi_output):

    # Pass in wav file for midi conversion
    midi_file = wav_to_midi(audio_wav)
    assert midi_file == expected_midi_output