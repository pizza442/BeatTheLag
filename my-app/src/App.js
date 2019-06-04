import React, { Component } from 'react';
import firebase from 'firebase/app';
import Login from './Login';
import './App.css';
import Input from './Input';
import Calendar from './calendar';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            view: '',
            signedIn: false,
            accessToken: undefined,
        };

        this.handleSignIn = this.handleSignIn.bind(this);
    }

    componentDidMount() {
        this.authUnRegFunc = firebase.auth().onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {

                console.log("User has logged in: ", firebaseUser);

                this.setState({ user: firebaseUser });
                this.getRedirectResult();
            } else {
                console.log("User has logged out");

                this.setState({ user: null, signedIn: false});
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
            console.log(`Getting redirect result... ${authResult}`);

            if (credential) {
                // User successfully signed in.
                //this.handleSuccessfulSignIn(authResult);
                var user = authResult.user;
                var isNewUser = authResult.additionalUserInfo.isNewUser;

                // This gives you a Google Access Token. You can use it to access the Google API.
                var accessToken = credential.accessToken;
                
                // set the access token for the current user
                //this.setState({ signIn: true, accessToken: accessToken });
                thisApp.handleSignIn(accessToken);

                // for testing
                console.log(credential.accessToken);

                // Adds new users or updates returning users info on firebase
                if (isNewUser) {
                    // if the user has not signed in before
                    console.log('New user: ' + user.email);
        
                    // store user in firebase
                    firebase.database().ref('users/' + user.uid).set({
                        email: user.email,
                        accessToken: accessToken
                    });
                } else {
                    // Returning user
        
                    // for testing
                    console.log('Returning user: ' + user.email);
                    console.log("Updating access token for current user...");
        
                    // update the access token for the current user
                    let userRef = firebase.database().ref('users').child(user.uid);
                    userRef.update({ accessToken: accessToken });
                }
                
                
            }

        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;

            console.log(`${errorCode}:  ${errorMessage} \nemail:${email}\ncredential: ${credential}`);
        });
    }

    // changes the state 
    handleSignIn(accessToken) {
        console.log('User signed in, changing state...');

        this.setState({ signedIn: true, accessToken: accessToken });
    }

    //A callback function for logging out the current user
    handleSignOut() {
        this.setState({ errorMessage: null }); //clear old error

        firebase.auth().signOut()
            .then(() => {
                this.setState({signedIn: false});
            })
            .catch((err) => {
                console.log(err);
                this.setState({ errorMessage: err.message });
            })
    }

    render() {
        console.log(`Signed in: ${this.state.signedIn}\nAccess token: ${this.state.accessToken}`);

        let content = '';

        if (this.state.signedIn) {
            content = 
            <div>
                <Input accessToken={this.state.accessToken} ></Input>
                <Calendar accessToken={this.state.accessToken}></Calendar>
                <button id="signout-btn" className="btn" onClick={() => this.handleSignOut()}>Sign out</button>
            </div>;
        } else {
            content = <Login signInCallback={(token) => this.handleSignIn(token)}></Login>;
        }

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

                {content}

            </div>
        );
    }
}

export default App;
