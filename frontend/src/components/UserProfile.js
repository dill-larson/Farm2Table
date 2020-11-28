import React, { Component } from 'react';
import { Container, Jumbotron } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { auth } from './firebase';
//import ProductList from './ProductList'; to be implemented
//import SearchBox from './SearchBox'; to be implemented
import UserCard from'./UserCard';

class UserProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userdata: { //Firestore user document
                id: '',
                displayName: '',
                role: '',
                address: ''
            }
        };
    }

    render() {
        return(
            <div style= {{backgroundColor: "#1ABC56", paddingBottom: "10px"}}>
                <Jumbotron style={{ backgroundColor: "#F9F8F9", borderBottomRightRadius: "5rem", borderBottomLeftRadius: "5rem", borderTopLeftRadius: "0rem", borderTopRightRadius: "0rem"}}>
                    <h1 className=" text-center text-main-brand font-weight-bold display-2"> User Profile</h1>
                </Jumbotron>
                <UserCard/>
            </div>
        );
    }
}

export default function UserProfileSecurity() {
    if(auth.currentUser?.uid == useParams().id) { //prevents unauthorized users viewing other user's data
        return <UserProfile/>;
    } else {
        return (
            <div style= {{backgroundColor: "#1ABC56", paddingBottom: "10px"}}>
                <Jumbotron style={{ backgroundColor: "#F9F8F9", borderBottomRightRadius: "5rem", borderBottomLeftRadius: "5rem", borderTopLeftRadius: "0rem", borderTopRightRadius: "0rem"}}>
                    <h1 className=" text-center text-main-brand font-weight-bold display-2"> User Profile</h1>
                </Jumbotron>
                <Container>
                    <Jumbotron style={{backgroundColor: "#F9F8F9", borderRadius: "3rem"}}>
                        <h4 className="mt-n4 mb-n4 text-center text-light-accent">
                            You do not have permission to view this page.
                        </h4>
                    </Jumbotron>
                </Container>
            </div>
        );
    }
}