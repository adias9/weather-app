import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { LineChart } from 'react-chartkick';
import 'chart.js';

class WeatherGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            temps: {},
            hums: {},
            press: {}
        }
        this.fetchWeatherData(props.lat, props.lon);
    }

    fetchWeatherData(lat, lon) {
        if (lat !== "" && lon !== "") {
            axios.get(process.env.REACT_APP_WEATHER_API_URL, {
                params: {
                    lat: lat,
                    lon: lon,
                    APPID: process.env.REACT_APP_WEATHER_API_KEY
                }
            })
            .then(res => {
                let tempObj = {},
                humObj = {},
                presObj = {};
                res.data.list.slice(0, 12).map((hour) => {
                    const time = hour.dt_txt,
                    temp = hour.main.temp,
                    fTemp = (9/5)*(temp - 273) + 32,

                    hum = hour.main.humidity,
                    pres = hour.main.pressure;

                    humObj[time] = hum;
                    presObj[time] = pres;
                    return tempObj[time] = fTemp;
                })

                this.setState({
                    temps: tempObj,
                    hums: humObj,
                    press: presObj
                });
            })
            .catch(error => console.error('Error', error));
        }
    }

    render() {
        console.log(this.props.lat);
        console.log(this.props.lon);
        return (
            <div>
                Weather Graphs
                <LineChart data={this.state.temps} min={null} max={null} ytitle="Temperature (F)" label="F" />
                <LineChart data={this.state.hums} min={null} max={null} ytitle="Humidity (%)" label="%" />
                <LineChart data={this.state.press} min={null} max={null} ytitle="Pressure (hPA)" label="hPA" />
            </div>
        );
    }
}

WeatherGraph.propTypes = {
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired
}

export default WeatherGraph;
