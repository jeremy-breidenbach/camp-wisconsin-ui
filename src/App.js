import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import logo from './logo.svg';
import NavbarInstance from './components/Navbar.js';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import CampgroundList from './components/CampgroundList';
import CampgroundDetail from './components/CampgroundDetail';

class App extends Component {
    componentDidMount() {
        document.title = 'Camp Wisconsin';
    }

    render() {
        return (
            <div>
                <NavbarInstance />
                <Grid>
                    <Route exact path="/" component={ Home } />
                    <Route path="/about" component={ About } />
                    <Route path="/campgrounds/:id" component={ CampgroundDetail }/>
                    <Route exact path="/campgrounds" component={ CampgroundList } />

                </Grid>
            </div>
        );
    }
}

export default App;
