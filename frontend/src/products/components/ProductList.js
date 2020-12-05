import React from 'react';
import Container from 'react-bootstrap/Container';
import ProductItem from './ProductItem';
import { Col, Row, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductList = (props) => {

    if (props.items.length === 0) {
        return <Container className="p-3">
            <h2>No products found, create new one</h2>
            <Button>Add Product</Button>
        </Container>
    }

    const addNewProduct = () => {

    }

    return <Container>
        <Col>
            <Row><Col><h1>Product list</h1></Col> <Col></Col>
                <Col><Link to="/products/new"><Button variant="dark" onClick={addNewProduct} style={{ marginTop: '10px' }}>Add new Product</Button></Link>
                </Col>
            </Row>
            <Row>
                <Table striped bordered hover variant="light">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Creator</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.items.map(prop =>
                            <ProductItem
                                key={prop.id}
                                id={prop.id}
                                title={prop.title}
                                description={prop.description}
                                price={prop.price}
                                creatorId={prop.creator}
                                status={prop.status} />)}
                    </tbody>
                </Table>
            </Row>
        </Col>
    </Container>

};

export default ProductList;