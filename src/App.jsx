// src/App.js
import React from 'react';
import VideoBackground from './VideoBackground';
import WeatherApp from "./components/WeatherApp";

import './App.css';

const App = () => {
  return (
    <div className="App">
      <VideoBackground />
      <WeatherApp/>
    </div>
  );
};

export default App;
