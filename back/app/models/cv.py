from sqlalchemy import Column, Integer, String, Text
from app.models.base import Base


class PersonalInfo(Base):
    __tablename__ = "personal_info"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=True)
    location = Column(String(255), nullable=True)


class Education(Base):
    __tablename__ = "education"
    
    id = Column(Integer, primary_key=True, index=True)
    degree = Column(String(255), nullable=False)
    institution = Column(String(255), nullable=False)
    year = Column(String(50), nullable=False)


class Skill(Base):
    __tablename__ = "skills"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, unique=True)
