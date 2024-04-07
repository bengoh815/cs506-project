from sqlalchemy import create_engine, Column, Integer, String, LargeBinary
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.connection_string import MYSQL_CONNECTION_STRING

Base = declarative_base()


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String)

    def __repr__(self):
        return f"<User(name='{self.name}', fullname='{self.fullname}', password='{self.password}'>"


class Recordings(Base):
    __tablename__ = "recordings"
    recording_id = Column(Integer, primary_key=True)
    name = Column(String)
    user_id = Column(Integer)

    def __repr__(self):
        return f"<User(name='{self.name}', fullname='{self.fullname}', password='{self.password}'>"


class MIDIs(Base):
    __tablename__ = "midis"
    midi_id = Column(Integer, primary_key=True)
    recording_id = Column(Integer)
    midi_data = Column(LargeBinary)

    def __repr__(self):
        return f"<User(name='{self.name}', fullname='{self.fullname}', password='{self.password}'>"
