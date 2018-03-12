import React, { Component } from 'react';
import { Grid, Col, Row, FormControl,
         FormGroup, ControlLabel,
         Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SearchProduct from '../components/SearchProduct.js';

class CreateProduct extends Component {

  state = {
    upc: "",
    brand: "",
    title: "",
    description: ""
  };

  handleChange = (event) => {

    this.setState({
      [event.target.name]: event.target.value
    });

  };

  render() {

    return(
      <Grid fluid style={{marginBottom: "200px"}}>
        <Row>
          <Col xs={12} sm={4} md={4} className="lowerTop">
            <SearchProduct searchType="upc" />
          </Col>
          <Col xs={12} sm={4} md={4} className="lowerTop">
            <SearchProduct searchType="name" />
          </Col>
          <Col xs={12} sm={4} md={4} className="lowerTop">
            <form style={{margin: "10px"}}>
              <FormGroup>
                <ControlLabel>Enter a new product. (requires approval)</ControlLabel>
                <FormControl
                  componentClass="input"
                  type="text"
                  name="brand"
                  placeholder="Enter brand"
                  onChange={this.handleChange}
                  value={this.state.brand}
                />
                <FormControl
                  componentClass="input"
                  type="text"
                  name="upc"
                  placeholder="Enter UPC code (optional)"
                  onChange={this.handleChange}
                  value={this.state.upc}
                />
                <FormControl
                  componentClass="input"
                  type="text"
                  name="title"
                  placeholder="Enter title"
                  onChange={this.handleChange}
                  value={this.state.title}
                />
                <FormControl
                  componentClass="input"
                  type="text"
                  name="description"
                  placeholder="Enter description"
                  onChange={this.handleChange}
                  value={this.state.description}
                />
              </FormGroup>
              <Link to={{
                pathname: '/addproduct',
                state: this.state
              }}>
                <Button onClick={this.handleSubmit} bsStyle="default" type="submit">Submit</Button>
              </Link>
            </form>
          </Col>
        </Row>
      </Grid>);
  }
}

export default CreateProduct;