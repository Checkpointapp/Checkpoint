import React from "react";
import {Container} from "react-bootstrap";
import '../../src/styles/main.css'
import '../../src/styles/loading.css'
import {withRouter} from 'react-router-dom';

function Loading(props) {

    return (
        <>
        <div className="ring-container">
            <div className="lds-dual-ring"></div>
        </div>
        </>
    )
}

export default withRouter(Loading);