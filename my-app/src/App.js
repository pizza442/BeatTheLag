import React, { Component } from 'react';
import firebase from 'firebase/app';
import Login from './Login';
import './App.css';
import Input from './Input';

const logo = require('./logo.png');

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            signedIn: false,
            accessToken: null,
            loading: true //loading change here
        };
    }

    componentDidMount() {
        this.authUnRegFunc = firebase.auth().onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                console.log("User signed in");

                this.getRedirectResult();
                this.setState({loading: false}); //loading change here
            } else {
                console.log("No user logged in");

                this.setState({ user: null, signedIn: false, loading: false}); //loading change here
            }
        })
    }

    componentWillUnmount() {
        this.authUnRegFunc();
    }

    getRedirectResult() {
        var thisApp = this;

        firebase.auth().getRedirectResult().then(function (authResult) {
            var credential = authResult.credential;

            // for testing
            //console.log(`Getting redirect result...`);

            if (credential) {
                // User successfully signed in
                var user = authResult.user;
                var isNewUser = authResult.additionalUserInfo.isNewUser;

                // This gives you a Google Access Token. You can use it to access the Google API
                var accessToken = credential.accessToken;

                // set the access token for the current user
                thisApp.handleSignIn(accessToken);

                // Adds new users or updates returning users info on firebase
                if (isNewUser) {
                    // if the user has not signed in before
                    //console.log('New user: ' + user.email);
        
                    // store user in firebase
                    firebase.database().ref('users/' + user.uid).set({
                        email: user.email,
                        accessToken: accessToken
                    });
                } else {
                    // Returning user
        
                    // update the access token for the current user
                    let userRef = firebase.database().ref('users').child(user.uid);
                    userRef.update({ accessToken: accessToken });
                }
            }

        }).catch(function (error) {
            // Handle Errors here
            console.log("Error in getting redirect result...");
            thisApp.handleError(error.message);
        });
    }

    // changes the state 
    handleSignIn(accessToken) {
        console.log('Signed in');

        this.setState({ 
            signedIn: true, 
            accessToken: accessToken, 
            loading: false 
        }); //loading change here
    }

    //A callback function for logging out the current user
    handleSignOut() {
        this.setState({ errorMessage: null }); //clear old error

        firebase.auth().signOut()
            .then(() => {
                console.log("Signing out...");
                this.setState({signedIn: false, accessToken: null, loading: false});
            })
            .catch((error) => {
                console.log('Error in signing out...');
                this.handleError(error.message);
            })
    }

    // Changes state to display error message
    handleError(error) {
        console.log(error);
        this.setState({ errorMessage: error });
    }

    render() {
        // For testing
        //console.log(`Signed in: ${this.state.signedIn}\nAccess token: ${this.state.accessToken}`);

        let content = '';
        let error = null;

        if (this.state.loading) { //loading change here
            content = (<div className="content loading">LOADING...</div>);
        } else if (this.state.signedIn) {
            // show input form and signout button
            content =   <Input 
                            accessToken={this.state.accessToken} 
                            signOutCallback={() => this.handleSignOut()}
                            errorCallback={(error) => this.handleError(error)}>
                        </Input>;
        } else {
            // show sign in button
            content =   <Login 
                            signInCallback={(token) => this.handleSignIn(token)}
                            errorCallback={(error) => this.handleError(error)}
                            redirectCallback={() => this.getRedirectResult()}>
                        </Login>;
        }

        if (this.state.errorMessage) {
            error = <div className="error">{this.state.errorMessage}</div>;
        }

        return (
            <div className="App">
                <div className="App-header">
                    <img className="App-logo" src={logo} alt="BeatTheLag logo"/>
                    <h1>BeatTheLag</h1>
                </div>
                <p className="App-description">
                    With <strong>BeatTheLag</strong>, you can create your own personalized jet lag plans and arrive at
                    your best. Whether you’re traveling for business, going on vacation, or competing in a sports
                    event abroad, <strong>BeatTheLag</strong> will help optimize your performance, enjoyment, and
                    health when traveling.
                </p>

                {error}

                {content}

            </div>
        );
    }
}

export default App;
