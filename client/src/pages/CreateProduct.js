import React, { Component } from 'react';
import { Grid, Col, Row, Panel, FormControl,
         FormGroup, ControlLabel, Alert,
         Button, Image } from 'react-bootstrap';
import API from '../utils/API';
import { GridLoader } from 'halogenium';

class CreateProduct extends Component {

  state = {
    upc: "",
    searching: false,
    results: [],
    error: ""
  };

  handleChange = (event) => {

    this.setState({
      [event.target.name]: event.target.value
    });

  };

  handleSubmit = (event) => {

    event.preventDefault();

    this.setState({
      searching: true,
      error: ""
    });

    API.searchUPC(this.state.upc, (response) => {
      //console.log(response.data.items);
      let data = [];
      let error = "";
      if(response.data.message){
        error = response.data.message;
      } else if(response.data.items){
        data = response.data.items;
      } else {
        error = "No results found.";
      }
      // Wait at least 1s and display the animated spinner.
      setTimeout(() => this.setState({
        results: data,
        searching: false,
        error: error
      }), 1000);
    });
  };

  handleClick = (index) => {

    let newProduct = {
      title: this.state.results[index].title,
      description: this.state.results[index].description,
      brand: this.state.results[index].brand,
      image: this.state.results[index].images[0],
      upc: this.state.results[index].upc
    }
    API.addProduct(newProduct, (response) => {
      //
      console.log(response);
    });
  };

  render() {

    return(
      <Grid fluid>
        <Row>
          <Col xs={12} sm={4} md={4} className="productCol">
            <form>
              <FormGroup>
                <ControlLabel>Search a UPC code.</ControlLabel>
                <FormControl
                  style={{marginTop: "10px"}}
                  componentClass="input"
                  type="text"
                  name="upc"
                  placeholder="Enter text"
                  onChange={this.handleChange}
                  value={this.state.upc}
                />
              </FormGroup>
              <Button onClick={this.handleSubmit} bsStyle="default" type="submit">Search</Button>
              </form>
          </Col>
        </Row>

        <Row>
          {(this.state.searching) ?
            <Col xs={1} sm={1} md={1} className="productCol">
              <GridLoader color="red" size="22px" margin="10px"/>
            </Col>
          :
            this.state.results.map( (item, index) => {
              return (<Col xs={12} sm={4} md={4} className="productCol">
                <Panel className="product">
                  <Panel.Heading style={{backgroundColor: "#dd8047"}}>{item.brand}</Panel.Heading>
                  <Panel.Body style={{padding: "40px"}}>
                    <Image src={item.images[0]} responsive />
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <Button onClick={() => this.handleClick(index)}>Add</Button>
                  </Panel.Body>
                </Panel>
              </Col>);
          })}
          {(this.state.error !== '') ?
            <Col xs={2} sm={2} md={2} className="productCol">
              <Alert bsStyle="danger" style={{marginTop: "25px", overflow: "scroll"}}>
                {this.state.error}
              </Alert>
            </Col>
          :
            null
          }
        </Row>
      </Grid>);
  }
}

export default CreateProduct;