import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GoogleMapReact from 'google-map-react';
import { Link } from 'react-router-dom';
import { Grid, Col, Row, Panel, FormControl,
         FormGroup, Checkbox, ControlLabel } from 'react-bootstrap';

const AnyReactComponent = ({ text }) => <div>{ text }</div>;

class CafeLocator extends Component {

  static defaultProps = {
    center: { lat: 40.7446790, lng: -73.9485420 },
    zoom: 10
  };

  render() {

    let mapStyle = {
      margin: "50px",
      width: "300px",
      height: "300px"
    };

    return (
     <div className='google-map' style={mapStyle}>
     <GoogleMapReact defaultCenter={ this.props.center } defaultZoom={ this.props.zoom }>
       <AnyReactComponent lat={40.7446790} lng={-73.9485420} text={'Where\'s Waldo?'} />
     </GoogleMapReact>
     </div>
    )
  }
}

export default CafeLocator;