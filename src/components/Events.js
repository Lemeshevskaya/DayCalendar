import React, {useState} from 'react';
import AddEventForm from './AddEventForm'



export default function Events({ events, calendar, openForm }) {

  return (
    <ul>
          {calendar.map((item, i) => {
            if (events.hasOwnProperty(item)) {
              return events[item].map(
                (itemEvent) => (
                  <li key={itemEvent.id} onClick = {(e) => openForm(itemEvent)}>
                    <span>{itemEvent.eventname}</span>
                    <span>{itemEvent.location}</span>
                    <span>
                      {itemEvent.startTime}
                    </span>
                    <span>
                      {itemEvent.endTime}
                    </span>
                  </li>
                )
              );
            } else {
              return <div key = {i}>{item}</div>;
            }
          })}
        </ul>
  )
}
