import React from 'react';
import 'tachyons';

const ProductCard = ({id,name, farm, distance,stock, price,image}) => {
    return(
        <div style = {{backgroundColor: "#F9F8F9" }}className= 'grow dib br3 pa3 ma2 bw3 shadow-5'>
            <img alt='products' src={image} width= {300} height={250} className=''/>

            <div>
                <p style={{backgroundColor:"#D08737"}} className = "text-light-shade br3">{stock} left</p>
                <h2> {name}</h2>
                <p> {farm} farm</p>
                <p>{distance} miles from you</p>
                <p>${price}</p>
                <button className="btn btn-success" id="addToCart">Add To Cart</button>
            </div>
        </div>
    )
}

export default ProductCard;