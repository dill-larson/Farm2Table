import React, { Component } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { auth } from './firebase';
import { deleteCartItem, updateCartItem } from '../services/cart.service';
import ErrorAlert from './ErrorAlert';

export default class CartItem extends Component {
    constructor(props) {
        super();
        this.state = {
            quantity: 0,
            error: null
        }
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidMount() {
        this.setState({quantity: this.props.quantity});
    }
    
    handleUpdate() {
        if(this.state.quantity > 0) {
            updateCartItem(auth?.currentUser, this.props.id, this.state.quantity)
                .then(() => {
                    console.log("Updated item successfully!");
                })
                .catch(error => {
                    this.setState({error: <ErrorAlert code={error.code} message={error.message}/>});
                });
        } else { //delete item
            deleteCartItem(auth?.currentUser, this.props.id)
                .then(() => {
                    console.log("Deleted item successfully!");
                })
                .catch(error => {
                    this.setState({error: <ErrorAlert code={error.code} message={error.message}/>});
                })
        }
    }

    render() {
        const {error} = this.state;
        return(
            <tr>
                {error}
                <td className="text-main-brand text-bold">{this.props.name}</td>
                <td>
                    <Form onSubmit={(e) => {e.preventDefault(); this.handleUpdate();}}>
                        <Row>
                            <Col>
                                <Form.Group controlId="formQuantity">
                                    <Form.Control 
                                        type="text"  
                                        value={this.state.quantity}
                                        onChange={e => {
                                            this.setState({ quantity: e.target.value });
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Button type="submit">Update</Button>
                            </Col>
                        </Row>
                    </Form>
                </td>
                <td className="text-right">${this.props.price}</td>
            </tr>
        );
    }
}