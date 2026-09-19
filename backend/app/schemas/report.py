from pydantic import BaseModel
class ReportCreate(BaseModel):
    description: str
    latitude: float | None = None
    longitude: float | None = None
