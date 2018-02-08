import Axios from 'axios';
import jwt from 'jsonwebtoken';
const axios = Axios.create();

const initialState = {
  isAuthenticated: false,
  user: {
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    location: ''
  }
};

export default {
  logout: function(callback){

    initialState.isAuthenticated = false;
    localStorage.removeItem('jwtToken');
    callback();
  },
  setToken: function(token){

    if(token){

      initialState.isAuthenticated = true;
      let decoded = jwt.decode(token);
      initialState.user = decoded;
    }
  },
  login: function(data, callback){

    axios.post('/api/login', data)
    .then( res => {

      localStorage.setItem('jwtToken', res.data.token);
      this.setToken(res.data.token);
      callback(res);
    })
    .catch( err => {
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
     .catch( err => {
       callback(err.response);
     });
  },
  updateUser: function(id, data, callback){

    axios.put('/api/updateUser/'+id, data, {headers: {Authorization: localStorage.getItem('jwtToken')}})
    .then( res => {

      localStorage.setItem('jwtToken', res.data.token);
      this.setToken(res.data.token);
      callback(res);
     })
     .catch( err => {
       callback(err.response);
     });
  },
  isAuthenticated: function(){

    return initialState.isAuthenticated;
  },
  getName: function(){

    return initialState.user.firstName;
  },
  getUserId: function(){

    return initialState.user._id;
  },
  getProfile: function(){

    return initialState.user;
  },
  searchUPC: function(upc, callback){

    axios.get("/api/upcsearch/"+upc, {headers: {Authorization: localStorage.getItem('jwtToken')}})
    .then( res => {

      callback(res);
    })
    .catch( err => {
      callback(err.response);
    });
  },
  addProduct: function(data, callback){

    axios.post('/api/product/', data, {headers: {Authorization: localStorage.getItem('jwtToken')}})
    .then( res => {

      callback(res);
    })
    .catch( err => {
      callback(err.response);
    });
  },
  getProducts: function(callback){

    axios.get('/api/product/')
    .then( res => {

      callback(res);
    })
    .catch( err => {
      callback(err.response);
    });
  },
  getReviews: function(id, callback){

    axios.get('/api/reviews/'+id)
    .then( res => {

      callback(res);
    })
    .catch( err => {
      callback(err.response);
    });
  },
  addReview: function(id, data, callback){

    axios.post('/api/review/'+id, data, {headers: {Authorization: localStorage.getItem('jwtToken')}})
    .then( res => {

      callback(res);
    })
    .catch( err => {
      callback(err.response);
    });
  }
};

