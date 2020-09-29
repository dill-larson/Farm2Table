import React, { Component } from 'react';

import {Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class NavigationBar extends Component {
    render() {
        return (
            <Navbar bg="light" variant="light">
                <Nav className="mr-auto">
                    <Link to={"/"} className="nav-link">Home</Link>
                </Nav>
                <Nav className="navbar-right">
                    <Link to={"admin"} className="nav-link">Admin Panel</Link>
                </Nav>
            </Navbar>
        )
    }
}

export default NavigationBar;