from pydantic import BaseModel
from datetime import date
from typing import Optional


class BlogPostBase(BaseModel):
    name: str
    slug: str
    cover_image: Optional[str] = None
    description: str
    category: str
    tags: Optional[str] = None
    author: str
    published_date: date
    content: str
    content_language: str = "en"


class BlogPostCreate(BlogPostBase):
    pass


class BlogPostUpdate(BaseModel):
    name: Optional[str] = None
    slug: Optional[str] = None
    cover_image: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[str] = None
    author: Optional[str] = None
    published_date: Optional[date] = None
    content: Optional[str] = None
    content_language: Optional[str] = None


class BlogPostResponse(BlogPostBase):
    id: int
    
    class Config:
        from_attributes = True


class BlogPostListResponse(BaseModel):
    id: int
    name: str
    slug: str
    cover_image: Optional[str] = None
    description: str
    category: str
    tags: Optional[str] = None
    author: str
    published_date: date
    content_language: str = "en"
    
    class Config:
        from_attributes = True
