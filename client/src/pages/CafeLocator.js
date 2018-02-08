import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GoogleMapReact from 'google-map-react';
import { Link } from 'react-router-dom';
import { Grid, Col, Row, Panel, FormControl,
         FormGroup, Checkbox, ControlLabel } from 'react-bootstrap';

// const AnyReactComponent = ({ text }) => <div>{ text }</div>;

// class CafeLocator extends Component {

//   static defaultProps = {
//     center: { lat: 40.7446790, lng: -73.9485420 },
//     zoom: 10
//   };

//   render() {

//     let mapStyle = {
//       margin: "50px",
//       width: "300px",
//       height: "300px"
//     };

//     return (
//      <div className='google-map' style={mapStyle}>
//      <GoogleMapReact defaultCenter={ this.props.center } defaultZoom={ this.props.zoom }>
//        <AnyReactComponent lat={40.7446790} lng={-73.9485420} text={'Where\'s Waldo?'} />
//      </GoogleMapReact>
//      </div>
//     )
//   }
// }


import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

class CafeLocator extends React.Component {

  constructor(props: Props) {
    super(props);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 1.5
    };
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom
    });

    map.on('move', () => {
      const { lng, lat } = map.getCenter();

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
  }

  render() {
    const { lng, lat, zoom } = this.state;

        let mapStyle = {
      margin: "50px",
      width: "300px",
      height: "300px"
    };

    return (
      <div>
        <div className="mapboxmap" >
          <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
        </div>
        <div ref={el => this.mapContainer = el} className="" />
      </div>
    );
  }
}

export default CafeLocator;