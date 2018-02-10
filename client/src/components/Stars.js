import React from 'react';

class Stars extends React.Component {

  render() {

    let countFull = Math.floor(this.props.rating);

    let result = [];

    for(let i=0; i < countFull; i++){
     result.push(<i key={i} className="fa fa-star"></i>);
    }

    if(this.props.rating > countFull){
      result.push(<i key={countFull} className="fa fa-star-half"></i>);
    }

    return result;
  }
}

export default Stars;