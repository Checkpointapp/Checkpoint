import React, { useState, useEffect } from "react"
import firebase from "firebase/app";
import { withRouter } from "react-router";
import { InputGroup, FormControl, Button, Form } from "react-bootstrap";
import '../../src/styles/writedump.css';
import "firebase/database";

function WriteDump(props) {

  const [text, setText] = useState("");

  useEffect(() => {
    var userId = firebase.auth().currentUser.uid;
    var starCountRef = firebase.database().ref("users/" + userId + "/writing-dump/contents");
    starCountRef.once('value', (snapshot) => {
        const data = snapshot.val();
        setText(data.text);
    });
}, []);

  async function onSubmit() {
    var userId = firebase.auth().currentUser.uid;
    const now = new Date();
    const utcMilli = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
    const utcSec = Math.round(utcMilli / 1000);
    await firebase.database().ref("/users/" + userId + "/writing-dump/contents").set({
      text: text,
      lastSaved : utcSec
    })
    console.log("success! saved ur stuff");
  }

  return (
    <>
      <h1>Writing Dump 📝</h1>
      <div className="textbox">
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
        ></textarea>
        <Button
          onClick={onSubmit}
          type="submit"
        >
          Save
        </Button>
      </div>
    </>
  )
}

export default withRouter(WriteDump);