import React, { Component } from 'react';
import { Grid, Col, Row, Panel, FormControl,
         FormGroup, ControlLabel, Alert,
         Button, Image } from 'react-bootstrap';
import API from '../utils/API';
import { GridLoader } from 'halogenium';

class SearchProduct extends Component {

  state = {
    searchText: "",
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

  callback = (response) => {
console.log(response);
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
  };

  handleSubmit = (event) => {

    event.preventDefault();

    this.setState({
      searching: true,
      messageText: "",
      messageType: ""
    });

    if(this.props.searchType === 'upc'){
      API.searchUPC(this.state.searchText, this.callback);
    } else {
      API.searchProductName(this.state.searchText, this.callback);
    }
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
      <div>
        <form>
          <FormGroup>
            {(this.props.searchType === 'upc') ?
              <ControlLabel>Search a UPC code.</ControlLabel>
            :
              <ControlLabel>Search by product name.</ControlLabel>
            }
            <FormControl
              style={{marginTop: "10px"}}
              componentClass="input"
              type="text"
              name="searchText"
              placeholder="Enter text"
              onChange={this.handleChange}
              value={this.state.searchText}
            />
          </FormGroup>
          <Button onClick={this.handleSubmit} bsStyle="default" type="submit">Search</Button>
        </form>
        <br></br>
        {(this.state.messageText !== '') ?
          <Alert bsStyle={this.state.messageType}>
            {this.state.messageText}
          </Alert>
        :
          null
        }
        {(this.state.searching) ?
          <GridLoader color="red" size="22px" margin="10px"/>
        :
          this.state.results.map( (item, index) => {
            return (
              <Panel className="product-no-hover">
                <Panel.Heading style={{backgroundColor: "#dd8047"}}>{item.brand}
                  <Button bsSize="small" className="addButton" onClick={() => this.handleClick(index)}>Add</Button>
                </Panel.Heading>
                <Panel.Body style={{padding: "40px"}}>
                  <span>UPC: {item.upc}</span>
                  <Image src={item.images[0]} responsive />
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </Panel.Body>
              </Panel>);
          })}
      </div>);
  }
}

export default SearchProduct;