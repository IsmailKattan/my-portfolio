from pydantic import BaseModel
from datetime import date
from typing import Optional, List


class CertificateBase(BaseModel):
    name: str
    issuer: str
    date: date
    credential_url: Optional[str] = None
    content_language: str = "en"


class CertificateCreate(CertificateBase):
    parent_id: Optional[int] = None


class CertificateUpdate(BaseModel):
    name: Optional[str] = None
    issuer: Optional[str] = None
    date: Optional[date] = None
    credential_url: Optional[str] = None
    parent_id: Optional[int] = None
    content_language: Optional[str] = None


class CertificateResponse(CertificateBase):
    id: int
    parent_id: Optional[int] = None
    sub_certificates: List['CertificateResponse'] = []
    
    class Config:
        from_attributes = True


# Forward reference resolution
CertificateResponse.model_rebuild()
