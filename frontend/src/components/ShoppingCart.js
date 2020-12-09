import React, { Component } from 'react'
import { Container, Jumbotron, Table } from 'react-bootstrap';
import { auth } from "./firebase";
import CartItem from './CartItem';
import { getCartItems } from "../services/cart.service";
import ErrorAlert from './ErrorAlert';


export default class ShoppingCart extends Component{
    constructor(){
        super();
        this.state = {
            products: [],
            total: 0,
            error: null
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
                this.setState({error: <ErrorAlert code={error.code} message={error.message}/>});
            });
    }

    render(){
        const {products} = this.state;
        const {error} = this.state;
        return !products.length ? <h1>Cart is Empty</h1> :
        (
            <div style= {{backgroundColor: "#1ABC56", paddingBottom: "10px"}}>
                <Jumbotron style={{ backgroundColor: "#F9F8F9", borderBottomRightRadius: "5rem", borderBottomLeftRadius: "5rem", borderTopLeftRadius: "0rem", borderTopRightRadius: "0rem"}}>
                    <h1 className=" text-center text-main-brand font-weight-bold display-2"> Shopping Cart</h1>
                </Jumbotron>
                <Container>
                    <Jumbotron style={{backgroundColor: "#F9F8F9", borderRadius: "3rem"}}>
                        {error}
                        <Table hover>
                            <thead>
                                <tr className="text-main-brand">
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th className="text-right">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.map(product => {
                                        return (
                                            <CartItem 
                                                key={product.id}
                                                id={product.id}
                                                name={product.name}
                                                price={product.price}
                                                quantity={product.quantity}
                                            />
                                        );
                                    })
                                }
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td className="text-right"><b>Total:</b> ${calculateTotal(products)}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Jumbotron>
                </Container>
            </div>
        );
        }
}

function calculateTotal(products) {
    let total = 0;
    products.map(product => {
        total += parseFloat(product.price) * parseInt(product.quantity);
    });
    return total.toFixed(2);
}