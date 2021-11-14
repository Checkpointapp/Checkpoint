import React, { useState } from "react"
import firebase from "firebase/app";
import { withRouter } from "react-router";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import '../../src/styles/survey.css'
import "firebase/database";

function Survey(props) {

    const [text, setText] = useState("");

    async function onSubmit() {
        var userId = firebase.auth().currentUser.uid;
        const now = new Date();  
        const utcMilli = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);  
        const utcSec = Math.round(utcMilli / 1000);
        await firebase.database().ref("/users/" + userId + "/tasks/" + utcSec + "/contents").set({
            text: text
          });
          props.history.push({ 
            pathname: "/tasks"
        });
    }

    const handleKeypress = e => {
        if (e.key === "Enter") {
          onSubmit();
        }
    };

  return (
      <>
        <p>SURVEY</p>
        <div className="create-task-input-container">
            <div className="create-task-input">
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Task name"
                        aria-label="Task name"
                        aria-describedby="uhmm"
                        value={text}
                        onChange={(event) => setText(event.target.value)}
                        onKeyPress={handleKeypress}
                    />
                </InputGroup>
                <Button
                    onClick={onSubmit}
                    type="submit"
                >
                    Create Task
                </Button>
            </div>
        </div>
      </>
  )
}

export default withRouter(Survey);