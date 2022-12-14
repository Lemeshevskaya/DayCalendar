import React from "react";
import moment from "moment";

export default function Calendar( {events} ) {
  const startTime = "9:00 am";
  const endTime = "9:00 pm";
  let calendar = [];

  const createDay = (events) => {
    let currentTime = moment(startTime, "hh:mm A");
    let timeString;
    let timeObj;
    while (
      moment(currentTime, "hh:mm A").isSameOrBefore(moment(endTime, "hh:mm A"))
    ) {
      timeString = currentTime.format("hh:mm A").toString();
      timeObj = {[timeString]: '0'};
      if (events.hasOwnProperty(timeString)) {
    
        timeObj = {[timeString]: events[timeString]};
      }
      calendar.push(timeObj);
      console.log(calendar);
      currentTime = moment(currentTime, "hh:mm A").add(1, "hours").clone();
    }

    while (calendar.length > 0) {
      return calendar.map((item) => (
        <>
        <div key = {Object.keys(item)[0]}>{Object.keys(item)[0]}</div>
          <div></div>
        </>
      ));
    }
  };
  console.log(calendar);

  return (
    <>
      <div>Calendar</div>
      <div className="container">
      {createDay(events)} 
      </div>
      {/* {events && (
        <ul>
          {array.forEach(element => {
            
          });(let event of events){
            return (
              <>
              <li key={id}>
  <span>{eventname}</span>
  <span>{location}</span>
  <span>{moment(startTime, "hh:mm A").format("hh:mm A").toString()}</span>
  <span>{moment(endTime, "hh:mm A").format("hh:mm A").toString()}</span>
  </li>
              </>
            )
          }
  }
        </ul>
      )} */}
    </>
  );
}
