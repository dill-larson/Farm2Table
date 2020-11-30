import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({products}) => {
    return(
        <div>
            {
            products.map((user,i) => {
                return (
                    <ProductCard 
                        id={products[i].id} 
                        name={products[i].name} 
                        price={products[i].price}
                        farm={products[i].farm}
                        distance={products[i].proximity}
                        stock={products[i].quantity}
                        image={products[i].picture}
                    />
                );
            })
            }
        </div>
    );
}

export default ProductList;