# Weather Application 🌤️

A simple, responsive weather application built with **React** and **Bootstrap** that fetches real-time weather data directly from the **Open-Meteo API**.

---

## Features

- Search weather by city
- Display temperature, weather condition, humidity, wind
- Toggle temperature units (°C / °F)
- Last searched city persistence (localStorage)
- Clear search functionality
- Responsive layout for mobile and desktop

---

## Tech Stack

- **Frontend:** React, Bootstrap, React Icons
- **API:** Open-Meteo (public API)
- **Styling:** Bootstrap + custom CSS
- **Utilities:** JavaScript ES6, localStorage

---

## Installation

1. Clone the repository: git clone https://github.com/m-u-k-u-l/weather-app.git
2. Navigate to the project folder: cd weather-app-frontend
3. Install dependencies: npm install
4. Start the development server: npm start
5. Open in browser: http://localhost:3000

## Preview

<img width="1366" height="768" alt="Screenshot" src="https://github.com/user-attachments/assets/8f18d382-ccf7-412e-870f-087894c862be" />

## API Integration

This app fetches real-time weather data directly from the Open-Meteo API without the need for an API key.
How it works

**1. City Geocoding**
When a user enters a city, the app calls the Open-Meteo geocoding API to get latitude and longitude:
https://geocoding-api.open-meteo.com/v1/search?name={CITY_NAME}&count=1&format=json

**2. Fetch Weather Data**
Using the returned latitude and longitude, the app calls the Open-Meteo forecast API to get current weather and humidity:
https://api.open-meteo.com/v1/forecast?latitude={LAT}&longitude={LON}&current_weather=true&hourly=relativehumidity_2m&timezone=auto

**3. Data Formatting**
***The app formats the response to display:***
1. Temperature (°C)
2. Weather condition (icon & description)
3. Humidity (%)
4. Wind speed (km/h)
5. Local time of the city

**4. No API Key Required**
Open-Meteo is free and public, so no API key or signup is needed.
