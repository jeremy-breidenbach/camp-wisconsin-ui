import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class NavbarInstance extends Component {

    render() {
        return (
                <Navbar inverse staticTop>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/">Camp Wisconsin</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>

                        <Nav>
                            <LinkContainer exact to="/">
                                <NavItem>Home</NavItem>
                            </LinkContainer>
                            <LinkContainer to="/about">
                                <NavItem href="/about">About</NavItem>
                            </LinkContainer>
                            <NavDropdown title="Campgrounds" id="basic-nav-dropdown">
                                <MenuItem href="/campgrounds">List</MenuItem>
                                <MenuItem href="/campground-map">Map</MenuItem>
                            </NavDropdown>
                        </Nav>
                        <Nav pullRight>
                            <NavItem href="#">Link Right</NavItem>
                            <NavItem href="#">Link Right</NavItem>
                        </Nav>
                </Navbar>
        );
    }
}

export default NavbarInstance;
