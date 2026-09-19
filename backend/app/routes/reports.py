from fastapi import APIRouter, UploadFile, File, Form
from typing import Optional
from datetime import datetime
from app.ai.analyzer import analyze_report
from app.services.priority import calculate_priority, get_level
from app.services.department import route_department
from app.services.duplicate import is_duplicate

router = APIRouter()

# In-memory mock DB
REPORTS: list[dict] = []
DUPLICATE_GROUPS: dict[int, list[int]] = {}
_next_id = 1
_next_group_id = 1

def _risk_to_int(risk: str) -> int:
    m = {"high": 90, "medium": 60, "low": 30}
    return m.get(risk.lower(), 50)

@router.get('/')
def list_reports():
    return {'reports': REPORTS}

@router.get('/{report_id}')
def get_report(report_id: int):
    for r in REPORTS:
        if r["id"] == report_id:
            return r
    return {"error": "not found"}

@router.get('/dashboard/duplicate-groups')
def get_duplicate_groups():
    return {"groups": DUPLICATE_GROUPS, "total_groups": len(DUPLICATE_GROUPS)}

@router.post('/', status_code=201)
async def create_report(
    description: str = Form(...),
    latitude: Optional[float] = Form(None),
    longitude: Optional[float] = Form(None),
    image: Optional[UploadFile] = File(None)
):
    global _next_id, _next_group_id
    image_url = None
    if image and image.filename:
        image_url = f"/uploads/{image.filename}"

    # AI mock
    ai = analyze_report(description, image_url, latitude, longitude)
    category = ai.get("category", "general")
    severity = int(ai.get("severity", 2))
    safety_risk_str = ai.get("safety_risk", "medium")
    confidence = float(ai.get("confidence", 0.75))
    safety_risk_int = _risk_to_int(safety_risk_str)

    # Duplicate detection (mock text_sim=0.9, check geo)
    duplicate_group_id = None
    duplicate_count = 0
    if latitude is not None and longitude is not None:
        for r in REPORTS:
            if r.get("latitude") is None or r.get("longitude") is None:
                continue
            if is_duplicate(0.9, latitude, longitude, r["latitude"], r["longitude"]):
                duplicate_group_id = r.get("duplicate_group_id")
                # count group size
                for gid, members in DUPLICATE_GROUPS.items():
                    if r["id"] in members:
                        duplicate_count = len(members)
                        duplicate_group_id = gid
                        break
                break

    if duplicate_group_id is None and duplicate_count == 0:
        # check if we should create new group - only if duplicate found above
        pass

    # If duplicate found, add to existing group else create new group id for tracking (every report gets a group)
    if duplicate_group_id is None:
        # No duplicate - create new group for this report alone
        duplicate_group_id = _next_group_id
        DUPLICATE_GROUPS[duplicate_group_id] = []
        _next_group_id += 1
    # add current report to group later

    # Priority
    affected_people = 50  # mock
    location_importance = 60  # mock
    priority_score = calculate_priority(severity*25, safety_risk_int, affected_people, location_importance, duplicate_count)
    priority_level = get_level(priority_score)
    department = route_department(category)

    report = {
        "id": _next_id,
        "description": description,
        "latitude": latitude,
        "longitude": longitude,
        "image_url": image_url,
        "category": category,
        "confidence": confidence,
        "severity": severity,
        "priority_score": priority_score,
        "priority_level": priority_level,
        "department": department,
        "status": "pending",
        "duplicate_group_id": duplicate_group_id,
        "created_at": datetime.utcnow().isoformat()
    }
    REPORTS.append(report)
    DUPLICATE_GROUPS[duplicate_group_id].append(report["id"])
    # update duplicate_count effect: if group now has >1, bump priority
    if len(DUPLICATE_GROUPS[duplicate_group_id]) > 1:
        report["priority_score"] = min(100, priority_score + 5)
        report["priority_level"] = get_level(report["priority_score"])

    _next_id += 1
    return report
