import React, { Component } from 'react';
import { BrowserRouter as Router, Route,
         Redirect, withRouter, Link } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Reviews from './pages/Reviews';
import Rate from './pages/Rate';
import Profile from './pages/Profile';
import Product from './pages/Product';
import CafeLocator from './pages/CafeLocator'
import CreateProduct from './pages/CreateProduct'
import { Navbar, Nav, Button, NavItem,
         DropdownButton, MenuItem } from 'react-bootstrap';
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
      <DropdownButton title="" pullRight id="menu">
        <MenuItem eventKey="1" style={{textAlign: "center"}}>
           <Link to="/profile"><i className="fa fa-user-plus" aria-hidden="true"></i>  Profile</Link>
        </MenuItem>
        <MenuItem eventKey="1" style={{textAlign: "center"}}>
          <div onClick={ () => {
            API.logout( () => history.push('/'))
          }}><i className="fa fa-power-off" aria-hidden="true"></i>  Log out</div>
        </MenuItem>
      </DropdownButton>
    </div>
  ) : (
    <Link to="/login"><Button>Log In</Button></Link>
  )
));

const SignupButton = withRouter(({ history }) => (
  API.isAuthenticated() ? (
    <span>Welcome {API.getName()}!</span>
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
      <div style={{margin: "0"}}>
        <Router>
          <div className="wrap">
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
                  <SignupButton />
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
            <Route exact path="/product" component={Product} />
            <PrivateRoute exact path="/rate" component={Rate} />
            <PrivateRoute exact path="/createproduct" component={CreateProduct} />
            <PrivateRoute exact path="/profile" component={Profile} />
          </div>
        </Router>

        <footer className="page-footer blue center-on-small-only">
          <div className="footer-copyright">
            <a href="https://www.facebook.com/coffee.app.58"><i className="fa fa-facebook" style={{fontSize:'40px',padding:'40px'}}></i></a>
            <a href="https://twitter.com/app_coffee"><i className="fa fa-twitter" style={{fontSize:'40px',padding:'40px'}}></i></a>
            <a href="https://plus.google.com/115860816639015232861"><i className="fa fa-google-plus" style={{fontSize:'40px',padding:'40px'}}></i></a>
            <a href="https://www.instagram.com/coffeeratingapp/"><i className="fa fa-instagram" style={{fontSize:'40px',padding:'40px'}}></i></a>
            <a href="https://www.pinterest.com/coffeeapp/"><i className="fa fa-pinterest" style={{fontSize:'40px',padding:'40px'}} ></i></a>
            <div className="container-fluid" style={{color: "#ebd69c", margin: "0"}}>© 2018 Copyright COFFEE RATING APP</div>
          </div>
        </footer>
      </div>

    );
  }
}

export default App;
