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
        var userId = firebase.auth().currentUser.uid;
        await firebase.database().ref("/users/" + userId + "/survey").set({
            preferredName: preferredName,
            gradeLevel: gradeLevel,
            completed: true
        });
        props.history.push({ 
            pathname: "/"
        });
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
                            <option value="9">9th</option>
                            <option value="10">10th</option>
                            <option value="11">11th</option>
                            <option value="12">12th</option>
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