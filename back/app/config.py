from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    app_name: str = "Portfolio API"
    debug: bool = True
    secret_key: str = "your-secret-key-change-in-production"
    access_token_expire_minutes: int = 60 * 24  # 24 hours
    database_url: str = "sqlite:///./portfolio.db"
    cors_origins: list[str] = ["http://localhost:5173", "http://localhost:5174"]
    
    class Config:
        env_file = ".env"


@lru_cache()
def get_settings():
    return Settings()
