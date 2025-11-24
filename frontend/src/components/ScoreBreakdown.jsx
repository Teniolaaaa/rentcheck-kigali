import React from 'react';

const ScoreBreakdown = ({ scoreDetails }) => {
    return (
        <div className="score-breakdown">
            <h3>RentCheck Score Breakdown</h3>
            <ul>
                <li>
                    <strong>Legal/Dispute History:</strong> {scoreDetails.legalDisputeHistory} (35%)
                </li>
                <li>
                    <strong>Scam or Fraud Reports:</strong> {scoreDetails.scamReports} (25%)
                </li>
                <li>
                    <strong>Tenant Reviews and Verified Complaints:</strong> {scoreDetails.tenantReviews} (25%)
                </li>
                <li>
                    <strong>Trend:</strong> {scoreDetails.trend} (15%)
                </li>
            </ul>
            <h4>Total Score: {scoreDetails.totalScore}/100</h4>
            <p>{scoreDetails.explanation}</p>
        </div>
    );
};

export default ScoreBreakdown;