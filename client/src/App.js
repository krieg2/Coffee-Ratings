import React, { Component } from 'react';
import { BrowserRouter as Router, Route,
         Redirect, withRouter, Link } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Reviews from './pages/Reviews';
import Rate from './pages/Rate';
import Profile from './pages/Profile';
import cafeLocator from './pages/cafeLocator'
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
      <div>
        <span>Welcome {API.getName()}!  </span>
        <Button bsSize="xsmall" onClick={ () => {
          API.logout( () => history.push('/'))
        }}>Log out</Button>
      </div>
  ) : (
    <Link to="/login">Log In</Link>
  )
));

const ProfileButton = withRouter(({ history }) => (
  API.isAuthenticated() ? (
    <Link to="/profile">Profile</Link>
  ) : (
    <Link to="/signup">Sign Up</Link>
  )
));

class App extends Component {

  state = {
    selected: 1
  };

  handleSelect = (selectedKey) => {

    if(selectedKey > 3){
      selectedKey = 0;
    }
    this.setState({selected: selectedKey});
  }

  render() {

    let navStyle = {
      borderBottom: '2px solid #dd8047',
      fontSize: '18px'
    };

    return (
      <Router>
        <div>
          <Navbar staticTop style={navStyle}>
            <Navbar.Toggle />
            <Navbar.Collapse>
              <Nav bsStyle="tabs" role="tablist" activeKey={this.state.selected}
                   onSelect={key => this.handleSelect(key)}>
                <NavItem eventKey={1}>
                  <Link to="/">Home</Link>
                </NavItem>
                <NavItem eventKey={2}>
                  <Link to="/cafelocator">Coffee Reviews</Link>
                </NavItem>
                <NavItem eventKey={3}>
                  <Link to="/reviews">Shop Reviews</Link>
                </NavItem>
              </Nav>
              <Nav bsStyle="tabs" role="tablist" pullRight
                   onSelect={key => this.handleSelect(key)}>
                <NavItem eventKey={4}>
                  <ProfileButton />
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
          <Route exact path="/cafelocator" component={cafeLocator} />
          <PrivateRoute exact path="/rate" component={Rate} />
          <PrivateRoute exact path="/profile" component={Profile} />
        </div>
      </Router>
    );
  }
}

export default App;
