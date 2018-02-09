import React, { Component } from 'react';
import { Grid, Col, Row, Panel, 
         FormGroup, Button, Alert,
         ControlLabel, FormControl } from 'react-bootstrap';
import API from '../utils/API';

class Profile extends Component {

  constructor(props) {
    super(props);

    let user = API.getProfile();
    this.state = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      messageText: "",
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

    API.updateUser(this.state.id, {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      location: this.state.location
    },
      (res) => {

        if(res.data.messageText){
          //Capture the response message.
          let messageType = (res.status < 400) ? "success" : "danger";
          this.setState({
            messageText: res.data.messageText,
            messageType: messageType,
          });
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
                  <ControlLabel style={{marginTop: "10px"}}>Location:</ControlLabel>
                  <FormControl
                    componentClass="input"
                    type="text"
                    name="location"
                    placeholder="Enter location"
                    value={this.state.location}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <Button bsStyle="default" type="submit">Submit</Button>
                </form>

                {(this.state.messageText !== '') ?
                  <Alert bsStyle={this.state.messageType} style={{marginTop: "25px"}}>
                    {this.state.messageText}
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
