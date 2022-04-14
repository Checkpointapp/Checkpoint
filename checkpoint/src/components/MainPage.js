import '../../src/styles/main.css';
import '../../src/styles/bulletin.css';
import Calendar from './Calendar';
import '../styles/tasks.css';
import "firebase/auth";
import firebase from "firebase/app";
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Task from './Task';

class MainPage extends React.Component {

  /*onDayClick = (e, day) => {
    alert(day);
  }*/

  render() {
    return (
      <>
        <h1 className="main-page-desc-logged-in">Welcome back! Let's get started.</h1>

        {/*<h2 class="calendar-heading">Your calendar:</h2>
        <Calendar style={style} width="302px"
    oneDayClick={(e, day) => this.onDayaClick(e, day)} />*/}

        <div className="bulletin-board">
          <div className="bulletin">
            <h1 className="bulletin-heading"><a href="/tasks">Tasks</a></h1>
          </div>
          <div className="bulletin">
            <h1 className="bulletin-heading">Timer</h1>
          </div>
          <div className="bulletin">
            <h1 className="bulletin-heading">Links</h1>
          </div>
        </div>
      </>
    )
  }
}

export default MainPage;