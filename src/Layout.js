
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/home/HomePage';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Shop from './components/shop/Shop';
import DetailProduct from './components/DetailProduct';
import Cart from './components/cart/Cart';
import Login from './components/auths/Login';

const Layout = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path='/products' element={<Shop />} />
                    <Route path='/detail/:id' element={<DetailProduct />} />
                    <Route path='/cart' element={<Cart />} />

                </Route>
                <Route path='/login' element={<Login />} />

            </Routes>



            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
};

export default Layout;