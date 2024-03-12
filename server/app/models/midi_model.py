################################################################################
# Filename: midi_model.py
# Purpose:  Define the Midi model for representing MIDI file data in the database.
# Author:   Benjamin Goh
#
# Description:
# This file contains the definition of the Midi class, which is used as a model
# to represent MIDI file data in the application's database. The class includes
# attributes corresponding to the MIDI file's properties, such as its ID and name.
#
# Usage (Optional):
# TBD
#
# Notes:
# The Midi class should be integrated with an ORM (Object-Relational Mapping)
# tool like SQLAlchemy to facilitate database interactions. Additional attributes
# and methods may be added to the class as needed to support the application's
# functionality.
#
###############################################################################

from app.database import db


class MIDI(db.Model):
    __tablename__ = "MIDIs"
    midi_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    recording_id = db.Column(db.Integer, nullable=False)
    midi_data = db.Column(db.LargeBinary, nullable=False)
