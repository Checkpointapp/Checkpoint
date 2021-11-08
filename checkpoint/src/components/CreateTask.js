import React, { useState } from "react"
import AuthContext from "../contexts/AuthContext"
import firebase from "firebase/app";
import { withRouter, useHistory } from "react-router";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import '../../src/styles/tasks.css'
import "firebase/database";

function CreateTask(props) {

    const [text, setText] = useState("");

    async function onSubmit() {
        var userId = firebase.auth().currentUser.uid;
        const now = new Date();  
        const utcMilli = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);  
        const utcSec = Math.round(utcMilli / 1000);
        await firebase.database().ref(userId + "/tasks/" + utcSec + "/contents").set({
            text: text
          });
          props.history.push({ 
            pathname: "/tasks"
        });
    }

  return (
      <>
        <div className="create-task-input-container">
            <div className="create-task-input">
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Task name"
                        aria-label="Task name"
                        aria-describedby="idk wtf"
                        value={text}
                        onChange={(event) => setText(event.target.value)}
                    />
                </InputGroup>
                <Button onClick={onSubmit}>Create Task</Button>
            </div>
        </div>
      </>
  )
}

export default withRouter(CreateTask);