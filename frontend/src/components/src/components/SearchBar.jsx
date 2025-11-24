import React from 'react';

const SearchBar = ({ searchQuery, onSearchChange, onSearch }) => {
  return (
    <div style={{ margin: '2rem 0' }}>
      <input
        type="text"
        placeholder="Search by landlord name or property address..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{
          padding: '12px',
          width: '500px',
          fontSize: '16px',
          border: '2px solid #ddd',
          borderRadius: '8px'
        }}
      />
      <button
        onClick={onSearch}
        style={{
          padding: '12px 24px',
          marginLeft: '10px',
          backgroundColor: '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;