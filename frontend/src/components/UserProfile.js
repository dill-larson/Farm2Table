import React from 'react';
import ProductList from './ProductList';
import SearchBox from './SearchBox';
import { Jumbotron} from 'react-bootstrap';
import UserCard from'./UserCard';

class UserProfile extends React.Component{
    constructor(){
        super()
        this.state = {
            users: [],
            name:'Laura Hernandez',
            email:'lvhernandez@gmail.com'
        }
    }
    
    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=> response.json())
        .then(users => this.setState({users: users}));
    }

    render(){
        return(
        <div style= {{backgroundColor: "#1ABC56"}}>
            <Jumbotron style={{ backgroundColor: "#F9F8F9", borderBottomRightRadius: "5rem", borderBottomLeftRadius: "5rem"}}>
            <h1 className=" text-center text-main-brand font-weight-bold display-2"> User Profile</h1>
            </Jumbotron>
            <div  style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <UserCard name={this.name} email={this.email}/>
            </div>
        </div>
        );
    }
}

export default UserProfile;