from fastapi import APIRouter
from app.routes.reports import REPORTS, DUPLICATE_GROUPS

router = APIRouter()

@router.get('/stats')
def stats():
    total = len(REPORTS)
    critical = sum(1 for r in REPORTS if r.get("priority_level") == "P1 Critical")
    high = sum(1 for r in REPORTS if r.get("priority_level") == "P2 High")
    medium = sum(1 for r in REPORTS if r.get("priority_level") == "P3 Medium")
    low = sum(1 for r in REPORTS if r.get("priority_level") == "P4 Low")
    resolved = sum(1 for r in REPORTS if r.get("status") == "resolved")
    return {
        "total": total,
        "critical": critical,
        "high": high,
        "medium": medium,
        "low": low,
        "resolved": resolved,
        "duplicate_groups": len(DUPLICATE_GROUPS)
    }

@router.get('/priority-queue')
def priority_queue():
    sorted_reports = sorted(REPORTS, key=lambda x: x.get("priority_score", 0), reverse=True)
    return {"queue": sorted_reports[:20]}

@router.get('/duplicate-groups')
def duplicate_groups():
    groups = []
    for gid, member_ids in DUPLICATE_GROUPS.items():
        members = [r for r in REPORTS if r["id"] in member_ids]
        if not members:
            continue
        # representative is highest priority in group
        rep = max(members, key=lambda x: x.get("priority_score", 0))
        groups.append({
            "group_id": gid,
            "count": len(members),
            "representative": rep,
            "members": members
        })
    groups.sort(key=lambda g: g["representative"].get("priority_score", 0), reverse=True)
    return {"groups": groups, "total_groups": len(groups)}
