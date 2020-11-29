import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import MainHeader from './MainHeader';
import './MainNavigation.css';

import { Nav, Navbar, NavDropdown, Form, Button, FormControl } from 'react-bootstrap';
import { AuthContext } from '../../context/auth-context';


const MainNavigation = props => {
    const auth = useContext(AuthContext);

    const logout = () => {
        auth.logout();
    }

    return (
        <MainHeader>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home">Product Management</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        {auth.isLoggedIn && <Nav.Link as={Link} to="/">Home</Nav.Link>}
                        {auth.isLoggedIn && <Nav.Link as={Link} to="/products">Products</Nav.Link>}
                        {/* {auth.isLoggedIn && <Nav.Link as={Link} to="/products/new">Add Product</Nav.Link>} */}
                        {/* {auth.isLoggedIn && <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item as={Link} to="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>} */}
                        {auth.isLoggedIn && <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-info">Search</Button>
                        </Form>}
                        {!auth.isLoggedIn && <Nav.Link className="ml-auto" as={Link} to="/login">Login</Nav.Link>}
                        {auth.isLoggedIn && <Nav.Link onClick={logout} as={Link} to="/login">Logout</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </MainHeader>
    );
};

export default MainNavigation;