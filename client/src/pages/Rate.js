import React, { Component } from 'react';
import { Grid, Col, Row, Panel, FormControl,
         FormGroup, Checkbox, ControlLabel, 
         Button, ButtonGroup, Glyphicon } from 'react-bootstrap';
import API from '../utils/API';

class Login extends Component {

  state = {
    reviewText: "",
    rating: 0,
    hover: [false, false, false, false, false]
  };

  toggleHover = (index) => {

    this.setState( (prevState) => {

        let arr = prevState.hover;
        for(let i=0; i <= index; i++){
          if(this.state.rating === 0 ||
             i > this.state.rating-1){
            arr[i] = !arr[i];
          }
        }

       return {
         hover: arr
       };
    });
  };
  
  handleChange = (event) => {

    if(event.target.name === 'rating'){

      if(event.target.value < this.state.rating){

        this.setState( (prevState) => {
          let arr = prevState.hover;
          for(let i=event.target.value; i < arr.length; i++){
            arr[i] = false;
          }
          return {
            hover: arr
          };
        });
      }
    }
    this.setState({
      [event.target.name]: event.target.value
    });

  };

  handleSubmit = (event) => {

    event.preventDefault();
  };

  render() {

    return(
      <Grid fluid>
        <Row>
          <Col xs={12} sm={5} md={5} className="centerCol">
            <form>
              <FormGroup>
                <ControlLabel>Coffee 1 review</ControlLabel>
                <p>Rate this coffee based on:
                <ul>
                  <li>Aroma</li>
                  <li>Taste</li>
                  <li>Finish</li>
                  <li>Body</li>
                  <li>Acidity</li>
                </ul>
                </p>
                <ButtonGroup bsSize="large" name="rating">
                  <Button onClick={() => this.handleChange({target: {name: 'rating', value: 1}})}
                          onMouseEnter={() => this.toggleHover(0)}
                          onMouseLeave={() => this.toggleHover(0)}>
                    <Glyphicon glyph="star" style={{color: (this.state.hover[0]) ? 'gold' : 'grey'}} />
                  </Button>
                  <Button onClick={() => this.handleChange({target: {name: 'rating', value: 2}})}
                          onMouseEnter={() => this.toggleHover(1)}
                          onMouseLeave={() => this.toggleHover(1)}>
                    <Glyphicon glyph="star" style={{color: (this.state.hover[1]) ? 'gold' : 'grey'}} />
                  </Button>
                  <Button onClick={() => this.handleChange({target: {name: 'rating', value: 3}})}
                          onMouseEnter={() => this.toggleHover(2)}
                          onMouseLeave={() => this.toggleHover(2)}>
                    <Glyphicon glyph="star" style={{color: (this.state.hover[2]) ? 'gold' : 'grey'}} />
                  </Button>
                  <Button onClick={() => this.handleChange({target: {name: 'rating', value: 4}})}
                          onMouseEnter={() => this.toggleHover(3)}
                          onMouseLeave={() => this.toggleHover(3)}>
                    <Glyphicon glyph="star" style={{color: (this.state.hover[3]) ? 'gold' : 'grey'}} />
                  </Button>
                  <Button onClick={() => this.handleChange({target: {name: 'rating', value: 5}})}
                          onMouseEnter={() => this.toggleHover(4)}
                          onMouseLeave={() => this.toggleHover(4)}>
                    <Glyphicon glyph="star" style={{color: (this.state.hover[4]) ? 'gold' : 'grey'}} />
                  </Button>
                </ButtonGroup>

                <FormControl
                  style={{marginTop: "10px"}}
                  componentClass="textarea"
                  type="text"
                  name="reviewText"
                  placeholder="Enter text"
                  onChange={this.handleChange}
                  value={this.state.searchText}
                />
              </FormGroup>
              <Button onClick={this.handleSubmit} bsStyle="primary" type="submit">Post Review</Button>
              </form>
          </Col>
        </Row>
      </Grid>);
  }
}

export default Login;