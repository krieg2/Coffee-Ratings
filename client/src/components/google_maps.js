import React, { Component } from 'react';

export default class extends Component {

    shouldComponentUpdate(){
        return false;
    }

    componentWillReceiveProps(nextProps) {
        this.map.panTo({ lat: nextPros.lat, lng: nextProps.lng })
    }

    componentDidMount(){
        this.map = new google.maps.Map( rhis.refs.map , {
            center: {lat: this.props.lat, lng: this.props.lng},
            zoom: 15
        } )
    }


    render(){
        return (
            <div id="map" ref="map" />
        );
    }
}