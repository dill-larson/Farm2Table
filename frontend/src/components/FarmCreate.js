import React, { Component } from "react";
import { Button, Col, Container, Form, Jumbotron } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { auth } from './firebase';
import { createFarm } from '../services/farm.service';
import ErrorAlert from './ErrorAlert';

export default class FarmCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            farm: {
                id: '',
                farmer: '',
                name: '',
                description: '',
                address1: '',
                address2: '',
                city: '',
                state: '',
                zip: ''
            },
            referrer: null,
            error: null
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
        createFarm(auth.currentUser, this.state.farm)
            .then(farm => {
                this.setState({referrer: `/farm/${farm.id}`})
            })
            .catch(error => {
                this.setState({error: <ErrorAlert code={error.code} message={error.message}/>});
            })
    }

    render() {
        const {referrer} = this.state;
        const {error} = this.state;
        if (referrer) { //successfully creation of farm
            return <Redirect to={referrer} />;
        } else { 
            return(
                <div style={{backgroundColor: "#1ABC56", paddingBottom: "10px"}}>
                    <Jumbotron style={{backgroundColor: "#F9F8F9", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", borderTopLeftRadius: "0rem", borderTopRightRadius: "0rem", borderBottomRightRadius: "5rem", borderBottomLeftRadius: "5rem"}}>
                        <h1 className="text-main-brand text-center font-weight-bold display-2">Create Farm</h1>
                    </Jumbotron>
                    <Container>
                        <Jumbotron style={{backgroundColor: "#F9F8F9", borderRadius: "3rem"}}>
                            <Form className="mt-n4 mb-n4" onSubmit={(e) => {e.preventDefault(); this.onSubmit();}}>
                                {error}
                                <Form.Group controlId="formFarmName">
                                    <Form.Control 
                                        type="text"
                                        placeholder="Farm Name"
                                        value={this.state.farm.name}
                                        onChange={e => {
                                                var tempFarm = this.state.farm;
                                                tempFarm.name = e.target.value; 
                                                this.setState({ farm: tempFarm });
                                            }}
                                        className="border-0" 
                                    />
                                </Form.Group>

                                <Form.Group controlId="formGridAddress1">
                                    <Form.Control 
                                        type="text"
                                        placeholder="Street Address"
                                        value={this.state.farm.address1}
                                        onChange={e => {
                                                var tempFarm = this.state.farm;
                                                tempFarm.address1 = e.target.value; 
                                                this.setState({ farm: tempFarm });
                                            }}
                                        className="border-0" 
                                    />
                                </Form.Group>
                                <Form.Group controlId="formGridAddress2">
                                    <Form.Control 
                                        type="text"
                                        placeholder="Apartment, studio, or floor"
                                        value={this.state.farm.address2}
                                        onChange={e => {
                                                var tempFarm = this.state.farm;
                                                tempFarm.address2 = e.target.value; 
                                                this.setState({ farm: tempFarm });
                                            }}
                                        className="border-0" 
                                    />
                                </Form.Group>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Control 
                                            type="text"
                                            placeholder="City"
                                            value={this.state.farm.city}
                                            onChange={e => {
                                                    var tempFarm = this.state.farm;
                                                    tempFarm.city = e.target.value; 
                                                    this.setState({ farm: tempFarm });
                                                }}
                                            className="border-0" 
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Control 
                                            as="select"
                                            value={this.state.farm.state}
                                            onChange={e => {
                                                    var tempFarm = this.state.farm;
                                                    tempFarm.state = e.target.value; 
                                                    this.setState({ farm: tempFarm });
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
                                        <Form.Control 
                                            type="text"
                                            placeholder="Zip Code"
                                            value={this.state.farm.zip}
                                            onChange={e => {
                                                    var tempFarm = this.state.farm;
                                                    tempFarm.zip = e.target.value; 
                                                    this.setState({ farm: tempFarm });
                                                }}
                                            className="border-0" 
                                        />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Group controlId="formDescription">
                                    <Form.Control 
                                        type="text"
                                        placeholder="Description"
                                        value={this.state.farm.description}
                                        onChange={e => {
                                                var tempFarm = this.state.farm;
                                                tempFarm.description = e.target.value; 
                                                this.setState({ farm: tempFarm });
                                            }}
                                        className="border-0" 
                                    />
                                </Form.Group>

                                <Button className="text-white" variant="main-brand" type="submit" style={{width: "100%"}}>Create Farm</Button>
                            </Form>
                        </Jumbotron>
                    </Container>
                </div>
            )
        }
    }
}