import React from 'react';
import { Container, Jumbotron } from 'react-bootstrap';
import ProductList from './ProductList';
import SearchBox from './SearchBox';
import { getProducts } from '../services/product.service';

class Marketplace extends React.Component{
    constructor(){
        super()
        this.state = {
            products: [],
            searchfield: ''
        }
    }
    
    componentDidMount(){
        getProducts()
            .then(queryDocSnapshots => {
                console.log("QueryDocSnap", queryDocSnapshots);
                let data = [];
                queryDocSnapshots.map((product) => {
                    data.push(product.data());
                })
                this.setState({products: data});
            })
            .catch(error => {
                console.log(error);
            })
    }

    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value})
    }

    render(){
        const { products: products, searchfield } = this.state;
        const filteredProducts = products.filter(product => {
            return product.name.toLocaleLowerCase().includes(searchfield.toLocaleLowerCase());
        });
        return !filteredProducts.length ?
        <h1>Loading</h1> :
        ( 
            <div style= {{backgroundColor: "#1ABC56", paddingBottom: "10px"}}>
                <Jumbotron style={{backgroundColor: "#F9F8F9", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", borderTopLeftRadius: "0rem", borderTopRightRadius: "0rem", borderBottomRightRadius: "5rem", borderBottomLeftRadius: "5rem"}}>
                    <h1 className="text-main-brand text-center font-weight-bold display-2"> Marketplace</h1>
                    <div style= {{display: "flex", flexDirection:"row", justifyContent: "center", alignContent: "center"}}>
                        <p style= {{paddingTop:"13px"}}>Search Products:</p><SearchBox searchChange={this.onSearchChange}/>
                    </div>
                </Jumbotron>
                <Container className="text-center">
                    <ProductList products = {filteredProducts}/>
                </Container>
            </div>
        );
    }
}

export default Marketplace;
