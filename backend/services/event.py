from models.event import Event as EventModel
from schemas.event import Event


class EventService():

    def __init__(self, db) -> None:
        self.db = db

    def get_events(self):
        result = self.db.query(EventModel).all()
        return result
    
    def get_event(self, id):
        result = self.db.query(EventModel).filter(EventModel.id == id).first()
        return result
    
    def get_event_by_city(self, city):
        result = self.db.query(EventModel).filter(EventModel.city == city).all()
        return result
    
    def create_event(self, event: Event):
        new_event = EventModel(**event.model_dump())
        self.db.add(new_event)
        self.db.commit()
        return
    
    def update_event(self, id: int, data: Event):
        event = self.db.query(EventModel).filter(EventModel.id == id).first()
        event.title = data.title
        event.description = data.description
        event.date = data.date
        event.place = data.place
        event.city = data.city
        event.organizer = data.organizer
        event.price = data.price
        self.db.commit()
        return
    
    def delete_event(self, id: int):
        self.db.query(EventModel).filter(EventModel.id == id).delete()
        self.db.commit()
        return