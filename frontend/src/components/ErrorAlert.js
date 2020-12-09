import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

export default class ErrorAlert extends Component {
    constructor(props) {
        super();
        this.state = {
            show: true,
        };
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.setState({show: false});
    }
    
    render() {
        if(this.state.show) {
            return(
                <Alert variant="danger" onClose={() => this.handleClose()} dismissible>
                    <Alert.Heading>
                        {this.props?.code || "Error"}
                    </Alert.Heading>
                    <p>
                        {this.props.message}
                    </p>
                </Alert>
            );
        }
        return null;
    }
}