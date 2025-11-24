import React, { useState, useEffect } from 'react';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [properties, setProperties] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [minScore, setMinScore] = useState(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  useEffect(() => {
    fetchStats();
    fetchProperties();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Stats error:', error);
    }
  };

  const fetchProperties = async () => {
    setLoading(true);
    try {
      let url = 'http://localhost:8000/api/v1/properties/search?';
      if (searchQuery) url += `q=${searchQuery}&`;
      if (selectedDistrict) url += `district=${selectedDistrict}&`;
      if (minScore > 0) url += `min_score=${minScore}&`;
      if (verifiedOnly) url += `verified_only=true&`;

      const response = await fetch(url);
      const data = await response.json();
      setProperties(data.properties);
    } catch (error) {
      console.error('Search error:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProperties();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedDistrict, minScore, verifiedOnly]);

  const getScoreColor = (score) => {
    if (score >= 75) return '#10b981';
    if (score >= 50) return '#f59e0b';
    return '#ef4444';
  };

  const getScoreLabel = (score) => {
    if (score >= 75) return 'SAFE TO RENT';
    if (score >= 50) return 'PROCEED WITH CAUTION';
    return 'HIGH RISK - AVOID';
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '3rem 2rem',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3rem', margin: '0 0 1rem 0', fontWeight: 'bold' }}>
            🏠 RentCheck Kigali
          </h1>
          <p style={{ fontSize: '1.3rem', margin: '0 0 2rem 0', opacity: 0.95 }}>
            Verify landlords and properties before you sign the lease
          </p>
          
          {/* Stats Bar */}
          {stats && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '1rem',
              marginTop: '2rem'
            }}>
              <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '12px' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.total_properties}</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Properties Listed</div>
              </div>
              <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '12px' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.verified_landlords}</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Verified Landlords</div>
              </div>
              <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '12px' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.safe_properties}</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Safe Properties</div>
              </div>
              <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '12px' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.total_scam_reports}</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Scams Prevented</div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* Search Section */}
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#1e293b' }}>
            Search Properties & Landlords
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
            <input
              type="text"
              placeholder="🔍 Search by landlord name or property address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '1rem',
                fontSize: '1.1rem',
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                style={{
                  padding: '0.8rem',
                  fontSize: '1rem',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  backgroundColor: 'white',
                  cursor: 'pointer'
                }}
              >
                <option value="">All Districts</option>
                <option value="Gasabo">Gasabo</option>
                <option value="Kicukiro">Kicukiro</option>
                <option value="Nyarugenge">Nyarugenge</option>
              </select>

              <select
                value={minScore}
                onChange={(e) => setMinScore(Number(e.target.value))}
                style={{
                  padding: '0.8rem',
                  fontSize: '1rem',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  backgroundColor: 'white',
                  cursor: 'pointer'
                }}
              >
                <option value="0">Any Safety Score</option>
                <option value="75">Safe Only (75+)</option>
                <option value="50">Moderate+ (50+)</option>
              </select>

              <label style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.8rem',
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                cursor: 'pointer',
                backgroundColor: verifiedOnly ? '#f0fdf4' : 'white'
              }}>
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  style={{ marginRight: '0.5rem', width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <span style={{ fontSize: '1rem' }}>✓ Verified Only</span>
              </label>
            </div>
          </div>
        </div>

        {/* Results */}
        <h2 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>
          {loading ? 'Searching...' : `${properties.length} Properties Found`}
        </h2>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
            <p>Loading properties...</p>
          </div>
        ) : properties.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <p>No properties found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {properties.map((property) => (
              <PropertyCard key={property.property_id} property={property} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#1e293b',
        color: 'white',
        padding: '2rem',
        textAlign: 'center',
        marginTop: '4rem'
      }}>
        <p style={{ margin: 0, opacity: 0.8 }}>
          © 2024 RentCheck Kigali - Protecting tenants across Rwanda
        </p>
      </footer>
    </div>
  );
}

