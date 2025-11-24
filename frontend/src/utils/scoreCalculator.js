const calculateRentCheckScore = (legalDisputeHistory, scamReports, tenantReviews, trend) => {
    const weights = {
        legalDisputeHistory: 0.35,
        scamReports: 0.25,
        tenantReviews: 0.25,
        trend: 0.15,
    };

    const score = (
        (legalDisputeHistory * weights.legalDisputeHistory) +
        (scamReports * weights.scamReports) +
        (tenantReviews * weights.tenantReviews) +
        (trend * weights.trend)
    );

    return {
        score: Math.round(score),
        breakdown: {
            legalDisputeHistory: (legalDisputeHistory * weights.legalDisputeHistory).toFixed(2),
            scamReports: (scamReports * weights.scamReports).toFixed(2),
            tenantReviews: (tenantReviews * weights.tenantReviews).toFixed(2),
            trend: (trend * weights.trend).toFixed(2),
        },
    };
};

export default calculateRentCheckScore;