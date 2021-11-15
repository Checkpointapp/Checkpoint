import '../styles/main.css';
import '../styles/survey.css';
import firebase from "firebase/app";
import { Button } from 'react-bootstrap';
import { withRouter } from "react-router";
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
                setText(exists);
            });
    }, []);

    if (props.history.location.pathname !== '/registration-questions') {
        return (
            <>
            {text === false ?
                <>
                <div className="survey-notification-container">
                    <div className="survey-notification">
                        <p>Welcome! Answer a few brief questions to customize Checkpoint!</p>
                        <a href="/registration-questions"><Button>Let's Go!</Button></a>
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

export default withRouter(SurveyNotif);