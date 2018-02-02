import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-map'
import { Link } from 'react-router-dom';
import { Grid, Col, Row, Panel, FormControl,
         FormGroup, Checkbox, ControlLabel } from 'react-bootstrap';




const AnyReactComponent = ({ text }) => <div>{ text }</div>;
export default class cafeLocator extends Component {
  static defaultProps = {
    center: { lat: 40.7446790, lng: -73.9485420 },
    zoom: 11
  }
render() {
    return (
      <div className='google-map'>
        <GoogleMapReact
          defaultCenter={ this.props.center }
          defaultZoom={ this.props.zoom }>
          <AnyReactComponent
            lat={ 40.7473310 }
            lng={ -73.8517440 }
            text={ 'Where\'s Waldo?' }
          />
        </GoogleMapReact>
      </div>
    )
  }
}
