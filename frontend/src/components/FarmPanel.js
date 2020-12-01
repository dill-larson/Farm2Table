import React, { Component } from 'react';
import { Button, Card, CardDeck, Container, Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getFarmsByFarmer } from '../services/farm.service';
import { auth } from './firebase';
import FarmList from './FarmList';

export default class FarmPanel extends Component {
    constructor(){
        super()
        this.state = {
            farms: []
        }
    }
    
    componentDidMount(){
        getFarmsByFarmer(auth.currentUser)
            .then(queryDocSnapshots => {
                let data = [];
                queryDocSnapshots.map((product) => {
                    data.push(product.data());
                })
                this.setState({farms: data});
            })
            .catch(error => {
                console.log(error);
            })
    }
    
    render() {
        if(this.state.farms.length <= 0) {
            return (
                <div style= {{backgroundColor: "#1ABC56", paddingBottom: "10px"}}>
                    <Jumbotron style={{ backgroundColor: "#F9F8F9", borderBottomRightRadius: "5rem", borderBottomLeftRadius: "5rem", borderTopLeftRadius: "0rem", borderTopRightRadius: "0rem"}}>
                        <h1 className=" text-center text-main-brand font-weight-bold display-2">Your Farms</h1>
                    </Jumbotron>
                    <Container>
                        <Link to="/create-farm">
                            <Button className="text-white" variant="main-brand" style={{width: "100%"}}>Add Farm</Button>
                        </Link>
                        <div className="mt-4">
                            <CardDeck>
                                <Card>
                                <Card.Body className="text-center">
                                <Card.Title className="text-black">No Farms Found!</Card.Title>
                                <Card.Text className="text-light-accent">
                                    It looks like you don't have any farms!
                                    Add farms above with the "Add Farms" Button
                                </Card.Text>
                                </Card.Body>
                                </Card>
                            </CardDeck>
                        </div>
                    </Container>
                </div>
            );
        } else {
            return (
                <div style= {{backgroundColor: "#1ABC56", paddingBottom: "10px"}}>
                    <Jumbotron style={{ backgroundColor: "#F9F8F9", borderBottomRightRadius: "5rem", borderBottomLeftRadius: "5rem", borderTopLeftRadius: "0rem", borderTopRightRadius: "0rem"}}>
                        <h1 className=" text-center text-main-brand font-weight-bold display-2">Your Farms</h1>
                    </Jumbotron>
                    <Container>
                        <Link to="/create-farm">
                            <Button className="text-white" variant="main-brand" style={{width: "100%"}}>Add Farm</Button>
                        </Link>
                        <div className="mt-4">
                            <FarmList
                                farms={this.state.farms}
                            />
                        </div>
                    </Container>
                </div>
            );
        }
    }
}