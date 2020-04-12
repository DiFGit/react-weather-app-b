import React from "react";

export default function Forecast(props) {
  console.log(props.city);
  console.log(props.units);
  console.log(props.forecast);
  /* 
  let [forecast, setForecast] = useState(null);


  function handleForecastResponse(response) {
    setForecast({
      data: response.data,
      city: response.data.city.name,
      date: response.data.list[0].dt,
      timezone: response.data.city.timezone,
      ready: true,
    });
    console.log(response.data);
  }

  function getForecastData() {
    const apiKey = "1c79a9c19394dbdbf78cd6d4344cc928";
    const apiUrl = `https://api.openweathermap.org/data/2.5/`;
    let apiForecastUrl = `${apiUrl}forecast?q=${props.city}&appid=${apiKey}&units=${props.units}`;
    axios.get(apiForecastUrl).then(handleForecastResponse);
    console.log(apiForecastUrl);
  }

  if (forecast.ready && forecast.city === props.city) { */
  return (
    <div className="more-info">
      <ul className="weather-details">
        <li>
          <span className="forecast-weekday">{props.forecast.timezone}</span>{" "}
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
  /*   } else {
    getForecastData();
  } */
}
