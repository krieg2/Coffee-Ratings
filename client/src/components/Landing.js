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
    } else {

      this.setState({
        animated: false
      });
    }

  };

  componentDidMount() {

    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {

    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {

    return (
      <div className={(this.state.animated === true) ? "landing" : "animated-landing"}
           ref={(instance) => { this.instance = instance; }}>
        <h2>{this.props.title}</h2>
        <h1><i className={this.props.fontAwesome} aria-hidden="true"></i></h1>
        <p>{this.props.description}</p>
      </div>
     );
   }
}

export default Landing;