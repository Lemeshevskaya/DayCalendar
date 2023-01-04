import React from "react";

import "../assets/style/calendar.css";

export default function Calendar({ calendar }) {
  
  return (
    <>
      <div>Calendar</div>
      <div className="container">
        <div className="">
          {calendar.map((item) => (
            <div key={item}>{item}</div>
          ))}
        </div>
      </div>
    </>
  );
}
