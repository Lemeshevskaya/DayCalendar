import React, {useState} from 'react';
import moment from "moment";
import AddEventForm from '../components/AddEventForm';
import Calendar from '../components/Calendar';

export default function Home() {
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  const [events, setEvents] = useState({});

  function addEvent(data) {
    console.log(data)
    
    if (data) {
      let eventsPrev = events;
      eventsPrev[data.startTime] = [data];
      setEvents(eventsPrev);
      console.log(events);
    }
  }

  return (
    <section className='home'>
      <h1>Day calendar</h1>
      <p> Today {date}</p>
      <AddEventForm addEvent = {addEvent}/>
      <Calendar events = {events}/>
    </section>
  )
}
