from sqlalchemy import Column, Integer, String, Text, JSON
from app.models.base import Base


class Experience(Base):
    __tablename__ = "experiences"
    
    id = Column(Integer, primary_key=True, index=True)
    position = Column(String(255), nullable=False)
    company = Column(String(255), nullable=False)
    duration = Column(String(100), nullable=False)
    responsibilities = Column(JSON, default=list)
    content_language = Column(String(10), nullable=False, server_default="en")
