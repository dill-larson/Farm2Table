import React, { Component } from "react";
import { Button, Col, Container, Form, Jumbotron, Row } from 'react-bootstrap';
import User from "../models/User";
import { auth, generateUserDocument } from "./firebase";

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            User: {
                id: '',
                displayName: '',
                email: '',
                role: '',
                address1: '',
                address2: '',
                city: '',
                state: '',
                zip: ''
            },
            password: '',
            confPassword: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
        console.log(this.state);
        this.createUserWithEmailAndPasswordHandler(this.state.User.email, this.state.password, this.state.User.displayName, this.state.User.role);
    }

    createUserWithEmailAndPasswordHandler = async (email, password, displayName, role) => {
        try{
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            await generateUserDocument(user, {displayName, role});
        }
        catch(error){
            console.log(error);
        }
    };

    render() {
        return(
            <div style={{backgroundColor: "#1ABC56", paddingBottom: "10px"}}>
                <Jumbotron style={{backgroundColor: "#F9F8F9", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", borderTopLeftRadius: "0rem", borderTopRightRadius: "0rem", borderBottomRightRadius: "5rem", borderBottomLeftRadius: "5rem"}}>
                    <h1 className="text-main-brand text-center font-weight-bold display-2">Sign Up</h1>
                </Jumbotron>
                <Container class="bg-white">
                    <Jumbotron style={{backgroundColor: "#F9F8F9", borderRadius: "3rem"}}>
                        <Form className="mt-n4 mb-n4" onSubmit={(e) => {e.preventDefault(); this.onSubmit();}}>
                            <Form.Group controlId="formName">
                                <Form.Control 
                                    type="text"
                                    placeholder="Name"
                                    value={this.state.User.displayName}
                                    onChange={e => {
                                            var tempUser = this.state.User;
                                            tempUser.displayName = e.target.value; 
                                            this.setState({ User: tempUser });
                                        }}
                                    class="border-0" 
                                />
                            </Form.Group>
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
                            <Form.Group controlId="formConfPassword">
                                <Form.Control 
                                    type="password"
                                    placeholder="Confirm Password" 
                                    value={this.state.confPassword}
                                    onChange={e => this.setState({ confPassword: e.target.value })}
                                    class="border-0"
                                />
                            </Form.Group>

                            <Form.Group controlId="formGridAddress1">
                                <Form.Control 
                                    type="text"
                                    placeholder="Street Address"
                                    value={this.state.User.address1}
                                    onChange={e => {
                                            var tempUser = this.state.User;
                                            tempUser.address1 = e.target.value; 
                                            this.setState({ User: tempUser });
                                        }}
                                    class="border-0" 
                                />
                            </Form.Group>
                            <Form.Group controlId="formGridAddress2">
                                <Form.Control 
                                    type="text"
                                    placeholder="Apartment, studio, or floor"
                                    value={this.state.User.address2}
                                    onChange={e => {
                                            var tempUser = this.state.User;
                                            tempUser.address2 = e.target.value; 
                                            this.setState({ User: tempUser });
                                        }}
                                    class="border-0" 
                                />
                            </Form.Group>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Control 
                                        type="text"
                                        placeholder="City"
                                        value={this.state.User.city}
                                        onChange={e => {
                                                var tempUser = this.state.User;
                                                tempUser.city = e.target.value; 
                                                this.setState({ User: tempUser });
                                            }}
                                        class="border-0" 
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Control 
                                        as="select"
                                        defaultValue="State"
                                        value={this.state.User.state}
                                        onChange={e => {
                                                var tempUser = this.state.User;
                                                tempUser.state = e.target.value; 
                                                this.setState({ User: tempUser });
                                            }}
                                        class="border-0"
                                    >
                                            <option>State</option>
                                            <option>AL</option>
                                            <option>AK</option>
                                            <option>AZ</option>
                                            <option>AR</option>
                                            <option>CA</option>
                                            <option>CO</option>
                                            <option>CT</option>
                                            <option>DE</option>
                                            <option>FL</option>
                                            <option>...</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Control 
                                        type="text"
                                        placeholder="Zip Code"
                                        value={this.state.User.zip}
                                        onChange={e => {
                                                var tempUser = this.state.User;
                                                tempUser.zip = e.target.value; 
                                                this.setState({ User: tempUser });
                                            }}
                                        class="border-0" 
                                    />
                                </Form.Group>
                            </Form.Row>

                            <fieldset>
                                <Form.Group>
                                    <Form.Label className="text-muted">
                                        What type of user are you?
                                    </Form.Label>
                                    <Form.Check
                                        type="radio"
                                        label="Farmer"
                                        className="text-muted"
                                        name="roleRadios"
                                        id="farmerRadio"
                                        value="Farmer"
                                        onChange={e => {
                                                var tempUser = this.state.User;
                                                tempUser.role = e.target.value; 
                                                this.setState({ User: tempUser });
                                            }}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Consumer"
                                        className="text-muted"
                                        name="roleRadios"
                                        id="consumerRadio"
                                        value="Consumer"
                                        onChange={e => {
                                                var tempUser = this.state.User;
                                                tempUser.role = e.target.value; 
                                                this.setState({ User: tempUser });
                                            }}
                                    />
                                </Form.Group>
                            </fieldset>
                            <Button className="text-white" variant="main-brand" type="submit" style={{width: "100%"}}>Sign Up</Button>
                        </Form>
                    </Jumbotron>
                </Container>
            </div>
        )
    }
}