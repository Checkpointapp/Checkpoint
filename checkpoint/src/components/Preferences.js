import React, { useState, useEffect } from "react"
import firebase from "firebase/app";
import { withRouter } from "react-router";
import { InputGroup, FormControl, Button, Form } from "react-bootstrap";
import '../../src/styles/preferences.css'
import "firebase/database";

function Preferences(props) {

    const [preferredName, setpreferredName] = useState("");
    const [gradeLevel, setgradeLevel] = useState("");
    const [theme, setTheme] = useState("");

    useEffect(() => {
        var userId = firebase.auth().currentUser.uid;
        var starCountRef = firebase.database().ref("users/" + userId + "/survey");
        starCountRef.once('value', (snapshot) => {
          const data = snapshot.val();
          setpreferredName(data.preferredName);
          setgradeLevel(data.gradeLevel);
          setTheme(data.theme);
        });
      }, []);

    async function onSubmit() {
        var userId = firebase.auth().currentUser.uid;
        await firebase.database().ref("/users/" + userId + "/survey").set({
            preferredName: preferredName,
            gradeLevel: gradeLevel,
            theme: theme,
            completed: true
        });
        props.history.push({ 
            pathname: "/"
        });
    }

  return (
      <>
        <div className="preferences-container">
            <h1>Preferences ⚙</h1>
            <div className="preferences-input-container">
                <p>Preferred Name</p>
                <div className="preferences-input">
                    <InputGroup className="mb-3">
                        <FormControl
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
                <p>Theme</p>
                <div className="preferences-input">
                    <InputGroup className="mb-3">
                        <Form.Select 
                            aria-label="Select your theme (light or dark)"
                            value={theme}
                            onChange={(event) => setTheme(event.target.value)}
                        >
                            <option value="light">Light Theme</option>
                            <option value="dark">Dark Theme</option>
                            <option value="system">System Theme</option>
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