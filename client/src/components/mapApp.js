import React, { Component } from 'react';
import GoogleMap from './google_map';


export default class mapApp extends Component {
    constructor(props) {
        super(props);

        this.state = { lat: -34.397, lng: 150.64 };
    }
}

    render() {
        return (
            <div style = {{height: '100%'}}>
                map me!
                <button onClick={()} => this.setState({ lat: 40.7128, lng: -74.005}) >
                    New York
                </button>
                <GoogleMap lat={this.state.lat} lng={this.state.lng}/>
            </div>
            );
    }
}