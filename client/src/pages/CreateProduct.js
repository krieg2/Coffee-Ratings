import React, { Component } from 'react';
import { Grid, Col, Row, Panel, FormControl,
         FormGroup, ControlLabel, 
         Button, Image } from 'react-bootstrap';
import API from '../utils/API';
import './styles.css';

class CreateProduct extends Component {

  state = {
    upc: "",
    results: []
  };

  handleChange = (event) => {

    this.setState({
      [event.target.name]: event.target.value
    });

  };

  handleSubmit = (event) => {

    event.preventDefault();

    API.searchUPC(this.state.upc, (response) => {
      console.log(response.data.items);
      if(response.data.items){
        this.setState({
          results: response.data.items
        });
      }
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
          <Col xs={12} sm={5} md={5} className="centerCol">
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
              <Button onClick={this.handleSubmit} bsStyle="primary" type="submit">Search</Button>
              </form>
          </Col>
        </Row>
        <Row>
          {this.state.results.map( (item, index) => {
            return (<Col xs={1} sm={1} md={1}>
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
        </Row>
      </Grid>);
  }
}

export default CreateProduct;