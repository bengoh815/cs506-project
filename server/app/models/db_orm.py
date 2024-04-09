from sqlalchemy import LargeBinary, DateTime
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


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
        midi_data (LargeBinary): The MIDI data.
    """

    __tablename__ = "midis"
    midi_id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str]
    date: Mapped[DateTime]
    midi_data: Mapped[LargeBinary]

    def __repr__(self):
        """
        Return a string representation of the MIDI object.
        """
        return f"<MIDI(midi_id='{self.midi_id}', recording_id='{self.recording_id}', midi_data='{self.midi_data}'>"
