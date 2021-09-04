from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models.request_bodies import UpdateCharacterBody, UpdateEverythingBody, UpdateModalBody
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
    "isabel": Person(**characters_raw["isabel"]),
    "agnes": Person(**characters_raw["agnes"]),
}

selected_character = all_characters["albin"]
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
async def get_selected_character():
    global selected_character
    character_id = selected_character.name.lower()
    selected_character = all_characters[character_id]
    return selected_character

@app.post("/current-character")
async def update_selected_character(body: UpdateCharacterBody):
    global selected_character
    selected_character = all_characters[body.name]
    return selected_character

@app.get("/modal")
async def get_modal_content():
    return { "modal": modalText }

@app.post("/modal")
async def update_modal(body: UpdateModalBody):
    global modalText
    modalText = body.text
    return { "modal": modalText }

@app.get("/everything")
async def get_everything():
    return {
        "selected_character": selected_character.name.lower(),
        "characters": all_characters
    }

@app.post("/everything")
async def update_everything(body: UpdateEverythingBody):
    global all_characters, selected_character

    all_characters = {}
    for char in body.characters:
        all_characters[char] = Person(**body.characters[char])

    selected_character = all_characters[body.selected_character]
    return {
        "selected_character": selected_character.name.lower(),
        "characters": all_characters
    }