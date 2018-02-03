import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Col, Row, Panel, FormControl,
         FormGroup, Checkbox, 
         Image, ControlLabel } from 'react-bootstrap';
import API from '../utils/API';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: "",
      results: []
    };

    API.getProducts( (res) => this.setState({results: res.data}));
  }

  //handleChange = (event) => {

    // this.setState({
    //   [event.target.name]: event.target.value
    // });
  //};

  // handleSubmit = (event) => {

  //   event.preventDefault();
  // };

  render() {

    return(
      <Grid fluid>
        <Row>
          <Col xs={12} sm={3} md={3}>
            <Link to="/createproduct">Add a Product</Link>
            <Panel>
    		      <Panel.Heading style={{backgroundColor: "#dd8047"}}>Search filters</Panel.Heading>
    		      <Panel.Body style={{padding: "20px"}}>
    			    <form>
    			    <FormGroup>
    			      <ControlLabel>Roast</ControlLabel>
    			      <Checkbox>Dark</Checkbox>
    			      <Checkbox>Medium</Checkbox>
    		          <Checkbox>Light</Checkbox>
    			    </FormGroup>
    			    <FormGroup>
    			      <ControlLabel>Region</ControlLabel>
    			      <Checkbox>Central America</Checkbox>
    			      <Checkbox>South America</Checkbox>
    		          <Checkbox>Africa</Checkbox>
    		          <Checkbox>Indonesia</Checkbox>
    		          <Checkbox>Inda</Checkbox>
    		          <Checkbox>Jamaica</Checkbox>
    		          <Checkbox>Hawaii</Checkbox>
    			    </FormGroup>
    			    </form>
    		      </Panel.Body>
    		    </Panel>
          </Col>

          <Col xs={12} sm={9} md={9}>
            <Row>
              {this.state.results.map( (item, index) => {
                return (<Col xs={4} sm={4} md={4}>
                  <Panel className="product">
                  <Panel.Heading style={{backgroundColor: "#dd8047"}}>{item.brand}</Panel.Heading>
                  <Panel.Body style={{padding: "40px"}}>
                    <Image src={item.image} responsive />
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <Link to="/rate">Rate It</Link>
                  </Panel.Body>
                </Panel>
                </Col>);
              })}
            </Row>
          </Col>
        </Row>
      </Grid>);
  }
}

export default Login;