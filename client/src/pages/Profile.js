import React, { Component } from 'react';
import { Grid, Col, Row, Panel, Image,
         FormGroup, Button, Alert,
         ControlLabel, FormControl } from 'react-bootstrap';
import API from '../utils/API';
import Filestack from '../components/Filestack.js';

class Profile extends Component {

  constructor(props) {
    super(props);

    let user = API.getProfile();
    this.state = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      photoUrl: (user.photoUrl) ? user.photoUrl : 'http://via.placeholder.com/200x200',
      messageText: "",
      messageType: ""
    };
  }

  handlePhotoUpload = (url) => {

    this.setState({
      photoUrl: url
    });

    API.updateUser(this.state.id, {
      photoUrl: this.state.photoUrl
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

  removePhoto = () => {

    this.setState({
      photoUrl: 'http://via.placeholder.com/200x200'
    });

    API.updateUser(this.state.id, {
      photoUrl: ''
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
      location: this.state.location,
      photoUrl: this.state.photoUrl
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
          <Col xs={10} sm={8} md={6} className="centerCol lowerTop">
            <Panel style={{boxShadow: "10px 10px 20px"}}>
              <Panel.Heading style={{backgroundColor: "#dd8047"}}>
                <h3 style={{textAlign: "center"}}>Profile</h3>
              </Panel.Heading>
              <Panel.Body>
                <Row style={{padding: "10px"}}>
                  <Col md={6}>
                    <Image src={this.state.photoUrl} className="profilePhoto" />
                  </Col>
                  <Col md={6}>
                    <Filestack callback={this.handlePhotoUpload} />
                    <Button onClick={this.removePhoto}>Remove Photo</Button>
                  </Col>
                </Row>
                <Row style={{padding: "20px"}}>
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
                </Row>
                {(this.state.messageText !== '') ?
                  <Row style={{padding: "20px"}}>
                    <Alert bsStyle={this.state.messageType} style={{marginTop: "25px"}}>
                      {this.state.messageText}
                    </Alert>
                  </Row>
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
