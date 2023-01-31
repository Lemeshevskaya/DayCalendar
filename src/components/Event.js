import React from 'react'

export default function Event({event, openForm}) {
  return (
    
      <li key={event.id} onClick={(e) => openForm(event)}>
        <span>{event.eventname}</span>
        <span>{event.location}</span>
        <span>{event.startTime12}</span>
        <span>{event.endTime12}</span>
      </li>
  )
}
