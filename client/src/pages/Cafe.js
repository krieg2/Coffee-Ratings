import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col, Button,
         Well, Jumbotron, Image } from 'react-bootstrap';
import API from '../utils/API';
import Stars from '../components/Stars';

class Cafe extends Component {

  state = {
    reviews: [],
    cafe: {},
    saved: false
  };

  componentWillMount(){

    // This is the externalId from foursquare.
    let extId = this.props.location.state.cafe.id;

    API.getCafeByExtId(extId, (cafe) => {

      // Find the cafe by external Id.
      // Populate the page from our database.
      // Else use the data from search results.
      if(cafe.data !== null && cafe !== undefined){

        this.setState({
          cafe: cafe.data,
          saved: true
        });

        if(typeof(cafe.data.reviews) === 'object' &&
          cafe.data.reviews.length > 0){

          this.setState({
            reviews: cafe.data.reviews
          });
        }

      } else {

        let address = this.props.location.state.cafe.location.formattedAddress.join(' ');
        let cafeData = {
          cafe: this.props.location.state.cafe
        };
        cafeData.cafe.address = address;
        this.setState(cafeData);
      }
    });
  }

  render() {

    return(
      <Grid fluid>
        <Row>
        <Jumbotron style={{position: 'relative'}}>
          <Button onClick={this.props.history.goBack} bsSize="small" bsStyle="default" className="backButton">Back</Button>
          <h1>{this.state.cafe.name}</h1>
          <h2>{this.state.cafe.url}</h2>
          <p>{this.state.cafe.address}</p>
          <p>Average Rating: <span>{this.state.cafe.avgRating}</span></p>
          <p><Stars rating={this.state.cafe.avgRating} /></p>
          <Link to={{pathname: "/rate", state: {item: this.state.cafe, type: 'cafe'}}}><i className="fa fa-thumbs-up"></i>Rate It</Link>
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