import React from 'react'
import { Jumbotron } from 'react-bootstrap';
import { auth } from "./firebase";
import ShoppingCartList from './ShoppingCartList'
import { getCartItems } from "../services/cart.service";


class ShoppingCart extends React.Component{
    constructor(){
        super();
        this.state = {
            products: []
        };
    }

    componentDidMount(){
        getCartItems(auth?.currentUser)
            .then(queryDocSnapshots => {
                let data = [];
                queryDocSnapshots.map((product) => {
                    data.push(product.data());
                })
                this.setState({products: data});
            })
            .catch(error => {
                console.log(error);
            });
    }

    render(){
        const { products: products } = this.state;
        return !products.length ? <h1>Cart is Empty</h1> :
        (
            <div style= {{backgroundColor: "#1ABC56", paddingBottom: "10px"}}>
                <Jumbotron style={{ backgroundColor: "#F9F8F9", borderBottomRightRadius: "5rem", borderBottomLeftRadius: "5rem"}}>
                    <h1 className=" text-center text-main-brand font-weight-bold display-2"> Shopping Cart</h1>
                </Jumbotron>
                <div  style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                    <ShoppingCartList products = {products}/>
                </div>
            </div>
        );
        }
}

export default ShoppingCart