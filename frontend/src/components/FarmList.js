import React from 'react';
import { CardDeck } from 'react-bootstrap';
import FarmCard from './FarmCard';

const FarmList = ({ farms }) => {
    console.log(farms);
    return(
        <CardDeck>
            {
                farms.map(farm => {
                    return (
                        <FarmCard 
                            id={farm.id} 
                            name={farm.name} 
                            description={farm.description}
                            address={farm.address}
                        />
                    );
                })
            }
        </CardDeck>
    );
}

export default FarmList;