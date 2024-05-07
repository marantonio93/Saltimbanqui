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
    music = relationship("MusicType", secondary = event_musicType_table, back_populates="events", lazy="joined" )

class MusicType(Base):
    __tablename__ = "music_types"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    events = relationship("Event", secondary=event_musicType_table, back_populates = "music") 
