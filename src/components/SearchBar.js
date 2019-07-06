import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDependentScript from "react-dependent-script";
import {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import PlacesAutocomplete from 'react-places-autocomplete';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: "",
            lat: "",
            lon: ""
        }
        this.handleAddrChange = this.handleAddrChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleLatLongChange(e) {
        const name = e.target.name,
        val = e.target.value;

        switch (name) {
            case 'lat':
                this.setState({
                    lat: val
                });
                break;
            case 'lon':
                this.setState({
                    lon: val
                });
                break;
            default:
        }
    }

    handleAddrChange(address) {
        this.setState({ address });
    };

    handleSelect(address) {
        this.setState({ address });

        geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latLng => {
            this.setState({
                lat: latLng.lat,
                lon: latLng.lng
            });
        })
        .catch(error => console.error('Error', error));
    };

    render() {
        return (
            <Form onSubmit={e => {
                    e.preventDefault();
                    this.props.submitHandler(
                        this.state.lat,
                        this.state.lon,
                        this.state.address);
                }}>
                <FormGroup>
                  <Label>Place</Label>
                  <ReactDependentScript
                      scripts={[
                          `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`
                      ]}>
                      <PlacesAutocomplete
                          value={this.state.address}
                          onChange={this.handleAddrChange}
                          onSelect={this.handleSelect}>
                          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                              <input
                                {...getInputProps({
                                  placeholder: 'Places...',
                                  className: 'location-search-input',
                                })}
                              />
                              <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map(suggestion => {
                                  const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                  // inline style for demonstration purpose
                                  const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                  return (
                                    <div
                                      {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                      })}
                                    >
                                      <span>{suggestion.description}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                      </PlacesAutocomplete>
                  </ReactDependentScript>
                  <FormText color="muted">
                      Search for US cities by name or zip code
                  </FormText>
                </FormGroup>
                <FormGroup>
                    <Label for="lat">Latitude</Label>
                    <Input type="number" name="lat" id="lat" placeholder="Latitude" value={this.state.lat} onChange={(e)=>this.handleLatLongChange(e)} />
                </FormGroup>
                <FormGroup>
                    <Label for="lon">Longitude</Label>
                    <Input type="number" name="lon" id="lon" placeholder="Longitude" value={this.state.lon} onChange={(e)=>this.handleLatLongChange(e)} />
                </FormGroup>
                <Button color="primary">Search</Button>
            </Form>
        );
    }
}

SearchBar.propTypes = {
    submitHandler: PropTypes.func.isRequired
}

export default SearchBar;
