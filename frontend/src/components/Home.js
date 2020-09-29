import React, { Component } from 'react';

import { Button, Jumbotron } from 'react-bootstrap';

export default class Home extends Component {
    render() {
        return (
            <Jumbotron>
                <h1>Farm2Table</h1>
                <p>
                    Brining the farmer's market to your doorstep.
                </p>
                <Button>View Users</Button>
            </Jumbotron>
        )
    }
}