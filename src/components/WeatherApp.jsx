import React, { useState, useEffect } from 'react';
import './WeatherApp.css';
import axios from 'axios';
import Box from './Box';
import { WiDayHaze, WiThermometer, WiHumidity, WiStrongWind, WiWindy } from "react-icons/wi";
import { FiMeh } from "react-icons/fi";

const WeatherApp = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [uvIndex, setUVIndex] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timerId); // Cleanup interval on component unmount
  }, []);

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (date) => {
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return date.toLocaleTimeString(undefined, options);
  };

  const getWeather = async (e) => {
    e.preventDefault();
    const apiKey = 'd870fa2af9a7d197e969969c88abca11'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(url);
      setWeather(response.data);
      setError(null); // Clear any previous errors

      // Fetch UV index
      const { lat, lon } = response.data.coord;
      const uvUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      const uvResponse = await axios.get(uvUrl);
      setUVIndex(uvResponse.data.value);
    } catch (error) {
      console.error('Error fetching the weather data', error);
      setError('Failed to fetch weather data. Please check the city name and API key.');
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="container-fluid">
          <h4>WEATHER-APP</h4>
          <form className="d-flex" role="search" onSubmit={getWeather}>
            <input
              className="form-control me-2"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city"
            />
            <button className="btn btn-success" type="submit">Search</button>
          </form>
        </div>
      </nav>

      <div className='parent'>
        <div className="cont">
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {weather && (
            <div className="cont1">
              <div className='cont2' style={{ display: "flex" }}>
                <h1>{weather.name}</h1>
                <i
                  className="fa-solid fa-location-dot"
                  style={{ marginTop: "0.5rem", marginLeft: "0.5rem", fontSize: "2rem" }}
                ></i>
              </div>
              <p>{formatDate(currentDateTime)}</p>
              <p>{formatTime(currentDateTime)}</p>

              <p style={{ fontSize: "5rem" }}>{weather.main.temp} °C</p>
              <p>{weather.weather[0].description}</p>
            </div>
          )}
        </div>
        <div className='boxInfo'>
          {weather && (
            <>
              <div className='boxInfo1'>
                <Box icon={WiDayHaze} content="UV" content1={uvIndex ? `${uvIndex} Moderate` : "Loading..."} />
                <Box icon={WiThermometer} content="Feels like" content1={`${weather.main.feels_like} °C`} />
                <Box icon={WiHumidity} content="Humidity" content1={`${weather.main.humidity} %`} />
              </div>
              <div className='boxInfo1' style={{marginTop: "10rem" }}>
                <Box icon={WiStrongWind} content="Wind Speed" content1={`${weather.wind.speed} m/s`} />
                <Box icon={WiWindy} content="Air Pressure" content1={`${weather.main.pressure} hPa`} />
                <Box icon={FiMeh} content="Visibility" content1={`${weather.visibility / 1000} km`} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default WeatherApp;
