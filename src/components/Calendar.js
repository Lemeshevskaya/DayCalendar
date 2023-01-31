import React from "react";

import "../assets/style/calendar.css";

export default function Calendar({ calendar }) {
  
  return (
    <>
      <div className="calendar__timing-container-column">
        <div className="calendar__timing">
        {calendar.map((item) => {
            if(item.substring(3,5) === '00') {
              return <div className="calendar-minutes" key={item}>{item}</div>
            } else if (item.substring(3,5) === '30') {
              return <div className="calendar-minutes" key={item}>{item}</div>
            } else {
              return <div className="calendar-minutes" key={item}></div>
            }
})}
        </div>
          
      </div>
    </>
  );
}
