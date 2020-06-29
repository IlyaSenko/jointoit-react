import React from 'react';
import './App.scss'
import Sidebar from './Sidebar';
import Header from './Header';
import Calendar from './Calendar';

function App() {
  return (
    <div className="App">
      <Sidebar/>
      <section>
        <Header/>
        <h1>Calendar</h1>
        <Calendar />
      </section>
    </div>
  );
}

export default App;
