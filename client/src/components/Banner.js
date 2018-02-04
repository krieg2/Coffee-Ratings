import React, { Component } from 'react';
import background from '../pexels-photo-373888.jpeg';
import hands from '../hands.png';

class Banner extends Component {

  state = {
    scrollNum: 0
  };

  handleScroll = () => { 

    this.setState({
      scrollNum: document.documentElement.scrollTop
    });
  };

  componentDidMount() {
     window.onscroll = () => this.handleScroll()
   }

  render() {

    return (
      <div className="col" style={{height: '800px', width: '100%', padding: "0", margin: "0"}}>

        <div style={{
          position: 'relative',
          height: '100%',
          width: '100%',
          border: '2px solid #dd8047',
          backgroundImage: `url(${background})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top center',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          overflow: 'hidden'
        }}>

            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: '100%',
              width: '80%',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'top center',
              backgroundImage: `url(${hands})`
            }} />

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
              transform: `translate(0px, ${this.state.scrollNum/1.5}%)`
            }}>
              <p>Read and post reviews of your favorite coffee beans and local coffee shops. Sign up for free today and start drinking better coffee!</p>
            </div>

        </div>
      </div>
     );
   }
}

export default Banner;