import React, { useState } from 'react';
import { GrFormNext } from "react-icons/gr";
import { NavLink } from 'react-router-dom';
import './Shop.scss'
import Search from 'antd/es/input/Search';
import AllProducts from './AllProducts';
const Shop = () => {
    const [search, setSearch] = useState('');
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
                <div className='row my-3'>
                    <div className='col-md-3'>
                        <Search
                            placeholder="input search text"
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    <div className='col-md-6'>
                    </div>
                    <div className='col-md-3 d-flex'>

                    </div>
                </div>
                <div className='products'>
                    <AllProducts
                        search={search}
                    />
                </div>
            </div>
        </div>
    );
};

export default Shop;