import React, { Component } from 'react';
import { Button, Col, Container, Form, Row, Jumbotron } from 'react-bootstrap';
import { auth } from './firebase';
import { getUserByUID, updateUserData, updateUserEmail, updateUserPassword, deleteUser } from '../services/user.service';

export default class UserCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userdata: { //Firestore user document
                email: '',
                displayName: '',
                role: '',
                address1: '',
                address2: '',
                city: '',
                state: '',
                zip: ''
            },
            email_password: '', //for change email
            password: '', //for change password
            new_password: '', //for change password
            delete_password: '' //for deleting user
        };
        this.updateUser = this.updateUser.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }
    
    componentDidMount() {
        getUserByUID(auth.currentUser.uid)
            .then(data => {
                var temp = this.state.userdata;
                temp.email = data.email;
                temp.displayName = data.displayName;
                temp.role = data.role;

                var separated_address = data.address.split(", ");
                temp.address1 = separated_address[0];
                temp.address2 = separated_address.length >= 5 ? separated_address[1] : "";
                temp.city = separated_address.length >= 5 ? separated_address[2] : separated_address[1];
                temp.state = separated_address.length >= 5 ? separated_address[3] : separated_address[2];
                temp.zip = separated_address.length >= 5 ? separated_address[4] : separated_address[3];
                this.setState({userdata: temp});
            });
    }

    updateUser() {
        updateUserData(auth.currentUser, this.state.userdata)
            .then(() => {
                console.log("Updated user data");
            })
            .catch(error => {
                console.log(error);
            });
    }
    
    changeEmail() {
        updateUserEmail(auth.currentUser, this.state.userdata.email, this.state.email_password)
            .then(() => {
                console.log("Changed user email");
            })
            .catch(error => {
                console.log(error);
            });
    }

    changePassword() {
        updateUserPassword(auth.currentUser, this.state.password, this.state.new_password)
            .then(() => {
                console.log("Changed user password.");
            })
            .catch(error => {
                console.log(error);
            })
    }

    deleteUser() {
        console.log(this.state);
        deleteUser(auth.currentUser, this.state.delete_password)
            .then(() => {
                console.log("Deleted user");
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        if(!this.state.userdata) {
            return <h3>Loading...</h3>;
        } else {
            return(
                <div style={{backgroundColor: "#1ABC56", paddingBottom: "10px"}}>
                    <Container>
                        <Jumbotron style={{backgroundColor: "#F9F8F9", borderRadius: "3rem"}}>
                            <h4 className="mt-n4 text-center text-light-accent">User Information</h4>
                            <Row>
                                <Col>
                                    <Form onSubmit={(e) => {e.preventDefault(); this.updateUser();}}>
                                        <Form.Group controlId="formName">
                                            <Form.Label className="text-light-accent">Name</Form.Label>
                                            <Form.Control 
                                                type="text"
                                                placeholder="Name"
                                                value={this.state.userdata.displayName}
                                                onChange={e => {
                                                    var tempUser = this.state.userdata;
                                                    tempUser.displayName = e.target.value; 
                                                    this.setState({ userdata: tempUser });
                                                }}
                                                className="border-0" 
                                            />
                                        </Form.Group>
        
                                        <Form.Group controlId="formGridAddress1">
                                            <Form.Label className="text-light-accent">Street Address</Form.Label>
                                            <Form.Control 
                                            type="text"
                                            placeholder="Street Address"
                                            value={this.state.userdata.address1}
                                            onChange={e => {
                                                var tempUser = this.state.userdata;
                                                tempUser.address1 = e.target.value; 
                                                this.setState({ userdata: tempUser });
                                            }}
                                            className="border-0" 
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formGridAddress2">
                                            <Form.Label className="text-light-accent">Apartment, studio, or floor</Form.Label>
                                            <Form.Control 
                                            type="text"
                                            placeholder="Apartment, studio, or floor"
                                            value={this.state.userdata.address2}
                                            onChange={e => {
                                                var tempUser = this.state.userdata;
                                                tempUser.address2 = e.target.value; 
                                                this.setState({ userdata: tempUser });
                                            }}
                                            className="border-0" 
                                            />
                                        </Form.Group>
                                        <Form.Row>
                                            <Form.Group as={Col} controlId="formGridCity">
                                                <Form.Label className="text-light-accent">City</Form.Label>
                                                <Form.Control 
                                                type="text"
                                                placeholder="City"
                                                value={this.state.userdata.city}
                                                onChange={e => {
                                                    var tempUser = this.state.userdata;
                                                    tempUser.city = e.target.value; 
                                                    this.setState({ userdata: tempUser });
                                                }}
                                                className="border-0" 
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="formGridState">
                                                <Form.Label className="text-light-accent">State</Form.Label>
                                                <Form.Control 
                                                    as="select"
                                                    value={this.state.userdata.state}
                                                    onChange={e => {
                                                        var tempUser = this.state.userdata;
                                                        tempUser.state = e.target.value; 
                                                        this.setState({ userdata: tempUser });
                                                    }}
                                                    className="border-0"
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
                                                <Form.Label className="text-light-accent">Zip Code</Form.Label>
                                                <Form.Control 
                                                    type="text"
                                                    placeholder="Zip Code"
                                                    value={this.state.userdata.zip}
                                                    onChange={e => {
                                                        var tempUser = this.state.userdata;
                                                        tempUser.zip = e.target.value; 
                                                        this.setState({ userdata: tempUser });
                                                    }}
                                                    className="border-0" 
                                                />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Group controlId="formRole">
                                            <Form.Label className="text-light-accent">Role</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Role"
                                                value={this.state.userdata.role}
                                                disabled={true}
                                                className="border-0"
                                            />
                                        </Form.Group>
                                        <Button className="text-white" variant="dark-shade" type="submit" style={{width: "100%"}}>Update Account</Button>
                                    </Form>
                                </Col>
                                <Col>
                                    <Form onSubmit={(e) => {e.preventDefault(); this.changeEmail();}}>
                                        <Form.Group controlId="formEmail">
                                            <Form.Label className="text-light-accent">Email</Form.Label>
                                            <Form.Control 
                                                type="email"
                                                placeholder="Email"
                                                value={this.state.userdata.email}
                                                onChange={e => {
                                                    var tempUser = this.state.userdata;
                                                    tempUser.email = e.target.value; 
                                                    this.setState({ userdata: tempUser });
                                                }}
                                                className="border-0" 
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formPasswordEmail">
                                            <Form.Label className="text-light-accent">Current Password</Form.Label>
                                            <Form.Control 
                                                type="password"
                                                placeholder="Current Password" 
                                                value={this.state.email_password}
                                                onChange={e => {
                                                    this.setState({ email_password: e.target.value });
                                                }}
                                                className="border-0"
                                            />
                                        </Form.Group>
                                        <Button className="text-white" variant="main-brand" type="submit" style={{width: "100%"}}>Change Email</Button>
                                    </Form>
                                    <Form className="mt-5" onSubmit={(e) => {e.preventDefault(); this.changePassword();}}>
                                        <Form.Group controlId="formPassword">
                                            <Form.Label className="text-light-accent">Current Password</Form.Label>
                                            <Form.Control 
                                                type="password"
                                                placeholder="Current Password" 
                                                value={this.state.password}
                                                onChange={e => {
                                                    this.setState({ password: e.target.value });
                                                }}
                                                className="border-0"
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formNewPassword">
                                            <Form.Label className="text-light-accent">New Password</Form.Label>
                                            <Form.Control 
                                                type="password"
                                                placeholder="New Password" 
                                                value={this.state.new_password}
                                                onChange={e => {
                                                    this.setState({ new_password: e.target.value });
                                                }}
                                                className="border-0"
                                            />
                                        </Form.Group>
                                        <Button className="text-white" variant="main-brand" type="submit" style={{width: "100%"}}>Change Password</Button>
                                    </Form>
                                </Col>
                            </Row>
                            <Form className="mt-3 mb-n4" onSubmit={(e) => {e.preventDefault(); this.deleteUser();}}>
                                <Form.Group controlId="formDeletePassword">
                                    <Form.Label className="text-light-accent">Current Password</Form.Label>
                                    <Form.Control 
                                        type="password"
                                        placeholder="Current Password" 
                                        value={this.state.delete_password}
                                        onChange={e => {
                                        this.setState({ delete_password: e.target.value });
                                        }}
                                        className="border-0"
                                    />
                                </Form.Group>
                                <Button className="text-white" variant="danger" type="submit" style={{width: "100%"}}>Delete Account</Button>
                            </Form>
                                        
                        </Jumbotron>
                    </Container>
                </div>
            );
        }
    }
    
}