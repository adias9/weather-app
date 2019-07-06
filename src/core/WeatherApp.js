import React, {Component} from 'react';
import { Container } from 'reactstrap';
import { geolocated } from 'react-geolocated';

import SearchBar from '../components/SearchBar.js';
import WeatherGraph from './WeatherGraph.js';

class WeatherApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: "",
            lon: "",
            addr: ""
        }
    }

    searchHandler(lat,lon,addr) {
        this.setState({
            lat: lat,
            lon: lon,
            addr: addr
        });
    }

    render() {
        return (
            <Container className="weather-app-container">
                <SearchBar submitHandler={(lat,lon,addr) => this.searchHandler(lat,lon,addr)} />
                <br/>
                { (this.state.lat !== "" && this.state.lon !== "")
                    ? <WeatherGraph
                        lat={this.state.lat}
                        lon={this.state.lon}
                        addr={this.state.addr} />
                    : this.props.coords
                        ? <WeatherGraph
                            lat={this.props.coords.latitude}
                            lon={this.props.coords.longitude}
                            addr={this.state.addr}/>
                        : <div>Please search for a location for Weather Data</div>
                }
            </Container>
        );
    }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(WeatherApp);
