import axios from 'axios';
//import jwt from 'jsonwebtoken';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default {
  logout: function(callback){
    initialState.isAuthenticated = false;
    callback();
  },
  setToken: function(token){
    if(token){
      initialState.isAuthenticated = true;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else{
      delete axios.defaults.headers.common['Authorization'];
    }
  },
  login: function(data, callback){
    axios.post('/api/login', data)
    .then( res => {

      localStorage.setItem('jwtToken', res.data.token);
      this.setToken(res.data.token);
      callback(res);
    })
    .catch( (err) => {
      callback(err.response);
    });
  },
  signup: function(data, callback){
    axios.post('/api/signup', data)
    .then( res => {

      localStorage.setItem('jwtToken', res.data.token);
      this.setToken(res.data.token);
      callback(res);
     })
     .catch( (err) => {
       callback(err.response);
     });
  },
  isAuthenticated: function(){
    return initialState.isAuthenticated;
  }
};

