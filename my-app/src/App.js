import React, { Component } from 'react';
import Login from './Login';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>BeatTheLag</h1>
        </div>
        <p className="App-description">
        With <strong>BeatTheLag</strong>, you can create your own personalized jet lag plans and arrive at 
        your best. Whether you’re traveling for business, going on vacation, or competing in a sports 
        event abroad, <strong>BeatTheLag</strong> will help optimize your performance, enjoyment, and 
        health when traveling.
        </p>
        
        <Login></Login>
      </div>
    );
  }
}

export default App;
