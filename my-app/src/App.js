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
          hellloooo
        </p>
        
        <Login></Login>
      </div>
    );
  }
}

export default App;
