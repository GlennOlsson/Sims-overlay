from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models.request_bodies import UpdateCharacterBody, UpdateModalBody
from models.person import Person

import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

f = open("characters.json")
characters_raw = json.load(f)

all_characters = {
    "albin": Person(**characters_raw["albin"]),
    "emilia": Person(**characters_raw["emilia"]),
    "oscar": Person(**characters_raw["oscar"]),
    "george": Person(**characters_raw["george"]),
}

current_character = all_characters["albin"]

money = 100
modalText = None

def get_character_from_list(name: str) -> Person:
    return all_characters[name]

@app.get("/")
async def root():
    return {"message": "Service is up and running"}

@app.get("/characters")
async def get_characters():
    return all_characters

@app.get("/characters/{name}")
async def get_character(name):
    return get_character_from_list(name)

@app.post("/characters/{name}")
async def update_character(name: str, person: Person):
    all_characters[name] = person
    return get_character_from_list(name)

@app.get("/current-character")
async def get_current_character():
    return current_character

@app.post("/current-character")
async def update_current_character(body: UpdateCharacterBody):
    global current_character
    current_character = all_characters[body.name]
    return current_character

@app.get("/money")
async def get_money():
    return { "money": money}

@app.get("/modal")
async def get_money():
    return { "modal": modalText}

@app.post("/modal")
async def update_modal(body: UpdateModalBody):
    global modalText
    modalText = body[body.text]
    return modalText