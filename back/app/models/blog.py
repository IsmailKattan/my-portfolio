from sqlalchemy import Column, Integer, String, Text, Date
from app.models.base import Base


class BlogPost(Base):
    __tablename__ = "blog_posts"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    slug = Column(String(255), nullable=False, unique=True, index=True)
    cover_image = Column(String(500), nullable=True)
    description = Column(Text, nullable=False)
    category = Column(String(100), nullable=False)
    tags = Column(Text, nullable=True)  # Comma-separated tags
    author = Column(String(255), nullable=False)
    published_date = Column(Date, nullable=False)
    content = Column(Text, nullable=False)
    content_language = Column(String(10), nullable=False, server_default="en")
