import React, { useEffect, useState } from "react";
import Event from "./Event";
import moment from "moment";
import "../assets/style/events.css";

export default function Events({ events, calendar, openForm, startTimeDay }) {
  console.log(startTimeDay);

  const [eventsObj, setEventsObj] = useState({});

  useEffect(() => {
    let cal = {};
    for (let i of events) {
      console.log(i);
      if (cal.hasOwnProperty(i.startTime12)) {
        cal[i.startTime12] = [...cal[i.startTime12], i];
      } else {
        cal[i.startTime12] = [i];
      }
    }
    setEventsObj(cal);
    console.log(cal);
  }, [events, calendar]);
  console.log(calendar.length)
  

  return (
    <div className="events__container">
      
            {/* {events.map((event) => (
            
              <div className="events__event"  style={{height:`${moment(event.endTime,"HH:mm A" ).diff(moment(event.startTime,"HH:mm A"), 'minutes')}px`, top: `${moment(event.startTime,"HH:mm A").diff(moment(startTimeDay,"hh:mm a"), 'minutes')}px`}}>
                <Event event={event} openForm={openForm} />
              </div>
          ))} */}
          {calendar.map((item, i) => {
  if (eventsObj.hasOwnProperty(item)) {
    return eventsObj[item].map(
      (itemEvent) => (
        <div className='events__event'  style={{gridRow:`${moment(itemEvent.startTime,"HH:mm A" ).diff(moment(startTimeDay,"hh:mm a"), 'minutes')} / span ${moment(itemEvent.endTime,"HH:mm A" ).diff(moment(startTimeDay,"hh:mm a"), 'minutes')}`}}>
                <Event event={itemEvent} openForm={openForm} />
              </div>
      )
    );
  } else {
    return <div key = {i} className={`event__minute ${item}`}></div>;
  }
})}
    </div>
  );
}