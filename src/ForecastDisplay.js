import React from "react";

export default function ForecastDisplay(props) {
  let forecastDays = props.fourDayForecast;

  function formatForecastDay(timestamp) {
    let date = new Date(timestamp);
    let day = date.getDay();
    let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    let forecastWeekDay = days[day];
    return `${forecastWeekDay}`;
  }
  return (
    <div className="container forecast-display">
      {forecastDays.map((day) => {
        return (
          <div className="row">
            <div className="col">
              <small>
                {formatForecastDay(
                  day[0].dt * 1000 - props.data.city.timezone * 1000
                )}
              </small>
            </div>
            <div className="col">
              <img
                src={`http://openweathermap.org/img/wn/${day[0].weather[0].icon}@2x.png`}
                className="forecast-icon"
                alt=""
              />
            </div>
            <div className="col">
              <small>
                {Math.round(Math.max(...day.map((day) => day.main.temp_max)))}º
                / {Math.round(Math.min(...day.map((day) => day.main.temp_min)))}
                º
              </small>
            </div>
            <div className="w-100"></div>
          </div>
        );
      })}
    </div>
  );
}
