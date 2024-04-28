import pytest
import conversion


@pytest.fixture
def wav_sample():
    # Fixture to provide a sample wav audio file for testing
    return "audio_sample/sample1.wav"


def test_file_acceptance(wav_sample):

    # Sample files with acceptable extension
    wav_conversion = conversion(wav_sample)
    m4a_conversion = conversion("audio_sample/sample2.m4a")
    mp3_conversion = conversion("audio_sample/sample3.mp3")

    # Sample files without acceptable extension
    flac_conversion = conversion("audio_sample/sample4.flac")

    # Assert audio files with extension wav, mp3 and m4a can be converted to MIDI
    assert wav_conversion is not None
    assert m4a_conversion is not None
    assert mp3_conversion is not None

    # Assert audio files other than extension wav, mp3 and m4a cannot be converted to MIDI
    assert flac_conversion is None


def test_midi_existence(wav_sample):

    # Convert the sample audio file to MIDI
    midi_output = conversion(wav_sample)

    # Assert the MIDI output meets expectations
    assert midi_output is not None
    assert len(midi_output.notes) > 0


def test_midi_accuracy(wav_sample):

    return None
