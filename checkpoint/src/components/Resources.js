import '../styles/main.css';
import '../styles/resources.css';
import "firebase/auth";
import firebase from "firebase/app";
import React, { useState, useEffect } from 'react';
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap';
import Resource from './Resource';

export default function Resources() {

    const [resources, setresources] = useState(null);
    const [newResourceName, setnewResourceName] = useState("");
    const [resourceLink, setresourceLink] = useState("");
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        var userId = firebase.auth().currentUser.uid;
        var starCountRef = firebase.database().ref("users/" + userId + "/resources/");
        starCountRef.on('value', (snapshot) => {
            const data = snapshot.val();
            setresources(data);
        });
    }, []);

    async function addResource() {
        var userId = firebase.auth().currentUser.uid;
        const now = new Date();
        const utcMilli = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
        const utcSec = Math.round(utcMilli / 1000);
        var newLink = resourceLink;
        if (!(resourceLink.startsWith("https://") || resourceLink.startsWith("http://"))) {
            console.log("no")
            newLink = "https://" + resourceLink;
        }
        await firebase.database().ref("/users/" + userId + "/resources/" + utcSec + "_resource").set({
            newResourceName: newResourceName,
            resourceLink: newLink,
            utcSec: utcSec
        });
        setShow(false);
    }

    return (
        <>
            <div className="main">
                <h1 className='standard-heading'>Resources 🔗</h1>
                <div className="resources-everything-box">
                    <div className="add-resource">
                        <Button className="custom-button" onClick={handleShow} >Add link</Button>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>New Resource</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        aria-label="Resource Name"
                                        value={newResourceName}
                                        placeholder="Resource Name"
                                        onChange={(event) => setnewResourceName(event.target.value)}
                                    />
                                    <FormControl
                                        aria-label="Resource Link"
                                        value={resourceLink}
                                        placeholder="Resource Link"
                                        onChange={(event) => setresourceLink(event.target.value)}
                                    />
                                </InputGroup>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={addResource}>
                                    Add link
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                    <div className="resources-flex">
                        {resources != null ? Object.keys(resources).reverse().map((oneresource) => {
                            var resourcesec = resources[oneresource]['utcSec'];
                            var text = resources[oneresource]['newResourceName'];
                            var link = resources[oneresource]['resourceLink'];
                            return (
                                <li key={oneresource}>
                                    <br></br>
                                    <Resource text={text} link={link} resourcesec={resourcesec} />
                                </li>
                            )
                        }) : <div className="lonely"><p>It's lonely here. Let's add a resource!</p></div>}
                    </div>
                </div>
            </div>
        </>
    );
}