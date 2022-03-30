import React from "react";
import { Container } from "react-bootstrap";
import '../../src/styles/mainPage.css'


class HeroTitleDescription extends React.Component {
    render() {
        return (
            <>
        <Container>
            <h1 className="main-page-header">CHECKPOINT</h1>
            <p className="main-page-description">Ready to streamline your productivity? Get started below!</p>
        </Container>
            </>

        )
    }
}

export default HeroTitleDescription;