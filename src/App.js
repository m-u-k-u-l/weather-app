// src/App.js
import React, { useEffect, useState, useCallback } from 'react';
import { Container, Alert, Spinner, Button } from 'react-bootstrap';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import { fetchWeather } from './api/weatherApi';
import './App.css';

export default function App() {
  const [city, setCity] = useState(''); // current search
  const [lastCity, setLastCity] = useState(localStorage.getItem('lastCity') || ''); // previous search
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState(localStorage.getItem('tempUnit') || 'C');

  // Handle search
  const handleSearch = useCallback(
    async (q) => {
      if (!q) return;

      setLoading(true);
      setError(null);
      setData(null);

      try {
        const res = await fetchWeather(q);
        setData(res);

        // Persist current city and weather data
        localStorage.setItem('currentCity', q);
        localStorage.setItem('lastWeatherData', JSON.stringify(res));

        // Update lastCity only if previous city exists and is different
        if (city && city !== q) {
          setLastCity(city);
          localStorage.setItem('lastCity', city);
        }

        setCity(q);
      } catch (err) {
        setError(err?.error || 'City Not Found');
        setData(null);
      } finally {
        setLoading(false);
      }
    },
    [city]
  );

  // Persist current city and weather on mount
  useEffect(() => {
    const savedCity = localStorage.getItem('currentCity');
    const savedData = localStorage.getItem('lastWeatherData');
    if (savedCity && savedData) {
      setCity(savedCity);
      setData(JSON.parse(savedData));
    }
  }, []);

  // Persist temperature unit changes
  useEffect(() => {
    localStorage.setItem('tempUnit', unit);
  }, [unit]);

  return (
    <Container className="mt-5 app-container">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="fw-bold text-primary">Weather Application</h2>
        <p className="text-muted mb-0">Search any city and get current weather</p>
      </div>

      {/* Search Bar */}
      <div className="w-100 mb-3">
        <SearchBar onSearch={handleSearch} defaultValue={city} />
      </div>

      {/* Clear Current Search + Last City */}
      {(city || lastCity) && (
        <div className="d-flex justify-content-between align-items-center mb-3 w-100">

          <small className="text-muted">
            {lastCity && (
              <> Last searched city: <strong className="text-dark">{lastCity}</strong></>
            )}
          </small>

          {city && (
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => {
                setCity('');         // clear current search input
                setData(null);       // clear current weather data
                setError(null);      // clear any error
                localStorage.removeItem('currentCity');
                localStorage.removeItem('lastWeatherData');
              }}
            >
              Clear Search Results
            </Button>
          )}
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
