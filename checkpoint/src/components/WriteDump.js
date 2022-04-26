import React, { useState, useEffect } from "react"
import firebase from "firebase/app";
import { withRouter } from "react-router";
import { Button } from "react-bootstrap";
import '../../src/styles/writedump.css';
import '../../src/styles/main.css';
import "firebase/database";

function WriteDump(props) {

  const [text, setText] = useState("");
  const [saved, setSaved] = useState("All Changes Saved");

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
      lastSaved: utcSec
    })
    setSaved("All Changes Saved")
    console.log("success! saved ur stuff");
  }

  return (
    <>
      <h1 className="standard-heading">Writing Dump 📝</h1>
      <div className="textbox">
        <textarea
          value={text}
          onChange={(event) => { setText(event.target.value); setSaved("Unsaved Changes"); }}
        ></textarea>
        <div className="saved">
          {saved}
        </div>
        <div className="save-button">
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

export default withRouter(WriteDump);