import React from 'react';
import CartItem from './CartItem';
<<<<<<< Updated upstream
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

=======

const ShoppingCartList = ({products}) => {
    return(
        <div class = "rounded" style = {{backgroundColor: "#F9F8F9"}}>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
            );
             })
            }
                </tbody>
        </Table>
        </div>
       
    //         <div class = "rounded" style={{border: "0.5px solid LightGray",backgroundColor: "#F9F8F9", width: "80%"}}>
    //             <div class= "rounded" style={{display: "flex", flexDirection: "row", justifyContent: "space-around", alignSelf: "center", paddingTop: "20px", paddingBottom: "20px", backgroundColor: "lightgray"}}>
    //                 <h3>Product</h3>
    //                 <h3>Price</h3>
    //                 <h3>Quantity</h3>
    //                 <h3>        </h3>
    //             </div>
    //         {
    //         products.map((user,i) => {
    //         return (
    //             <CartItem 
    //             key={products[i].id} 
    //             id={products[i].id} 
    //             name={products[i].name} 
    //             price={products[i].id}
    //             farm={products[i].name}
    //             distance={products[i].id}
    //             stock={products[i].id}
    //             />
    //         );
    //     })
    // }
    //      </div>
 );
=======
               
            );
        })
    }
         </div>
    );
>>>>>>> Stashed changes
}

export default ShoppingCartList;