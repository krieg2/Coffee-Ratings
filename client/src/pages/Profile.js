import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, Col, Row, Panel, 
         FormGroup, Button, Alert,
         ControlLabel, FormControl } from 'react-bootstrap';
import API from '../utils/API';
import './styles.css';

class Profile extends Component {

  constructor(props) {
    super(props);
    let user = API.getProfile();
    this.state = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: "",
      message: "",
      messageType: ""
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = (event) => {

    event.preventDefault();

    API.editUser({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    },
      (res) => {

        if(res.data.message){
          //This is an error.
          this.setState({ message: res.data.message });
        } else{
          //this.setState({ redirectToReferrer: true });
        }
    });
  };

  render() {

    return(
      <Grid fluid className="loginPage">
        <Row>
          <Col xs={8} sm={6} md={5} className="centerCol lowerTop">
            <Panel style={{boxShadow: "10px 10px 20px"}}>
              <Panel.Heading style={{backgroundColor: "#dd8047"}}>Profile</Panel.Heading>
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

                {(this.state.message !== '') ?
                  <Alert bsStyle={this.state.messageType} style={{marginTop: "25px"}}>
                    {this.state.message}
                  </Alert>
                :
                  null
                }
              </Panel.Body>
            </Panel>
          </Col>
        </Row>
      </Grid>);
  }
}

export default Profile;