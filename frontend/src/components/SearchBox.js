import React from 'react';

const SearchBox = ({searchfield, searchChange}) =>{
    return(
        <div className='pa2'>
            <input className='pa2 ba br3'
            type='search' 
            placeholder='Product'
            onChange={searchChange}
            />
        </div>
    );
}
export default SearchBox;