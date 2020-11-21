import React, { Component } from 'react';

import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {auth} from "./firebase";

class NavigationBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => { this.setState({user}) })
    }

    render() {
		let userEmail = this.state.user ? 
			this.state.user.email : 
			null 
        //console.log("Logged in as " + userEmail);
		if (typeof userEmail === 'string')
		{
			return(
				<Navbar collapseOnSelect  expand="md" style={{backgroundColor: "#F9F8F9"}}>
					<Navbar.Toggle aria-controls="navbar-nav" /> {/*Responsive Navbar*/}
					<Navbar.Collapse id="navbar-nav">
						<Nav className="mr-auto">
							<Nav.Link as={Link} to="/" className="text-main-brand">Home</Nav.Link>
							<Nav.Link as={Link} to="/market" className="text-main-brand">Market</Nav.Link>
						</Nav>
						<Nav className="navbar-right-logged-in">
							<NavDropdown title="{userEmail}" drop="left" id="nav-profile">
								<NavDropdown.Item as={Link} to="/cart">Cart</NavDropdown.Item> {/*View users cart*/}
								<NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item> {/*Shows on both farmers and consumers*/}
								<NavDropdown.Item as={Link} to="/signout">Sign Out</NavDropdown.Item> {/*Sign out users*/}
							</NavDropdown>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
				)
		}
		else {
			return (
				<Navbar collapseOnSelect  expand="md" style={{backgroundColor: "#F9F8F9"}}>
					<Navbar.Toggle aria-controls="navbar-nav" /> {/*Responsive Navbar*/}
					<Navbar.Collapse id="navbar-nav">
						<Nav className="mr-auto">
							<Nav.Link as={Link} to="/" className="text-main-brand">Home</Nav.Link>
							<Nav.Link as={Link} to="/market" className="text-main-brand">Market</Nav.Link>
						</Nav>
						<Nav className="navbar-right">
							<Nav.Link as={Link} to="/signup" className="text-main-brand">Sign Up</Nav.Link>
							<Nav.Link as={Link} to="/signin" className="text-main-brand">Login</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			)
		}
    }
}

export default NavigationBar;
