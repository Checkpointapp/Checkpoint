import '../../src/styles/main.css';
import '../../src/styles/bulletin.css';
import '../styles/tasks.css';
import '../styles/resources.css';
import "firebase/auth";
import firebase from "firebase/app";
import React, { useState, useEffect } from 'react';
import Task from './Task';
import { InputGroup, Button, Form, FormControl, Modal } from "react-bootstrap";
import Resource from './Resource';

export default function MainPage() {

  const [lists, setLists] = useState(null);
  const [listid, setListid] = useState(null);
  const [resources, setresources] = useState(null);
  const [newResourceName, setnewResourceName] = useState("");
  const [resourceLink, setresourceLink] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  useEffect(() => {
    var userId = firebase.auth().currentUser.uid;
    var starCountRef = firebase.database().ref("users/" + userId + "/resources/");
    starCountRef.on('value', (snapshot) => {
      const data = snapshot.val();
      setresources(data);
    });
  }, []);

  async function addResource() {
    var userId = firebase.auth().currentUser.uid;
    const now = new Date();
    const utcMilli = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
    const utcSec = Math.round(utcMilli / 1000);
    var newLink = resourceLink;
    if (!(resourceLink.startsWith("https://") || resourceLink.startsWith("http://"))) {
      newLink = "https://" + resourceLink;
    }
    await firebase.database().ref("/users/" + userId + "/resources/" + utcSec + "_resource").set({
      newResourceName: newResourceName,
      resourceLink: newLink,
      utcSec: utcSec
    });
    setShow(false);
  }

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
        {/*<div className="bulletin">
          <h1 className="bulletin-heading">Timer</h1>
                    </div>*/}
        <div className="bulletin">
          <h1 className="bulletin-heading"><a href="/resources">Resources</a></h1>
          <div className="resources-everything-box">
            <div className="add-resource">
              <Button className="custom-button" onClick={handleShow} >Add link</Button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>New Resource</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <InputGroup className="mb-3">
                    <FormControl
                      aria-label="Resource Name"
                      value={newResourceName}
                      placeholder="Resource Name"
                      onChange={(event) => setnewResourceName(event.target.value)}
                    />
                    <FormControl
                      aria-label="Resource Link"
                      value={resourceLink}
                      placeholder="Resource Link"
                      onChange={(event) => setresourceLink(event.target.value)}
                    />
                  </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={addResource}>
                    Add link
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
            <div className="resources-flex">
              {resources != null ? Object.keys(resources).reverse().map((oneresource) => {
                var resourcesec = resources[oneresource]['utcSec'];
                var text = resources[oneresource]['newResourceName'];
                var link = resources[oneresource]['resourceLink'];
                return (
                  <Resource text={text} link={link} resourcesec={resourcesec} />
                )
              }) : <div className="lonely"><p>It's lonely here. Let's add a resource!</p></div>}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}