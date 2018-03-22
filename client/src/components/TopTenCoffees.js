import React from 'react';
import { Carousel, Image } from 'react-bootstrap';
import API from '../utils/API';

class TopTenCoffees extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      results: []
    };

    API.getTopTen('coffee', (res) => {

      if(typeof(res.data) === 'object' &&
        res.data.length > 0){
        this.setState({results: res.data});
      }
    });
  }

  render() {

        const imageStyle = {
          height: "485px",
          lineHeight: "485px",
          width: "550px",
          margin: "0 auto",
          padding: "0",
          borderRadius: "5px",
          border: "2px solid #337ab7", //#dd8047
          background: "#fff",
          textAlign: "center",
          overflow: "hidden"
        };

  	return (<div>
      <h1 style={{marginLeft: "20px", color: "#74533f"}}>Top Ten Coffees:</h1>
      <Carousel>
  		{this.state.results.map( (item, index) => {


  		  return(<Carousel.Item key={index}>
                 <div style={imageStyle}>
                   <Image src={item.image} alt={item.title} style={{minHeight: "160px", maxHeight: "485px", verticalAlign: "middle"}} />
                 </div>
                 <Carousel.Caption style={{color: "#74533f", textShadow: "2px 1px 2px white"}}>
                   <h1>{`#${index+1}`}</h1>
                   <h3>{item.brand}</h3>
                   <p>{item.title}</p>
                 </Carousel.Caption>
               </Carousel.Item>);
  		})}
	  </Carousel>
    </div>);
  }
}

export default TopTenCoffees;