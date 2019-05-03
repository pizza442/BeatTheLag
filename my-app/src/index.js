import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDGFApTkLg7HaIRjBrATMk3z-INzvUsIis",
  authDomain: "beatthelag-info442.firebaseapp.com",
  databaseURL: "https://beatthelag-info442.firebaseio.com",
  projectId: "beatthelag-info442",
  storageBucket: "beatthelag-info442.appspot.com",
  messagingSenderId: "214643886468"
};
firebase.initializeApp(config);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
