import React from "react";

export default function MoreInfo(props) {
  if (props.details) {
    return (
      <div classeName="moreInfo">
        <ul className="weather-details">
          <li>
            Wind: <span className="wind-speed" />
            <span className="wind-units" /> {props.weatherData.windSpeed}
            {props.windSpeedUnits}
          </li>
          <li>
            Humidity: <span className="humidity" />
            {props.weatherData.humidity}%
          </li>
          <li>
            Precipitation: <span className="pressure" />
            0mm
          </li>
          <li>
            Pressure: <span className="pressure" />
            {props.weatherData.pressure}mb
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <div className="more-info">
        <ul className="weather-details">
          <li>
            <span className="forecast-weekday">Tuesday</span>{" "}
            <span className="forecast-icon">icon</span>{" "}
            <span className="forecast-temp">14º/12º</span>
          </li>
          <li>
            <span className="forecast-weekday">Wednesday</span>{" "}
            <span className="forecast-icon">icon</span>{" "}
            <span className="forecast-temp">14º/12º</span>
          </li>
          <li>
            <span className="forecast-weekday">Thursday</span>{" "}
            <span className="forecast-icon">icon</span>{" "}
            <span className="forecast-temp">14º/12º</span>
          </li>
          <li>
            <span className="forecast-weekday">Friday</span>{" "}
            <span className="forecast-icon">icon</span>{" "}
            <span className="forecast-temp">14º/12º</span>
          </li>
        </ul>
      </div>
    );
  }
}
