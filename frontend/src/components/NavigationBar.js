import React, { Component } from 'react';

import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class NavigationBar extends Component {
    render() {
        return (
            <Navbar collapseOnSelect  expand="md" style={{backgroundColor: "transparent"}}>
                <Navbar.Toggle aria-controls="navbar-nav" /> {/*Responsive Navbar*/}
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/" className="text-main-brand">Home</Nav.Link>
                        <Nav.Link as={Link} to="/market" className="text-main-brand">Market</Nav.Link>
                        <Nav.Link as={Link} to="/" className="text-main-brand">Market</Nav.Link>
                        <Nav.Link as={Link} to="/" className="text-main-brand">About Us</Nav.Link>
                        <Nav.Link as={Link} to="/" className="text-main-brand">Contact Us</Nav.Link>
                    </Nav>
                    <Nav className="navbar-right">
                        <Nav.Link as={Link} to="/signup" className="text-main-brand">Sign Up</Nav.Link>
                        <Nav.Link as={Link} to="/signin" className="text-main-brand">Login</Nav.Link>
                    </Nav>
                    <Nav className="navbar-right-logged-in">
                        <NavDropdown title="{User Name}" drop="left" id="nav-profile">
                            <NavDropdown.Item as={Link} to="/admin">Profile</NavDropdown.Item> {/*Shows on both farmers and consumers*/}
                            <NavDropdown.Item as={Link} to="/">Orders</NavDropdown.Item> {/*Shows on consumers*/}
                            <NavDropdown.Item as={Link} to="/">Farm</NavDropdown.Item> {/*Shows on farmers*/}
                            <NavDropdown.Item as={Link} to="/">Fulfilments</NavDropdown.Item> {/*Shows on farmers*/}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default NavigationBar;
