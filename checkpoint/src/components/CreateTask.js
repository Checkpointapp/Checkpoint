import React, { useState, useEffect } from "react"
import firebase from "firebase/app";
import { withRouter } from "react-router";
import { InputGroup, FormControl, Button, Form } from "react-bootstrap";
import '../../src/styles/tasks.css'
import "firebase/database";

function CreateTask(props) {

    const [text, setText] = useState("");
    const [list, setList] = useState("");
    const [lists, setLists] = useState("");

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
        const now = new Date();  
        const utcMilli = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);  
        const utcSec = Math.round(utcMilli / 1000);
        await firebase.database().ref("/users/" + userId + "/tasks/" + utcSec + "/contents").set({
            text: text,
            list: list
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
                        value={text}
                        onChange={(event) => setText(event.target.value)}
                    />
                    <Form.Select 
                        required
                        aria-label="Select the list for this task"
                        value={list}
                        onChange={(event) => setList(event.target.value)}
                        required
                    >
                        {lists != null ? Object.keys(lists).reverse().map((oneList) => {
                        var listName = lists[oneList]['listName'];
                        return (
                                <option value={listName}>{listName}</option>
                        )
                        }) : <div></div>}
                    </Form.Select>
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

export default withRouter(CreateTask);