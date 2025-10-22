// src/App.js
import React, { useEffect, useState } from 'react';
import { Container, Alert, Spinner, Button } from 'react-bootstrap';

// Custom components
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';

// API
import { fetchWeather } from './api/weatherApi';

export default function App() {

  const [city, setCity] = useState(localStorage.getItem('lastCity') || '');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState(localStorage.getItem('tempUnit') || 'C');

  useEffect(() => {
    if (city) handleSearch(city);
  }, []);

  useEffect(() => {
    localStorage.setItem('tempUnit', unit);
  }, [unit]);

  const handleSearch = async (q) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const res = await fetchWeather(q);
      setData(res);
      setCity(q);
      localStorage.setItem('lastCity', q);
    } catch (err) {
      setError(err?.error || 'City Not Found');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '600px' }}>

      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="fw-bold text-primary">Weather Application</h2>
        <p className="text-muted mb-0">Search any city and get current weather</p>
      </div>

      {/* Search Bar */}
      <div className="w-100 mb-3">
        <SearchBar
          key={city === '' ? 'empty' : city} // Re-render when city is cleared
          onSearch={handleSearch}
          defaultValue={localStorage.getItem('lastCity') || ''}
        />
      </div>


      {/* Last searched city + Clear Button */}
      {city && (
        <div className="d-flex justify-content-between align-items-center mb-3 w-100">
          <small className="text-muted">
            Last searched city: <strong className="text-dark">{city}</strong>
          </small>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => {
              setCity('');
              setData(null);
              setError(null);
              localStorage.removeItem('lastCity');
            }}
          >
            Clear Search
          </Button>
        </div>
      )}

      {/* Loading Spinner */}
      {loading && (
        <div className="d-flex justify-content-center mt-4">
          <Spinner animation="border" role="status" />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-3 w-100">
          <Alert variant="danger" className="text-center shadow-sm">
            {error}
          </Alert>
        </div>
      )}

      {/* Weather Data */}
      {data && (
        <div className="mt-3 w-100">
          <WeatherCard
            data={data}
            unit={unit}
            onToggleUnit={() => setUnit(unit === 'C' ? 'F' : 'C')}
          />
        </div>
      )}
    </Container>
  );
}
