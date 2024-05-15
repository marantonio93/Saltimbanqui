from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import date
from schemas.music_type import MusicType

# Modelo Pydantic para recibir los parámetros de filtrado
class EventFilter(BaseModel):
    date_start: Optional[date] = None
    date_end: Optional[date] = None
    city_filter: Optional[str] = None
    music_filter: Optional[list[str]] = []

    class Config:
        orm_mode = True


