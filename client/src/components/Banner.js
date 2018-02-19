import React, { Component } from 'react';
import background from '../pexels-photo-373888.jpeg';

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
          backgroundImage: `url(${background})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top center',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          overflow: 'hidden'
        }}>

            <div style={{
              position: 'absolute',
              top: '2%',
              right: '10%',
              height: '100px',
              width: '300px',
              color: 'white',
              fontSize: '24px',
              fontWeight: '400',
              textShadow: '0px -1px 8px white,0px 1px 8px white,0px -2px 12px black,0px 2px 12px black',
              transform: `translateY(${this.state.scrollPosition/2}%)`,
              WebkitTransform: `translateY(${this.state.scrollPosition/2}%)`,
              MozTransform: `translateY(${this.state.scrollPosition/2}%)`
            }}>
              <p>Read and post reviews of your favorite coffee beans and local coffee shops. Sign up for free today and start drinking better coffee!</p>
            </div>

        </div>
      </div>
     );
   }
}

export default Banner;