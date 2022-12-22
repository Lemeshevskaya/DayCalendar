import React, {useState} from 'react';
import AddEventForm from '../components/AddEventForm';
import Calendar from '../components/Calendar';

export default function Home() {
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  const [events, setEvents] = useState({'10:00 AM' :[{eventname: 'hnlk', location: '98029n', startTime: '10:00', endTime: '11:00', id: 'j0evtWVGn'}]});

  function addEvent(data) {
    console.log(data)
    
        if(events.hasOwnProperty(data.startTime)) {

          setEvents({
            ...events,
            [data.startTime]: [...events[data.startTime], data]
          })
        } else {
          setEvents({
            ...events,
            [data.startTime]: [data]
          })
        }
      };
      console.log(events);

  return (
    <section className='home'>
      <h1>Day calendar</h1>
      <p> Today {date}</p>
      <AddEventForm addEvent = {addEvent}/>
      <Calendar events = {events}/>
    </section>
  )
}
