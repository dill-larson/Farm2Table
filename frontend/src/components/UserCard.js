import React from 'react';
import CartItem from './CartItem';
import Table from 'react-bootstrap/Table'

const UserCard = ({name, email}) => {
    return(
        <div class = "rounded bg-white" style={{border: "0.5px solid LightGray", width: "95%", paddingLeft:"1rem"}}>
        <h1 className= "text-main-brand">My Account</h1>
        <div style={{paddingLeft:"1rem", paddingRight:"3rem"}} >
            <div style={{display:"flex", flexDirection: "row", flexWrap: "wrap", justifyContent:"space-between"}}>
                <div class = "rounded" style={{border: "0.5px solid LightGray", padding: "1rem"}}>
                <h3 class= "bg-light rounded-pill px-4 py-3 text-light-accent"> User Information </h3>
                <h5>Name: </h5>
                <h5>{name}</h5>
                <h5>Username: </h5>
                <h5>{name}</h5>
                <h5>Email address: </h5>
                <h5>{email}</h5>
                <h5>Address: </h5>
                <h5>{name}</h5>
                <div style={{display:"flex", flexDirection: "row"}}>
                <h5>City: </h5>
                <h5>{name}</h5>
                <h5>Country: </h5>
                <h5>{name}</h5>
                <h5>Zip Code: </h5>
                <h5>{name}</h5>
                </div>
                </div>
                <div class = "rounded" style={{border: "0.5px solid LightGray", padding: "1rem"}}>
                <h3 className= " bg-light  rounded-pill px-4 py-3 text-light-accent  "> Profile Picture </h3>
                </div>
            </div>
            
            
            <div style={{padding: "1rem"}}></div>
            <h3 className= "text-light-accent">Orders</h3>
            <Table>
            <thead>
                <tr className= "text-dark-accent">
                    <th>Order Number</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Track</th>
                </tr>
            </thead>
            <tbody>
            </tbody>

            </Table>
            <h3 className= "text-light-accent"> Past Orders</h3>
            <Table>
            <thead>
                <tr className= "text-dark-accent">
                    <th>Order Number</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
            </tbody>

            </Table>
           
        </div> 
        </div>
            );
}

export default UserCard;