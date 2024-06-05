from models.event import Event as EventModel
from sqlalchemy import or_
from models.event import MusicType

class EventFilter():

    def __init__(self, db) -> None:
        self.db = db

    def get_by_music(self, start_date, end_date):
        result = self.db.query(EventModel)
        if start_date:
            result = result.filter(EventModel.date >= start_date )
        if end_date:
            result = result.filter(EventModel.date <= end_date)
        result = result.all()
        return result
    
    def get_events_by_search(self, title):
        search_term = f"%{title}%"
        result = self.db.query(EventModel).filter(or_(EventModel.title.ilike(search_term))).all()
        return result
    
"""     def get_by_music(self, music_types_list, start_date, end_date, city):
        result = self.db.query(EventModel)
        if music_types_list:
            result = result.filter(EventModel.music.any(MusicType.name.in_(music_types_list)))
        if start_date:
            result = result.filter(EventModel.date >= start_date)
        if end_date:
            result = result.filter(EventModel.date <= end_date)
        if city:
            result = result.filter(EventModel.city == city)
        
        result = result.all()
        
        return result """

    # Función para filtrar los eventos en base a los criterios proporcionados
"""      def get_filter_events(self, filters: EventFilter):
        query = self.db.query(EventModel)
        
        # Aplica los filtros si se proporcionan
        if filters.date_start:
            query = query.filter(EventModel.date >= filters.date_start)
        
        if filters.date_end:
            query = query.filter(EventModel.date <= filters.date_end)
        
        if filters.city_filter:
            query = query.filter(EventModel.city == filters.city_filter)
        
        if filters.music_filter:
            query = query.filter(EventModel.music.any(name=filters.music_filter))
        
        return query.all() """


