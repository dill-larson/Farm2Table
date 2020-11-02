import React from 'react';
<<<<<<< Updated upstream
import 'tachyons';
import Table from 'react-bootstrap/Table'

const ProductCard = ({id,name, farm, distance,stock, price}) => {
    return(
            <tr>
                <td> <p>{id}</p></td>
                <td style={{display:"flex", flexDirection: "row"} }> 
                    <img style={{height: "15%", width: "15%", padding:"2%"}} alt='products' src={`https://robohash.org/${id}?200x200`}/>
                    <div>
                    <h5 style={{color:"#D08737"}}> {name}</h5>
                    <p> {farm} farm</p>
                    </div>
               </td>
               <td>
                    <p>${price}</p>
               </td>
               <td>
                    <p>{stock}</p>
               </td>
               <td>
               <button className="btn btn-secondary" id="addToCart">Remove</button>
               </td>
            </tr>
=======
import Button from 'react-bootstrap/Button';


const ProductCard = ({id,name, farm, distance,stock, price}) => {
    return(
        <div class = "rounded"  style = {{border: "0.5px solid LightGray",display: "flex", justifyContent:"space-around", }}>
            <img  style= {{alignSelf: "center",paddingRight: " 2rem", paddingLeft: "2rem"}}alt='products' src={`https://robohash.org/${id}?200x200`} className='br3'/>
                <div style= {{alignSelf: "center",paddingRight: " 2rem", paddingLeft: "2rem"}}>
                <h2 style={{color: "#D08737"}}> {name}</h2>
                <p> {farm} farm</p>
                </div>
            <div style= {{fontWeight: "bold" ,justifyContent: "left", alignSelf: "center",paddingRight: " 2rem", paddingLeft: "2rem"}}><h3> ${price} </h3></div>
            <Button  style= {{alignSelf: "center"}} variant="outline-secondary" id="addToCart">Remove</Button>
            <div style={{paddingRight: " 2rem", paddingLeft: "2rem"}}></div>
        </div>
>>>>>>> Stashed changes
    )
}

export default ProductCard;