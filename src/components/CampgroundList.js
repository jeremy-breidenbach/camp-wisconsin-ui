import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class CampgroundList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            campgrounds: []
        }
    }

    componentWillMount() {
        this.fetchCampgrounds();
    }

    fetchCampgrounds = () => {
        axios.get('http://camp-wisconsin.test/api/campgrounds')
        .then(response => this.setState({
                isLoading: false,
                campgrounds: response.data
            }))
        .catch(function(error) {
            console.log(error);
        });
    }

    render() {
        if(this.state.isLoading) {
            return (
                <div>
                    <h1>Campgrounds</h1>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="2">
                                    <i className="fas fa-circle-notch fa-spin"></i>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            );
        }

        return (
            <div>
                <h1>Campgrounds</h1>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.campgrounds.map(campground =>
                            <tr key={campground.id}>
                                <td><Link to={{
                                        pathname: '/campgrounds/'+campground.id,
                                        state: {campground: campground}
                                    }}>{campground.facilityName}</Link>
                                </td>
                                <td>{campground.description}</td>
                            </tr>)}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default CampgroundList;
