""" from typing import List
from config.database import Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship, Mapped, mapped_column
from models.event import Event, event_musicType_table


class MusicType(Base):
    __tablename__ = "music_types"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[List[Event]] = relationship( secondary=event_musicType_table, back_populates="music_type") """
