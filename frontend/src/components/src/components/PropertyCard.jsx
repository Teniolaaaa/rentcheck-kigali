import React, { useState } from 'react';

const PropertyCard = ({ property }) => {
  const [showDetails, setShowDetails] = useState(false);

  const getScoreColor = (score) => {
    if (score >= 75) return '#10b981';
    if (score >= 50) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      marginBottom: '20px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h3>{property.landlord_name}</h3>
          <p>{property.property_address}</p>
          <span>{property.district}</span>
        </div>
        
        <div style={{
          textAlign: 'center',
          padding: '15px',
          borderRadius: '12px',
          color: 'white',
          backgroundColor: getScoreColor(property.rent_check_score)
        }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{property.rent_check_score}</div>
        </div>
      </div>

      {property.scam_reports.length > 0 && (
        <div style={{ backgroundColor: '#fed7d7', padding: '12px', marginTop: '10px', borderRadius: '8px' }}>
          ⚠️ WARNING: {property.scam_reports.length} scam report(s)
        </div>
      )}

      <button onClick={() => setShowDetails(!showDetails)} style={{ marginTop: '10px' }}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>

      {showDetails && (
        <div style={{ marginTop: '20px' }}>
          <p>Disputes: {property.legal_disputes.length}</p>
          <p>Reviews: {property.tenant_reviews.length}</p>
        </div>
      )}
    </div>
  );
};

export default PropertyCard;