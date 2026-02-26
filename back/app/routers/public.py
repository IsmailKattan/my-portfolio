from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
import httpx
from datetime import datetime, timedelta

from app.models.base import get_db
from app.models.cv import PersonalInfo, Education, Skill
from app.models.experience import Experience
from app.models.project import Project
from app.models.certificate import Certificate
from app.models.blog import BlogPost

from app.schemas.cv import CVDataResponse, PersonalInfoResponse, EducationResponse, SkillResponse
from app.schemas.experience import ExperienceResponse
from app.schemas.project import ProjectResponse
from app.schemas.certificate import CertificateResponse
from app.schemas.blog import BlogPostResponse, BlogPostListResponse
from pydantic import BaseModel

router = APIRouter(prefix="/api", tags=["public"])


@router.get("/cv", response_model=CVDataResponse)
def get_cv(db: Session = Depends(get_db)):
    personal_info = db.query(PersonalInfo).first()
    education = db.query(Education).all()
    skills = db.query(Skill).all()
    
    return CVDataResponse(
        personal_info=PersonalInfoResponse.model_validate(personal_info) if personal_info else None,
        education=[EducationResponse.model_validate(e) for e in education],
        skills=[SkillResponse.model_validate(s) for s in skills]
    )


@router.get("/experiences", response_model=List[ExperienceResponse])
def get_experiences(db: Session = Depends(get_db)):
    experiences = db.query(Experience).order_by(Experience.id.desc()).all()
    return [ExperienceResponse.model_validate(exp) for exp in experiences]


@router.get("/projects", response_model=List[ProjectResponse])
def get_projects(db: Session = Depends(get_db)):
    projects = db.query(Project).order_by(Project.id.desc()).all()
    return [ProjectResponse.model_validate(p) for p in projects]


