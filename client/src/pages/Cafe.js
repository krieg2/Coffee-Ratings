import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col, Button,
         Well, Jumbotron, Image } from 'react-bootstrap';
import API from '../utils/API';
import Stars from '../components/Stars';

class Cafe extends Component {

  state = {
    reviews: [],
    cafe: {}
  };

  componentWillMount(){

    //let id = this.props.location.state.cafe._id;
    this.setState({
      cafe: this.props.location.state.cafe
    });

    // API.getProduct(id, (product) => {

    //   if(product.data){

    //     this.setState({
    //       cafe: product.data
    //     });
    //     API.getReviews(id, (reviews) => {

    //       if(typeof(reviews.data) === 'object' &&
    //         reviews.data.length > 0){

    //         this.setState({
    //           reviews: reviews.data
    //         });
    //       }
    //     });
    //   }
    // });
  }

  render() {

    return(
      <Grid fluid>
        <Row>
        <Jumbotron style={{position: 'relative'}}>
          <Button onClick={this.props.history.goBack} bsSize="small" bsStyle="default" className="backButton">Back</Button>
          <h1>{this.state.cafe.name}</h1>
          <h2>{this.state.cafe.url}</h2>
          <p>{this.state.cafe.location.formattedAddress}</p>
          <p>Average Rating: <span>{this.state.cafe.avgRating}</span></p>
          <p><Stars rating={this.state.cafe.avgRating} /></p>
          <Link to={{pathname: "/rate", state: {cafe: this.state.cafe}}}><i className="fa fa-thumbs-up"></i>Rate It</Link>
        </Jumbotron>
        </Row>
        <Row>
          <Col xs={12} sm={4} md={4} className="topAndBottom">
            <Image src={this.state.cafe.image} responsive />
          </Col>
          <Col xs={12} sm={5} md={5} className="topAndBottom">
            {this.state.reviews.map( (review, index) => {
              return (
                <Row key={index}>
                  <Well>
                    <div >
                      <Image style={{width: "50px", height: "50px"}} src={review.postedBy.photoUrl} />
                    </div>
                    {review.postedBy.firstName} {review.postedBy.lastName} {review.rating}
                    <Stars rating={review.rating} />
                    {review.comment}
                  </Well>
                </Row>);
            })}
          </Col>
        </Row>
      </Grid>);
  }
}

export default Cafe;