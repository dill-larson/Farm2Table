import React, { Component } from "react";
import { Button, Container, Form, Jumbotron } from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import { signIn } from "../services/user.service";

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            User: {
                id: '',
                displayName: '',
                email: ''
            },
            password: '',
            referrer: null
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
        console.log(this.state);
        signIn(this.state.User.email, this.state.password)
            .then(() => {
                console.log("Successfully logged in!");
                this.setState({referrer: "/market"});
            })
            .catch(error => {
                console.log(error);
            });
    }
    
    render() {
        const {referrer} = this.state;
        if (referrer) { //successfully login
            return <Redirect to={referrer} />;
        } else { 
            return(
                <div style={{backgroundColor: "#1ABC56", paddingBottom: "10px"}}>
                    <Jumbotron style={{backgroundColor: "#F9F8F9", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", borderTopLeftRadius: "0rem", borderTopRightRadius: "0rem", borderBottomRightRadius: "5rem", borderBottomLeftRadius: "5rem"}}>
                        <h1 className="text-main-brand text-center font-weight-bold display-2">Sign In</h1>
                    </Jumbotron>
                    <Container>
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
                                        className="border-0" 
                                    />
                                </Form.Group>
                                <Form.Group controlId="formPassword">
                                    <Form.Control 
                                        type="password"
                                        placeholder="Password" 
                                        value={this.state.password}
                                        onChange={e => this.setState({ password: e.target.value })}
                                        className="border-0"
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
}