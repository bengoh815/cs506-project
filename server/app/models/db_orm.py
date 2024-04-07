from sqlalchemy import LargeBinary
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


# declarative base class
class Base(DeclarativeBase):
    pass


class User(DeclarativeBase):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    email: Mapped[str]

    def __repr__(self):
        return f"<User(id='{self.id}', name='{self.name}', email='{self.email}'>"


class Recordings(Base):
    __tablename__ = "recordings"
    recording_id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    user_id: Mapped[int]

    def __repr__(self):
        return f"<Recording(recording_id='{self.recording_id}', name='{self.name}', user_id='{self.user_id}'>"


class MIDIs(Base):
    __tablename__ = "midis"
    midi_id: Mapped[int] = mapped_column(primary_key=True)
    recording_id: Mapped[int]
    midi_data: Mapped[LargeBinary]

    def __repr__(self):
        return f"<MIDI(midi_id='{self.midi_id}', recording_id='{self.recording_id}', midi_data='{self.midi_data}'>"