function PropertyCard({ property }) {
  const [expanded, setExpanded] = useState(false);

  const getScoreColor = (score) => {
    if (score >= 75) return '#10b981';
    if (score >= 50) return '#f59e0b';
    return '#ef4444';
  };

  const getScoreLabel = (score) => {
    if (score >= 75) return 'SAFE TO RENT';
    if (score >= 50) return 'PROCEED WITH CAUTION';
    return 'HIGH RISK - AVOID';
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '2rem',
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.5rem', color: '#1e293b' }}>
              {property.landlord_name}
            </h3>
            {property.verified_landlord && (
              <span style={{
                backgroundColor: '#d1fae5',
                color: '#065f46',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: '600'
              }}>
                ✓ Verified
              </span>
            )}
          </div>
          <p style={{ margin: '0.5rem 0', color: '#64748b', fontSize: '1.1rem' }}>
            📍 {property.property_address}
          </p>
          <p style={{
            display: 'inline-block',
            backgroundColor: '#f1f5f9',
            padding: '6px 14px',
            borderRadius: '8px',
            fontSize: '0.9rem',
            fontWeight: '500',
            color: '#475569',
            margin: 0
          }}>
            {property.district} District
          </p>
        </div>

        <div style={{
          textAlign: 'center',
          padding: '1.5rem',
          borderRadius: '16px',
          minWidth: '140px',
          backgroundColor: getScoreColor(property.rent_check_score),
          color: 'white',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}>
          <div style={{ fontSize: '3rem', fontWeight: 'bold', lineHeight: 1 }}>
            {property.rent_check_score}
          </div>
          <div style={{ fontSize: '0.75rem', fontWeight: '600', marginTop: '0.5rem', opacity: 0.95 }}>
            {getScoreLabel(property.rent_check_score)}
          </div>
        </div>
      </div>

      {/* Warning for scams */}
      {property.scam_reports.length > 0 && (
        <div style={{
          backgroundColor: '#fee2e2',
          border: '2px solid #ef4444',
          padding: '1rem',
          borderRadius: '12px',
          marginBottom: '1rem'
        }}>
          <p style={{
            margin: 0,
            color: '#991b1b',
            fontWeight: '600',
            fontSize: '1.1rem'
          }}>
            ⚠️ WARNING: {property.scam_reports.length} scam report(s) filed against this landlord
          </p>
          <p style={{ margin: '0.5rem 0 0 0', color: '#7f1d1d', fontSize: '0.95rem' }}>
            Exercise extreme caution or consider alternative properties
          </p>
        </div>
      )}

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '1rem',
        padding: '1.5rem 0',
        borderTop: '1px solid #e2e8f0',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ef4444' }}>
            {property.legal_disputes.length}
          </div>
          <div style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '0.25rem' }}>
            Legal Disputes
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>
            {property.scam_reports.length}
          </div>
          <div style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '0.25rem' }}>
            Scam Reports
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>
            {property.tenant_reviews.length}
          </div>
          <div style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '0.25rem' }}>
            Tenant Reviews
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#667eea' }}>
            {(property.rent_amount / 1000).toFixed(0)}K RWF
          </div>
          <div style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '0.25rem' }}>
            Monthly Rent
          </div>
        </div>
      </div>

      {/* Expand/Collapse Button */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: '100%',
          padding: '1rem',
          marginTop: '1rem',
          backgroundColor: '#f8fafc',
          border: '2px solid #e2e8f0',
          borderRadius: '12px',
          fontSize: '1rem',
          fontWeight: '600',
          color: '#667eea',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#667eea';
          e.target.style.color = 'white';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#f8fafc';
          e.target.style.color = '#667eea';
        }}
      >
        {expanded ? '▲ Hide Details' : '▼ Show Full Details'}
      </button>

      {/* Expanded Details */}
      {expanded && (
        <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '2px solid #e2e8f0' }}>
          {/* Reviews */}
          {property.tenant_reviews.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '1rem', color: '#1e293b' }}>
                🗣️ Tenant Reviews
              </h4>
              {property.tenant_reviews.map((review) => (
                <div key={review.review_id} style={{
                  backgroundColor: '#f8fafc',
                  padding: '1rem',
                  borderRadius: '12px',
                  marginBottom: '0.75rem',
                  borderLeft: '4px solid #667eea'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#f59e0b', fontSize: '1.1rem', fontWeight: 'bold' }}>
                      {'⭐'.repeat(review.rating)}
                    </span>
                    {review.verified && (
                      <span style={{
                        backgroundColor: '#d1fae5',
                        color: '#065f46',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: '600'
                      }}>
                        ✓ Verified Tenant
                      </span>
                    )}
                  </div>
                  <p style={{ margin: '0.5rem 0', color: '#475569', lineHeight: 1.6 }}>
                    "{review.comment}"
                  </p>
                  <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem', color: '#94a3b8' }}>
                    {new Date(review.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Disputes */}
          {property.legal_disputes.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '1rem', color: '#1e293b' }}>
                ⚖️ Legal Disputes
              </h4>
              {property.legal_disputes.map((dispute) => (
                <div key={dispute.case_id} style={{
                  backgroundColor: '#fef3c7',
                  padding: '1rem',
                  borderRadius: '12px',
                  marginBottom: '0.75rem',
                  borderLeft: '4px solid #f59e0b'
                }}>
                  <p style={{ margin: 0, fontWeight: '600', color: '#92400e' }}>
                    {dispute.description}
                  </p>
                  <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#78350f' }}>
                    Status: <strong>{dispute.status.toUpperCase()}</strong> | Filed: {new Date(dispute.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Scam Reports */}
          {property.scam_reports.length > 0 && (
            <div>
              <h4 style={{ marginBottom: '1rem', color: '#1e293b' }}>
                🚨 Scam Reports
              </h4>
              {property.scam_reports.map((scam) => (
                <div key={scam.report_id} style={{
                  backgroundColor: '#fee2e2',
                  padding: '1rem',
                  borderRadius: '12px',
                  marginBottom: '0.75rem',
                  borderLeft: '4px solid #ef4444'
                }}>
                  <p style={{ margin: 0, fontWeight: '600', color: '#991b1b' }}>
                    {scam.description}
                  </p>
                  <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#7f1d1d' }}>
                    {scam.verified && '✓ Verified Report | '}
                    Reported: {new Date(scam.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Deposit Info */}
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            backgroundColor: '#ede9fe',
            borderRadius: '12px',
            borderLeft: '4px solid #7c3aed'
          }}>
            <p style={{ margin: 0, fontSize: '0.95rem', color: '#5b21b6' }}>
              💰 <strong>Deposit Required:</strong> {(property.deposit_required / 1000).toFixed(0)}K RWF
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;