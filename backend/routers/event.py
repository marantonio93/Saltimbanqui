from fastapi import APIRouter
from fastapi import Path, Query
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from typing import List
from models.event import Event as EventModel
from models.event import MusicType as MusicTypeModel
from schemas.event import Event
from schemas.music_type import MusicType
from services.event import EventService
from config.database import Session


event_router = APIRouter()

@event_router.get('/events', tags = ['events'], response_model= List[Event], status_code=200 )
def get_events() -> List[Event]:
    db = Session()
    result = EventService(db).get_events()
    return JSONResponse(status_code=200, content=jsonable_encoder(result))

@event_router.get('/events/{id}', tags = ['events'], response_model=Event)
def get_event(id: int) -> Event:
    db = Session()
    result = EventService(db).get_event(id)
    if not result:
        return JSONResponse(status_code = 404, content={'message': 'No encontrado'})
    return JSONResponse(status_code=200, content=jsonable_encoder(result))

@event_router.get('/events/', tags=['events'], response_model= List[Event])
def get_events_by_city(city: str) -> Event:
    db = Session()
    result = EventService(db).get_event_by_city(city)
    if not result:
        return JSONResponse(status_code = 404, content={'message': 'Ningún evento en esta ciudad'})
    return JSONResponse(content=[jsonable_encoder(result)])

@event_router.post('/events', tags=['events'], response_model=dict, status_code=201)
def create_event( event: Event, music_ids: list[int]) -> dict:        
    db = Session()
    EventService(db).create_event(event, music_ids)
    return JSONResponse(status_code=201, content={"message": "Se ha registrado el evento"})


@event_router.put('/events/{id}', tags = ['eventsConAlma'], response_model=dict, status_code=200)
def update_event(id: int, event: Event) -> dict:
    db = Session()
    result = EventService(db).get_event(id)
    if not result:
        return JSONResponse(status_code = 404, content={'message': 'No encontrado'})
    EventService(db).update_event(id, event)
    db.commit() 
    return JSONResponse(status_code=200, content={"message": "Se ha modificado el evento"})


@event_router.delete('/events/{id}', tags=['events'], response_model=dict, status_code=200)
def delete_event(id: int) -> dict:
    db = Session()
    result: EventModel = db.query(EventModel).filter(EventModel.id == id).first()
    if not result:
        return JSONResponse(status_code = 404, content={'message': 'No encontrado'})
    EventService(db).delete_event(id)
    return JSONResponse(status_code=200, content={"message": "Se ha eliminado el evento"})