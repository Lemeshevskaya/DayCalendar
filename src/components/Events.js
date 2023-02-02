import React, { useEffect, useState } from "react";
import Event from "./Event";
import moment from "moment";
import "../assets/style/events.css";

export default function Events({ events, openForm, startTimeDay, dayRow }) {
  console.log(events);

  const [eventsNumCol, setEventsNumCol] = useState({});
  const [maxNumCol, setMaxNumCol] = useState(0);

  useEffect(() => {
    let cal = {};
    for (let event of events) {
      let eventStartTime = moment(event.startTime, "HH:mm");
      let eventEndTime = moment(event.endTime, "HH:mm").subtract(1, "minutes");
      while (
        moment(eventStartTime, "HH:mm").isSameOrBefore(
          moment(eventEndTime, "HH:mm")
        )
      ) {
        let timeString = eventStartTime.format("hh:mm A").toString();
        eventStartTime = moment(eventStartTime, "HH:mm")
          .add(1, "minutes")
          .clone();
        if (cal.hasOwnProperty(timeString)) {
          cal[timeString] = 1 + cal[timeString];
          if (maxNumCol < cal[timeString]) {
            setMaxNumCol(cal[timeString]);
          }
        } else {
          cal[timeString] = 1;
        }
      }
    }
    setEventsNumCol(cal);
    console.log(cal);
  }, [events]);

  let gridColumn = (event) => {
    let column = 1;
    let eventStartTime = moment(event.startTime, "HH:mm");
    while (
      moment(eventStartTime, "HH:mm").isSameOrBefore(
        moment(event.endTime, "HH:mm")
      )
    ) {
      let timeString = eventStartTime.format("hh:mm A").toString();
      if (column < eventsNumCol[timeString]) {
        column = eventsNumCol[timeString];
      }
      eventStartTime = moment(eventStartTime, "HH:mm")
        .add(1, "minutes")
        .clone();
    }
    if (column === 1) {
      return `1 / span ${maxNumCol}`;
    } else {
      return "auto";
    }
  };

  return (
    <div
      className="events__container"
      style={{ gridTemplateRows: `repeat(${dayRow}, 1px)` }}
    >
      {events.map((event) => (
        <div
          className="events__event"
          style={{
            gridRow: `${moment(event.startTime, "HH:mm A").diff(
              moment(startTimeDay, "hh:mm a"),
              "minutes"
            )} / ${moment(event.endTime, "HH:mm A").diff(
              moment(startTimeDay, "hh:mm a"),
              "minutes"
            )}`,
            gridColumn: gridColumn(event),
          }}
          onClick={(e) => openForm(event)}
        >
          <Event event={event} />
        </div>
      ))}
    </div>
  );
}
