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
      ready: true,
    });
  }
  console.log(forecastData);
  useEffect(
    function getForecastData() {
      const apiKey = "1c79a9c19394dbdbf78cd6d4344cc928";
      const apiUrl = `https://api.openweathermap.org/data/2.5/`;
      let apiForecastUrl = `${apiUrl}forecast?q=${data.city}&appid=${apiKey}&units=${props.units}`;
      axios.get(apiForecastUrl).then(handleForecastResponse);
      console.log(apiForecastUrl);
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
            0mm
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
