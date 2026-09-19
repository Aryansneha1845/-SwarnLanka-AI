from fastapi import APIRouter
router = APIRouter()

@router.post('/analyze')
def analyze():
    return {'category': 'road_damage', 'confidence': 0.94}
