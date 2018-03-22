import React, { Component } from 'react';

class Landing extends Component {

  state = {
    animated: false
  };

  handleScroll = () => { 

    let rect = this.instance.getBoundingClientRect();
    let wHeight = window.innerHeight / 1.2;
    if(rect.top - wHeight <= 0){

      setTimeout( () => {
      	this.setState({
          animated: true
        });
      }, (700 * (Math.exp(this.props.offset * 0.14))) - 700);
    }

  };

  componentDidMount() {

    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {

    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {

    let circle = {
      textShadow: "4px 3px 3px #999",
      border: "2px solid #dd8047",
      borderRadius: "50%",
      padding: "25px"
    }

    return (
      <div className={(this.state.animated === true) ? "landing" : "animated-landing"}
           ref={(instance) => { this.instance = instance; }}>
        <h2 style={{color: "#dd8047"}}><b>{this.props.title}</b></h2>
        <h1 style={{}}><i className={this.props.fontAwesome} style={circle} aria-hidden="true"></i></h1>
        <p style={{fontSize: "18px", letterSpacing: ".1rem"}}>{this.props.description}</p>
      </div>
     );
   }
}

export default Landing;