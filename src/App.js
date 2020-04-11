import React, { useState, useEffect } from "react";
import axios from "axios";
import MainData from "./MainData";
import MoreInfoButtons from "./MoreInfoButtons";
import "./App.css";

export default function App() {
  const [city, setCity] = useState("Lisbon");
  const [input, setInput] = useState("null");
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [units, setUnits] = useState("metric");
  const [fahrenheit, setFahrenheit] = useState(
    "btn btn-lg units inactive fahrenheit"
  );
  const [celsius, setCelsius] = useState("btn btn-lg units active celsius");
  const [windSpeedUnits, setWindSpeedUnits] = useState("m/s");
  const [detailsClassName, setDetailsClassName] = useState(
    "btn btn-light btn-sm details disabled"
  );
  const [forecastClassName, setForecastClassName] = useState(
    "btn btn-light btn-sm forecast"
  );
  let [imageUrl, setImageUrl] = useState(null);
  const [details, setDetails] = useState(true);
  const [forecast, setForecast] = useState(false);

  function displayForecast(event) {
    event.preventDefault();
    setForecastClassName("btn btn-light btn-sm details disabled");
    setDetailsClassName("btn btn-light btn-sm forecast");
    setForecast(true);
    setDetails(false);
  }

  function displayDetails(event) {
    event.preventDefault();
    setForecastClassName("btn btn-light btn-sm forecast");
    setDetailsClassName("btn btn-light btn-sm details disabled");
    setForecast(false);
    setDetails(true);
  }

  function displayImperialUnits(event) {
    event.preventDefault();
    setUnits("imperial");
    setFahrenheit("btn btn-lg units active fahrenheit");
    setCelsius("btn btn-lg units inactive celsius");
    setWindSpeedUnits("mph");
  }

  function displayMetricUnits(event) {
    event.preventDefault();
    setUnits("metric");
    setFahrenheit("btn btn-lg units inactive fahrenheit");
    setCelsius("btn btn-lg units active celsius");
    setWindSpeedUnits("m/s");
  }

  function displayCityImage(response) {
    setImageUrl(response.data.photos[3].src.portrait);
  }

  function handleResponse(response) {
    setWeatherData({
      iconUrl: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      temperature: Math.round(response.data.main.temp),
      tempMax: Math.round(response.data.main.temp_max),
      tempMin: Math.round(response.data.main.temp_min),
      pressure: response.data.main.pressure,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      windSpeed: response.data.wind.speed,
      city: response.data.name,
      time:
        response.data.dt * 1000 + response.data.timezone * 1000 - 3600 * 1000,
      ready: true,
    });
  }

  useEffect(
    function getCityData() {
      const apiKey = "1c79a9c19394dbdbf78cd6d4344cc928";
      const apiUrl = `https://api.openweathermap.org/data/2.5/`;
      let weatherApiUrl = `${apiUrl}weather?q=${city}&appid=${apiKey}&units=${units}`;
      axios.get(weatherApiUrl).then(handleResponse);
    },
    [city, units]
  );
  console.log(weatherData);
  useEffect(function getCityImage() {
    axios({
      method: "get",
      url: `https://api.pexels.com/v1/search?query=${city}+query&per_page=15&page=1`,
      headers: {
        Authorization:
          "563492ad6f91700001000001ea246cab4f4645409f66c0be39fbe2b1",
      },
    }).then(displayCityImage);
  });

  function readInput(event) {
    event.preventDefault();
    setInput(event.target.value);
  }

  function updateCity(event) {
    event.preventDefault();
    setCity(input);
  }

  if (weatherData.ready) {
    return (
      <div className="App">
        <div className="card text-white">
          <div className="card-overlay">
            <div className="row clearfix">
              <div className="form-group col-12 mt-1">
                <form className="form-inline search-form" onSubmit={updateCity}>
                  <input
                    type="search"
                    placeholder="Enter city"
                    autoComplete="off"
                    className="col-5 mr-2 search-engine"
                    onChange={readInput}
                  />
                  <input
                    type="submit"
                    value="🔍"
                    className="btn btn-sm search-glass"
                  />
                  <div className="icon local-icon">
                    <button className="col-2 mr-3 btn btn-sm current-location">
                      <i className="fas fa-map-marker-alt local-icon" />
                    </button>
                  </div>
                  <div className="col-3 temperature-units">
                    <a
                      href="/"
                      className={celsius}
                      onClick={displayMetricUnits}
                    >
                      C
                    </a>
                    |
                    <a
                      href="/"
                      className={fahrenheit}
                      onClick={displayImperialUnits}
                    >
                      F
                    </a>
                  </div>
                </form>
              </div>
            </div>
            <MainData data={weatherData} units={units} />
            <div className="row lower-end">
              <div className="col-6 city-image">
                <img
                  alt=""
                  src={imageUrl}
                  className="city-image card border-light"
                />
              </div>
              <div className="col-6 choose-buttons">
                <div className="btn-group" role="group">
                  <input
                    type="button"
                    className={detailsClassName}
                    value=" Details "
                    onClick={displayDetails}
                  />
                  <input
                    type="button"
                    className={forecastClassName}
                    value="Forecast"
                    onClick={displayForecast}
                  />
                </div>
                <MoreInfoButtons
                  weatherData={weatherData}
                  windSpeedUnits={windSpeedUnits}
                  details={details}
                  forecast={forecast}
                />
              </div>
            </div>
            <div className="links">
              <small className="pexels-link">
                Photo provided by
                <a
                  href="https://www.pexels.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pexels
                </a>
              </small>
              {/*             <small className="github-link">
              <a
                href="https://github.com/DiFGit/the-scientific-weather-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open-source code
              </a>
              , by DiFGit
            </small> */}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return "Loading...";
  }
}
