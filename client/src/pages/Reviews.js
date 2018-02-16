import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Col, Row, Panel, Image, 
         DropdownButton, MenuItem,
         Nav, NavItem, Button } from 'react-bootstrap';
import API from '../utils/API';
import Stars from '../components/Stars';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: "",
      results: []
    };

     API.getProducts( (res) => {

       if(typeof(res.data) === 'object' &&
          res.data.length > 0){
         this.setState({results: res.data});
       }
     });
  }

  sortBy = (sortField, direction = 'asc') => {

    API.getProductsSorted(sortField, direction, (res) => {

       if(typeof(res.data) === 'object' &&
          res.data.length > 0){
         this.setState({results: res.data});
       }
     });
  };

  render() {

    return(
      <Grid fluid style={{minHeight: "100%"}}>
        <Row>
          <Col xs={12} sm={12} md={12}>

           <Nav bsStyle="pills" pullRight style={{paddingRight: "50px"}}>
            <NavItem>
              <Button><Link to="/createproduct">Add a Product</Link></Button>
            </NavItem>
            <NavItem>
              <DropdownButton title="Sort by" id="sortby">
                <MenuItem eventKey="1">
                  <div onClick={() => this.sortBy('brand')}><i className="fa fa-tag"></i> Brand</div>
                </MenuItem>
                <MenuItem eventKey="2">
                  <div onClick={() => this.sortBy('avgRating', 'desc')}><i className="fa fa-star"></i> Rating</div>
                </MenuItem>
                <MenuItem eventKey="3">
                  <div onClick={() => this.sortBy('createdAt', 'desc')}><i className="fa fa-calendar-plus-o"></i> Date created</div>
                </MenuItem>
              </DropdownButton>
            </NavItem>
          </Nav>

          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={9} md={9} style={{marginTop: "20px", marginBottom: "40px", paddingLeft: "50px"}}>
            <Row>
              {this.state.results.map( (item, index) => {
                return (<Col xs={12} sm={6} md={4} style={{marginBottom: "20px"}}>

                    <Link to={{pathname: "/product", state: {item: item}}}>
                      <Panel className="product">
                      <Panel.Heading style={{backgroundColor: "#dd8047"}}><b>{item.brand}</b></Panel.Heading>
                      <Panel.Body style={{padding: "40px"}}>
                        <p><Stars rating={item.avgRating} /></p>
                        <Image src={item.image} responsive />
                        <h3>{item.title}</h3>
                      </Panel.Body>
                      </Panel>
                    </Link>
                </Col>);
              })}
            </Row>
          </Col>
        </Row>
      </Grid>);
  }
}

export default Login;