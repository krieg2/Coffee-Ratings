import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col, Button,
         Well, Jumbotron, Image } from 'react-bootstrap';
import API from '../utils/API';
import Stars from '../components/Stars';

class Product extends Component {

  state = {
  	reviews: [],
    item: {}
  };

  componentWillMount(){

    let id = this.props.location.state.item._id;
    this.setState({
      item: this.props.location.state.item
    });

    API.getProduct(id, (product) => {

      if(product.data){

        this.setState({
          item: product.data
        });
        API.getReviews(id, (reviews) => {

          if(typeof(reviews.data) === 'object' &&
            reviews.data.length > 0){

            this.setState({
              reviews: reviews.data
            });
          }
        });
      }
    });
  }

  render() {

    return(
      <Grid fluid>
        <Row>
        <Jumbotron style={{position: 'relative'}}>
          <Button onClick={this.props.history.goBack} bsSize="small" bsStyle="default" className="backButton">Back</Button>
          <h1>{this.state.item.brand}</h1>
          <h2>{this.state.item.title}</h2>
          <p>{this.state.item.description}</p>
          <p>Average Rating: <span>{this.state.item.avgRating}</span></p>
          <p><Stars rating={this.state.item.avgRating} /></p>
          <Link to={{pathname: "/rate", state: {item: this.state.item}}}><i className="fa fa-thumbs-up"></i>Rate It</Link>
        </Jumbotron>
        </Row>
        <Row>
          <Col xs={12} sm={4} md={4} className="topAndBottom">
            <Image src={this.state.item.image} responsive />
          </Col>
          <Col xs={12} sm={5} md={5} className="topAndBottom">
            {this.state.reviews.map( (review, index) => {
              return (
                <Row key={index}>
                  <Well>
                    <Row>
                    <Col sm={3} style={{borderRight: "1px dotted #dd8047"}}>
                      <div>
                        <Image style={{width: "100px", height: "auto"}} src={review.postedBy.photoUrl} />
                      </div>
                      <div>
                      {review.postedBy.firstName} {review.postedBy.lastName}
                      </div>
                      <div>
                      {review.postedBy.location}
                      </div>
                    </Col>
                    <Col sm={8}>
                      <div style={{marginBottom: "15px"}}>
                        <Stars rating={review.rating} />
                        <span>&nbsp;&nbsp;{review.rating}</span>
                      </div>
                      <div>
                        {review.comment}
                      </div>
                    </Col>
                    </Row>
                  </Well>
                </Row>);
            })}
          </Col>
        </Row>
      </Grid>);
  }
}

export default Product;