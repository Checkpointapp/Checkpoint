import '../styles/main.css';
import "firebase/auth";
import firebase from "firebase/app";
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Task from './Task';

export default function Tasks() {

    const [tasks, setTasks] = useState(null);

    useEffect(() => {
        var userId = firebase.auth().currentUser.uid;
        var starCountRef = firebase.database().ref("users/" + userId + "/tasks/");
        starCountRef.on('value', (snapshot) => {
            const data = snapshot.val();
            setTasks(data);
        });
    }, []);

    return (
        <div>
            <div className="tasks-list-container">
                <div className="tasks-list">
                    <ul className="tasklist">
                    {tasks != null ? Object.keys(tasks).reverse().map((task) => {
                    var text = tasks[task]['contents']['text'];
                    return (
                            <li key={task}>
                                <br></br>
                                <Task date={task} text={text}/>
                            </li>
                    )
                    }) : <div className="lonely"><p>It's lonely here. Let's add some tasks!</p></div>}
                    </ul>
                </div>
            </div>
            <div className="add-task">
                <Button href="/create-task" >Add Task</Button>
            </div>
        </div>
    );
}