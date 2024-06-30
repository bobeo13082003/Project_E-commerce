import React from 'react';
import logo from '../../assest/_fb80661f-f791-4b4b-9cf6-3479759cb267.jpg'
import { NavLink } from 'react-router-dom';
const Footer = () => {
    return (
        <div>
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="footer__about">
                                <div className="footer__logo">
                                    <NavLink to='/' ><img style={{ width: 100, borderRadius: 24 }} src={logo} alt="Logo" /></NavLink>
                                </div>
                                <p>The customer is at the heart of our unique business model, which includes design.</p>
                            </div>
                        </div>
                        <div className="col-lg-2 offset-lg-1 col-md-3 col-sm-6">
                            <div className="footer__widget">
                                <h6>Shopping</h6>
                                <ul>
                                    <li>Clothing Store</li>
                                    <li>Trending Shoes</li>
                                    <li>Accessories</li>
                                    <li>Sale</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-6">
                            <div className="footer__widget">
                                <h6>Shopping</h6>
                                <ul>
                                    <li>Contact Us</li>
                                    <li>Payment Methods</li>
                                    <li>Delivery</li>
                                    <li>Return &amp; Exchanges</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="footer__copyright__text">
                                <p>Copyright © 2024 All rights reserved | This template is made with love</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

        </div>

    );
};

export default Footer;