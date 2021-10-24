import '../styles/main.css';
import Router from "./Router";
import NavBar from "./MainNavbar";
import "firebase/auth";
//import SignIn from "./SignIn";
import firebase from "firebase/app";
import React, {useState} from 'react';
import { withRouter } from "react-router-dom";
import { Button } from 'react-bootstrap';

export default function Tasks() {
    return (
        <div>
            <Button href="/compose" >Create New Entry</Button>
        </div>
    );
}