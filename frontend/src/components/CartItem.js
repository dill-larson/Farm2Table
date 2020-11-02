import React from 'react';
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
    )
}

export default ProductCard;