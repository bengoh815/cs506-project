################################################################################
# Filename: db_orm.py
# Purpose:  Define SQLAlchemy ORM models for User and MIDI tables.
# Author:   Darren Seubert
#
# Description:
# This file contains SQLAlchemy ORM models for the User and MIDI tables.
#
# Usage (Optional):
# This file is imported into other modules for database interactions.
#
# Notes:
# - The User class represents users in the database.
# - The MIDIs class represents MIDI data in the database.
# - The models are based on the Base class for declarative models.
#
################################################################################

from sqlalchemy import LargeBinary, DateTime
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import ForeignKey, PrimaryKeyConstraint
from datetime import datetime


class Base(DeclarativeBase):
    """
    Base class for declarative models.
    """


class User(Base):
    """
    User class representing users in the database.

    Attributes:
        id (int): The unique identifier for the user.
        name (str): The name of the user.
        email (str): The email address of the user.
    """

    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    email: Mapped[str]

    def __repr__(self):
        """
        Return a string representation of the User object.
        """
        return f"<User(id='{self.id}', name='{self.name}', email='{self.email}'>"


class MIDIs(Base):
    """
    MIDIs class representing MIDI data in the database.

    Attributes:
        midi_id (int): The unique identifier for the MIDI data.
        recording_id (int): The recording ID associated with the MIDI data.
        date (DateTime): The MIDI file generation date.
        midi_data (LargeBinary): The MIDI data.
    """

    __tablename__ = "midis"
    midi_id: Mapped[int] = mapped_column(primary_key=True)
    author_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    title: Mapped[str]
    date: Mapped[datetime]
    midi_data: Mapped[bytes]

    def __repr__(self):
        """
        Return a string representation of the MIDI object.
        """
        return f"<MIDI(midi_id='{self.midi_id}', title='{self.title}', date='{self.date}', midi_data='{self.midi_data}'>"
