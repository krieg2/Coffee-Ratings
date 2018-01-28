import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
  <div>
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">COFFEE RATING APP</a>
        </div>
        <ul class="nav navbar-nav">
          <li class="active"><a href="#">Home</a></li>
          <li><a href="#">  Coffee Reviews </a></li>
          <li><a href="#">| Shop Reviews                 </a></li>
          <li><a href="#">Sign Up</a></li>
          <li><a href="#"> Sign In</a></li>
        </ul>
      </div>
    </nav>

    <div class="jumbotron text-center" style={{backgroundColor: "#74533f"}}>
      <h1 style={{color: "#ebd69c", textTransform: "uppercase"}}>Coffee rating app</h1>
      <p style={{color: "#ebd69c"}}><em>Enhance Your Coffee Experience!</em></p> 
    </div>
  
    <div class="container">
      <div class="row">
        <div class="col-sm-4" style={{backgroundColor: "#94b6d2"}}>
          <h3>Column 1</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
        </div>
        <div class="col-sm-4" style={{backgroundColor: "#94b6d2"}}>
          <h3>Column 2</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
        </div>
        <div class="col-sm-4" style={{backgroundColor: "#94b6d2"}}>
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

export default App;
