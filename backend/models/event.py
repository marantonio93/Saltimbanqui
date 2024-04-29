from config.database import Base
from sqlalchemy import Column, Integer, String, Float

class Event (Base):

    __tablename__ = "events"

    id = Column (Integer, primary_key = True)
    title = Column (String)
    description = Column (String)
    place = Column (String)
    city = Column (String)
    date = Column (String)
    organizer = Column (String)
    price = Column (Float)