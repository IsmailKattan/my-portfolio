from pydantic import BaseModel
from typing import Optional


class PersonalInfoBase(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    location: Optional[str] = None


class PersonalInfoCreate(PersonalInfoBase):
    pass


class PersonalInfoUpdate(PersonalInfoBase):
    pass


class PersonalInfoResponse(PersonalInfoBase):
    id: int
    
    class Config:
        from_attributes = True


class EducationBase(BaseModel):
    degree: str
    institution: str
    year: str


class EducationCreate(EducationBase):
    pass


class EducationUpdate(EducationBase):
    pass


class EducationResponse(EducationBase):
    id: int
    
    class Config:
        from_attributes = True


class SkillBase(BaseModel):
    name: str


class SkillCreate(SkillBase):
    pass


class SkillResponse(SkillBase):
    id: int
    
    class Config:
        from_attributes = True


class CVDataResponse(BaseModel):
    personal_info: Optional[PersonalInfoResponse] = None
    education: list[EducationResponse]
    skills: list[SkillResponse]
