import React, { Component } from 'react';
import { Grid, Col, Row, Panel, FormControl,
         FormGroup, ControlLabel, Alert,
         Button, Image } from 'react-bootstrap';
import SearchProduct from '../components/SearchProduct.js';

class CreateProduct extends Component {

  state = {
    upc: ""
  };

  render() {

    return(
      <Grid fluid style={{marginBottom: "200px"}}>
        <Row>
          <Col xs={12} sm={4} md={4} className="lowerTop borderR">
            <SearchProduct searchType="upc" />
          </Col>
          <Col xs={12} sm={4} md={4} className="lowerTop borderR">
            <SearchProduct searchType="name" />
          </Col>
        </Row>
      </Grid>);
  }
}

export default CreateProduct;