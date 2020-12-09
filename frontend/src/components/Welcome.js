import React, { Component } from "react";
import { Button, Container, Jumbotron } from 'react-bootstrap';

export default class Welcome extends Component {
    render() {
        return(
            <div style={{backgroundColor: "#1ABC56", paddingBottom: "10px"}}>
                <Jumbotron style={{backgroundColor: "#F9F8F9", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", borderTopLeftRadius: "0rem", borderTopRightRadius: "0rem", borderBottomRightRadius: "5rem", borderBottomLeftRadius: "5rem"}}>
                    <h1 className="text-main-brand text-center font-weight-bold display-2">Welcome</h1>
                </Jumbotron>
                <Container>
                    <Jumbotron style={{backgroundColor: "#F9F8F9", borderRadius: "3rem"}}>
                        <div className="mt-n4 mb-n4">
                            <p className="text-center">
                                If you've just starting using our platform,
                                welcome to <b className="text-main-brand">Farm to Table!</b>
                            </p>
                            <h4 className="text-main-brand">How to create an account</h4>
                                <Container>
                                    <h5 className="text-main-brand">Farmers</h5>
                                        <ol>
                                            <li>Navigate to the top-right section of your screen
                                                <br/>OR<br/>
                                                If you're on a mobile, navigate to the top left hamburger (three horizontal lines) and click
                                            </li>
                                            <li>Click Sign Up</li>
                                            <li>Enter your information</li>
                                            <li>Click the <b className="text-main-brand">Farmer</b> radio button to specify you are a farmer</li>
                                        </ol>
                                        <p>You're finished creating a <b className="text-main-brand">Farmer</b> account.</p>
                                    <h5 className="text-main-brand">Consumers</h5>
                                        <ol>
                                            <li>Navigate to the top-right section of your screen
                                                <br/>OR<br/>
                                                If you're on a mobile, navigate to the top left hamburger (three horizontal lines) and click
                                            </li>
                                            <li>Click Sign Up</li>
                                            <li>Enter your information</li>
                                            <li>Click the <b className="text-main-brand">Consumer</b> radio button to specify you are a consumer</li>
                                        </ol>
                                        <p>You're finished creating a <b className="text-main-brand">Consumer</b> account.</p>
                                </Container>
                            <h4 className="text-main-brand">FAQ</h4>
                            <ol>
                                <li>How do I create a new farm?</li>
                                    <p className="mb-0">
                                        After you have logged into your <b className="text-main-brand">Farmer</b> account,
                                        navigate to the top-right section of your screen and click your email. A dropdown should
                                        appear, clicks <b className="text-main-brand">Farms</b>. You can click <b className="text-main-brand">Add Farm </b> 
                                        to create a new farm.
                                    </p>
                                <li>How do I manage my farms?</li>
                                    <p className="mb-0">
                                        After you have logged into your <b className="text-main-brand">Farmer</b> account,
                                        navigate to the top-right section of your screen and click your email. A dropdown should
                                        appear, clicks <b className="text-main-brand">Farms</b>. You can click <b className="text-main-brand">Manage Farm </b> 
                                        under your farm to update, or delete your farm.
                                    </p>
                                <li>How do I delete a farm?</li>
                                    <p className="mb-0">
                                        After you have logged into your <b className="text-main-brand">Farmer</b> account,
                                        navigate to the top-right section of your screen and click your email. A dropdown should
                                        appear, clicks <b className="text-main-brand">Farms</b>. Click <b className="text-main-brand">Manage Farm </b> 
                                        under your farm and at the bottom there will be a button to <b className="text-main-brand">Delete Farm</b>. Deleting a
                                        Farm is permanemt and cannot be undone.
                                    </p>
                                <li>How do I add products to my farm?</li>
                                    <p className="mb-0">
                                        After you have logged into your <b className="text-main-brand">Farmer</b> account,
                                        navigate to the top-right section of your screen and click your email. A dropdown should
                                        appear, clicks <b className="text-main-brand">Farms</b>. Click <b className="text-main-brand">Manage Farm </b> 
                                        under your farm and navigate to the <b className="text-main-brand">Create Product</b> form. Here you can create
                                        new products to add to your farm. <i>We currently do not support adding images to products, but plan to implement
                                        this feature in later versions.</i>
                                    </p>
                            </ol>
                        </div>
                    </Jumbotron>
                </Container>
            </div>
        );
    }
}