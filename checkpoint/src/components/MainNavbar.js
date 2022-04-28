import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

function MainNavbar(props) {

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Checkpoint</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/tasks">Tasks</Nav.Link>
                        <Nav.Link href="/resources">Resources</Nav.Link>
                        <Nav.Link href="/writing-dump">Writing Dump</Nav.Link>
                        <Nav.Link href="/preferences">Preferences</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto">
                        <Nav.Link onClick={props.logout}>Log out</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default MainNavbar;