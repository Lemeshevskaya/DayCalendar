import React from "react";
import moment from "moment";

import "../assets/style/event.css";

export default function Event({ event }) {
  let startTime12 = moment(event.startTime, "HH:mm").format("hh:mm A");
  let endTime12 = moment(event.endTime, "HH:mm").format("hh:mm A");
  return (
    <li key={event.id} className="event__container">
      <span>{event.eventname}</span>
      <span>{event.location}</span>
      <div>
        <span>{startTime12}</span>
        <span> - </span>
        <span>{endTime12}</span>
      </div>
    </li>
  );
}
