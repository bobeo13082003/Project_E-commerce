
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/home/HomePage';
import App from './App';

const Layout = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<HomePage />} />
                </Route>
            </Routes>
        </>
    );
};

export default Layout;