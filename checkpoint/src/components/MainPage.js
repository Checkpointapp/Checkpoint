import '../../src/styles/main.css';
import '../../src/styles/bulletin.css';
import Calendar from './Calendar';
import '../styles/tasks.css';
import "firebase/auth";
import firebase from "firebase/app";
import React, { useState, useEffect } from 'react';
import Task from './Task';
import { InputGroup, FormControl, Button, Form } from "react-bootstrap";

export default function MainPage() {

  /*onDayClick = (e, day) => {
    alert(day);
  }*/

  const [lists, setLists] = useState(null);
  const [listid, setListid] = useState(null);

  function addPinMessage() {

    setTimeout(() => {
      let x = document.getElementsByClassName("list-title");
      let y = document.getElementsByClassName("lonely");
      let z = document.getElementsByClassName("pin-list-dialog");
      try {
        if (x[0] === undefined) {
          z[0].style.setProperty("display", "block", "important");
        } else {
          z[0].style.setProperty("display", "none", "important");
        }
      } catch {
        console.log('didnt run')
      }
    }, 300);

  }

  useEffect(() => {
    var userId = firebase.auth().currentUser.uid;
    var starCountRef = firebase.database().ref("users/" + userId + "/lists/");
    starCountRef.on('value', (snapshot) => {
      const data = snapshot.val();
      setLists(data);
    });
  }, []);

  async function onSubmit() {
    var userId = firebase.auth().currentUser.uid;
    await firebase.database().ref("/users/" + userId + "/lists/" + listid + "_list/").update({
      pinnedList: true
    });
    console.log("pin")
    addPinMessage();
  }

  async function unpinList(listSec) {
    var userId = firebase.auth().currentUser.uid;
    await firebase.database().ref("/users/" + userId + "/lists/" + listSec + "_list/").update({
      pinnedList: false
    });
    console.log("unpin")
    addPinMessage();
  }

  return (
    <>
      <h1 className="main-page-desc-logged-in">Welcome back! Let's get started.</h1>

      {/*<h2 class="calendar-heading">Your calendar:</h2>
        <Calendar style={style} width="302px"
    oneDayClick={(e, day) => this.onDayaClick(e, day)} />*/}

      <div className="bulletin-board">
        <div className="bulletin">
          <h1 className="bulletin-heading"><a href="/tasks">Tasks</a></h1>
          <div className="tasks-flex">
            {lists != null ? Object.keys(lists).reverse().map((oneList) => {
              var listName = lists[oneList]['listName'];
              var listSec = lists[oneList]['utcSec'];
              var listTasks = lists[oneList]['tasks'];
              var pinnedList = lists[oneList]['pinnedList'];

              if (pinnedList === true) {

                return (
                  <>
                    <div className="tasks-list">
                      <Button
                        onClick={() => { unpinList(listSec); addPinMessage() }}
                        type="submit"
                      >
                        Unpin List
                      </Button>
                      <h2 className="list-title">{listName}</h2>
                      <div className="tasks-list-container">
                        <ul className="tasklist">
                          {listTasks != null ? Object.keys(listTasks).reverse().map((task) => {
                            var text = listTasks[task]['contents']['text'];
                            return (
                              <li key={task}>
                                <br></br>
                                <Task date={task} text={text} listSec={listSec} />
                              </li>
                            )
                          }) : <div className="lonely"><p>It's lonely here. Let's add some tasks!</p></div>}
                        </ul>
                      </div>
                    </div>
                  </>
                )
              }

              addPinMessage();

            }) : <div className="lonely"><p>It's lonely here. <a href="tasks">Let's add a list!</a></p></div>}

            <div className="pin-list-dialog">Pin a list to your homepage:
              <div className="create-task-input-container">
                <div className="pin-list-input">
                  <InputGroup className="mb-3">
                    <Form.Select
                      required
                      aria-label="Select the list to pin"
                      value={listid}
                      onChange={(event) => setListid(event.target.value)}
                    >
                      <option value="" selected disabled hidden>List Name</option>
                      {lists != null ? Object.keys(lists).reverse().map((oneList) => {
                        var listName = lists[oneList]['listName'];
                        var listsec = lists[oneList]['utcSec'];
                        return (
                          <option value={listsec}>{listName}</option>
                        )
                      }) : <div></div>}
                    </Form.Select>
                  </InputGroup>
                  <Button
                    onClick={() => { onSubmit(); addPinMessage() }}
                    type="submit"
                  >
                    Pin List
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bulletin">
          <h1 className="bulletin-heading">Timer</h1>
        </div>
        <div className="bulletin">
          <h1 className="bulletin-heading">Resources</h1>
        </div>
      </div>
    </>
  )
}