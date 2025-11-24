from pydantic import BaseModel
from typing import List, Optional

class Complaint(BaseModel):
    description: str
    date: str
    verified: bool

class Landlord(BaseModel):
    name: str
    properties: List[str]
    complaints: List[Complaint]
    risk_level: Optional[int] = None
    dispute_count: Optional[int] = 0

    def calculate_rentcheck_score(self) -> int:
        # Placeholder for RentCheck Score calculation logic
        score = 0
        if self.complaints:
            score += 25  # Example weight for complaints
        if self.risk_level:
            score += (100 - self.risk_level) * 0.25  # Example weight for risk level
        if self.dispute_count > 0:
            score -= self.dispute_count * 5  # Example penalty for disputes
        return max(0, min(100, score))  # Ensure score is between 0 and 100