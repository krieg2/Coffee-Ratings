import React from 'react';
import { Grid, Col, Row, Panel, 
         FormGroup, Button,
         ControlLabel, FormControl } from 'react-bootstrap';

const Login = () =>
  <Grid>
    <Row>
      <Col xs={8} sm={6} md={5}
           xsOffset={2} smOffset={3} mdOffset={4}
           style={{marginTop: "100px"}}>
        <Panel style={{boxShadow: "10px 10px 20px"}}>
          <Panel.Heading>Log In</Panel.Heading>
          <Panel.Body style={{padding: "40px"}}>
            <form>
            <FormGroup controlId="loginForm">
              <ControlLabel>Email address:</ControlLabel>
              <FormControl
                componentClass="input"
                type="email"
                name="email"
                placeholder="Enter email"
              />
              <ControlLabel style={{marginTop: "10px"}}>Password:</ControlLabel>
              <FormControl
                componentClass="input"
                type="Password"
                name="password"
                placeholder="Enter password"
              />
            </FormGroup>
            <Button bsStyle="default" type="submit">Submit</Button>
            </form>
          </Panel.Body>
        </Panel>
      </Col>
    </Row>
  </Grid>;

export default Login;
