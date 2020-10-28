import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({products}) => {
    return(
        <div>
            {
            products.map((user,i) => {
            return (
                <ProductCard 
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
         </div>
    );
}

export default ProductList;