import React, { Component } from 'react';
import { BrowserRouter as Router, Route,
         Redirect, withRouter, Link } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Reviews from './pages/Reviews';
import Rate from './pages/Rate';
import Profile from './pages/Profile';
import CafeLocator from './pages/CafeLocator'
import CreateProduct from './pages/CreateProduct'
import { Navbar, Nav, Button, NavItem } from 'react-bootstrap';
import API from './utils/API';
import './App.css';
import './pages/styles.css';

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
    <Link to="/login"><Button>Log In</Button></Link>
  )
));

const ProfileButton = withRouter(({ history }) => (
  API.isAuthenticated() ? (
    <Link to="/profile"><Button>Profile</Button></Link>
  ) : (
    <Link to="/signup"><Button>Sign Up</Button></Link>
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

    return (
      <Router>
        <div>
          <Navbar staticTop>
            <Navbar.Toggle />
            <Navbar.Collapse>
              <Nav bsStyle="tabs" role="tablist" activeKey={this.state.selected}
                   onSelect={key => this.handleSelect(key)}>
                <NavItem eventKey={1}>
                  <Link to="/">Home</Link>
                </NavItem>
                <NavItem eventKey={2}>
                  <Link to="/reviews">Coffee Reviews</Link>
                </NavItem>
                <NavItem eventKey={3}>
                  <Link to="/cafelocator">Shop Reviews</Link>
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
          <Route exact path="/cafelocator" component={CafeLocator} />
          <PrivateRoute exact path="/rate" component={Rate} />
          <PrivateRoute exact path="/createproduct" component={CreateProduct} />
          <PrivateRoute exact path="/profile" component={Profile} />        
        <footer className="page-footer blue center-on-small-only">
            <div className="footer-copyright">
                <div className="container-fluid" style={{color: "#ebd69c"}}>
                    © 2018 Copyright COFFEE RATING APP
                </div>
            </div>
          </footer>
         </div>
        </Router>

    );
  }
}

export default App;
