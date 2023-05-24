import React, { useState } from "react";
import "./App.css";

const api = {
  key: "211e54d154e44485b47230652232305",
  base: "http://api.weatherapi.com/v1",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    search();
  };

  const search = () => {
    fetch(`${api.base}/current.json?key=${api.key}&q=${query}&aqi=no`)
      .then((response) => response.json())
      .then((result) => {
        setWeather(result);
        setQuery("");
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Weather App</h1>
        <form onSubmit={handleSubmit}>
          <div id="header">
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={handleInputChange}
            />
            <button type="submit">Search</button>
          </div>
        </form>
        {weather && typeof weather.current !== "undefined" ? (
          <div id="weatherInfo">
            <p>
              <i>{weather.location.localtime}</i>
            </p>
            <h3>
              <i>
                {weather.location.name}, {weather.location.country}
              </i>
            </h3>
            <hr />
            <p>Current temp</p>
            <h1 className="temp">{weather.current.temp_c}°C</h1>
            <p>Current condition</p>
            <h4>{weather.current.condition.text}</h4>
            <img
              src={weather.current.condition.icon}
              alt="icon"
              style={{ width: "50px" }}
            />
            <hr />
            <p>Current Wind </p>
            <h3>{weather.current.wind_kph} kph</h3>
            <p>Current Humidity </p>
            <h3>{weather.current.humidity} %</h3>
          </div>
        ) : (
          <p>Please Search for a city...</p>
        )}
      </div>
    </div>
  );
}

export default App;
