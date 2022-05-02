import '../styles/main.css';
import '../styles/resources.css';
import "firebase/auth";
import firebase from "firebase/app";
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Resource from './Resource';

export default function Resources() {

    const [resources, setresources] = useState(null);

    useEffect(() => {
        var userId = firebase.auth().currentUser.uid;
        var starCountRef = firebase.database().ref("users/" + userId + "/resources/");
        starCountRef.on('value', (snapshot) => {
            const data = snapshot.val();
            setresources(data);
        });
    }, []);

    function deleteresource(utcSec) {
        if (window.confirm("Are you sure to want to delete this link?")) {
            var userId = firebase.auth().currentUser.uid;
            var ref = firebase.database().ref("users/" + userId + "/resources/" + utcSec + "_resource");
            ref.remove();
        }
    }

    return (
        <>
            <div className="main">
                <h1 className='standard-heading'>Resources 🔗</h1>
                <div className="resources-everything-box">
                    <div className="add-resource">
                        <Button className="custom-button" href="/create-resource" >Add link</Button>
                    </div>
                    <div className="resources-flex">
                        {resources != null ? Object.keys(resources).reverse().map((oneresource) => {
                            var resourceName = resources[oneresource]['resourceName'];
                            var resourcesec = resources[oneresource]['utcSec'];
                            var text = resources[oneresource]['text'];
                            let x = document.getElementsByClassName("custom-button-hide");
                            {
                                resources != null ? Object.keys(oneresource).reverse().map((oneresource) => {
                                    var text = resources[oneresource]['contents']['text'];
                                    return (
                                        <li key={oneresource}>
                                            <br></br>
                                            <Resource text={text} resourcesec={resourcesec} />
                                        </li>
                                    )
                                }) : <div className="lonely"><p>It's lonely here. Let's add some resources!</p></div>
                            }
                        }) : <div className="lonely"><p>It's lonely here. Let's add a resource!</p></div>}
                    </div>
                </div>
            </div>
        </>
    );
}