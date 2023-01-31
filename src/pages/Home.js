import React, { useState, useEffect } from "react";
import moment from "moment";
import AddEventForm from "../components/AddEventForm";
import Calendar from "../components/Calendar";
import Events from "../components/Events";
import '../assets/style/home.css'

export default function Home() {
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  const [events, setEvents] = useState([]);
  const startTimeDay = "9:00 am";
  const endTimeDay = "9:00 pm";

  const [calendar, setCalendar] = useState([]);
  const [form, setForm] = useState("");

  useEffect(() => {
    let fullDayTime = [];
    let currentTime = moment(startTimeDay, "hh:mm A");
    while (
      moment(currentTime, "hh:mm A").isSameOrBefore(moment(endTimeDay, "hh:mm A"))
    ) {
      let timeString = currentTime.format("hh:mm A").toString();
      fullDayTime.push(timeString);
      currentTime = moment(currentTime, "hh:mm A").add(1, "minutes").clone();
    }
    setCalendar(fullDayTime);
  }, []);

  function openForm(itemEvent) {
    console.log(itemEvent);
    setForm(
      <div>
        <AddEventForm itemEvent={itemEvent} changeEvent={changeEvent} />
        <button onClick={(e) => deleteEvent(itemEvent)}>delete</button>
      </div>
    );
  }

  function addEvent(data) {
    setEvents([...events, data]);
  }
  function changeEvent(data) {
    let copyEvents = [...events];
    for (let i = 0; i < copyEvents.length; i++) {
      if (copyEvents[i].id === data.id) {
        copyEvents[i] = data;
        break;
      }
    }
    setEvents(copyEvents);
    setForm("");
  }
  function deleteEvent(data) {
    let copyEvents = [...events];
    for (let i = 0; i < copyEvents.length; i++) {
      if (copyEvents[i].id === data.id) {
        copyEvents.splice(i, 1);
        break;
      }
    }
    setEvents(copyEvents);
    setForm("");
    console.log(events);
  }

  return (
    <section className="home">
      <h1>Day calendar</h1>
      <p> Today {date}</p>
      <AddEventForm addEvent={addEvent} />
      <div className="home__main-container" style={{gridTemplateRows: `repeat(${moment(endTimeDay,"hh:mm a" ).diff(moment(startTimeDay,"hh:mm a"), 'minutes')}, 1fr)`}}>
          <Calendar calendar={calendar} />
          <Events events={events} calendar={calendar} openForm={openForm} startTimeDay={startTimeDay}/>  
        
      </div>
      
      
      {form}
    </section>
  );
}
