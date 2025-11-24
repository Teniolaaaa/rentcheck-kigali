from pydantic import BaseModel
from typing import List, Optional

class Complaint(BaseModel):
    description: str
    date: str
    verified: bool

class Property(BaseModel):
    id: int
    address: str
    district: str
    landlord_id: int
    complaints: List[Complaint]
    risk_level: Optional[int] = None
    dispute_count: Optional[int] = 0

    def calculate_rentcheck_score(self) -> int:
        legal_dispute_weight = 0.35
        scam_report_weight = 0.25
        tenant_review_weight = 0.25
        trend_weight = 0.15

        # Example calculation logic (to be refined)
        score = (
            (self.dispute_count * legal_dispute_weight) +
            (len([c for c in self.complaints if not c.verified]) * scam_report_weight) +
            (len(self.complaints) * tenant_review_weight) +
            (self.risk_level * trend_weight)
        )
        return min(max(int(score), 0), 100)  # Ensure score is between 0 and 100