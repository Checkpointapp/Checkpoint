import React, { useState } from "react"
import firebase from "firebase/app";
import { withRouter } from "react-router";
import { InputGroup, FormControl, Button, Form } from "react-bootstrap";
import '../../src/styles/survey.css'
import "firebase/database";

function Survey(props) {

    const [preferredName, setpreferredName] = useState("");
    const [gradeLevel, setgradeLevel] = useState("");

    async function onSubmit() {
        /*var userId = firebase.auth().currentUser.uid;
        const now = new Date();  
        const utcMilli = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);  
        const utcSec = Math.round(utcMilli / 1000);
        await firebase.database().ref("/users/" + userId + "/tasks/" + utcSec + "/contents").set({
            text: text
          });
          props.history.push({ 
            pathname: "/tasks"
        });*/
    }

  return (
      <>
        <div className="survey-container">
            <h1>Some brief questions to get you started 🚀</h1>
            <div className="survey-input-container">
                <p>What should we call you?</p>
                <div className="survey-input">
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Enter your preferred name"
                            aria-label="Preferred Name"
                            value={preferredName}
                            onChange={(event) => setpreferredName(event.target.value)}
                        />
                    </InputGroup>
                </div>
                <p>What grade are you in?</p>
                <div className="survey-input">
                    <InputGroup className="mb-3">
                        <Form.Select 
                            aria-label="Select your grade (9th to 12th)"
                            value={gradeLevel}
                            onChange={(event) => setgradeLevel(event.target.value)}
                        >
                            <option>9th</option>
                            <option value="1">10th</option>
                            <option value="2">11th</option>
                            <option value="3">12th</option>
                        </Form.Select>
                    </InputGroup>
                </div>
                <Button
                    onClick={onSubmit}
                    type="submit"
                >
                    Finish
                </Button>
            </div>
        </div>
      </>
  )
}

export default withRouter(Survey);