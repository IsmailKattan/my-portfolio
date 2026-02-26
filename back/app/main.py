from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from app.models.base import Base, engine
from app.models import cv, experience, project, certificate, blog, user
from app.routers import public, admin
from app.auth.security import get_password_hash
from app.models.base import SessionLocal
from app.models.user import User

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Portfolio API",
    description="Backend API for portfolio website",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static files for uploads
os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Include routers
app.include_router(public.router)
app.include_router(admin.router)


def init_default_user():
    """Create default admin user if no users exist"""
    db = SessionLocal()
    try:
        user_count = db.query(User).count()
        if user_count == 0:
            default_user = User(
                username="admin",
                hashed_password=get_password_hash("admin123"),
                is_active=True
            )
            db.add(default_user)
            db.commit()
            print("Default user created: username='admin', password='admin123'")
            print("IMPORTANT: Change the default password after first login!")
    finally:
        db.close()


@app.on_event("startup")
def on_startup():
    init_default_user()


@app.get("/")
def root():
    return {
        "message": "Portfolio API",
        "docs": "/docs",
        "endpoints": {
            "public": "/api",
            "admin": "/api/admin"
        }
    }


@app.get("/health")
def health_check():
    return {"status": "healthy"}
