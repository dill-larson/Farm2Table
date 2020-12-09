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
import FarmPanel from './components/FarmPanel';
import FarmProfileSecurity from './components/FarmProfile';
import FarmCreate from './components/FarmCreate';
import ProductProfileSecurity from './components/ProductProfile';
import Welcome from './components/Welcome';

class App extends Component{
    render ()
    {
        return (
            <Router>
                <NavigationBar/>
                <Switch>
                    <Route path="/" exact component={() => <Home/>}/>
                    <Route path="/market" exact component={() => <Marketplace/>}/>
                    <Route path="/welcome" exact component={Welcome}/>
                    <Route path="/profile/:id">
                        <UserProfileSecurity />
                    </Route>
                    <Route path="/create-farm" exact component={FarmCreate}/>
                    <Route path="/farms" exact component={FarmPanel}/>
                    <Route path="/farm/:id" component={FarmProfileSecurity}/>
                    <Route path="/farm-/:id/product/:productid" component={ProductProfileSecurity}/>
                    <Route path="/signin" exact component={SignIn}/>
                    <Route path="/signup" exact component={SignUp}/>
                    <Route path="/cart" exact component={Cart}/>
                </Switch>
            </Router>
        );
    }
}

export default App;
