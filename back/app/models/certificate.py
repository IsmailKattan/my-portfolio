from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.models.base import Base


class Certificate(Base):
    __tablename__ = "certificates"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    issuer = Column(String(255), nullable=False)
    date = Column(Date, nullable=False)
    credential_url = Column(String(500), nullable=True)
    content_language = Column(String(10), nullable=False, server_default="en")
    parent_id = Column(Integer, ForeignKey("certificates.id"), nullable=True)
    
    parent = relationship("Certificate", remote_side=[id], back_populates="sub_certificates")
    sub_certificates = relationship("Certificate", back_populates="parent", cascade="all, delete-orphan")
