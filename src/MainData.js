import React from "react";
import DateAndTime from "./DateAndTime";

export default function MainData(props) {
  return (
    <div className="row">
      <div className="col-4 left-data">
        <div className="day-hour">
          {" "}
          <DateAndTime data={props.data.time} />
        </div>
        <h4 className="location">{props.data.city}</h4>
        <div className="weather-description">{props.data.description}</div>
      </div>
      <div className="col-4 current-weather">
        <img alt="" src={props.data.iconUrl} className="weather-icon" />
      </div>
      <div className="col-4 current-temperature-data">
        <div className="current-temperature">
          <strong className="current-temperature-element">
            {props.data.temperature}º
          </strong>
        </div>
        <div className="temp-max-min">
          {props.data.tempMax}º/{props.data.tempMin}º
        </div>
      </div>
    </div>
  );
}
