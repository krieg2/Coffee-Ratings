import React, { Component } from 'react';
import stillImg from '../still_699570857.png';
import video from '../699570857.mp4';

class Banner extends Component {

  state = {
    scrollPosition: 0
  };

  handleScroll = () => { 

    this.setState({
      scrollPosition: document.documentElement.scrollTop || document.body.scrollTop
    });
  };

  componentDidMount() {

    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {

    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {

    return (
      <div className="col" style={{height: '500px', width: '100%', padding: "0", margin: "0"}}>

        <div style={{
          position: 'relative',
          height: '100%',
          width: '100%',
          overflow: 'hidden'
        }}>

          <video autoPlay loop style={{position: "absolute", height: "auto", width: "100%"}} poster={stillImg}>
            <source src={video}></source>
          </video>

          <div style={{
            position: 'absolute',
            top: '8%',
            right: '10%',
            height: '100px',
            width: '250px',
            color: 'white',
            fontSize: '20px',
            fontWeight: '100',
            letterSpacing: '.2rem',
            transform: `translateY(${this.state.scrollPosition/1.2}%)`,
            WebkitTransform: `translateY(${this.state.scrollPosition/1.2}%)`,
            MozTransform: `translateY(${this.state.scrollPosition/1.2}%)`
          }}>
            <p>Read and post reviews of your favorite coffee beans and local coffee shops. Sign up for free today and start drinking better coffee!</p>
          </div>

        </div>
      </div>
     );
   }
}

export default Banner;