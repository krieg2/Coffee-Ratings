import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Col, Row, Panel, FormControl,
         FormGroup, Checkbox, ControlLabel } from 'react-bootstrap';
import API from '../utils/API';

class Login extends Component {

  state = {
    filter: ""
  };

  handleChange = (event) => {

    // this.setState({
    //   [event.target.name]: event.target.value
    // });
  };

  handleSubmit = (event) => {

    event.preventDefault();
  };

  render() {

    return(
      <Grid fluid>
        <Row>
          <Col xs={12} sm={3} md={3}>
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
            <Panel>
              <Panel.Heading style={{backgroundColor: "#dd8047"}}>Coffee 1</Panel.Heading>
              <Panel.Body style={{padding: "10px"}}>

                <Link to="/rate">Rate It</Link>
              </Panel.Body>
            </Panel>
          </Col>
        </Row>
      </Grid>);
  }
}

export default Login;