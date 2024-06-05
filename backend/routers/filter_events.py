from datetime import datetime
from fastapi import APIRouter, Query
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from typing import List
from schemas.event import Event
from schemas.music_type import MusicType
from services.filter_events import EventFilter
from config.database import Session

filter_events_router = APIRouter()

@filter_events_router.get('/filter/events/', tags=['filteredEvents'], response_model = List[Event])
def get_by_music(
    #music_types: str = Query(None),
    #city: str = Query(None),
    start_date: datetime = Query(None),
    end_date: datetime = Query(None),
    ) -> List[Event]:
    #music_types_list = music_types.split(',') if music_types else None 
    db = Session()
    result = EventFilter(db).get_by_music(start_date, end_date)
    #result = EventFilter(db).get_by_music(music_types_list, start_date, end_date, city)
    if not result:
        return JSONResponse(status_code = 404, content={'message': 'Ningún evento en estas fechas'})
    return JSONResponse(status_code=200, content=jsonable_encoder(result))

@filter_events_router.get('/filter/events/{title}', tags=['filteredEvents'], response_model = List[Event])
def get_events_by_search(title: str) -> Event:
    db = Session()
    result = EventFilter(db).get_events_by_search(title)
    if not result:
        return JSONResponse(status_code = 404, content={'message': 'No encontrado'})
    return JSONResponse(status_code=200, content=jsonable_encoder(result))
