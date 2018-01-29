import axios from 'axios';
//import jwt from 'jsonwebtoken';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default {
  logout: function(){
    initialState.isAuthenticated = false;
  },
  setToken: function(token){
    if(token){
      initialState.isAuthenticated = true;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else{
      delete axios.defaults.headers.common['Authorization'];
    }
  },
  login: function(data){
    axios.post('/api/login', data)
    .then( res => {

      localStorage.setItem('jwtToken', res.data.token);
      this.setToken(res.data.token);
    });
  },
  signup: function(data){
    axios.post('/api/signup', data)
    .then( res => {

      localStorage.setItem('jwtToken', res.data.token);
      this.setToken(res.data.token);
     });
  },
  isAuthenticated: function(){
    return initialState.isAuthenticated;
  }
};

