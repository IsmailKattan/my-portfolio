from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import date
import os
import shutil

from app.models.base import get_db
from app.models.user import User
from app.models.cv import PersonalInfo, Education, Skill
from app.models.experience import Experience
from app.models.project import Project
from app.models.certificate import Certificate
from app.models.blog import BlogPost

from app.schemas.cv import (
    PersonalInfoCreate, PersonalInfoResponse,
    EducationCreate, EducationResponse,
    SkillCreate, SkillResponse
)
from app.schemas.experience import ExperienceCreate, ExperienceUpdate, ExperienceResponse
from app.schemas.project import ProjectCreate, ProjectUpdate, ProjectResponse
from app.schemas.certificate import CertificateCreate, CertificateUpdate, CertificateResponse
from app.schemas.blog import BlogPostCreate, BlogPostUpdate, BlogPostResponse
from app.schemas.auth import LoginRequest, Token, UserCreate, UserResponse
from app.auth.security import verify_password, get_password_hash, create_access_token
from app.auth.dependencies import get_current_user

router = APIRouter(prefix="/api/admin", tags=["admin"])

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


# Auth endpoints
@router.post("/login", response_model=Token)
def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == request.username).first()
    if not user or not verify_password(request.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/users", response_model=UserResponse)
def create_user(
    user: UserCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    existing = db.query(User).filter(User.username == user.username).first()
    if existing:
        raise HTTPException(status_code=400, detail="Username already exists")
    
    db_user = User(
        username=user.username,
        hashed_password=get_password_hash(user.password)
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


# Image upload endpoint
@router.post("/upload")
def upload_image(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user)
):
    allowed_types = ["image/jpeg", "image/png", "image/webp", "image/gif"]
    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail="Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.")
    
    # Generate unique filename
    ext = os.path.splitext(file.filename)[1].lower()
    filename = f"{os.urandom(8).hex()}{ext}"
    filepath = os.path.join(UPLOAD_DIR, filename)
    
    # Save file
    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Return full URL
    return {"filename": filename, "url": f"/uploads/{filename}"}


# CV Admin endpoints
@router.put("/cv/personal-info", response_model=PersonalInfoResponse)
def update_personal_info(
    data: PersonalInfoCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    info = db.query(PersonalInfo).first()
    if info:
        for key, value in data.model_dump().items():
            setattr(info, key, value)
    else:
        info = PersonalInfo(**data.model_dump())
        db.add(info)
    db.commit()
    db.refresh(info)
    return info


@router.post("/cv/education", response_model=EducationResponse)
def create_education(
    data: EducationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    edu = Education(**data.model_dump())
    db.add(edu)
    db.commit()
    db.refresh(edu)
    return edu


@router.put("/cv/education/{edu_id}", response_model=EducationResponse)
def update_education(
    edu_id: int,
    data: EducationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    edu = db.query(Education).filter(Education.id == edu_id).first()
    if not edu:
        raise HTTPException(status_code=404, detail="Education not found")
    
    for key, value in data.model_dump().items():
        setattr(edu, key, value)
    db.commit()
    db.refresh(edu)
    return edu


@router.delete("/cv/education/{edu_id}")
def delete_education(
    edu_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    edu = db.query(Education).filter(Education.id == edu_id).first()
    if not edu:
        raise HTTPException(status_code=404, detail="Education not found")
    db.delete(edu)
    db.commit()
    return {"message": "Education deleted"}


@router.post("/cv/skills", response_model=SkillResponse)
def create_skill(
    data: SkillCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    skill = Skill(**data.model_dump())
    db.add(skill)
    db.commit()
    db.refresh(skill)
    return skill


@router.delete("/cv/skills/{skill_id}")
def delete_skill(
    skill_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    skill = db.query(Skill).filter(Skill.id == skill_id).first()
    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    db.delete(skill)
    db.commit()
    return {"message": "Skill deleted"}


# Experience Admin endpoints
@router.post("/experiences", response_model=ExperienceResponse)
def create_experience(
    data: ExperienceCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    exp = Experience(**data.model_dump())
    db.add(exp)
    db.commit()
    db.refresh(exp)
    return exp


@router.put("/experiences/{exp_id}", response_model=ExperienceResponse)
def update_experience(
    exp_id: int,
    data: ExperienceUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    exp = db.query(Experience).filter(Experience.id == exp_id).first()
    if not exp:
        raise HTTPException(status_code=404, detail="Experience not found")
    
    update_data = data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(exp, key, value)
    db.commit()
    db.refresh(exp)
    return exp


@router.delete("/experiences/{exp_id}")
def delete_experience(
    exp_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    exp = db.query(Experience).filter(Experience.id == exp_id).first()
    if not exp:
        raise HTTPException(status_code=404, detail="Experience not found")
    db.delete(exp)
    db.commit()
    return {"message": "Experience deleted"}


# Project Admin endpoints
@router.post("/projects", response_model=ProjectResponse)
def create_project(
    data: ProjectCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    project = Project(**data.model_dump())
    db.add(project)
    db.commit()
    db.refresh(project)
    return project


@router.put("/projects/{project_id}", response_model=ProjectResponse)
def update_project(
    project_id: int,
    data: ProjectUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    update_data = data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(project, key, value)
    db.commit()
    db.refresh(project)
    return project


@router.delete("/projects/{project_id}")
def delete_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    db.delete(project)
    db.commit()
    return {"message": "Project deleted"}


# Certificate Admin endpoints
@router.post("/certificates", response_model=CertificateResponse)
def create_certificate(
    data: CertificateCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    cert = Certificate(**data.model_dump())
    db.add(cert)
    db.commit()
    db.refresh(cert)
    return cert


@router.put("/certificates/{cert_id}", response_model=CertificateResponse)
def update_certificate(
    cert_id: int,
    data: CertificateUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    cert = db.query(Certificate).filter(Certificate.id == cert_id).first()
    if not cert:
        raise HTTPException(status_code=404, detail="Certificate not found")
    
    update_data = data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(cert, key, value)
    db.commit()
    db.refresh(cert)
    return cert


@router.delete("/certificates/{cert_id}")
def delete_certificate(
    cert_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    cert = db.query(Certificate).filter(Certificate.id == cert_id).first()
    if not cert:
        raise HTTPException(status_code=404, detail="Certificate not found")
    db.delete(cert)
    db.commit()
    return {"message": "Certificate deleted"}


# Blog Admin endpoints
@router.post("/blog", response_model=BlogPostResponse)
def create_blog_post(
    data: BlogPostCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    existing = db.query(BlogPost).filter(BlogPost.slug == data.slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="Slug already exists")
    
    post = BlogPost(**data.model_dump())
    db.add(post)
    db.commit()
    db.refresh(post)
    return post


@router.put("/blog/{post_id}", response_model=BlogPostResponse)
def update_blog_post(
    post_id: int,
    data: BlogPostUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    update_data = data.model_dump(exclude_unset=True)
    if "slug" in update_data:
        existing = db.query(BlogPost).filter(
            BlogPost.slug == update_data["slug"],
            BlogPost.id != post_id
        ).first()
        if existing:
            raise HTTPException(status_code=400, detail="Slug already exists")
    
    for key, value in update_data.items():
        setattr(post, key, value)
    db.commit()
    db.refresh(post)
    return post


@router.delete("/blog/{post_id}")
def delete_blog_post(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    db.delete(post)
    db.commit()
    return {"message": "Blog post deleted"}
