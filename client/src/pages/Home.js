import React, { Component } from 'react';
import Banner from '../components/Banner.js';

class Home extends Component {

  render() {

    return (
      <div>
        <div className="jumbotron text-center" style={{backgroundColor: "#74533f"}}>
          <h1 style={{color: "#ebd69c", textTransform: "uppercase"}}>Coffee rating app</h1>
          <p style={{color: "#ebd69c"}}><em>Life is too short to drink bad coffee!</em></p> 
        </div>

        <div className="container">
          <div className="row">
            <Banner />
          </div>
          <div className="row">
            <div className="col-sm-4" style={{backgroundColor: "#94b6d2"}}>
              <h3>Column 1</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
              <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
            </div>
            <div className="col-sm-4" style={{backgroundColor: "#94b6d2"}}>
              <h3>Column 2</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
              <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
            </div>
            <div className="col-sm-4" style={{backgroundColor: "#94b6d2"}}>
              <h3>Column 3</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
              <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
            </div>
          </div>

          <footer className="page-footer blue center-on-small-only">
            <div className="footer-copyright">
                <div className="container-fluid" style={{color: "#ebd69c"}}>
                    © 2018 Copyright COFFEE RATING APP
                </div>
            </div>
          </footer>  
        </div>
      </div>);
  }
}

export default Home;