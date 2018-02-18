import Axios from 'axios';
import jwt from 'jsonwebtoken';
const mapAccessToken = process.env.REACT_APP_MAPBOX_TOKEN;
const axios = Axios.create();

const initialState = {
  isAuthenticated: false,
  user: {
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    location: '',
    photoUrl: ''
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
  searchProductName: function(text, callback){

    axios.get("/api/productsearch/"+text, {headers: {Authorization: localStorage.getItem('jwtToken')}})
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

    axios.get('/api/products/')
    .then( res => {

      callback(res);
    })
    .catch( err => {
      callback(err.response);
    });
  },
  getProductsSorted: function(sortField, direction, callback){

    axios.get('/api/products/sorted/'+sortField+'/'+direction)
    .then( res => {

      callback(res);
    })
    .catch( err => {
      callback(err.response);
    });
  },
  getProduct: function(id, callback){

    axios.get('/api/product/'+id)
    .then( res => {

      callback(res);
    })
    .catch( err => {
      callback(err.response);
    });
  },
  getCafeByExtId: function(extId, callback){

    axios.get('/api/cafebyextid/'+extId)
    .then( res => {

      callback(res);
    })
    .catch( err => {
      callback(err.response);
    });
  },
  getCafesByExtIds: function(extIdArr, callback){

    axios.post('/api/cafesbyextids/', {
      extIdArr: extIdArr
    })
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
  },
  addCafeReview: function(id, data, callback){

    axios.post('/api/review/cafe/'+id, data, {headers: {Authorization: localStorage.getItem('jwtToken')}})
    .then( res => {

      callback(res);
    })
    .catch( err => {
      callback(err.response);
    });
  },
  geoLocate: function(query, callback){

    const geocodingUrl = 'https://api.mapbox.com/geocoding/v5';
    axios.get(`${geocodingUrl}/mapbox.places/${query}.json?access_token=${mapAccessToken}`)
    .then( res => {

      callback(res);
    })
    .catch( err => {
      callback(err.response);
    });
  }
};

