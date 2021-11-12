import '../styles/main.css';
import '../styles/survey.css';
import firebase from "firebase/app";
import { Button } from 'react-bootstrap';
import "firebase/database";
import React, { useState, useEffect } from 'react';

function SurveyNotif(props) {

    const [text, setText] = useState(null);

    useEffect(() => {
        var userId = firebase.auth().currentUser.uid;
        var ref = firebase.database().ref("users/" + userId + "/survey/completed");
        ref.once("value")
            .then(function(snapshot) {
                var exists = snapshot.exists();
                console.log(exists);
                setText(exists);
            });
    }, []);

    return (
        <>
        {text === false ?
            <p>Please answer a few questions to customize your Checkpoint experience!</p>
            :
            null
        }
        </>
    )

}

export default SurveyNotif;