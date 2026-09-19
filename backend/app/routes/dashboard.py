from fastapi import APIRouter
router = APIRouter()

@router.get('/stats')
def stats():
    return {'total': 0, 'critical': 0}
