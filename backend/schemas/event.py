from pydantic import BaseModel, Field
from typing import Optional


class Event(BaseModel):
    id: Optional[int] = None
    title: str = Field(min_length=5, max_length=30)
    description: str = Field(min_Length=10, max_length=50)
    date: str
    place: str
    city: str
    organizer: str
    price: float

    class Config:
        json_schema_extra = {
            "example": {
                "title": "Titulo del evento",
                "description": "Descripción de el evento",
                "date": "fecha del evento",
                "place": "Calle o Bar",
                "city": "Ciudad",
                "organizer": "You",
                "price": 10
            }
        }
