import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GoogleMapReact from 'google-map-react';
import { Link } from 'react-router-dom';
import { Grid, Col, Row, Panel, FormControl,
         FormGroup, Checkbox, ControlLabel } from 'react-bootstrap';
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";
import request from 'react-foursquare';

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoicnVkY2tzOTEiLCJhIjoiY2o4ZHE1YXZtMHQ2NDJ4bW8xbGJzYmZrOCJ9.kGjczis6tYLYQLDnoRt_dg"
});
const zoom = [13];

var foursquare = require('react-foursquare')({
  clientID: 'PYQYDOOXJSWESNJ23KFI4G3IQCA1JLEMQKU01AVZD0UCNEHK',
  clientSecret: '5BLH0XBPXJ1OODQ3RXXZLXJEN3NZON5014SRLLP2DV0W1GCH'
});




class CafeLocator extends Component {


  constructor(props) {
     super(props);
     this.state = {
       items: [],
       latitude: 40.7513171,
       longitude:-73.994459
     };
   }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position)=>{
      var params = {
        "ll": position.coords.latitude +","+ position.coords.longitude,
        "query": 'Cafe'
      };

      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })

      foursquare.venues.getVenues(params)
      .then(res=> {
        this.setState({ items: res.response.venues });
      });
    });
  }

render(){
console.log(this.state);
console.log("where am i?")
  return(
    <div>
          <Map
        style="mapbox://styles/mapbox/streets-v8"
        zoom={zoom}
        containerStyle={{
          margin: "50px",
          height: "500px",
          width: "500px"
        }}
        center={[this.state.longitude, this.state.latitude]}>
          <Layer
            type="symbol"
            id="marker"
            layout={{ "icon-image": "marker-15" }}>
            <Feature coordinates={[this.state.longitude, this.state.latitude]}/>
          </Layer>
      </Map>

    </div>

    );
}

}

export default CafeLocator;