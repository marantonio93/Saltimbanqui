from fastapi import APIRouter
from fastapi.responses import JSONResponse
from utils.jwt_manager import create_token
from schemas.user import User

user_router = APIRouter()

@user_router.post('/login', tags=['auth'])
def login(user: User):
    print("Email recibido:", user.email)
    print("Contraseña recibida:", user.password)
    if user.email == "admin@gmail.com" and user.password == "admin" :
        token: str = create_token(user.model_dump())
        return JSONResponse(status_code=200, content=token)