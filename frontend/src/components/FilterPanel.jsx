import React from 'react';

const FilterPanel = ({ districts, onFilterChange }) => {
    const handleDistrictChange = (event) => {
        onFilterChange(event.target.value);
    };

    return (
        <div className="filter-panel">
            <h3>Filter Properties</h3>
            <label htmlFor="district-select">Select District:</label>
            <select id="district-select" onChange={handleDistrictChange}>
                <option value="">All</option>
                {districts.map((district) => (
                    <option key={district} value={district}>
                        {district}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FilterPanel;