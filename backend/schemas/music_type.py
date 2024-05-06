from pydantic import BaseModel
from typing import Optional

class MusicType(BaseModel):
    id: Optional[int] = None
    name: str

    class Config:
        json_schema_extra = {
            "example": {
                "name": "salsa"
            }
        }