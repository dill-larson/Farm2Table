import React, { Component } from 'react';
import { Button, Form, Jumbotron, } from 'react-bootstrap';
import { createProduct } from '../services/product.service';

export default class ProductCreate extends Component {
    constructor(props) {
        super();
        this.state = {
            product: { //Firestore product document
                name: '',
                quantity: '',
                description: '',
                price: '',
                expirationDate: null,
                updateDate: null,
                categories: '',
                tags: ''
            }
        };
        this.createProduct = this.createProduct.bind(this);
    }
    
    componentDidMount() {
        
    }

    createProduct() {
        let currentDate = new Date();
        let tempProduct = this.state.product;
        tempProduct.updateDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
        tempProduct.categories = this.state.product.categories.split(",");
        tempProduct.tags = this.state.product.tags.split(",");
        this.setState({product: tempProduct});
        createProduct(this.props.farm, this.state.product)
            .then(() => {
                console.log("Created product data");
            })
            .catch(error => {
                console.log(error);
            })
    }
    
    render() {
        return(
            <Jumbotron style={{backgroundColor: "#F9F8F9", borderRadius: "3rem"}}>
                <h4 className="mt-n4 text-center text-light-accent">Create Product</h4>
                <Form className="mb-n4" onSubmit={(e) => {e.preventDefault(); this.createProduct();}}>
                    <Form.Group controlId="formProductName">
                        <Form.Label className="text-light-accent">Product Name</Form.Label>
                        <Form.Control 
                            type="text"
                            placeholder="Produt Name"
                            value={this.state.product.name}
                            onChange={e => {
                                var tempProd = this.state.product;
                                tempProd.name = e.target.value; 
                                this.setState({ product: tempProd });
                            }}
                            className="border-0" 
                        />
                    </Form.Group>
                    <Form.Group controlId="formQuantity">
                        <Form.Label className="text-light-accent">Quantity</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Quantity"
                            value={this.state.product.quantity}
                            onChange={e => {
                                var tempProd = this.state.product;
                                tempProd.quantity = e.target.value; 
                                this.setState({ product: tempProd });
                            }}
                            className="border-0"
                        />
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label className="text-light-accent">Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Description"
                            value={this.state.product.description}
                            onChange={e => {
                                var tempProd = this.state.product;
                                tempProd.description = e.target.value; 
                                this.setState({ product: tempProd });
                            }}
                            className="border-0"
                        />
                    </Form.Group>
                    <Form.Group controlId="formPrice">
                        <Form.Label className="text-light-accent">Price</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Price"
                            value={this.state.product.price}
                            onChange={e => {
                                var tempProd = this.state.product;
                                tempProd.price = e.target.value; 
                                this.setState({ product: tempProd });
                            }}
                            className="border-0"
                        />
                    </Form.Group>
                    <Form.Group controlId="formExpirationDate">
                        <Form.Label className="text-light-accent mb-0">Expiration Date</Form.Label>
                        <Form.Text className="text-muted font-italic mt-0 mb-2">Leave blank if product does not expire.</Form.Text>
                        <Form.Control
                            type="date"
                            placeholder="Expiration Date"
                            value={this.state.product.expirationDate}
                            onChange={e => {
                                var tempProd = this.state.product;
                                tempProd.expirationDate = e.target.value; 
                                this.setState({ product: tempProd });
                            }}
                            className="border-0"
                        />
                    </Form.Group>
                    <Form.Group controlId="formCategories">
                        <Form.Label className="text-light-accent mb-0">Categories</Form.Label>
                        <Form.Text className="text-muted font-italic mt-0 mb-2">Ex: fruit, poltry, produce (separate categories with comma)</Form.Text>
                        <Form.Control
                            type="text"
                            placeholder="Categories"
                            value={this.state.product.categories}
                            onChange={e => {
                                var tempProd = this.state.product;
                                tempProd.categories = e.target.value; 
                                this.setState({ product: tempProd });
                            }}
                            className="border-0"
                        />
                    </Form.Group>
                    <Form.Group controlId="formTags">
                        <Form.Label className="text-light-accent mb-0">Tags</Form.Label>
                        <Form.Text className="text-muted font-italic mt-0 mb-2">Ex: organic, non-gmo (separate tags with comma)</Form.Text>
                        <Form.Control
                            type="text"
                            placeholder="Tags"
                            value={this.state.product.tags}
                            onChange={e => {
                                var tempProd = this.state.product;
                                tempProd.tags = e.target.value; 
                                this.setState({ product: tempProd });
                            }}
                            className="border-0"
                        />
                    </Form.Group>
                    <Button className="text-white" variant="main-brand" type="submit" style={{width: "100%"}}>Add Product</Button>
                </Form>
            </Jumbotron>
        );
    }   
}