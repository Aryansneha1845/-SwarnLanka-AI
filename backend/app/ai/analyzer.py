# Mock AI analyzer - replace with OpenAI/Gemini call
def analyze_report(description: str, image_url: str = None, lat: float = None, lon: float = None):
    # Simple keyword based mock for hackathon demo
    desc = description.lower()
    if 'pothole' in desc or 'road' in desc:
        return {'category': 'road_damage','sub_category': 'pothole','severity': 4,'safety_risk': 'high','confidence': 0.94,'department': 'road_maintenance','summary': 'Large pothole affecting traffic'}
    if 'garbage' in desc or 'waste' in desc:
        return {'category': 'garbage','severity': 3,'safety_risk': 'medium','confidence': 0.91,'department': 'waste_management'}
    if 'light' in desc:
        return {'category': 'streetlight','severity': 2,'safety_risk': 'medium','confidence': 0.88,'department': 'electrical'}
    return {'category': 'general','severity': 2,'confidence': 0.75,'department': 'general'}