@router.get("/projects/{project_id}", response_model=ProjectResponse)
def get_project(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return ProjectResponse.model_validate(project)


def build_certificate_tree(certificates, parent_id=None):
    """Build nested certificate structure"""
    result = []
    for cert in certificates:
        if cert.parent_id == parent_id:
            cert_dict = {
                "id": cert.id,
                "name": cert.name,
                "issuer": cert.issuer,
                "date": cert.date,
                "credential_url": cert.credential_url,
                "parent_id": cert.parent_id,
                "sub_certificates": build_certificate_tree(certificates, cert.id)
            }
            result.append(cert_dict)
    return result


@router.get("/certificates", response_model=List[CertificateResponse])
def get_certificates(db: Session = Depends(get_db)):
    certificates = db.query(Certificate).all()
    tree = build_certificate_tree(certificates)
    return [CertificateResponse.model_validate(c) for c in tree]


@router.get("/blog", response_model=List[BlogPostListResponse])
def get_blog_posts(db: Session = Depends(get_db)):
    posts = db.query(BlogPost).order_by(BlogPost.published_date.desc()).all()
    return [BlogPostListResponse.model_validate(p) for p in posts]


@router.get("/blog/{slug}", response_model=BlogPostResponse)
def get_blog_post(slug: str, db: Session = Depends(get_db)):
    post = db.query(BlogPost).filter(BlogPost.slug == slug).first()
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return BlogPostResponse.model_validate(post)


# ═══════════════════════════════════════════════════════════════════════════════
# TryHackMe Proxy Endpoints
# ═══════════════════════════════════════════════════════════════════════════════

THM_API = "https://tryhackme.com/api/v2"
THM_USER_ID = "695360b3d7589469b971e7e2"
THM_USERNAME = "smlqttn"


class TryHackMeProfile(BaseModel):
    username: str
    avatar: str
    level: int
    rank: int
    topPercentage: int
    streak: int
    totalPoints: int
    completedRooms: int
    badgesNumber: int
    leagueTier: str


class TryHackMeBadge(BaseModel):
    _id: str
    name: str
    title: str
    description: str
    image: str
    earnedAt: str
    rarityTier: str
    rarityPercent: float


class ActivityDay(BaseModel):
    date: str
    count: int
    level: int


class TryHackMeActivityResponse(BaseModel):
    profile: TryHackMeProfile
    badges: List[TryHackMeBadge]
    activity: List[ActivityDay]
    year: int


@router.get("/tryhackme/profile", response_model=TryHackMeProfile)
async def get_tryhackme_profile():
    """Fetch TryHackMe profile data (proxied to avoid CORS)"""
    async with httpx.AsyncClient(timeout=10.0) as client:
        try:
            res = await client.get(f"{THM_API}/public-profile?username={THM_USERNAME}")
            res.raise_for_status()
            data = res.json()
            d = data.get("data", {})
            return TryHackMeProfile(
                username=d.get("username", THM_USERNAME),
                avatar=d.get("avatar", ""),
                level=d.get("level", 0),
                rank=d.get("rank", 0),
                topPercentage=d.get("topPercentage", 0),
                streak=d.get("streak", 0),
                totalPoints=d.get("totalPoints", 0),
                completedRooms=d.get("completedRoomsNumber", 0),
                badgesNumber=d.get("badgesNumber", 0),
                leagueTier=d.get("leagueTier", "bronze"),
            )
        except httpx.HTTPError as e:
            raise HTTPException(status_code=503, detail=f"TryHackMe API error: {str(e)}")


@router.get("/tryhackme/badges", response_model=List[TryHackMeBadge])
async def get_tryhackme_badges():
    """Fetch TryHackMe badges (proxied to avoid CORS)"""
    async with httpx.AsyncClient(timeout=10.0) as client:
        try:
            res = await client.get(
                f"{THM_API}/public-profile/badges?user={THM_USER_ID}&limit=50&page=1"
            )
            res.raise_for_status()
            data = res.json()
            badges = data.get("data", {}).get("docs", [])
            return [
                TryHackMeBadge(
                    _id=b.get("_id", ""),
                    name=b.get("name", ""),
                    title=b.get("title", ""),
                    description=b.get("description", ""),
                    image=b.get("image", ""),
                    earnedAt=b.get("earnedAt", ""),
                    rarityTier=b.get("rarityTier", "common"),
                    rarityPercent=b.get("rarityPercent", 0.0),
                )
                for b in badges
            ]
        except httpx.HTTPError as e:
            raise HTTPException(status_code=503, detail=f"TryHackMe API error: {str(e)}")


@router.get("/tryhackme/activity/{year}", response_model=List[ActivityDay])
async def get_tryhackme_activity(year: int):
    """Fetch TryHackMe yearly activity (proxied to avoid CORS)"""
    async with httpx.AsyncClient(timeout=10.0) as client:
        try:
            res = await client.get(
                f"{THM_API}/public-profile/yearly-activity?user={THM_USER_ID}&year={year}"
            )
            res.raise_for_status()
            data = res.json()
            activity = data.get("data", {}).get("yearlyActivity", [])
            return [
                ActivityDay(
                    date=a.get("date", ""),
                    count=a.get("count", 0),
                    level=a.get("level", 0),
                )
                for a in activity
            ]
        except httpx.HTTPError as e:
            raise HTTPException(status_code=503, detail=f"TryHackMe API error: {str(e)}")


@router.get("/tryhackme/all/{year}", response_model=TryHackMeActivityResponse)
async def get_tryhackme_all(year: int):
    """Fetch all TryHackMe data in one call (profile + badges + activity)"""
    async with httpx.AsyncClient(timeout=15.0) as client:
        try:
            # Fetch all three endpoints concurrently
            profile_res, badges_res, activity_res = await asyncio.gather(
                client.get(f"{THM_API}/public-profile?username={THM_USERNAME}"),
                client.get(f"{THM_API}/public-profile/badges?user={THM_USER_ID}&limit=50&page=1"),
                client.get(f"{THM_API}/public-profile/yearly-activity?user={THM_USER_ID}&year={year}"),
                return_exceptions=True
            )

            # Parse profile
            profile_data = profile_res.json() if isinstance(profile_res, httpx.Response) else {}
            d = profile_data.get("data", {})
            profile = TryHackMeProfile(
                username=d.get("username", THM_USERNAME),
                avatar=d.get("avatar", ""),
                level=d.get("level", 0),
                rank=d.get("rank", 0),
                topPercentage=d.get("topPercentage", 0),
                streak=d.get("streak", 0),
                totalPoints=d.get("totalPoints", 0),
                completedRooms=d.get("completedRoomsNumber", 0),
                badgesNumber=d.get("badgesNumber", 0),
                leagueTier=d.get("leagueTier", "bronze"),
            )

            # Parse badges
            badges_data = badges_res.json() if isinstance(badges_res, httpx.Response) else {}
            badges_raw = badges_data.get("data", {}).get("docs", [])
            badges = [
                TryHackMeBadge(
                    _id=b.get("_id", ""),
                    name=b.get("name", ""),
                    title=b.get("title", ""),
                    description=b.get("description", ""),
                    image=b.get("image", ""),
                    earnedAt=b.get("earnedAt", ""),
                    rarityTier=b.get("rarityTier", "common"),
                    rarityPercent=b.get("rarityPercent", 0.0),
                )
                for b in badges_raw
            ]

            # Parse activity
            activity_data = activity_res.json() if isinstance(activity_res, httpx.Response) else {}
            activity_raw = activity_data.get("data", {}).get("yearlyActivity", [])
            activity = [
                ActivityDay(
                    date=a.get("date", ""),
                    count=a.get("count", 0),
                    level=a.get("level", 0),
                )
                for a in activity_raw
            ]

            return TryHackMeActivityResponse(
                profile=profile,
                badges=badges,
                activity=activity,
                year=year
            )

        except Exception as e:
            raise HTTPException(status_code=503, detail=f"TryHackMe API error: {str(e)}")


# Need to import asyncio for the concurrent fetch
import asyncio
