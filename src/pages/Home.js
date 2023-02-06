import React, { useState, useEffect } from "react";
import moment from "moment";
import AddEventForm from "../components/AddEventForm";
import Calendar from "../components/Calendar";
import Events from "../components/Events";
import "../assets/style/home.css";

export default function Home() {
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  const [events, setEvents] = useState([]);
  const startTimeDay = "9:00 am";
  const endTimeDay = "9:00 pm";
  const dayRow = moment(endTimeDay, "hh:mm a").diff(
    moment(startTimeDay, "hh:mm a"),
    "minutes"
  );

  const [calendar, setCalendar] = useState([]);
  const [form, setForm] = useState("");

  useEffect(() => {
    let fullDayTime = [];
    let currentTime = moment(startTimeDay, "hh:mm A");
    while (
      moment(currentTime, "hh:mm A").isSameOrBefore(
        moment(endTimeDay, "hh:mm A")
      )
    ) {
      let timeString = currentTime.format("hh:mm A").toString();
      fullDayTime.push(timeString);
      currentTime = moment(currentTime, "hh:mm A").add(1, "hours").clone();
    }
    fullDayTime.pop();
    setCalendar(fullDayTime);
  }, []);

  function openForm(itemEvent) {
    setForm(
      <div className="home__changeEvent">
        <AddEventForm itemEvent={itemEvent} changeEvent={changeEvent} deleteEvent ={deleteEvent}/>
        <button className="home__close" onClick={(e) => setForm("")}>X</button>
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
  }

  return (
    <section className="home">
      <h1 className="home__title">Day calendar</h1>
      <p className="home__today"> Today {date}</p>
      <AddEventForm addEvent={addEvent} />
      <div
        className="home__main-container"
        style={{ gridTemplateRows: `repeat(${dayRow}, 1px)` }}
      >
        <Calendar calendar={calendar} />
        <Events
          events={events}
          calendar={calendar}
          openForm={openForm}
          startTimeDay={startTimeDay}
          dayRow={dayRow}
        />
        {form}
      </div>
    </section>
  );
}
