from sqlalchemy import LargeBinary
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    """
    Base class for declarative models.
    """


class User(DeclarativeBase):
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


class Recordings(Base):
    """
    Recordings class representing audio recordings in the database.

    Attributes:
        recording_id (int): The unique identifier for the recording.
        name (str): The name of the recording.
        user_id (int): The user ID associated with the recording.
    """

    __tablename__ = "recordings"
    recording_id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    user_id: Mapped[int]

    def __repr__(self):
        """
        Return a string representation of the Recording object.
        """
        return f"<Recording(recording_id='{self.recording_id}', name='{self.name}', user_id='{self.user_id}'>"


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
    recording_id: Mapped[int]
    midi_data: Mapped[LargeBinary]

    def __repr__(self):
        """
        Return a string representation of the MIDI object.
        """
        return f"<MIDI(midi_id='{self.midi_id}', recording_id='{self.recording_id}', midi_data='{self.midi_data}'>"
