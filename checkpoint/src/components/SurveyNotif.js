import '../styles/main.css';
import '../styles/survey.css';
import firebase from "firebase/app";
import { Button } from 'react-bootstrap';
import { useHistory } from "react-router";
import "firebase/database";
import React, { useState, useEffect } from 'react';

function SurveyNotif(props) {
    let history = useHistory();
    const [text, setText] = useState(null);

    async function onClick() {
        history.push('/registration-questions');
    }

    useEffect(() => {
        var userId = firebase.auth().currentUser.uid;
        var ref = firebase.database().ref("users/" + userId + "/survey/completed");
        ref.once("value")
            .then(function(snapshot) {
                var exists = snapshot.exists();
                setText(exists);
            });
    }, []);

    if (history.location.pathname !== '/registration-questions') {
        return (
            <>
            {text === false ?
                <>
                <div className="survey-notification-container">
                    <div className="survey-notification">
                        <p>Welcome! Please answer a few questions to customize your Checkpoint experience</p>
                        <Button onClick={onClick}></Button>
                    </div>
                </div>
                </>
                :
                null
            }
            </>
        )
    } else {
        return null;
    }

}

export default SurveyNotif;