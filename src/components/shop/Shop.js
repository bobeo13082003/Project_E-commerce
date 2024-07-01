import React from 'react';
import { GrFormNext } from "react-icons/gr";
import { NavLink } from 'react-router-dom';
import './Shop.scss'
import Search from 'antd/es/input/Search';
const Shop = () => {
    return (
        <div>
            <div className='shop-header p-5 my-3' style={{ backgroundColor: '#F2F2EE' }}>
                <div className='container'>
                    <h3>SHOP</h3>
                    <div className='d-flex'>
                        <NavLink className='nav-link' to='/'>Home</NavLink>
                        <GrFormNext className='mt-1 mx-1' />
                        <NavLink className='disabled-link nav-link' >Shop</NavLink>
                    </div>
                </div>
            </div>
            <div className='shop-body container'>
                <div className='row'>
                    <div className='col-md-3'>
                        <Search
                            placeholder="input search text"
                            style={{
                                width: 200,
                            }}
                        />
                    </div>
                    <div className='col-md-6'>
                        <p>Showing 1–12 of 126 results</p>
                    </div>
                    <div className='col-md-3'>
                        <p>Sort by Price:</p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;