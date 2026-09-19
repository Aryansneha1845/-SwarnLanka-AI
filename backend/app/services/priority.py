def calculate_priority(severity: int, safety_risk: int, affected_people: int, location_importance: int, duplicate_count: int) -> int:
    '''Priority Score = Severity 30% + Safety 25% + People 20% + Location 15% + Duplicates 10%'''
    score = (
        severity * 0.30 +
        safety_risk * 0.25 +
        affected_people * 0.20 +
        location_importance * 0.15 +
        min(duplicate_count * 10, 100) * 0.10
    )
    return int(min(max(score, 0), 100))

def get_level(score: int) -> str:
    if score >= 85: return 'P1 Critical'
    if score >= 70: return 'P2 High'
    if score >= 40: return 'P3 Medium'
    return 'P4 Low'
