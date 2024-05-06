from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from config.database import engine, Base
from middlewares.errror_handler import ErrorHandler
from routers.event import event_router
from routers.music_type import music_type_router
from routers.user import user_router


app = FastAPI()
app.title = "Mi aplicación con FastAPI"
app.version = "0.0.1"

origins = [
    "http://localhost:8081",
    "exp://192.168.1.253:8081",
    "http://192.168.1.253:8081",
    "http://192.168.1.182:8081",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(ErrorHandler)
app.include_router(event_router)
app.include_router(music_type_router)
app.include_router(user_router)

Base.metadata.create_all(bind=engine)


@app.get('/', tags=['home'])
def message():
    return HTMLResponse('<h1>Hello world</h1>')