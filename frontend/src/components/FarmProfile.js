import React, { Component } from 'react';
import { Button, Card, Col, Container, Form, Jumbotron } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import ProductCreate from './ProductCreate';
import { getFarmByID, updateFarm, deleteFarm } from '../services/farm.service';
import { getProductsByFarm } from '../services/product.service';
class FarmProfile extends Component {
    constructor(props) {
        super();
        this.state = {
            farm: {
                id: '',
                name: '',
                farmer: '',
                description: '',
                address1: '',
                address2: '',
                city: '',
                state: '',
                zip: ''
            },
            farm_name: '', //used to for header; the header shouldn't update when a user types in the form
            products: []
        };
        this.update = this.update.bind(this);
        this.deleteFarm = this.deleteFarm.bind(this);
    }

    update() {
        updateFarm(this.state.farm)
            .then(() => {
                console.log("Updated farm successfully!");
                this.setState({farm_name: this.state.farm.name});
            })
            .catch(error => {
                console.log(error);
            })
    }

    deleteFarm() {
        deleteFarm(this.state.farm)
            .then(() => {
                console.log("Deleted farm successfully");
                //route to farms?
            })
            .catch(error => {
                console.log(error);
            })
    }

    componentDidMount() {
        getFarmByID(this.props.id)
            .then(data => {
                this.setState({farm: data});

                var temp = this.state.farm;
                temp.id = data.id;
                temp.name = data.name;
                temp.farmer = data.farmer;
                temp.description = data.description;

                var separated_address = data.address.split(", ");
                temp.address1 = separated_address[0];
                temp.address2 = separated_address.length >= 5 ? separated_address[1] : "";
                temp.city = separated_address.length >= 5 ? separated_address[2] : separated_address[1];
                temp.state = separated_address.length >= 5 ? separated_address[3] : separated_address[2];
                temp.zip = separated_address.length >= 5 ? separated_address[4] : separated_address[3];
                this.setState({farm: temp});
                this.setState({farm_name: data.name});

                getProductsByFarm(this.state.farm.id)
                    .then(queryDocSnapshots => {
                    let data = [];
                    queryDocSnapshots.map((product) => {
                        data.push(product.data());
                    })
                    this.setState({products: data});
                    })
                    .catch(error => {
                        console.log(error);
                    })
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {        
        return !this.state.farm ? <h3>Loading...</h3> : 
            <div style= {{backgroundColor: "#1ABC56", paddingBottom: "10px"}}>
                <Jumbotron style={{ backgroundColor: "#F9F8F9", borderBottomRightRadius: "5rem", borderBottomLeftRadius: "5rem", borderTopLeftRadius: "0rem", borderTopRightRadius: "0rem"}}>
                    <h1 className=" text-center text-main-brand font-weight-bold display-2">{this.state.farm_name}</h1>
                </Jumbotron>
                <Container>
                    <Jumbotron style={{backgroundColor: "#F9F8F9", borderRadius: "3rem"}}>
                        <h4 className="mt-n4 text-center text-light-accent">Farm Information</h4>
                        <Form onSubmit={(e) => {e.preventDefault(); this.update();}}>
                            <Form.Group controlId="formFarmName">
                                <Form.Label className="text-light-accent">Farm Name</Form.Label>
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
                                <Form.Label className="text-light-accent">Street Address</Form.Label>
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
                                <Form.Label className="text-light-accent">Apartment, studio, or floor</Form.Label>
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
                                    <Form.Label className="text-light-accent">City</Form.Label>
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
                                    <Form.Label className="text-light-accent">State</Form.Label>
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
                                    <Form.Label className="text-light-accent">Zip Code</Form.Label>
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
                                <Form.Label className="text-light-accent">Farm Description</Form.Label>
                                <Form.Control 
                                    type="text"
                                    placeholder="Farm Description"
                                    value={this.state.farm.description}
                                    onChange={e => {
                                            var tempFarm = this.state.farm;
                                            tempFarm.description = e.target.value; 
                                            this.setState({ farm: tempFarm });
                                        }}
                                    className="border-0" 
                                />
                            </Form.Group>

                            <Button className="text-white" variant="main-brand" type="submit" style={{width: "100%"}}>Update Farm</Button>
                        </Form>
                        <Form className="mt-3 mb-n4" onSubmit={(e) => {e.preventDefault(); this.deleteFarm();}}>
                            <Button className="text-white" variant="danger" type="submit" style={{width: "100%"}}>Delete Farm</Button>
                        </Form>
                    </Jumbotron>
                    <ProductCreate
                        farm={this.state.farm}
                    />
                    <Jumbotron style={{backgroundColor: "#F9F8F9", borderRadius: "3rem"}}>
                        <h4 className="mt-n4 text-center text-light-accent">Products</h4>
                        {
                            this.state.products.map(product => {
                                return (
                                <Link to={`/farm-/${this.state.farm.id}/product/${product.id}`}>
                                    <Button className="text-white" variant="main-brand" type="button" style={{width: "100%"}}>{product.name}</Button>
                                </Link>
                                );
                            })
                        }
                    </Jumbotron>
                </Container>
            </div>
    }
}

export default function FarmProfileSecurity() {
    return <FarmProfile id={useParams().id}/>;
}