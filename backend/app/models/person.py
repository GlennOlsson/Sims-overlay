from pydantic import BaseModel

class Needs(BaseModel):
    hunger: int
    comfort: int
    bladder: int
    energy: int
    fun: int
    social: int
    hygiene: int
    environment: int

class Person(BaseModel):
    name: str
    money: int
    needs: Needs
    

