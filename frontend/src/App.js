import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';

import Home from './components/Home';
import Marketplace from './components/Marketplace';
import NavigationBar from './components/NavigationBar';
import SignIn from './components/signin';
import SignUp from './components/signup';
import Cart from './components/ShoppingCart';
import UserProfileSecurity from './components/UserProfile';

class App extends Component{
    render ()
    {
        return (
            <Router>
                <NavigationBar/>
                <Switch>
                    <Route path="/" exact component={() => <Home/>}/>
                    <Route path="/market" exact component={() => <Marketplace/>}/>
                    <Route path="/profile/:id">
                        <UserProfileSecurity />
                    </Route>
                    <Route path="/signin" exact component={SignIn}/>
                    <Route path="/signup" exact component={SignUp}/>
                    <Route path="/cart" exact component={Cart}/>
                </Switch>
            </Router>
        );
    }
}

export default App;
