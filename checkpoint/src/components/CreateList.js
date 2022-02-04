import React, { useState } from "react"
import firebase from "firebase/app";
import { withRouter } from "react-router";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import '../../src/styles/tasks.css'
import "firebase/database";

function CreateList(props) {

    const [listName, setListName] = useState("");


    async function onSubmit() {
        var userId = firebase.auth().currentUser.uid;
        const now = new Date();  
        const utcMilli = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);  
        const utcSec = Math.round(utcMilli / 1000);
        await firebase.database().ref("/users/" + userId + "/lists/" + utcSec + "_list").set({
            listName: listName
          });
          props.history.push({ 
            pathname: "/tasks"
        });
    }

  return (
      <>
        <div className="create-task-input-container">
            <div className="create-task-input">
                <p>Create a new list:</p>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="List name"
                        aria-label="List name"
                        value={listName}
                        onChange={(event) => setListName(event.target.value)}
                    />
                </InputGroup>
                <Button
                    onClick={onSubmit}
                    type="submit"
                >
                    Create List
                </Button>
            </div>
        </div>
      </>
  )
}

export default withRouter(CreateList);