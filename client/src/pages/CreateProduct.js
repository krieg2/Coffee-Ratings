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
    messageText: "",
    messageType: ""
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
      messageText: "",
      messageType: ""
    });

    API.searchUPC(this.state.upc, (response) => {

      let data = [];
      let message = "";
      let messageType = "info";
      if(response.data.messageText){
        message = response.data.messageText;
        messageType = (response.status < 400) ? "success" : "danger";
      } else if(response.data.items){
        data = response.data.items;
      } else {
        message = "No results found.";
        messageType = "danger";
      }
      // Wait at least 1s and display the animated spinner.
      setTimeout(() => this.setState({
        results: data,
        searching: false,
        messageText: message,
        messageType: messageType
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
    };

    API.addProduct(newProduct, (response) => {

      if(response.data.messageText){
        let messageType = (response.status < 400) ? "success" : "danger";
        this.setState({
          messageText: response.data.messageText,
          messageType: messageType
        });
      }
    });
  };

  render() {

    return(
      <Grid fluid style={{marginBottom: "200px"}}>
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
          {(this.state.messageText !== '') ?
            <Col xs={10} sm={3} md={3} className="productCol">
              <Alert bsStyle={this.state.messageType}>
                {this.state.messageText}
              </Alert>
            </Col>
          :
            null
          }
          {(this.state.searching) ?
            <Col xs={1} sm={1} md={1} className="productCol">
              <GridLoader color="red" size="22px" margin="10px"/>
            </Col>
          :
            this.state.results.map( (item, index) => {
              return (<Col xs={12} sm={4} md={4} className="productCol">
                <Panel className="product">
                  <Panel.Heading style={{backgroundColor: "#dd8047"}}>{item.brand}
                    <Button bsSize="small" className="addButton" onClick={() => this.handleClick(index)}>Add</Button>
                  </Panel.Heading>
                  <Panel.Body style={{padding: "40px"}}>
                    <Image src={item.images[0]} responsive />
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </Panel.Body>
                </Panel>
              </Col>);
          })}
          
        </Row>
      </Grid>);
  }
}

export default CreateProduct;