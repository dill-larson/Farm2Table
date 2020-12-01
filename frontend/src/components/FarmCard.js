import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class FarmCard extends Component { 
    constructor() {
        super();
    }  
    
    render() {
        return(
            <Card>
                <Card.Body className="text-center">
                    <Card.Title className="text-black">{this.props.name}</Card.Title>
                    <Card.Subtitle className="text-light-accent">{this.props.address}</Card.Subtitle>
                    <Card.Text className="text-light-accent">{this.props.description}</Card.Text>
                    <Link to={`/farm/${this.props.id}`}>
                        <Button variant="dark-shade">Manage Farm</Button>
                    </Link>
                </Card.Body>
            </Card>
        )
    }
}