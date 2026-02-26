from sqlalchemy import Column, Integer, String, Text, JSON
from app.models.base import Base


class Project(Base):
    __tablename__ = "projects"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    cover_image = Column(String(500), nullable=True)
    description = Column(Text, nullable=False)
    category = Column(String(100), nullable=False)
    tags = Column(JSON, default=list)
    demo_url = Column(String(500), nullable=True)
    repo_url = Column(String(500), nullable=True)
    content_language = Column(String(10), nullable=False, server_default="en")
