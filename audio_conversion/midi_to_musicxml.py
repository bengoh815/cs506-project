################################################################################
# Filename: midi_to_xml.py
# Purpose:  Convert MIDI file to MusicXML for sheet music.
# Author:   Darren Seubert
#
# Description:
# This script converts a MIDI file into a MusicXML file suitable for sheet music
# using the music21 library.
#
# Usage:
# Run this script with the path to the MIDI file as an argument.
# Ensure that the music21 library is installed in your Python environment.
#
################################################################################

from music21 import converter
from io import StringIO


def midi_to_musicxml(midi_file):
    """
    Convert MIDI file to MusicXML format and return as a string.

    Args:
        midi_file (str): The path to the MIDI file.

    Returns:
        str: The MusicXML content as a string.
    """
    # Load MIDI file
    score = converter.parse(midi_file)

    # Convert MIDI to MusicXML using an in-memory file-like object
    musicxml_data = StringIO()
    score.write("musicxml", fp=musicxml_data)

    # Return the content of the MusicXML
    musicxml_data.seek(0)  # Rewind the StringIO object to the beginning
    return musicxml_data.read()
