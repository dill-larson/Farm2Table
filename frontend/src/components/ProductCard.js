import React from 'react';

import 'tachyons';
import { sendToCart } from '../services/product.service';
import { auth } from "./firebase";



const ProductCard = ({id,name, farm, distance,stock, price,image}) => {
    function addToCart(){
        let quantity = 1;
        if(auth?.currentUser) {
            sendToCart(id, name, quantity, price)
                .then(() => {
                    console.log("Successfully added item to cart!");
                })
                .catch(error => {
                    console.log(error);
                })
        } else {
            console.log("You need to be logged in")
        };
        
    }
    return(
        <div style = {{backgroundColor: "#F9F8F9" }}className= 'grow dib br3 pa3 ma2 bw3 shadow-5'>
            <img alt='products' src={image} width= {300} height={250} className=''/>

            <div>
                <p style={{backgroundColor:"#D08737"}} className = "text-light-shade br3">{stock} left</p>
                <h2> {name}</h2>
                <p> {farm}</p>
                <p>${price}</p>
                <button onClick={addToCart} className="btn btn-success" id="addToCart">Add To Cart</button>
            </div>
        </div>
    )
}

export default ProductCard;