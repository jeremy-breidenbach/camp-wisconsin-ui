import React, { Component } from 'react';
import axios from 'axios';
import { Accordion, Button, Col, ListGroup, ListGroupItem, Panel, Row, Table } from 'react-bootstrap';

class CampgroundDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            campground: this.props.location.state.campground,
            mapUrl: '',
            campsites: [],
            amenities: [],
            amenitiesWithinFacility: [],
            amenitiesGreaterThan1Mile: [],
            amenitiesWithin10Miles: []
        };
    }

    componentWillMount() {
        // this.fetchCampground();
        this.fetchCampsites();
        this.setState({
            amenitiesWithinFacility: this.filterAmenities(this.props.location.state.campground.amenities, "Within Facility"),
            amenitiesGreaterThan1Mile: this.filterAmenities(this.props.location.state.campground.amenities, "Greater Than 1 Mile"),
            amenitiesWithin10Miles: this.filterAmenities(this.props.location.state.campground.amenities, "Within 10 Miles"),
            mapUrl: this.setMapUrl(this.state.campground)
        });
        
        // console.log(this.props.location);
    }

    componentDidMount() {

    }

    setMapUrl(data) {
        let mapUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(data.facilityName + "," + data.address + "," + data.city + "," + data.state);

        return mapUrl;
    }

    filterAmenities(amenities, filterDistance) {
        let filteredAmenities = JSON.parse(amenities).filter(amenity => amenity.distance === filterDistance);

        return filteredAmenities;
    }

    fetchCampground() {
        axios.get(`http://camp-wisconsin.test/api/campgrounds/${this.props.match.params.id}`)
            .then(response => this.setState({
                    campground: response.data,
                    isLoading: false,
                    mapUrl: this.setMapUrl(response.data),
                    amenities: JSON.parse(response.data.amenities),
                    amenitiesWithinFacility: this.filterAmenities(response.data.amenities, "Within Facility"),
                    amenitiesGreaterThan1Mile: this.filterAmenities(response.data.amenities, "Greater Than 1 Mile"),
                    amenitiesWithin10Miles: this.filterAmenities(response.data.amenities, "Within 10 Miles")
                }))
            .catch(error => console.log(error));
    }

    fetchCampsites() {
        axios.get(`http://camp-wisconsin.test/api/campsites/${this.props.match.params.id}`)
            .then(response => this.setState({
                    campsites: response.data,
                    isLoading: false
                }))
            .catch(error => console.log(error));
    }

    render() {
        return(
            <div>
            <Row>
                <Col md={12}>
                    <h1>{this.state.campground.facilityName}</h1>
                    <p>{this.state.campground.description}</p>
                    <Button bsStyle="primary" href={this.state.campground.reservationUrl} target="_blank">Reserve Now</Button>
                    <h2>Address</h2>
                    <address>
                        {this.state.campground.address}<br />
                        {this.state.campground.city}, {this.state.campground.state} {this.state.campground.zip}
                    </address>
                    <h3>How to get here</h3>
                    <p>{this.state.campground.drivingDirection}</p>
                    <a href={this.state.mapUrl} target="_blank">Map</a>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Table bordered>
                        <tbody>
                            <tr>
                                <th>Pets Allowed?</th>
                                <td>{ this.state.campground.sitesWithPetsAllowed }</td>
                            </tr>
                            <tr>
                                <th>Sites with Electrical?</th>
                                <td>{ this.state.campground.sitesWithAmps }</td>
                            </tr>
                            <tr>
                                <th>Sites with Sewer Hookup?</th>
                                <td>{ this.state.campground.sitesWithSewerHookup }</td>
                            </tr>
                            <tr>
                                <th>Sites with Water Hookup?</th>
                                <td>{ this.state.campground.sitesWithWaterHookup }</td>
                            </tr>
                        </tbody>
                    </Table>
                    <h3>Amenities</h3>
                    <Accordion>
                        <Panel header="Within Facility" eventKey="1">
                            <ListGroup fill>
                                {this.state.amenitiesWithinFacility.map((amenityWithinFacility, index) => <ListGroupItem key={index}>{amenityWithinFacility.name}</ListGroupItem>)}
                            </ListGroup>
                        </Panel>
                        {this.state.amenitiesGreaterThan1Mile.length > 0 &&
                            <Panel header="Greater than 1 Mile" eventKey="2">
                                <ListGroup fill>
                                    {this.state.amenitiesGreaterThan1Mile.map((amenityGreaterThan1Mile, index) => <ListGroupItem key={index}>{amenityGreaterThan1Mile.name}</ListGroupItem>)}
                                </ListGroup>
                            </Panel>
                        }
                        {this.state.amenitiesWithin10Miles.length > 0 &&
                            <Panel header="Within 10 Miles" eventKey="3">
                                <ListGroup fill>
                                    {this.state.amenitiesWithin10Miles.map((amenity, index) => <ListGroupItem key={index}>{amenity.name}</ListGroupItem>)}
                                </ListGroup>
                            </Panel>
                        }
                    </Accordion>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <h2>Campsites</h2>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>Site</th>
                                <th>Loop</th>
                                <th>Site Type</th>
                                <th>Max People</th>
                                <th>Max Equipment Length</th>
                                <th>Pets Allowed</th>
                                <th>Sewer Hookup</th>
                                <th>Water Hookup</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.campsites.map((campsite, index) => <tr key={campsite.id}>
                                <td>{campsite.site}</td>
                                <td>{campsite.loop}</td>
                                <td>{campsite.siteType}</td>
                                <td>{campsite.maxPeople}</td>
                                <td>{campsite.maxEquipmentLength}</td>
                                <td>{campsite.petsAllowed}</td>
                                <td>{campsite.sewerHookup}</td>
                                <td>{campsite.waterHookup}</td>
                            </tr>)}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            </div>
        );
    }
}

export default CampgroundDetail;
