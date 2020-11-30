import React, { Component } from 'react';

import { Button, Card, CardDeck, Col, Container, Jumbotron, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import farmland from '../images/dan-meyers-IQVFVH0ajag-unsplash.jpg';

export default class Home extends Component {
    render() {
        return (
            <div style={{backgroundColor: "#F9F8F9"}}>
                <Jumbotron style={{marginBottom: "100px", backgroundImage: `url(${farmland})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", borderTopLeftRadius: "0rem", borderTopRightRadius: "0rem", borderBottomRightRadius: "5rem", borderBottomLeftRadius: "5rem"}}>
                    <Container>
                        <div style={{marginBottom: "100px"}}>
                            <h1 className="text-main-brand text-center font-weight-bold display-2">Farm To Table</h1>
                            <p className="text-light-accent text-center">
                                Brining the farmer's market to your doorstep.
                            </p>
                            <Row>
                                <Col className="text-center">
                                   <Link to="/market"> <Button variant="dark-shade" style={{width: "150px"}}>Shop</Button></Link>
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <CardDeck>
                                <Card className="mb-4 mb-sm-4 mb-md-4 mb-lg-0" style={{backgroundColor: "#F9F8F9"}}>
                                    <Card.Img variant="top" />
                                    <Card.Body className="text-light-accent text-center">
                                        <Card.Title className="text-dark-shade text-center"  style= {{height:40}}>Support Local Business</Card.Title>
                                        <img src={"https://imagizer.imageshack.com/v2/550x550q90/924/MdVDK3.png"}/>
                                        <Card.Text>
                                            Browse your local farms and support the smaller businesses around you!
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card className="mb-4 mb-sm-4 mb-md-4 mb-lg-0" style={{backgroundColor: "#F9F8F9"}}>
                                    <Card.Img variant="top" />
                                    <Card.Body className="text-light-accent text-center">
                                        <Card.Title className="text-dark-shade text-center"style= {{height:40}}>Buy Directly From The Farm</Card.Title>
                                        <img src={"https://imagizer.imageshack.com/v2/550x550q90/923/CBcDao.png"}/>
                                        <Card.Text>
                                            Buy your produce from your trusted businesses directly from them.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                <div className="w-100 d-none d-sm-block d-md-block d-lg-none">{/*Wrap every 2 cards on sm and md*/}</div>
                                <Card className="mb-4 mb-sm-0" style={{backgroundColor: "#F9F8F9"}}>
                                    <Card.Img variant="top" />
                                    <Card.Body className="text-light-accent text-center">
                                        <Card.Title className="text-dark-shade text-center"style= {{height:40}}>At Your Convenience</Card.Title>
                                        <img src={"https://imagizer.imageshack.com/v2/550x550q90/924/m8tDIj.png"}/>
                                        <Card.Text>
                                            Buy on your schedule from the comfort of your home.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card>
                                    <Card.Img variant="top" />
                                    <Card.Body className="text-light-accent text-center" style={{backgroundColor: "#F9F8F9"}}>
                                        <Card.Title className="text-dark-shade text-center"style= {{height:40}}>More Sustainable</Card.Title>
                                        <img src={"https://imagizer.imageshack.com/v2/550x550q90/922/ilGHPx.png"}/>
                                        <Card.Text>
                                            Cut the cost of moving your produce from grocery stores by delivering
                                            it directly from the farm to your home.
                                        </Card.Text> 
                                    </Card.Body>
                                </Card>
                            </CardDeck>
                        </div>
                    </Container>
                </Jumbotron>
                <Container>
                    <Row>
                        <Col xs={12} md={8}>
                            <h6 className="text-black">Farm To Table</h6>
                            <div className="text-black">
                                For both farmers and consumers who need a convenient marketplace to 
                                buy and sell food from farms to the buyer’s homes. Farm2Table is an 
                                eCommerce platform that connects farms and consumers in close proximity, 
                                while making the process seamless for everyone. Unlike a traditional farmer’s market, 
                                grocery store delivery services, and grocery store online delivery services, 
                                our product offers the ability to buy produce directly from local farms in the 
                                comfort of the consumer’s home and at the convenience of their schedule.
                            </div>
                        </Col>
                        <Col xs={4} md={2}>
                            <h6 className="text-black">Get to Know Us</h6>
                            <div>
                                <a className="text-black" href='/'>About Us</a>
                            </div>
                            <div>
                                <a className="text-black" href='/'>Rules & Reservations Policies</a>
                            </div>
                            <div>
                                <a className="text-black" href='/'>Accessibility</a>
                            </div>
                            <div>
                                <a className="text-black" href='/'>Media Center</a>
                            </div>
                            <div>
                                <a className="text-black" href='/'>Site Map</a>
                            </div>
                        </Col>
                        <Col xs={4} md={2}>
                            <h6 className="text-black">Let Us Help You</h6>
                            <div>
                                <a className="text-black" href='/'>Your Account</a>
                            </div>
                            <div>
                                <a className="text-black" href='/'>Your Reservations</a>
                            </div>
                            <div>
                                <a className="text-black" href='/'>Contact Us</a>
                            </div>
                            <div>
                                <a className="text-black" href='/'>Help Center</a>
                            </div>
                            <div>
                                <a className="text-black" href='/'>Submit Feedback</a>
                            </div>
                        </Col>
                    </Row>
                    <div style= {{height:100}}></div>
                </Container>
            </div>
        )
    }
}