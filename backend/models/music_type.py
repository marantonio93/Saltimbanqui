from config.database import Base
from sqlalchemy import Column, Integer, String

class MusicType(Base):
    __tablename__ = "music_types"

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True)
