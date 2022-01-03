import React, { useState, useEffect } from "react"
import firebase from "firebase/app";
import { withRouter } from "react-router";
import { InputGroup, FormControl, Button, Form } from "react-bootstrap";
import '../../src/styles/preferences.css'
import "firebase/database";

function Preferences(props) {

    const [preferredName, setpreferredName] = useState("");
    const [gradeLevel, setgradeLevel] = useState("");
    const [prefs, getPrefs] = useState(null);

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

    useEffect(() => {
        var userId = firebase.auth().currentUser.uid;
        var starCountRef = firebase.database().ref("users/" + userId + "/survey");
        starCountRef.on('value', (snapshot) => {
            const prefs = snapshot.val();
            getPrefs(prefs);
        });
    }, []);

    // TODO: Get user data from database and display as the placeholders (or text already inputted?)

  return (
      <>
        <div className="preferences-container">
            <h1>Preferences ⚙</h1>
            <div className="preferences-input-container">
                <p>Preferred Name</p>
                <div className="preferences-input">
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Hello"
                            aria-label="Preferred Name"
                            value={preferredName}
                            onChange={(event) => setpreferredName(event.target.value)}
                        />
                    </InputGroup>
                </div>
                <p>Grade Level</p>
                <div className="preferences-input">
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
                    Save
                </Button>
            </div>
        </div>
      </>
  )
}

export default withRouter(Preferences);