import React, { Component } from 'react';
import { BrowserRouter as Router, Route,
         Redirect, withRouter, Link } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Reviews from './pages/Reviews';
import Rate from './pages/Rate';
import { Navbar, Nav, Button, NavItem } from 'react-bootstrap';
import API from './utils/API';
import './App.css';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={ props => (
    API.isAuthenticated() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
);

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

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Navbar staticTop>
            <Navbar.Toggle />
            <Navbar.Collapse>
              <Nav bsStyle="pills" activeKey={1}>
                <NavItem eventKey={1}>
                  <Link to="/">Home</Link>
                </NavItem>
                <NavItem eventKey={2}>
                  <Link to="/reviews">Coffee Reviews</Link>
                </NavItem>
                <NavItem eventKey={3}>
                  <Link to="/reviews">Shop Reviews</Link>
                </NavItem>
                <NavItem eventKey={4}>
                  <Link to="/signup">Sign Up</Link>
                </NavItem>
                <NavItem eventKey={5}>
                  <AuthButton />
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
      
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/reviews" component={Reviews} />
          <PrivateRoute exact path="/rate" component={Rate} />
        </div>
      </Router>
    );
  }
}

export default App;
