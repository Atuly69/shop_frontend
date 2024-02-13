import React, { useState } from 'react';
import './Navbar.css'; // Import CSS for styling
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const links_arr = [
        {
            link: '/',
            label: 'Products'
        },
        {
            link: '/manage_products',
            label: 'Manage products'
        },
        {
            link: '/cart',
            label: 'Cart'
        },
        {
            link: '/orders',
            label: 'Orders'
        },
        {
            link: '/profile',
            label: 'Profile'
        }
    ]

    return (
        <div style={{ width: "100%", borderBottom: "1px solid #c9c9c9",paddingBottom:"10px" }}>
            <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div className="brand">Shop App</div>
                <div className={`navbar-menu ${isOpen ? 'open' : ''}`}>
                    <ul className="nav-links" style={{ display: "flex", alignItems: "center" }}>
                        {
                            links_arr.map((el, index) => {
                                return (
                                    <li key={index} ><Link style={{ color: "#000" }} to={el.link}>{el.label}</Link></li>
                                )
                            })
                        }
                    </ul>
                </div>
                {
                    isOpen &&
                    <div className='resp_nav' style={{
                        position: "absolute",
                        width: "100%",
                        left: '0px',
                        top: "65px",
                        zIndex: "1000",
                        backgroundColor: "#fff",
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
                    }}>
                        <ul className="nav-links" style={{ borderTop: "1px solid #c9c9c9" }}>
                            {
                                links_arr.map((el, index) => {
                                    return (
                                        <li key={index} style={{ borderBottom: "1px solid #c9c9c9", padding: "5px 20px" }}>
                                            <Link
                                                onClick={toggleMenu}
                                                style={{ color: "#000" }} to={el.link}>{el.label}</Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                }

                <div className="hamburger" onClick={toggleMenu}>
                    <div className={`line`}></div>
                    <div className={`line`}></div>
                    <div className={`line`}></div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
