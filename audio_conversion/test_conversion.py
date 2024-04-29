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
from conversion import audio_to_wav, divide_audio_data, wav_to_midi

@pytest.fixture
def audio_mp3():
    # Fixture to provide a sample mp3 audio file for testing
    return "audio_sample/sample.mp3"

@pytest.fixture
def audio_m4a():
    # Fixture to provide a sample m4a audio file for testing
    return "audio_sample/sample.m4a"

@pytest.fixture
def audio_wav():
    # Fixture to provide a sample wav audio file for testing
    return "audio_sample/sample.wav"

@pytest.fixture
def audio_txt():
    # Fixture to provide a sample txt file for testing
    return "audio_sample/sample.txt"

@pytest.fixture
def expected_midi_output():
    # Fixture to provide a sample midi file for testing
    return "audio_sample/sample.mid"

# Test case 1 (mp3) for valid input
def test_valid_input(audio_mp3):
    input_data = audio_mp3
    file_extension = "mp3"
    output_audio = audio_to_wav(input_data, file_extension)
    assert output_audio is not None

# Test case 2 (wav) for valid input
def test_valid_input(audio_wav):
    input_data = audio_wav
    file_extension = "wav"
    output_audio = audio_to_wav(input_data, file_extension)
    assert output_audio is not None

# Test case 3 (m4a) for valid input
def test_valid_input(audio_m4a):
    input_data = audio_m4a
    file_extension = "m4a"
    output_audio = audio_to_wav(input_data, file_extension)
    assert output_audio is not None

# Test case for invalid extension
def test_invalid_extension(audio_txt):
    input_data = audio_txt
    file_extension = "txt"
    output_audio = audio_to_wav(input_data, file_extension)
    assert output_audio is None

# Test cases for divide_audio_data function
def test_divide_audio_data():

    # Audio data and sample rate setup
    sample_rate = 44100
    audio_data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    tempo = 120  # Beats per minute
    expected_num_segments = len(audio_data) // (sample_rate * 60 / tempo * 2) + 1

    segments = list(divide_audio_data(audio_data, sample_rate, tempo))
    assert len(segments) == expected_num_segments

# Test cases for wav_to_midi function
def test_wav_to_midi_valid_input(wav_file, expected_midi_file):
    midi_file = wav_to_midi(wav_file)
    assert midi_file == expected_midi_file
