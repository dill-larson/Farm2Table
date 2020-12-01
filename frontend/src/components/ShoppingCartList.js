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
                    <td></td>
                    <td></td>
                    <td>${calculateTotal(products)}</td>
                    <td></td>
                </tbody>
            </Table>
        </div> 
    );
}

function calculateTotal(products) {
    let total = 0;
    products.map(product => {
        total += parseFloat(product.price);
    });
    return total.toFixed(2);
}

export default ShoppingCartList;