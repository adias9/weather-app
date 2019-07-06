import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDependentScript from "react-dependent-script";
import axios from 'axios';

import  Chartkick, { LineChart } from 'react-chartkick';
import Highcharts from 'highcharts';

Chartkick.use(Highcharts);

class WeatherGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            temps: {},
            hums: {},
            press: {}
        }
    }

    componentDidMount() {
        this.fetchWeatherData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.lat !== this.props.lat) {
            this.fetchWeatherData();
        }
   }

    fetchWeatherData() {
        const lat = this.props.lat,
        lon = this.props.lon;

        console.log("hey");
        if (lat !== "" && lon !== "") {
            console.log("huh");
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

                console.log(tempObj);
                console.log(humObj);
                console.log(presObj);
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
        return (
            <div>
                Weather Graphs for <b>{this.props.addr}</b>
                <LineChart data={this.state.temps} min={null} max={null} ytitle="Temperature (F)" label="F" />
                <LineChart data={this.state.hums} min={null} max={null} ytitle="Humidity (%)" label="%" />
                <LineChart data={this.state.press} min={null} max={null} ytitle="Pressure (hPA)" label="hPA" />
            </div>
        );
    }
}

WeatherGraph.propTypes = {
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
    addr: PropTypes.string
}

export default WeatherGraph;
