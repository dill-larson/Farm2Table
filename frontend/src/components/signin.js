import React, { Component } from "react";
import { Button, Container, Form, Jumbotron } from 'react-bootstrap';
import {auth} from "./firebase";

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            User: {
                id: '',
                displayName: '',
                email: ''
            },
            password: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
        console.log(this.state);
        this.signInWithEmailAndPasswordHandler(this.state.User.email, this.state.password);
    }

    signInWithEmailAndPasswordHandler = (email, password) => {
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log("Logged in as: ", auth.currentUser.email)
            })
            .catch(error => {
                console.error("Error signing in with password and email", error);
            });
    };
    
    render() {
        return(
            <div style={{backgroundColor: "#1ABC56", paddingBottom: "10px"}}>
                <Jumbotron style={{backgroundColor: "#F9F8F9", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", borderTopLeftRadius: "0rem", borderTopRightRadius: "0rem", borderBottomRightRadius: "5rem", borderBottomLeftRadius: "5rem"}}>
                    <h1 className="text-main-brand text-center font-weight-bold display-2">Sign In</h1>
                </Jumbotron>
                <Container class="bg-white">
                    <Jumbotron style={{backgroundColor: "#F9F8F9", borderRadius: "3rem"}}>
                        <Form className="mt-n4 mb-n4" onSubmit={(e) => {e.preventDefault(); this.onSubmit();}}>
                            <Form.Group controlId="formEmail">
                                <Form.Control 
                                    type="email"
                                    placeholder="Email Address"
                                    value={this.state.User.email}
                                    onChange={e => {
                                            var tempUser = this.state.User;
                                            tempUser.email = e.target.value; 
                                            this.setState({ User: tempUser });
                                        }}
                                    class="border-0" 
                                />
                            </Form.Group>
                            <Form.Group controlId="formPassword">
                                <Form.Control 
                                    type="password"
                                    placeholder="Password" 
                                    value={this.state.password}
                                    onChange={e => this.setState({ password: e.target.value })}
                                    class="border-0"
                                />
                            </Form.Group>
                            <Button className="text-white" variant="main-brand" type="submit" style={{width: "100%"}}>Sign In</Button>
                        </Form>
                    </Jumbotron>
                </Container>
            </div>
        );
    }
}