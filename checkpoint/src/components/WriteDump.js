import React, { useState, useEffect } from "react"
import firebase from "firebase/app";
import { InputGroup, FormControl, Button, Form } from "react-bootstrap";
import '../../src/styles/writedump.css';
import "firebase/database";

function WriteDump() {

    return (
      <>
        <h1>Writing Dump 📝</h1>
        <div className="textbox">
            <textarea></textarea>
        </div>
      </>
  )
}

export default WriteDump;