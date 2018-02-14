import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Grid, Col, Row, Panel, FormControl,
         FormGroup, Checkbox, ControlLabel,
         Well } from 'react-bootstrap';
import ReactMapboxGl, { Layer, Feature, Marker, Popup } from "react-mapbox-gl";
import request from 'react-foursquare';
import markerUrl from '../coffee-cup.png';

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN
});
const zoom = [14];

var foursquare = require('react-foursquare')({
  clientID: process.env.REACT_APP_4SQUARE_KEY,
  clientSecret: process.env.REACT_APP_4SQUARE_SECRET
});

class CafeLocator extends Component {


  constructor(props) {
     super(props);
     this.state = {
       items: [],
       latitude: 40.7513171,
       longitude: -73.994459
     };
   }

  componentDidMount() {

    navigator.geolocation.getCurrentPosition((position)=>{
      var params = {
        "ll": position.coords.latitude +","+ position.coords.longitude,
        "radius": 500,
        "categoryId": "4bf58dd8d48988d1e0931735"
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

  onDragEnd = (map) => {

    let bounds = map.getBounds().getCenter();
    this.setState({
      latitude: bounds.lat,
      longitude: bounds.lng
    });

    let params = {
      "ll": bounds.lat +","+ bounds.lng,
      "categoryId": "4bf58dd8d48988d1e0931735",
      "radius": 500
    };


    foursquare.venues.getVenues(params)
    .then(res=> {
      this.setState({ items: res.response.venues });
    });
  };

  render(){

    return(
      <Row>
        <Col sm={6} md={6} lg={6} className="mapCol">
          <Map
            style="mapbox://styles/mapbox/streets-v8"
            zoom={zoom}
            onDragEnd={this.onDragEnd}
            containerStyle={{
              margin: "50px",
              height: "500px",
              width: "500px"
            }}
            center={[this.state.longitude, this.state.latitude]}
          >
       
            <Layer
              type="symbol"
              id="marker"
              layout={{ "icon-image": "marker-15" }}
            >
              <Feature coordinates={[this.state.longitude, this.state.latitude]} />
            </Layer>
              {this.state.items.map( (item, index) => {
                return (
                  <Marker
                  key={index}
                  coordinates={[item.location.lng, item.location.lat]}
                  anchor="bottom">
                    <img src={markerUrl}/>
                  </Marker>
                );
              })}
            
            {this.state.items.map( (item, index) => {
              return (
                  <Popup
                    coordinates={[item.location.lng, item.location.lat]}
                    anchor="bottom"
                    offset={{
                      'bottom-left': [12, -38],  'bottom': [0, -38], 'bottom-right': [-12, -38]
                    }}>
                    <div>{item.name}</div>
                  </Popup>
              );
            })}
          </Map>
        </Col>
        <Col sm={5} md={5} lg={5} className="lowerTop">
          {this.state.items.map( (item, index) => {
            return (
              <Link key={index} to={{pathname: "/cafe", state: {cafe: item}}}>
                <Well>
                  {item.name}
                </Well>
              </Link>
            );
          })}
        </Col>
      </Row>
    );
  }

}

export default CafeLocator;