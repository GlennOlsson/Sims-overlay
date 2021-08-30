from pydantic import BaseModel

class UpdateCharacterBody(BaseModel):
    name: str

class UpdateModalBody(BaseModel):
    text: str