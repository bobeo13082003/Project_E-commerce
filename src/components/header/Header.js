import React, { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../assest/_fb80661f-f791-4b4b-9cf6-3479759cb267.jpg'
import { CgProfile } from "react-icons/cg";
import { ImExit } from "react-icons/im";
import { NavLink } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { doLogout } from '../../redux/action/userAction';
import { toast } from 'react-toastify';
const Header = () => {


    const dispatch = useDispatch()
    const isAuthenticated = useSelector(state => state.userReducer.isAuthenticated)
    const handleLogout = () => {
        dispatch(doLogout())
        toast.success('LOGOUT SUCCESSFULLY')
    }



    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Nav className='container'>
                    <Navbar.Brand href="#home"><img style={{ width: 50, borderRadius: 25 }} src={logo} alt='logo' /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink className='nav-link' to='/'>Home</NavLink>
                            <NavLink className='nav-link' to='/products'>Shop</NavLink>
                            <NavLink className='nav-link d-flex' to='/cart'><FaShoppingCart className='mt-1 mx-2' /></NavLink>
                        </Nav>
                        <Nav>
                            <NavDropdown title="Setting" id="basic-nav-dropdown">
                                {
                                    isAuthenticated === false ?
                                        <>
                                            <NavDropdown.Item href='/login'>
                                                Login
                                            </NavDropdown.Item>
                                            <NavDropdown.Item href='/register'>
                                                Register
                                            </NavDropdown.Item>
                                        </>
                                        :
                                        <>
                                            <NavDropdown.Item><NavLink className='nav-link'><CgProfile className='mb-1' /> Profile</NavLink></NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item>
                                                <NavLink onClick={handleLogout} className='nav-link'><ImExit /> Logout</NavLink>
                                            </NavDropdown.Item>
                                        </>
                                }
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Nav>
            </Navbar>
        </div>
    );
};

export default Header;