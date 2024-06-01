from typing import List
from config.database import Base
from sqlalchemy import Column, Integer, String, Float, Enum, Date, Table, ForeignKey
from sqlalchemy.orm import relationship, Mapped, mapped_column, DeclarativeBase
from enum import Enum as PydanticEnum

class PriceType(PydanticEnum):
    FREE = "FREE"
    ADMISSION = "ADMISSION"
    CONSUMPTION = "CONSUMPTION"

event_musicType_table = Table(
    "event_musicType_table",
    Base.metadata,
    Column("event_id", ForeignKey("events.id")),
    Column("musicType_id", ForeignKey("music_types.id")),
)

""" event_dj_table = Table(
    "event_dj_table",
    Base.metadata,
    Column("event_id", ForeignKey("events.id")),
    Column("dj_id", ForeignKey("djs.id")),
)

event_artist_table = Table(
    "event_artist_table",
    Base.metadata,
    Column("event_id", ForeignKey("events.id")),
    Column("artist_id", ForeignKey("artist.id")),
)

event_user_table = Table(
    "event_user_table",
    Base.metadata,
    Column("event_id", ForeignKey("events.id")),
    Column("user_id", ForeignKey("users.id")),
) """

class Event (Base):

    __tablename__ = "events"

    id = Column (Integer, primary_key = True)
    title = Column (String)
    description = Column (String)
    date = Column (Date)
    place = Column (String)
    street = Column (String)
    city = Column (String)
    organizer = Column (String)
    price_type = Column (Enum(PriceType))
    price_amount = Column (Float) 
    image = Column(String) 
    music = relationship("MusicType", secondary = event_musicType_table, back_populates="events", lazy="joined" )
"""     djs = relationship("DJ", secondary = event_dj_table, back_populates="events", lazy="joined" )
    artists = relationship("Artist", secondary = event_artist_table, back_populates="events", lazy="joined" )
    users = relationship("User", secondary = event_user_table, back_populates="events", lazy="joined" ) """

class MusicType(Base):
    __tablename__ = "music_types"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    events = relationship("Event", secondary=event_musicType_table, back_populates = "music") 

""" class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    surname = Column(String)
    email = Column(String)
    password = Column(String)
    events = relationship("Event", secondary=event_user_table, back_populates = "users") 

class DJ(Base):
    __tablename__ = "djs"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    instagram = Column(String)
    events = relationship("Event", secondary=event_dj_table, back_populates = "djs") 

class Artist(Base):
    __tablename__ = "artists"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    instagram = Column(String)
    events = relationship("Event", secondary=event_artist_table, back_populates = "artists")  """

