import React, { Component } from 'react';
import Banner from '../components/Banner.js';
import Landing from '../components/Landing.js';
import { Grid, Col, Row, Jumbotron } from 'react-bootstrap';

class Home extends Component {

  render() {

    return (
      <Grid fluid style={{padding: "0", margin: "0"}}>
        <Row style={{width: "100%", padding: "0", margin: "0"}}>
          <Jumbotron id="jumbo">
            <h1 style={{color: "#ebd69c", textTransform: "uppercase"}}>Coffee rating app</h1>
            <p style={{color: "#ebd69c"}}><em>Life is too short to drink bad coffee!</em></p> 
          </Jumbotron>
        </Row>

          <Row>
            <Banner />
          </Row>
          <Row style={{backgroundColor: "#94b6d2", textAlign: "center", padding: "10px"}}>
            <Col sm={4} style={{padding: "20px"}}>
              <Landing title="Share" fontAwesome="fa fa-share"
                       description={"Share your favorite coffee with the community."}
                       offset={1} />
            </Col>
            <Col sm={4} style={{padding: "20px"}}>
              <Landing title="Discover" fontAwesome="fa fa-binoculars"
                       description={"Discover amazing coffee that you haven't tried before."}
                       offset={2} />
            </Col>
            <Col sm={4} style={{padding: "20px"}}>
              <Landing title="Order" fontAwesome="fa fa-truck"
                       description={"Purchase coffee online and have it shipped to your door."}
                       offset={3} />
            </Col>
          </Row>
      </Grid>);
  }
}

export default Home;