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
from sqlalchemy import LargeBinary
from sqlalchemy.orm import Mapped, mapped_column


class MIDI(db.Model):
    __tablename__ = "MIDIs"
    midi_id: Mapped[int] = mapped_column(primary_key=True)
    recording_id: Mapped[int]
    midi_data = db.Column(LargeBinary, nullable=False)

    def __repr__(self):
        """
        Return a string representation of the MIDI object.
        """
        return f"<MIDI(midi_id='{self.midi_id}', recording_id='{self.recording_id}', midi_data='{self.midi_data}'>"
