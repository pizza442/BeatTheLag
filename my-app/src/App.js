import React, { Component } from 'react';
import './App.css';
import {Fragment} from 'react';
import {Card} from 'mdbreact';

class App extends Component {

  render() {
    return (
      <div className="App">
         <Fragment>
                <div>BeatTheLag</div>
                <Card className="content_holder">
          
                        <div className="users-list-title">
                        <a onClick={() => this.openInNewTab()}>Sign In</a>
                        </div>

                       
                </Card>
                </Fragment>
      </div>
    );
  }
}

export default App;
