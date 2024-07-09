import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { getAllProducts, getProductByCategories, getlimitProduct } from '../../services/ApiService';
import { GrLinkNext } from "react-icons/gr";
import '../Pagging.scss'
import { Link, NavLink } from 'react-router-dom';
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
        let res = await getAllProducts();
        if (res && res.data) {
            setProducts(res.data.slice(0, 6));
        }
    }
    const fetchProductsByCategory = async () => {
        let res = await getAllProducts();
        if (res && res.data) {
            setProducts(res.data.filter((product) => product.category.toLowerCase() === filterCategory.toLowerCase()));
        }
    }
    return (
        <Container>
            <Row>
                {products

                    .map((product) => (
                        <Col key={product.id} sm={4}>
                            <Card style={{ width: '19rem', height: 462 }} className='my-3'>
                                <Card.Img style={{ height: 250 }} variant="top" src={product.image} />
                                <Card.Body>
                                    <Card.Title><Link to={`/detail/${[product.id]}`} className='title'>{product.title}</Link></Card.Title>
                                    <Card.Text>
                                        <p className='fw-bolder' style={{ color: '#E6BF6A' }}>{product.price} $</p>
                                    </Card.Text>

                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
            </Row>
            <div className='d-flex my-3' style={{ justifyContent: 'center' }}>
                <NavLink to='/products' style={{ borderRadius: 25, width: 150 }} className='btn btn-outline-dark px-4 py-3 d-flex'>View all <GrLinkNext className='mx-2 mt-1' /></NavLink>
            </div>

        </Container>
    );
};

export default Products;