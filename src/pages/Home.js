import React, {useState, useEffect} from 'react';
import moment from "moment";
import AddEventForm from '../components/AddEventForm';
import Calendar from '../components/Calendar';
import Events from '../components/Events'

export default function Home() {
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  const [events, setEvents] = useState({'10:00 AM' :[{eventname: 'hnlk', location: '98029n', startTime: '10:00', endTime: '11:00', id: 'j0evtWVGn'}]});
  const startTime = "9:00 am";
  const endTime = "9:00 pm";

  const [calendar, setCalendar] = useState([]);
  const [form, setForm] = useState('');


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

  function openForm (itemEvent) {
    console.log(itemEvent);
    setForm(<AddEventForm itemEvent = {itemEvent} changeEvents = {changeEvent}/>)
  }

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
      function changeEvent(data) {
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
      <Calendar calendar = {calendar}/>
      <Events events = {events} calendar = {calendar} openForm = {openForm}/>
      {form}
    </section>
  )
}
