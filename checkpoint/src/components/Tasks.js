import '../styles/main.css';
import Router from "./Router";
import NavBar from "./MainNavbar";
import "firebase/auth";
import firebase from "firebase/app";
import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import { Button } from 'react-bootstrap';
import Task from './Task';

export default function Tasks() {

    const [tasks, setTasks] = useState(null);

    useEffect(() => {
        var userId = firebase.auth().currentUser.uid;
        var starCountRef = firebase.database().ref(userId + "/tasks/");
        starCountRef.on('value', (snapshot) => {
            const data = snapshot.val();
            setTasks(data);
            console.log(data);
        });
    }, []);

    return (
        <div>
            <Button href="/create-task" >Add a Task</Button>
            <div>
            {tasks != null ? Object.keys(tasks).reverse().map((task) => {
              var text = tasks[task]['contents']['text'];
                <br></br>
              return <Task date={task} text={text}/>
            }) : null}
            </div>
        </div>
    );
}