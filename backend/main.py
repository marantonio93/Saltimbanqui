from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from config.database import engine, Base
from middlewares.errror_handler import ErrorHandler
from routers.event import event_router
from routers.user import user_router

app = FastAPI()
app.title = "Mi aplicación con FastAPI"
app.version = "0.0.1"

origins = [
    "http://localhost:8081",
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
app.include_router(user_router)

Base.metadata.create_all(bind=engine)

events = [
    {
        "id": 1,
        "title": "BananenReiferei",
        "description": "Bailen de lujo",
        "date": "31 may 2024",
        "place": "weisenwiesentrasse 34",
        "city": "Barcelona",
        "organizer": "Marco Blandon",
        "price": 15
    },
    {
        "id": 2,
        "title": "BananenReiferei",
        "description": "Tanzen Salsa",
        "date": "15 may 2024",
        "place": "weisenwiesentrasse 34",
        "city": "Zurich",
        "organizer": "Marco Blandon",
        "price": 15
    },
]

@app.get('/', tags=['home'])
def message():
    return HTMLResponse('<h1>Hello world</h1>')