import React from 'react';
import ProductList from './ProductList';
import SearchBox from './SearchBox';
import Scroll from './Scroll';
import { Jumbotron} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

class Marketplace extends React.Component{
    constructor(){
        super()
        this.state = {
            products: [],
            searchfield: ''
        }
    }
    
    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=> response.json())
        .then(users => this.setState({products: users}));
    }

    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value})
    }

   
    render(){
        const{products: products, searchfield} = this.state
        const filteredProducts = products.filter(product =>{
            return product.name.toLocaleLowerCase().includes(searchfield.toLocaleLowerCase());
        })
        return !products.length ?
        <h1>Loading</h1> :
        (
        <div className= "text-center"style= {{backgroundColor: "#1ABC56"}}>
            <Jumbotron style={{ backgroundColor: "#F9F8F9", borderBottomRightRadius: "5rem", borderBottomLeftRadius: "5rem"}}>
            <h1 className="text-main-brand text-center font-weight-bold display-2"> Marketplace</h1>
                <SearchBox searchChange={this.onSearchChange}/>
            </Jumbotron>
                <ProductList products = {filteredProducts}/>
        </div>
        );
        }
}

export default Marketplace;
