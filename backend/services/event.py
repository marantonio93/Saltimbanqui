from models.event import Event as EventModel
from models.event import MusicType as MusicTypeModel
from schemas.event import Event
from sqlalchemy import asc, or_
from datetime import datetime

class EventService():

    def __init__(self, db) -> None:
        self.db = db
    
    def get_allEvents(self):
        current_date = datetime.now()
        result = self.db.query(EventModel).order_by(asc(EventModel.date)).all()
        return result

    def get_events(self):
        current_date = datetime.now()
        result = self.db.query(EventModel).filter(EventModel.date >= current_date).order_by(asc(EventModel.date)).all()
        return result
    
    def get_event(self, id):
        result = self.db.query(EventModel).filter(EventModel.id == id).first()
        return result
    
    def create_event(self, event: Event, music_ids: list):
        new_event = EventModel(**event.model_dump())
        musicresults = []
        for music_id in music_ids:
            musicresult = self.db.query(MusicTypeModel).filter(MusicTypeModel.id == music_id).first()
            if musicresult:
                musicresults.append(musicresult)
        new_event.music = musicresults
        self.db.add(new_event)
        self.db.commit()
        return
    
    def update_event(self, id: int, data: Event):
        event = self.db.query(EventModel).filter(EventModel.id == id).first()
        event.title = data.title
        event.description = data.description
        event.date = data.date
        event.place = data.place
        event.street = data.street
        event.city = data.city
        event.organizer = data.organizer
        event.price_type = data.price_type
        event.price_amount = data.price_amount

        self.db.commit()
        return
    
    def delete_event(self, id: int):
        self.db.query(EventModel).filter(EventModel.id == id).delete()
        self.db.commit()
        return