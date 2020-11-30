import React, { Component } from 'react';
import { Button, Container, Form, Jumbotron, } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getProductByID, updateProduct, deleteProduct } from '../services/product.service';

class ProductProfile extends Component {
    constructor(props) {
        super();
        this.state = {
            product: { //Firestore product document
                id: '',
                name: '',
                quantity: '',
                description: '',
                price: '',
                expirationDate: null,
                updateDate: null,
                categories: [],
                tags: [],
                address: ''
            }
        };
        this.updateProduct = this.updateProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
    }
    
    componentDidMount() {
        if(this.props?.id) {
            getProductByID(this.props.farmid, this.props.id)
            .then(data => {
                this.setState({product: data});
            });
        }
    }

    updateProduct() {
        let currentDate = new Date();
        let tempProduct = this.state.product;
        tempProduct.updateDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
        this.setState({product: tempProduct});
        updateProduct(this.props.farmid, this.state.product)
            .then(() => {
                console.log("Update product data");
            })
            .catch(error => {
                console.log(error);
            })
    }
    
    deleteProduct() {
        deleteProduct(this.props.farmid, this.state.product)
            .then(() => {
                console.log("Delete product data");
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        if(!this.state.product && this.props?.id) {
            return <h3>Loading...</h3>;
        } else {
            return(
                <div style= {{backgroundColor: "#1ABC56", paddingBottom: "10px"}}>
                    <Jumbotron style={{ backgroundColor: "#F9F8F9", borderBottomRightRadius: "5rem", borderBottomLeftRadius: "5rem", borderTopLeftRadius: "0rem", borderTopRightRadius: "0rem"}}>
                        <h1 className=" text-center text-main-brand font-weight-bold display-2">Manage Product</h1>
                    </Jumbotron>
                    <Container>
                        <Jumbotron style={{backgroundColor: "#F9F8F9", borderRadius: "3rem"}}>
                            <Form className="mt-n4" onSubmit={(e) => {e.preventDefault(); this.updateProduct();}}>
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
                                <Button className="text-white" variant="dark-shade" type="submit" style={{width: "100%"}}>Update Product</Button>
                            </Form>
                            <Form className="mt-3 mb-n4" onSubmit={(e) => {e.preventDefault(); this.deleteProduct();}}>
                                <Button className="text-white" variant="danger" type="submit" style={{width: "100%"}}>Delete Product</Button>
                            </Form>
                        </Jumbotron>
                    </Container>
                </div>
            );
        }
    }   
}

export default function ProductProfileSecurity() {
    return <ProductProfile farmid={useParams().id} id={useParams().productid}/>;
}