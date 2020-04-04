import React from "react";

export default function DateandTime(props) {
  let date = new Date(props.data);
  let day = date.getDay();
  let days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday"
  ];
  let weekday = days[day];
  let hour = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return (
    <small>
      {weekday}, {hour}:{minutes}{" "}
    </small>
  );
}
