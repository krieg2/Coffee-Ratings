import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import API from '../utils/API';

const AuthButton = withRouter(({ history }) => (
  API.isAuthenticated() ? (
    <Link to="/">
      Welcome {API.getName()}! <Button bsSize="xsmall" onClick={ () => {
        API.logout( () => history.push('/'))
      }}>Log out</Button>
    </Link>
  ) : (
    <Link to="/login"> Log In</Link>
  )
));

class Home extends Component {

  render() {

    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">COFFEE RATING APP</a>
            </div>
            <ul className="nav navbar-nav">
              <li className="active"><Link to="#">Home</Link></li>
              <li><Link to="#">  Coffee Reviews </Link></li>
              <li><Link to="#">| Shop Reviews                 </Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
              <li><AuthButton /></li>
            </ul>
          </div>
        </nav>

        <div className="jumbotron text-center" style={{backgroundColor: "#74533f"}}>
          <h1 style={{color: "#ebd69c", textTransform: "uppercase"}}>Coffee rating app</h1>
          <p style={{color: "#ebd69c"}}><em>Enhance Your Coffee Experience!</em></p> 
        </div>
      
        <div className="container">
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