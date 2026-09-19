from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from app.ai.analyzer import analyze_report
from app.services.priority import calculate_priority, get_level
from app.services.department import route_department

router = APIRouter()

class AnalyzeIn(BaseModel):
    description: str
    latitude: float | None = None
    longitude: float | None = None
    image_url: str | None = None

def _risk_to_int(risk: str) -> int:
    m = {"high": 90, "medium": 60, "low": 30}
    return m.get(risk.lower(), 50)

@router.post('/analyze')
def analyze(payload: AnalyzeIn):
    ai = analyze_report(payload.description, payload.image_url, payload.latitude, payload.longitude)
    category = ai.get("category", "general")
    severity = int(ai.get("severity", 2))
    safety_risk_str = ai.get("safety_risk", "medium")
    confidence = float(ai.get("confidence", 0.75))
    safety_risk_int = _risk_to_int(safety_risk_str)
    priority_score = calculate_priority(severity*25, safety_risk_int, 50, 60, 0)
    priority_level = get_level(priority_score)
    department = route_department(category)
    return {
        "category": category,
        "sub_category": ai.get("sub_category"),
        "severity": severity,
        "safety_risk": safety_risk_str,
        "confidence": confidence,
        "department": department,
        "summary": ai.get("summary", ""),
        "priority_score": priority_score,
        "priority_level": priority_level
    }
