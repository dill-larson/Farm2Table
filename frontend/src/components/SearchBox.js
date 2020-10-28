import React from 'react';

const SearchBox = ({searchfield, searchChange}) =>{
    return(
        <div style={{display:"flex", justifyContent:"flex-end"}} className='pa2'>
            <input className='pa2 ba br3'
            type='search' 
            placeholder='search products'
            onChange={searchChange}
            />
        </div>
    );
}
export default SearchBox;