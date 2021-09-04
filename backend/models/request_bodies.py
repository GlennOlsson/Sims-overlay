from pydantic import BaseModel
from typing import List, Dict
from models.person import Person
class UpdateCharacterBody(BaseModel):
    name: str

class UpdateModalBody(BaseModel):
    text: str

class UpdateEverythingBody(BaseModel):
    selected_character: str
    characters: Dict