import React from "react";
import { Navbar, Nav, Container, NavDropdown, Item, Link, Form, FormControl, Button } from "react-bootstrap";
import '../../src/styles/main.css'


class HeroTitleDescription extends React.Component {
    render() {
        return (
            <Container>
                <h1 className="main-page-header">Welcome to Checkpoint!</h1>
                <p className="main-page-description">Get started below:</p>
            </Container>
        )
    }
}

export default HeroTitleDescription;