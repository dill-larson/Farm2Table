import React, { Component } from 'react';

import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { auth } from "./firebase";
import { signOut, getUserByUID } from "../services/user.service";
import ErrorAlert from './ErrorAlert';

export default class NavigationBar extends Component {
    _isMounted = false;
    
    constructor(props) {
        super(props)
        this.state = {
            user: null, //Firebase Auth user obj
            userdata: { //Firestore user document
                id: '',
                displayName: '',
                role: '',
                address1: '',
                address2: '',
                city: '',
                state: '',
                zip: ''
            },
            referrer: null,
            error: null
        };
    }

    componentDidMount() {
        this._isMounted = true;
        auth.onAuthStateChanged((user) => {
            if(this._isMounted) {
                this.setState({user});
                getUserByUID(user?.uid)
                    .then((userdata) => {
                        this.setState({userdata});
                    });
            }
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    logout() {
        signOut()
            .then(() => {
                console.log("Successfully logged out.");
                //this.setState({referrer: "/"}); //redirect users to homepage
            })
            .catch(error => {
                //this.setState({error: <ErrorAlert code={error.code} message={error.message}/>});
            });
    }

    render() {
        const {referrer} = this.state;
        const {error} = this.state;
        if (referrer) { //sign out => redirect to home
            return <Redirect to={referrer} />;
        } else { //successful login
            return (
                <div>
                    {error}
                    <Navbar collapseOnSelect  expand="md" style={{backgroundColor: "#F9F8F9"}}>
                        <Navbar.Toggle aria-controls="navbar-nav" /> {/*Responsive Navbar*/}
                        <Navbar.Collapse id="navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link as={Link} to="/" className="text-main-brand">Home</Nav.Link>
                                <Nav.Link as={Link} to="/welcome" className="text-main-brand">Welcome</Nav.Link>
                                <Nav.Link as={Link} to="/market" className="text-main-brand">Marketplace</Nav.Link>
                            </Nav>
                            {!this.state.user && (
                                <Nav className="navbar-right">
                                    <Nav.Link as={Link} to="/signup" className="text-main-brand">Sign Up</Nav.Link>
                                    <Nav.Link as={Link} to="/signin" className="text-main-brand">Login</Nav.Link>
                                </Nav>
                            )}
                            {this.state.user && (
                                <Nav className="navbar-right-logged-in">
                                    <Nav.Link as={Link} to="/cart" className="text-main-brand">Cart</Nav.Link>
                                    <NavDropdown 
                                        title={
                                            <span className="text-main-brand">{this.state.user.email}</span>
                                        }
                                        drop="left" 
                                        id="nav-profile"
                                    >
                                        <NavDropdown.Item as={Link} to={`/profile/${this.state.user.uid}`}>
                                            <span className="text-main-brand">Profile</span>
                                        </NavDropdown.Item> {/*Shows on both farmers and consumers*/}
                                        { /*Shows only for farmers*/
                                            this.state.userdata?.role == "Farmer" && (
                                            <NavDropdown.Item as={Link} to="/farms">
                                                <span className="text-main-brand">Farms</span>
                                            </NavDropdown.Item> 
                                        )}
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={this.logout}>
                                            <span className="text-main-brand">Sign Out</span>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            )}
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            )
        }
    }
}