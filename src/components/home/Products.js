import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { getAllProducts, getProductByCategories, getlimitProduct } from '../../services/ApiService';
import { GrLinkNext } from "react-icons/gr";
import '../Pagging.scss'
import { NavLink } from 'react-router-dom';
const Products = (props) => {
    const [products, setProducts] = useState([]);
    const { filterCategory } = props;



    useEffect(() => {
        if (filterCategory) {
            fetchProductsByCategory();
        } else {
            fetchLimitedProducts();
        }
    }, [filterCategory]);

    const fetchLimitedProducts = async () => {
        let res = await getlimitProduct();
        if (res && res.data) {
            setProducts(res.data);
        }
    }

    const fetchProductsByCategory = async () => {
        let res = await getProductByCategories(filterCategory);
        if (res && res.data) {
            setProducts(res.data);
        }
    }
    return (
        <Container>
            <Row>
                {products.map((product, index) => (
                    <Col key={index} sm={4}>
                        <Card style={{ width: '19rem' }} className='my-3'>
                            <Card.Img height={'250px'} variant="top" src={product.image} />
                            <Card.Body>
                                <Card.Title>{product.title}</Card.Title>
                                <Card.Text>
                                    <p className='fw-bolder' style={{ color: '#E6BF6A' }}>{product.price} $</p>
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <div className='text-center my-3'>
                <NavLink to='/products' style={{ borderRadius: 25 }} className='btn btn-outline-dark px-4 py-3'>View all <GrLinkNext className='mx-1' /></NavLink>
            </div>

        </Container>
    );
};

export default Products;