import React from 'react';
import 'tachyons';
import Table from 'react-bootstrap/Table'
import { auth } from './firebase';
import { deleteCartItem } from '../services/cart.service';

const ProductCard = ({id, name, quantity, price}) => {
    return(
        <tr>
            <td>
                {quantity}
            </td>
            <td> 
                <h5 className="text-main-brand">{name}</h5>
            </td>
            <td className="text-right">
                <p>${price}</p>
            </td>
            <td>
            <button className="btn btn-secondary" id="addToCart">Remove</button>
            </td>
        </tr>
    );
}

function deleteItem(itemId) {
    deleteCartItem(auth?.currentUser, itemId)
        .then(() => {
            console.log("Deleted item successfully!");
        })
        .catch(error => {
            console.log(error);
        })
}

export default ProductCard;