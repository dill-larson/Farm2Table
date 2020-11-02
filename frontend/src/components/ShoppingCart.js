import React from 'react'
import CartItem from './CartItem'
import { Button, Jumbotron} from 'react-bootstrap';
import ShoppingCartList from './ShoppingCartList'
import Checkout from './Checkout';


class ShoppingCart extends React.Component{
    constructor(){
        super()
        this.state = {
            cart: [],
            products: [],
            searchfield: ''
        }
    }
    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=> response.json())
        .then(users => this.setState({products: users}));
    }

    render(){
        const{products: products, searchfield} = this.state
        const filteredProducts = products.filter(product =>{
            return product.name.toLocaleLowerCase().includes(searchfield.toLocaleLowerCase());
        })

        return !products.length ?
        <h1>Loading</h1> :
        (
        <div style= {{backgroundColor: "#1ABC56"}}>
            <Jumbotron style={{ backgroundColor: "#F9F8F9", borderBottomRightRadius: "5rem", borderBottomLeftRadius: "5rem"}}>
            <h1 className=" text-center text-main-brand font-weight-bold display-2"> Shopping Cart</h1>
            </Jumbotron>
            <div  style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <ShoppingCartList products = {filteredProducts}/>
            </div>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <div style= {{paddingTop: "50rem"}}></div>
            <Checkout></Checkout>
            </div>
        </div>
        );
        }
}

export default ShoppingCart