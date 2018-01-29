import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import API from './utils/API';
import registerServiceWorker from './registerServiceWorker';


API.setToken(localStorage.jwtToken);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
