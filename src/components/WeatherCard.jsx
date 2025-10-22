import { Card, Row, Col, Button } from 'react-bootstrap';
import { weatherCodeMap, formatTemperature } from '../utils/weatherUtils';

export default function WeatherCard({ data, unit, onToggleUnit }) {
  const code = data.current.weathercode;
  const meta = weatherCodeMap[code] || { text: 'Unknown', icon: '❓' };

  return (
    <Card className="shadow-sm border-0 w-100 weather-card">
      <Card.Body>
        <Row className="align-items-center">
          <Col>
            <h5 className="fw-semibold mb-1">
              {data.location.name}, {data.location.country}
            </h5>
            <small className="text-muted">
              {new Date(data.current.time).toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true
              })}
            </small>
          </Col>
          <Col className="text-end">
            <div className="weather-icon">{meta.icon}</div>
            <h3 className="fw-bold mb-1">{formatTemperature(data.current.temperature_c, unit)}</h3>
            <p className="text-muted mb-0">{meta.text}</p>
          </Col>
        </Row>

        <hr className="my-3" />

        <Row>
          <Col>
            <p className="mb-1">
              <strong>Humidity:</strong>{' '}
              {data.current.humidity != null ? `${data.current.humidity}%` : 'N/A'}
            </p>
          </Col>
          <Col className="text-end">
            <p className="mb-1">
              <strong>Wind:</strong> {data.current.windspeed} km/h
            </p>
          </Col>
        </Row>

        <div className="d-flex justify-content-end mt-3">
          <Button size="sm" variant="outline-primary" onClick={onToggleUnit}>
            Toggle °C / °F
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
