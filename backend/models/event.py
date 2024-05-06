from config.database import Base
from sqlalchemy import Column, Integer, String, Float, Enum, Date, Table, ForeignKey
from sqlalchemy.orm import relationship
from enum import Enum as PydanticEnum
from models.music_type import MusicType

class PriceType(PydanticEnum):
    FREE = "FREE"
    ADMISSION = "ADMISSION"
    CONSUMPTION = "CONSUMPTION"

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