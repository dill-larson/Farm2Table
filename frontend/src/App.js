import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';

import AdminPanel from './components/AdminPanel';
import Home from './components/Home';
import NavigationBar from './components/NavigationBar';

function App() {
    return (
        <Router>
            <NavigationBar/>
            <Switch>
                <Route path="/" exact component={() => <Home/>}/>
                <Route path="/admin" exact component={AdminPanel}/>
            </Switch>
        </Router>
    );
}

export default App;
