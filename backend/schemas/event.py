from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import date
from enum import Enum
from models.event import Event as EventModel

class PriceType(str, Enum):
    FREE = "FREE"
    ADMISSION = "ADMISSION"
    CONSUMPTION = "CONSUMPTION"

class Event(BaseModel):
    id: Optional[int] = None
    title: str = Field(min_length=5, max_length=30)
    description: str = Field(min_Length=10, max_length=50)
    date: date
    place: str
    street: str
    city: str
    organizer: Optional [str]
    price_type: PriceType
    price_amount: Optional[float]


    class Config:
        json_schema_extra = {
            "example": {
                "title": "Titulo del evento",
                "description": "Descripción de el evento",
                "date": "2025-06-15",
                "place": "Nombre del local",
                "street": "Calle y Nº",
                "city": "Ciudad",
                "organizer": "Tu",
                "price_type": "ADMISSION",
                "price_amount": 10.0            }
        }
