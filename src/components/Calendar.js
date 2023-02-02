import React from "react";

import "../assets/style/calendar.css";

export default function Calendar({ calendar }) {
  return (
    <div className="calendar__timing-container-column">
      <div className="calendar__timing">
        {calendar.map((item) => (
          <div className="calendar__hour" key={item}>
            <div className="calendar__minutes colorLight">{item}</div>
            <div className="calendar__minutes colorDark">:30</div>
          </div>
        ))}
      </div>
    </div>
  );
}
