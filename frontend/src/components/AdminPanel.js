import React, { Component } from 'react';

import {Container, Table} from 'react-bootstrap';

import axios from 'axios';

export default class AdminPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users : []
        };
    }

    componentDidMount() {
        axios.get("http://localhost:8080/api/getAllUsers")
            .then(response => response.data)
            .then((data) => {
                this.setState({users : data});
            });
    }

    render() {
        return (
            <Container>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Display Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.users.length === 0 ?
                            <tr align="true">
                                <td colSpan="3">No Users Available</td>
                            </tr> :
                            this.state.users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.displayName}</td>
                                    <td>{user.email}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Container>
        );
    }
}