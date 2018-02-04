import React, { Component } from 'react';
import Banner from '../components/Banner.js';
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
          <Row style={{backgroundColor: "#94b6d2"}}>
            <div className="col-sm-4">
              <h3>Column 1</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
              <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
              <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
            </div>
            <div className="col-sm-4">
              <h3>Column 2</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
              <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
              <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
            </div>
            <div className="col-sm-4">
              <h3>Column 3</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
              <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
              <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
            </div>
          </Row>

          <footer className="page-footer blue center-on-small-only">
            <div className="footer-copyright">
                <div className="container-fluid" style={{color: "#ebd69c"}}>
                    © 2018 Copyright COFFEE RATING APP
                </div>
            </div>
          </footer>

      </Grid>);
  }
}

export default Home;