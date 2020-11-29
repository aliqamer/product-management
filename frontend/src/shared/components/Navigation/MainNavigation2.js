import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import MainHeader from './MainHeader';
import './MainNavigation.css';

import { Nav, Navbar, NavDropdown, Form, Button, FormControl } from 'react-bootstrap';
import { AuthContext } from '../../context/auth-context';


const MainNavigation2 = props => {
    const auth = useContext(AuthContext);

    return (
        <MainHeader>

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <a className="navbar-brand" href="#">Hidden brand</a>
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        {auth.isLoggedIn && <li className="nav-item">
                            <NavLink to="/" exact>Home</NavLink>
                        </li>}
                        {auth.isLoggedIn && <li className="nav-item">
                            <NavLink className="nav-link" to="/products" exact>Products</NavLink>
                        </li>}
                        {auth.isLoggedIn && <li className="nav-item">
                            <NavLink to="/products/new" exact>Add Product</NavLink>
                        </li>}
                        {!auth.isLoggedIn && <li className="nav-item">
                            <NavLink className="nav-link" to="/login" exact>Login</NavLink>
                        </li>}
                        {auth.isLoggedIn && <li className="nav-item">
                            <NavLink to="/login" exact>Logout</NavLink>
                        </li>}

                    </ul>

                    {/* <ul>
                        {auth.isLoggedIn && <li>
                            <NavLink to="/" exact>Home</NavLink>
                        </li>}
                        {auth.isLoggedIn && <li>
                            <NavLink to="/products" exact>Products</NavLink>
                        </li>}
                        {auth.isLoggedIn && <li>
                            <NavLink to="/products/new" exact>Add Product</NavLink>
                        </li>}
                        {!auth.isLoggedIn && <li>
                            <NavLink to="/login" exact>Login</NavLink>
                        </li>}
                        {auth.isLoggedIn && <li>
                            <NavLink to="/login" exact>Logout</NavLink>
                        </li>}
                    </ul> */}
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        </MainHeader>

    );
};

export default MainNavigation2;