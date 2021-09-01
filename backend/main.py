from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models.request_bodies import UpdateCharacterBody, UpdateModalBody
from models.person import Person

import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
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
    global current_character
    character_id = current_character.name.lower()
    current_character = all_characters[character_id]
    return current_character

@app.post("/current-character")
async def update_current_character(body: UpdateCharacterBody):
    global current_character
    current_character = all_characters[body.name]
    return current_character

@app.get("/modal")
async def get_modal_content():
    return { "modal": modalText}

@app.post("/modal")
async def update_modal(body: UpdateModalBody):
    global modalText
    modalText = body[body.text]
    return modalText