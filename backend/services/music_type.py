from models.event import MusicType as MusicTypeModel
from models.event import MusicType as MusicTypeModel
from schemas.music_type import MusicType


class MusicTypeService():

    def __init__(self, db) -> None:
        self.db = db

    def get_music_types(self):
        result = self.db.query(MusicTypeModel).all()
        return result
    
    def get_music_type(self, id):
        result = self.db.query(MusicTypeModel).filter(MusicTypeModel.id == id).first()
        return result
    
    def get_music_type_by_name(self, name):
        result = self.db.query(MusicTypeModel).filter(MusicTypeModel.name == name).all()
        return result
    
    def create_music_type(self, music_type: MusicType):
        new_music_type = MusicTypeModel(**music_type.model_dump())
        self.db.add(new_music_type)
        self.db.commit()
        self.db.refresh(new_music_type)
        return new_music_type

    def update_music_type(self, id: int, data: MusicType):
        music_type = self.db.query(MusicTypeModel).filter(MusicTypeModel.id == id).first()
        music_type.name = data.name
        self.db.commit()
        return

    def delete_music_type_by_name(self, name: str) -> None:
        self.db.query(MusicTypeModel).filter(MusicTypeModel.name == name).delete()
        self.db.commit()