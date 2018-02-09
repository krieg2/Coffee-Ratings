import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Button,
         Well, Jumbotron } from 'react-bootstrap';
import API from '../utils/API';
import { getStars } from '../utils/Helper';

class Product extends Component {

  state = {
  	reviews: [],
    item: {},
    comment: "",
    rating: 0,
    hover: [false, false, false, false, false]
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
          <p>{getStars(this.state.item.avgRating)}</p>
          <Link to={{pathname: "/rate", state: {item: this.state.item}}}><i className="fa fa-thumbs-up"></i>Rate It</Link>
        </Jumbotron>
        </Row>
        {this.state.reviews.map( (review, index) => {
        return (<Row key={index}>
          <Well>{review.rating} {getStars(review.rating)} {review.comment}</Well>
        </Row>);
        })}
      </Grid>);
  }
}

export default Product;