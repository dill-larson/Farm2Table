import React from 'react';
import CartItem from './CartItem';
import Table from 'react-bootstrap/Table'

const ShoppingCartList = ({products}) => {
    return(
        <div class = "rounded" style={{border: "0.5px solid LightGray",backgroundColor: "#F9F8F9", width: "95%"}}>
        <Table  hover >
             <thead>
                <tr style= {{color:"#E09866"}}>
                    <th>#</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Remove</th>
                </tr>
            </thead>
        <tbody>


            {
            products.map((user,i) => {
            return (
                <CartItem 
                key={products[i].id} 
                id={products[i].id} 
                name={products[i].name} 
                price={products[i].id}
                farm={products[i].name}
                distance={products[i].id}
                stock={products[i].id}
                />

            );
             })
            }
                </tbody>
        </Table>
        </div> 
            );
}

export default ShoppingCartList;