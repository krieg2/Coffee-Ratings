import React, { Component } from 'react';
import { Panel, Button, Image,
         Grid, Row, Col, Alert,
         FormGroup, FormControl,
         ControlLabel } from 'react-bootstrap';
import API from '../utils/API';
import Filestack from '../components/Filestack.js';

class AddProduct extends Component {

  state = {
    upc: "",
    brand: "",
    image: "",
    title: "",
    description: "",
    messageText: "",
    messageType: ""
  };

  componentWillMount(){

    this.setState(this.props.location.state);
  }

  handleChange = (event) => {

    this.setState({
      [event.target.name]: event.target.value
    });

  };

  handleSubmit = (event) => {

    event.preventDefault();

    let newProduct = {
      title: this.state.title,
      description: this.state.description,
      brand: this.state.brand,
      image: this.state.image,
      upc: this.state.upc
    };

    API.addPendingProduct(newProduct, (response) => {

      if(response.data.messageText){
        let messageType = (response.status < 400) ? "success" : "danger";
        this.setState({
          messageText: response.data.messageText,
          messageType: messageType
        });
      }
    });

  };

  handlePhotoUpload = (url) => {

    this.setState({
      image: url
    });
  };

  render(){

    return (<Grid fluid style={{marginBottom: "200px"}}>
              <Row>
                <Col xs={12} sm={4} md={4} className="lowerTop center">
                  {(this.state.messageType !== 'success') ?
                    <form>
                    <FormGroup>
                      <Panel>
                        <Panel.Heading style={{backgroundColor: "#dd8047"}}>
                          <ControlLabel>Brand:&nbsp;</ControlLabel>
                          <FormControl
                            componentClass="input"
                            type="text"
                            name="brand"
                            placeholder="Enter brand"
                            onChange={this.handleChange}
                            value={this.state.brand}
                          />
                        </Panel.Heading>
                        <Panel.Body style={{padding: "30px"}}>
                          <ControlLabel>UPC:&nbsp;</ControlLabel>
                          <FormControl
                            style={{marginBottom: "10px"}}
                            componentClass="input"
                            type="text"
                            name="upc"
                            placeholder="Enter UPC code (optional)"
                            onChange={this.handleChange}
                            value={this.state.upc}
                          />
                          <div class="productPhoto">
                            {this.state.image ?
                              <Image src={this.state.image} responsive />
                            :
                              <Filestack callback={this.handlePhotoUpload} />
                            }
                          </div>
                          <ControlLabel>Title:</ControlLabel>
                          <FormControl
                            style={{fontWeight: 700, marginBottom: "10px"}}
                            componentClass="input"
                            type="text"
                            name="title"
                            placeholder="Enter title"
                            onChange={this.handleChange}
                            value={this.state.title}
                          />
                          <ControlLabel>Description:</ControlLabel>
                          <FormControl
                            componentClass="input"
                            type="text"
                            name="description"
                            placeholder="Enter description"
                            onChange={this.handleChange}
                            value={this.state.description}
                          />
                        </Panel.Body>
                      </Panel>
                      <Button onClick={this.handleSubmit} bsStyle="default" type="submit">Submit</Button>
                    </FormGroup>
                    </form>
                  :
                    null
                  }
                  {(this.state.messageText !== '') ?
                    <Alert bsStyle={this.state.messageType}>
                      {this.state.messageText}
                    </Alert>
                  :
                    null
                  }
                </Col>
              </Row>
            </Grid>);
  }
}

export default AddProduct;