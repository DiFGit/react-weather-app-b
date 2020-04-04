import React, { useState } from "react";
import axios from "axios";
import MainData from "./MainData";
import MoreInfoButtons from "./MoreInfoButtons";
import "./App.css";

export default function App() {
  const [city, setCity] = useState("Lisbon");
  const [weatherData, setWeatherData] = useState({ ready: false });
  /* const [detailsDisplay, setDetailsDisplay] = useState(true); */

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
      ready: true
    });
  }
  console.log(weatherData);

  function getCityData() {
    const apiKey = "1c79a9c19394dbdbf78cd6d4344cc928";
    const apiUrl = `https://api.openweathermap.org/data/2.5/`;
    let weatherApiUrl = `${apiUrl}weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(weatherApiUrl).then(handleResponse);
  }

  function readInput(event) {
    setCity(event.target.value);
  }

  function updateCity(event) {
    event.preventDefault();
    getCityData();
  }

  /*   function activateDetailsButton() {
    setDetailsDisplay(true);
  }

  function activateForecastButton() {
    setDetailsDisplay(false);
  } */

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
                    <a href="/" className="btn btn-lg units active celsius">
                      C
                    </a>
                    |
                    <a
                      href="/"
                      className="btn btn-lg units inactive fahrenheit"
                    >
                      F
                    </a>
                  </div>
                </form>
              </div>
            </div>
            <MainData data={weatherData} />
            <div className="row lower-end">
              <div className="col-6 city-image">
                <img
                  alt=""
                  src="https://images.pexels.com/photos/3568789/pexels-photo-3568789.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  className="city-image card border-light"
                />
              </div>
              <div className="col-6 choose-buttons">
                <div className="btn-group" role="group">
                  <input
                    type="button"
                    className="btn btn-light btn-sm details"
                    value=" Details "
                    disable
                    /* onClick={setDetailsDisplay(true)} */
                  />
                  <input
                    type="button"
                    className="btn btn-light btn-sm forecast"
                    value="Forecast"
                    /* onClick={setDetailsDisplay(false)} */
                  />
                </div>
                <MoreInfoButtons
                  weatherData={weatherData}
                  /* infoDisplayed={detailsDisplay} */
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
    getCityData();
    return "Loading...";
  }
}
