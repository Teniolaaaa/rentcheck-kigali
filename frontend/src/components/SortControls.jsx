import React from 'react';

const SortControls = ({ sortBy, setSortBy }) => {
    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    return (
        <div className="sort-controls">
            <label htmlFor="sort-options">Sort by:</label>
            <select id="sort-options" value={sortBy} onChange={handleSortChange}>
                <option value="complaints">Number of Complaints</option>
                <option value="riskLevel">Risk Level</option>
                <option value="disputeCount">Dispute Count</option>
            </select>
        </div>
    );
};

export default SortControls;