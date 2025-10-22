// src/api/weatherApi.js
// --- Fetch current weather directly from Open-Meteo ---
export async function fetchWeather(city) {

  try {
    // Step 1: Geocode city name → get latitude/longitude
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        city
      )}&count=1&language=en&format=json`
    );
    const geoJson = await geoRes.json();

    if (!geoJson.results?.length) throw new Error('City not found');

    const { latitude, longitude, name, country, timezone } = geoJson.results[0];

    // Step 2: Get current weather + humidity
    const params = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      current_weather: 'true',
      timezone: 'auto',
      hourly: 'relativehumidity_2m',
    });

    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?${params}`
    );

    const weatherJson = await weatherRes.json();

    if (!weatherJson.current_weather)
      throw new Error('Unable to fetch current weather');

    // Extract humidity
    const currentTime = weatherJson.current_weather.time;
    const humidityIndex = weatherJson.hourly.time.indexOf(currentTime);
    const humidity = weatherJson.hourly.relativehumidity_2m[humidityIndex];

    return {
      location: { name, country, latitude, longitude, timezone },
      current: {
        temperature_c: weatherJson.current_weather.temperature,
        weathercode: weatherJson.current_weather.weathercode,
        windspeed: weatherJson.current_weather.windspeed,
        humidity,
        time: currentTime,
      },
    };
  } catch (error) {
    throw new Error('Unable to fetch weather');
  }
}
