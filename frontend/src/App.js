import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';

import AdminPanel from './components/AdminPanel';
import Home from './components/Home';
import NavigationBar from './components/NavigationBar';

function App() {
    return (
        <Router>
            <NavigationBar/>
            <Container>
                <Row>
                    <Col lg={12} className={"margin-top"}>
                        <Switch>
                            <Route path="/" exact component={() => <Home/>}/>
                            <Route path="/admin" exact component={AdminPanel}/>
                        </Switch>
                    </Col>
                </Row>
            </Container>
        </Router>
    );
}

export default App;
