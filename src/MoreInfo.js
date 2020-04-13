import React, { useState, useEffect } from "react";
import Forecast from "./Forecast";
import axios from "axios";

export default function MoreInfo(props) {
  const data = props.weatherData;
  let [forecastData, setForecastData] = useState({ ready: false });

  function handleForecastResponse(response) {
    setForecastData({
      data: response.data,
      city: response.data.city.name,
      date: response.data.list[0].dt,
      timezone: response.data.city.timezone,
      mainWeather: response.data.list[0].weather[0].main,
      ready: true,
    });
  }

  useEffect(
    function getForecastData() {
      const apiKey = "1c79a9c19394dbdbf78cd6d4344cc928";
      const apiUrl = `https://api.openweathermap.org/data/2.5/`;
      let apiForecastUrl = `${apiUrl}forecast?q=${data.city}&appid=${apiKey}&units=${props.units}`;
      axios.get(apiForecastUrl).then(handleForecastResponse);
    },
    [data.city, props.units]
  );

  if (props.forecast && forecastData.city === data.city) {
    return (
      <Forecast
        forecastData={forecastData}
        weatherData={data}
        units={props.units}
      />
    );
  } else {
    if (forecastData.mainWeather === "Rain") {
      let precipitation = forecastData.data.list[0].rain["3h"];
      return (
        <div classeName="moreInfo">
          <ul className="weather-details">
            <li>
              Wind: <span className="wind-speed" />
              <span className="wind-units" /> {data.windSpeed}
              {props.windSpeedUnits}
            </li>
            <li>
              Humidity: <span className="humidity" />
              {data.humidity}%
            </li>
            <li>
              Precipitation: <span className="pressure" />
              {precipitation}mm
            </li>
            <li>
              Pressure: <span className="pressure" />
              {data.pressure}mb
            </li>
          </ul>
        </div>
      );
    } else {
      return (
        <div classeName="moreInfo">
          <ul className="weather-details">
            <li>
              Wind: <span className="wind-speed" />
              <span className="wind-units" /> {data.windSpeed}
              {props.windSpeedUnits}
            </li>
            <li>
              Humidity: <span className="humidity" />
              {data.humidity}%
            </li>
            <li>
              Precipitation: <span className="pressure" />
              00mm
            </li>
            <li>
              Pressure: <span className="pressure" />
              {data.pressure}mb
            </li>
          </ul>
        </div>
      );
    }
  }
}
