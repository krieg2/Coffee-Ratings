import React, { Component } from 'react';
import { Grid, Col, Row, Panel, FormControl,
         FormGroup, Checkbox, ControlLabel, 
         Button, ButtonGroup, Glyphicon, Alert,
         Jumbotron, Image, ListGroup, ListGroupItem } from 'react-bootstrap';
import API from '../utils/API';

class Login extends Component {

  state = {
    item: {},
    comment: "",
    rating: 0,
    hover: [false, false, false, false, false],
    message: ""
  };

  componentWillMount(){

    this.setState({
      item: this.props.location.state.item
    });
  }

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

    let reviewObj = {
      rating: this.state.rating,
      comment: this.state.comment,
      postedBy: API.getUserId()
    };
    API.addReview(this.state.item._id, reviewObj, (response) => {

      if(response.data.message){

        this.setState({
          message: response.data.message
        });
      }

    });

  };

  render() {

      return(
        <Grid fluid>
          <Row>
          <Jumbotron style={{position: 'relative'}}>
            <Button onClick={this.props.history.goBack} bsSize="small" bsStyle="default" className="backButton">Back</Button>
            <h1>{this.state.item.brand}</h1>
            <h2>{this.state.item.title}</h2>
            <p>{this.state.item.description}</p>
          </Jumbotron>
          </Row>
          <Row>
            <Col xs={12} sm={4} md={4} className="topAndBottom">
              <Image src={this.state.item.image} responsive />
            </Col>

            <Col xs={12} sm={5} md={5} className="topAndBottom">
              {this.state.message === "" ?
              <form>
                <FormGroup>
                  <ControlLabel>Star rating:</ControlLabel>
                  <p>Tell us what you think! Rate this coffee by giving it 1-5 stars and your comments. Here are some aspects to consider:</p>
                  <ListGroup style={{width: "100px"}}>
                    <ListGroupItem bsStyle="info"><i className="fa fa-circle"></i>  Aroma</ListGroupItem>
                    <ListGroupItem bsStyle="info"><i className="fa fa-circle"></i>  Taste</ListGroupItem>
                    <ListGroupItem bsStyle="info"><i className="fa fa-circle"></i>  Finish</ListGroupItem>
                    <ListGroupItem bsStyle="info"><i className="fa fa-circle"></i>  Body</ListGroupItem>
                    <ListGroupItem bsStyle="info"><i className="fa fa-circle"></i>  Acidity</ListGroupItem>
                  </ListGroup>
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
                    name="comment"
                    placeholder="Enter text"
                    onChange={this.handleChange}
                    value={this.state.comment}
                  />
                </FormGroup>
                <Button onClick={this.handleSubmit} bsStyle="primary" type="submit">Post Review</Button>
                </form>
                :
                <Alert bsStyle="info">
                  {this.state.message}
                </Alert>
              }
            </Col>
          </Row>
        </Grid>);
  }
}

export default Login;