import React, { Component } from 'react';
import firebase from 'firebase/app';
//import Input from './Input';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accessToken: ""
        };

        this.signIn = this.signIn.bind(this);
    }

    componentDidMount() {
        //this.signIn();
    }

    /*redirect() {
        if (this.state.signedIn) {
            // got to input page
            //<Input accessToken={this.state.accessToken}></Input>
        } else {
            this.signIn();
        }
    }*/

    /**
     * Handles Google Sign in
     */
    signIn() {
        var provider = new firebase.auth.GoogleAuthProvider();

        // Ask to for permission to to access user's Google calendar
        // See, edit, share, and permanently delete all the calendars on Google Calendar 
        provider.addScope('https://www.googleapis.com/auth/calendar');

        firebase.auth().signInWithRedirect(provider)

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
                this.props.signInCallback(accessToken);

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

    handleSuccessfulSignIn(authResult) {
        var credential = authResult.credential;
        var user = authResult.user;
        var isNewUser = authResult.additionalUserInfo.isNewUser;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var accessToken = credential.accessToken;

        // for testing
        console.log(credential.accessToken);

        // Adds new users or updates returning users info on firebase
        this.updateFirebase(isNewUser, user, accessToken);
        
        // set the access token for the current user
        //this.setState({ signIn: true, accessToken: accessToken });
        this.props.signInCallback(accessToken);
    }

    updateFirebase(isNewUser, user, accessToken) {
        if (isNewUser) {
            // if the user has not signed in before
            console.log('New user: ' + user.email);

            // store user in firebase
            firebase.database().ref('users/' + user.id).set({
                email: user.email,
                accessToken: accessToken
            });
        } else {
            // Returning user

            // for testing
            console.log('Returning user: ' + user.email);
            console.log("Updating access token for current user...");

            // update the access token for the current user
            let userRef = firebase.database().ref('users').child(user.id);
            userRef.update({ accessToken: accessToken });
        }
    }

    render() {


        return (
            <div className="content">
                <button id="login-btn" className="btn" onClick={() => this.signIn()}>Sign in with Google</button>
                
            </div>
        );
    }
}

export default Login;
