import React, { useEffect, useState } from "react";
import moment from "moment";
import "../assets/style/calendar.css";

export default function Calendar({ events }) {
  console.log(events);
  const startTime = "9:00 am";
  const endTime = "9:00 pm";

  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    let fullDayTime = [];
    let currentTime = moment(startTime, "hh:mm A");
    while (
      moment(currentTime, "hh:mm A").isSameOrBefore(moment(endTime, "hh:mm A"))
    ) {
      let timeString = currentTime.format("hh:mm A").toString();
      fullDayTime.push(timeString);
      currentTime = moment(currentTime, "hh:mm A").add(1, "hours").clone();
    }
    setCalendar(fullDayTime);
  }, []);

  console.log(calendar);


  
  return (
    <>
      <div>Calendar</div>
      <div className="container">
        <div className="">
          {calendar.map((item) => (
            <div key={item}>{item}</div>
          ))}
        </div>
        <ul>
          {calendar.map((item, i) => {
            if (events.hasOwnProperty(item)) {
              return events[item].map(
                ({ id, location, startTime, endTime, eventname }) => (
                  <li key={id}>
                    <span>{eventname}</span>
                    <span>{location}</span>
                    <span>
                      {startTime}
                    </span>
                    <span>
                      {endTime}
                    </span>
                  </li>
                )
              );
            } else {
              return <div key = {i}>{item}</div>;
            }
          })}
        </ul>
      </div>
    </>
  );
}
