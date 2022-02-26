import '../styles/main.css';
import "firebase/auth";
import firebase from "firebase/app";
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Task from './Task';

export default function Tasks() {

    const [lists, setLists] = useState(null);

    useEffect(() => {
        var userId = firebase.auth().currentUser.uid;
        var starCountRef = firebase.database().ref("users/" + userId + "/lists/");
        starCountRef.on('value', (snapshot) => {
            const data = snapshot.val();
            setLists(data);
        });
    }, []);

    function deleteList(utcSec) {
        if (window.confirm("Are you sure to want to delete this list and all tasks in it? ")) {
            var userId = firebase.auth().currentUser.uid;
            var ref = firebase.database().ref("users/" + userId + "/lists/" + utcSec + "_list");
            ref.remove();
        }
    }

    return (
        <div className="flex">
            <div className="add-task">
                <Button href="/create-task" >New Task</Button>
            </div>
            <div className="add-task">
                <Button href="/create-list" >New List</Button>
            </div>
            {lists != null ? Object.keys(lists).reverse().map((oneList) => {
                var listName = lists[oneList]['listName'];
                var listSec = lists[oneList]['utcSec'];
                var listTasks = lists[oneList]['tasks'];

                return (
                    <>
                        <div className="tasks-list">
                            <h2 className="list-title">{listName}</h2>
                            <div className="delete-button">
                                <Button onClick={() => {deleteList(listSec)} }>Delete</Button>
                            </div>

                            <div className="tasks-list-container">
                                <ul className="tasklist">
                                    {listTasks != null ? Object.keys(listTasks).reverse().map((task) => {
                                        var text = listTasks[task]['contents']['text'];
                                        return (
                                            <li key={task}>
                                                <br></br>
                                                <Task date={task} text={text} listSec={listSec}/>
                                            </li>
                                        )
                                    }) : <div className="lonely"><p>It's lonely here. Let's add some tasks!</p></div>}
                                </ul>
                            </div>
                        </div>
                    </>
                )
            }) : <div className="lonely"><p>It's lonely here. Let's add some tasks!</p></div>}

        </div>
    );
}