import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import PropertyCard from './components/PropertyCard';
import { searchProperties } from './services/api';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery || hasSearched) {
        performSearch();
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery, hasSearched]);

  const performSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchProperties({ q: searchQuery || undefined });
      setProperties(data.properties);
      setHasSearched(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
      <header style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2.5rem', margin: '0 0 10px 0' }}>🏠 RentCheck Kigali</h1>
        <p style={{ fontSize: '1.1rem', margin: 0 }}>Verify landlords before you rent</p>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <SearchBar 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearch={performSearch}
        />

        <h2>{hasSearched ? `${properties.length} Properties Found` : 'Start searching...'}</h2>

        {loading && <div style={{ textAlign: 'center', padding: '3rem' }}><p>Searching...</p></div>}

        {error && (
          <div style={{ backgroundColor: '#fed7d7', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
            <p>❌ {error}</p>
          </div>
        )}

        {!loading && !error && hasSearched && properties.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p>No properties found</p>
          </div>
        )}

        {!loading && !error && properties.length > 0 && (
          <div>
            {properties.map(property => (
              <PropertyCard key={property.property_id} property={property} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;