import { Button, Carousel } from 'antd';
import React, { useEffect, useState } from 'react';
import baner_1 from '../../assest/hero-1.jpg'
import baner_2 from '../../assest/hero-2.jpg'
import './Home.scss'
import Products from './Products';
import { ButtonGroup } from 'react-bootstrap';
import { getCategory } from '../../services/ApiService';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [categories, setCategories] = useState('')
    const [filterCategory, setFilterCategory] = useState('')
    const navigate = useNavigate();
    useEffect(() => {
        getCategories();
    }, [])
    const getCategories = async () => {
        let res = await getCategory();
        if (res && res.data) {
            setCategories(res.data)
        }
    }
    const handleFilterCategory = (category) => {
        setFilterCategory(category);
    }

    return (
        <div>
            <Carousel autoplay>
                <div className='carousel mx-5 my-2'>
                    <div><img style={{ width: '95%' }} src={baner_1} /></div>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-5 col-lg-7 col-md-8">
                                <div className="hero__text">
                                    <h6>Summer Collection</h6>
                                    <h2>Fall - Winter Collections 2024</h2>
                                    <p>A specialist label creating luxury essentials. Ethically crafted with an unwavering</p>
                                    <p>commitment to exceptional quality.</p>
                                    <Button onClick={() => navigate('/products')} className="btn btn-primary">Shop now </Button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='carousel mx-5 my-2'>
                    <div> <img style={{ width: '95%' }} src={baner_2} /></div>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-5 col-lg-7 col-md-8">
                                <div className="hero__text">
                                    <h6>Summer Collection</h6>
                                    <h2>Fall - Winter Collections 2024</h2>
                                    <p>A specialist label creating luxury essentials. Ethically crafted with an unwavering</p>
                                    <p>commitment to exceptional quality.</p>
                                    <Button onClick={() => navigate('/products')} className="btn btn-primary">Shop now </Button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Carousel >

            <div className='container my-5 py-5'>
                <div className='row'>
                    <div className='col-12 mb-5'>
                        <h1 className='display-6 fw-bolder text-center'>Latest Products</h1>
                        <hr />
                    </div>
                </div>
                <div className='d-flex justify-content-center'>
                    <ButtonGroup className='row'>
                        {
                            categories && categories.length > 0 && categories.map((c, index) =>
                                <button key={index} onClick={() => handleFilterCategory(c)} className='col-md-2 btn btn-outline-dark mx-2'>{c.toUpperCase()}</button>
                            )
                        }

                    </ButtonGroup>
                </div>
                <div className='my-3'>
                    <Products
                        filterCategory={filterCategory}
                    />
                </div>
            </div>
        </div >
    );
};

export default HomePage;