import React, { Component } from 'react';
import Banner from '../components/Banner.js';
import Landing from '../components/Landing.js';
import TopTenCoffees from '../components/TopTenCoffees.js';
import { Grid, Col, Row } from 'react-bootstrap';

class Home extends Component {

  render() {

    return (
      <Grid fluid style={{padding: "0", margin: "0"}}>
          <Row>
            <Banner />
          </Row>
          <Row id="landingRow">
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
          <Row id="topTenCoffees">
            <TopTenCoffees />
          </Row>
      </Grid>);
  }
}

export default Home;