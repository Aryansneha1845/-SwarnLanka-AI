from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ReportCreate(BaseModel):
    description: str
    latitude: float | None = None
    longitude: float | None = None
    image_url: str | None = None

class ReportResponse(BaseModel):
    id: int
    description: str
    latitude: float | None = None
    longitude: float | None = None
    image_url: str | None = None
    category: str
    confidence: float
    severity: int
    priority_score: int
    priority_level: str
    department: str
    status: str
    duplicate_group_id: int | None = None
    created_at: datetime

class AIAnalyzeRequest(BaseModel):
    description: str
    latitude: float | None = None
    longitude: float | None = None

class AIAnalyzeResponse(BaseModel):
    category: str
    sub_category: str | None = None
    severity: int
    safety_risk: str
    confidence: float
    department: str
    summary: str
    priority_score: int
    priority_level: str
