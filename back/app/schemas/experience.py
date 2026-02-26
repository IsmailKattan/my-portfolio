from pydantic import BaseModel
from typing import Optional


class ExperienceBase(BaseModel):
    position: str
    company: str
    duration: str
    responsibilities: list[str] = []
    content_language: str = "en"


class ExperienceCreate(ExperienceBase):
    pass


class ExperienceUpdate(ExperienceBase):
    position: Optional[str] = None
    company: Optional[str] = None
    duration: Optional[str] = None
    responsibilities: Optional[list[str]] = None
    content_language: Optional[str] = None


class ExperienceResponse(ExperienceBase):
    id: int
    
    class Config:
        from_attributes = True
