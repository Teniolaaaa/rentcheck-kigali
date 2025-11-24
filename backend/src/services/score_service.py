from typing import List, Dict

def calculate_rentcheck_score(legal_dispute_history: int, scam_reports: int, tenant_reviews: int, trend: float) -> Dict[str, float]:
    """
    Calculate the RentCheck Score based on various factors.

    Parameters:
    - legal_dispute_history: Number of legal disputes reported.
    - scam_reports: Number of scam reports filed.
    - tenant_reviews: Number of verified tenant complaints.
    - trend: A float representing the trend of the score (1.0 for improving, -1.0 for worsening).

    Returns:
    A dictionary containing the RentCheck Score and a breakdown of the calculation.
    """
    # Weighting factors
    legal_dispute_weight = 0.35
    scam_weight = 0.25
    complaint_weight = 0.25
    trend_weight = 0.15

    # Normalize inputs to a score out of 100
    legal_dispute_score = max(0, 100 - (legal_dispute_history * 10))
    scam_score = max(0, 100 - (scam_reports * 20))
    complaint_score = max(0, 100 - (tenant_reviews * 10))
    
    # Calculate the RentCheck Score
    score = (
        (legal_dispute_score * legal_dispute_weight) +
        (scam_score * scam_weight) +
        (complaint_score * complaint_weight) +
        (trend * trend_weight * 100)
    )

    # Prepare breakdown
    breakdown = {
        "Legal Dispute Score": legal_dispute_score,
        "Scam Score": scam_score,
        "Complaint Score": complaint_score,
        "Trend Impact": trend * 100
    }

    return {
        "RentCheck Score": round(score, 2),
        "Breakdown": breakdown
    }

def assess_property(property_data: Dict) -> Dict[str, float]:
    """
    Assess a property and calculate its RentCheck Score.

    Parameters:
    - property_data: A dictionary containing property details.

    Returns:
    A dictionary with the RentCheck Score and breakdown.
    """
    legal_dispute_history = property_data.get("legal_dispute_history", 0)
    scam_reports = property_data.get("scam_reports", 0)
    tenant_reviews = property_data.get("tenant_reviews", 0)
    trend = property_data.get("trend", 0.0)

    return calculate_rentcheck_score(legal_dispute_history, scam_reports, tenant_reviews, trend)