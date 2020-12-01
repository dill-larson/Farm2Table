import React from 'react';
import CartItem from './CartItem';
import Table from 'react-bootstrap/Table'

const ShoppingCartList = ({products}) => {
    return(
        <div class = "rounded" style={{border: "0.5px solid LightGray",backgroundColor: "#F9F8F9", width: "95%"}}>
            <Table hover>
                <thead>
                    <tr style= {{color:"#E09866"}}>
                        <th>Quantity</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Remove</th>
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
                </tbody>
            </Table>
        </div> 
    );
}

export default ShoppingCartList;