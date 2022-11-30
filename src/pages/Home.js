import React, {useState} from 'react';
import AddEvent from '../components/AddEvent';

export default function Home() {
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  const [events, setEvents] = useState([]);

  return (
    <section className='home'>
      <h1>Day calendar</h1>
      <p> Today {date}</p>
      <AddEvent/>
    </section>
  )
}
