import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, Col, Row, Panel,
         FormGroup, Button,
         ControlLabel, FormControl } from 'react-bootstrap';
import API from '../utils/API';

class Login extends Component {

  state = {
    cafeLocator: []
    map: "",
    infoWindow: "",
    request: "",
    service: "",
    markers: []
  };

      function initMap() {
        var center = new google.maps.LatLng(40.8839359,-73.9527557);
        map = new google.maps.Map(document.getElementById('map'), {
          center: center,
          zoom: 15
        });
        infoWindow = new google.maps.InfoWindow();

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }


        request = {
            location: center,
            radius: 8047, //5miles
            types: ['cafe']
        };

        var service = new google.maps.places.PlacesService(map);

        service.nearbySearch(request, callback);

        google.maps.event.addListener(map, 'rightclick', function(event){
            map.setCenter(event.latLng)
            clearResults(markers)

            var request = {
                location: event.latLng,
                radius: 8047,
                types: ['cafe']
            };
            service.nearbySearch(request, callback);
        })
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }

      //mark the near cafe
      function callback(results, status){
        if(status == google.maps.places.PlacesService.OK){
            for (var i = 0; i < results.length; i++){
                markers.push(createMarker(results[i]));
            }
        }
    }

    function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });
        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent(place.name);
            infoWindow.open(map, this);
        });

        return marker;
    }

    function clearResults(markders) {
        for (var m in markers) {
            markers[m].setMap(null)
        }
        markers = []
    }

  render() {
        <div>
        <div id="map">
        </div>

        <div class="rating">
            rating
        </div>
    </div>
  }

export default cafeLocator;
