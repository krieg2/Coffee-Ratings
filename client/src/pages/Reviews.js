import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Col, Row, Panel,
         FormGroup, Checkbox, 
         Image, ControlLabel } from 'react-bootstrap';
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

  //handleChange = (event) => {

    // this.setState({
    //   [event.target.name]: event.target.value
    // });
  //};

  // handleSubmit = (event) => {

  //   event.preventDefault();
  // };

  render() {

    return(
      <Grid fluid style={{minHeight: "100%"}}>
        <Row>
          <Col xs={12} sm={3} md={3}>
            <Link to="/createproduct">Add a Product</Link>
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

          <Col xs={12} sm={9} md={9} style={{marginTop: "20px", marginBottom: "40px"}}>
            <Row>
              {this.state.results.map( (item, index) => {
                return (<Col xs={4} sm={4} md={4} style={{marginBottom: "20px"}}>

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