import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../assest/_fb80661f-f791-4b4b-9cf6-3479759cb267.jpg'
import { CgProfile } from "react-icons/cg";
import { ImExit } from "react-icons/im";
import { NavLink } from 'react-router-dom';
const Header = () => {
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
                            <NavLink className='nav-link' to='/products'>Card</NavLink>

                        </Nav>
                        <Nav>
                            <NavDropdown title="Setting" id="basic-nav-dropdown">
                                <NavDropdown.Item><NavLink className='nav-link'><CgProfile className='mb-1' /> Profile</NavLink></NavDropdown.Item>
                                <NavDropdown.Item>
                                    Login
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item>
                                    <NavLink className='nav-link'><ImExit /> Logout</NavLink>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Nav>
            </Navbar>
        </div>
    );
};

export default Header;