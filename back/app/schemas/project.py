from pydantic import BaseModel
from typing import Optional


class ProjectBase(BaseModel):
    name: str
    cover_image: Optional[str] = None
    description: str
    category: str
    tags: list[str] = []
    demo_url: Optional[str] = None
    repo_url: Optional[str] = None
    content_language: str = "en"


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    cover_image: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[list[str]] = None
    demo_url: Optional[str] = None
    repo_url: Optional[str] = None
    content_language: Optional[str] = None


class ProjectResponse(ProjectBase):
    id: int
    
    class Config:
        from_attributes = True
