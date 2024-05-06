from fastapi import APIRouter, HTTPException
from fastapi import Path, Query
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from typing import List
from models.music_type import MusicType as MusicTypeModel
from schemas.music_type import MusicType
from services.music_type import MusicTypeService
from config.database import Session

music_type_router = APIRouter()

@music_type_router.get('/music_types', tags=['music_type'], response_model=List[MusicType], status_code=200)
def get_music_types() -> List[MusicType]:
    db = Session()
    result = MusicTypeService(db).get_music_types()
    return JSONResponse(status_code=200, content=jsonable_encoder(result))

@music_type_router.get('/music_types/{id}', tags = ['music_type'], response_model=MusicType)
def get_music_type(id: int) -> MusicType:
    db = Session()
    result = MusicTypeService(db).get_music_type(id)
    if not result:
        return JSONResponse(status_code = 404, content={'message': 'No encontrado'})
    return JSONResponse(status_code=200, content=jsonable_encoder(result))

@music_type_router.get('/music_types/', tags = ['music_type'], response_model=List[MusicType])
def get_music_type_by_name(name: str) -> MusicType:
    db = Session()
    result = MusicTypeService(db).get_music_type_by_name(name)
    if not result:
        return JSONResponse(status_code = 404, content={'message': 'No encontrado'})
    return JSONResponse(status_code=200, content=jsonable_encoder(result))


@music_type_router.post("/music_types",tags=['music_type'], response_model=MusicType, status_code=201)
def create_music_type(music_type: MusicType) -> dict:
    db = Session()
    MusicTypeService(db).create_music_type(music_type)
    return JSONResponse(status_code=201, content={"message": "Se ha registrado el tipo de musica"})

@music_type_router.put("/music_types/{id}", tags=['music_type'], response_model=MusicType, status_code=200)
def update_music_type(id: int, music_type: MusicType) -> dict:
    db = Session()
    result = MusicTypeService(db).get_music_type(id)
    if not result:
        return JSONResponse(status_code = 404, content={'message': 'No encontrado'})
    MusicTypeService(db).update_music_type(id, music_type)
    db.commit() 
    return JSONResponse(status_code=200, content={"message": "Se ha modificado el tipo de musica"})