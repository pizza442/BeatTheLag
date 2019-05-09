import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import firebase from 'firebase/app';
import 'firebase/auth'; 
import 'firebase/database';
import 'firebase/storage';
import config from 'firebaseconfig';

// Initialize Firebase
firebase.initializeApp(config);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
