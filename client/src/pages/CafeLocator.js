import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Col, Row, Well, Image } from 'react-bootstrap';
import ReactMapboxGl, { Layer, Feature,
                    ZoomControl, Marker, Popup } from "react-mapbox-gl";
import update from 'immutability-helper';
import API from '../utils/API';
import Stars from '../components/Stars';
import MapSearch from '../components/MapSearch';
import markerUrl from '../coffee-cup.png';

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN
});
const zoom = [14];

const foursquare = require('react-foursquare')({
  clientID: process.env.REACT_APP_4SQUARE_KEY,
  clientSecret: process.env.REACT_APP_4SQUARE_SECRET
});

class CafeLocator extends Component {

  constructor(props) {
     super(props);
     this.state = {
       items: [],
       ratings: {},
       options: [],
       latitude: 40.7513171,
       longitude: -73.994459
     };
   }

  componentDidMount() {

    navigator.geolocation.getCurrentPosition((position)=>{

      let params = {
        "ll": position.coords.latitude +","+ position.coords.longitude,
        "radius": 500,
        "categoryId": "4bf58dd8d48988d1e0931735"
      };

      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })

      foursquare.venues.getVenues(params)
      .then(res => {
        this.setState({ items: res.response.venues });
        this.getRatingsBatch(res.response.venues);
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
    .then(res => {
      this.setState({ items: res.response.venues });
      this.getRatingsBatch(res.response.venues);
    });
  };

  getRatingsBatch = (venues) => {

    let extIds = venues.map((item) => item.id);

    API.getCafesByExtIds(extIds, (cafes) => {

      // Find the cafe by external Id.
      // Get avg rating value and display.
      if(cafes !== undefined && cafes.data !== null){

        cafes.data.forEach( (cafe) => {
            this.setState({
              ratings: update(this.state.ratings, {[cafe.externalId]: {$set: cafe.avgRating}})
            });
          }
        );
      }
    });
  };

  onSelectItem = (index) => {

    let selected = this.state.options[index];
    let lng = selected.center[0];
    let lat = selected.center[1];
    this.setState({
      selected,
      latitude: lat,
      longitude: lng
    });

    let params = {
      "ll": lat +","+ lng,
      "categoryId": "4bf58dd8d48988d1e0931735",
      "radius": 500
    };

    foursquare.venues.getVenues(params)
    .then(res => {
      this.setState({ items: res.response.venues });
      this.getRatingsBatch(res.response.venues);
    });
  };

  onSearch = (query) => {

    API.geoLocate(query, (results) => {
      console.log(results);
      if(results){
        this.setState({
          options: results.data.features.filter((place) => {
            return (place.place_type.includes('place'))})
        });
      }
    });
  };

  render(){

    return(
      <Grid fluid style={{padding: "0px", margin: "0 auto"}}>
        <Row>
          <div className="cafeLocatorPhoto">
          </div>
        </Row>
        <Row style={{marginTop: "25px", marginLeft: "25px", display: "flex", flexWrap: "wrap"}}>
          <Col xs={12} sm={12} md={6} lg={6}>
            
            <Map
              style="mapbox://styles/mapbox/streets-v8"
              zoom={zoom}
              onDragEnd={this.onDragEnd}
              center={[this.state.longitude, this.state.latitude]}
              containerStyle={{
                border: "2px solid rgba(0,0,0,0.15)",
                position: "sticky",
                top: "100px",
                borderRadius: "10px",
                zIndex: "10"
              }}
            >

            <MapSearch
              onSearch={this.onSearch}
              onSelectItem={this.onSelectItem}
              options={this.state.options}
            />
         
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
                      <img src={markerUrl} alt="marker" />
                    </Marker>
                  );
                })}
              
              {this.state.items.map( (item, index) => {
                return (
                    <Popup
                      key={index}
                      coordinates={[item.location.lng, item.location.lat]}
                      anchor="bottom"
                      offset={{
                        'bottom-left': [12, -38],  'bottom': [0, -38], 'bottom-right': [-12, -38]
                      }}>
                      <div>{item.name}</div>
                    </Popup>
                );
              })}
              <ZoomControl position="bottom-right" />
            </Map>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <div className="cafeList">
            {this.state.items.map( (item, index) => {
              return (
                <Link key={index} to={{pathname: "/cafe", state: {cafe: item}}}>
                  <Well>
                    {item.name}
                    <div className="cafeRating">
                      <Stars rating={this.state.ratings[item.id]} />
                    </div>
                  </Well>
                </Link>
              );
            })}
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }

}

export default CafeLocator;