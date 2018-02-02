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
    delete Axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('jwtToken');
    callback();
  },
  setToken: function(token){

    if(token){

      initialState.isAuthenticated = true;
      let decoded = jwt.decode(token);
      initialState.user = decoded;

      Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    } else{
      delete Axios.defaults.headers.common['Authorization'];
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
  updateUser: function(id, data, callback){

    axios.put('/api/updateUser/'+id, data, {headers: {Authorization: localStorage.getItem('jwtToken')}})
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
  },
  getName: function(){

    return initialState.user.firstName;
  },
  getProfile: function(){

    return initialState.user;
  }
};

