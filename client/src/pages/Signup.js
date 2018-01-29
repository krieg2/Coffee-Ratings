import React, { Component } from 'react';
import { Grid, Col, Row, Panel, 
         FormGroup, Button,
         ControlLabel, FormControl } from 'react-bootstrap';
import API from '../utils/API';

class Signup extends Component {

  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = (event) => {

    event.preventDefault();
    API.signup({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    });
  };

  render() {

    return(
      <Grid>
        <Row>
          <Col xs={8} sm={6} md={5}
               xsOffset={2} smOffset={3} mdOffset={4}
               style={{marginTop: "100px"}}>
            <Panel style={{boxShadow: "10px 10px 20px"}}>
              <Panel.Heading>Log In</Panel.Heading>
              <Panel.Body style={{padding: "40px"}}>
                <form onSubmit={this.handleSubmit}>
                <FormGroup controlId="loginForm">
                  <ControlLabel>First name:</ControlLabel>
                  <FormControl
                    componentClass="input"
                    type="text"
                    name="firstName"
                    placeholder="Enter first name"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                  />
                  <ControlLabel style={{marginTop: "10px"}}>Last name:</ControlLabel>
                  <FormControl
                    componentClass="input"
                    type="text"
                    name="lastName"
                    placeholder="Enter last name"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                  />
                  <ControlLabel style={{marginTop: "10px"}}>Email address:</ControlLabel>
                  <FormControl
                    componentClass="input"
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  <ControlLabel style={{marginTop: "10px"}}>Password:</ControlLabel>
                  <FormControl
                    componentClass="input"
                    type="Password"
                    name="password"
                    placeholder="Enter password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <Button bsStyle="default" type="submit">Submit</Button>
                </form>
              </Panel.Body>
            </Panel>
          </Col>
        </Row>
      </Grid>);
  }
}

export default Signup;
