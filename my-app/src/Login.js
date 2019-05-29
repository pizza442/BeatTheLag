import React, { Component } from 'react';
import firebase from 'firebase/app';
import firebaseui from 'firebaseui';
import Input from './Input';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.signInSuccessWithAuthResultCallback = this.signInSuccessWithAuthResultCallback.bind(this);
    }

    /**
     * Handles Google Sign in
     * If sign in is successfull, (TODO) redirects to schedule input form
     *
     * Uses code from Google's documentation https://firebase.google.com/docs/auth/web/firebaseui?authuser=0
     */
    openInNewTab =(url)=> {
      var win = window.open(url, '_blank');
      win.focus();
    }

    signInSuccessWithAuthResultCallback(authResult) {
        // User successfully signed in.
        var user = authResult.user;
        var credential = authResult.credential;
        var isNewUser = authResult.additionalUserInfo.isNewUser;
        var userId = user.uid
    
        // for testing
        console.log(authResult);

        if (credential) {
            // https://firebase.google.com/docs/auth/web/google-signin
            // This gives you a Google Access Token. You can use it to access the Google API.
            var accessToken = credential.accessToken;

            // for testing
            console.log(credential.accessToken);

            if (isNewUser) {
                // if the user has not signed in before
                console.log('New user: ' + user.email);
                
                // store user in firebase
                firebase.database().ref('users/' + userId).set({
                    email: user.email,
                    accessToken: accessToken
                })
            } else  {
                // Returning user

                // for testing
                console.log('Returning user: ' + user.email);
                console.log("Updating access token for current user...");
                
                // update the access token for the current user
                let userRef = firebase.database().ref('users').child(userId);
                userRef.update({ accessToken: accessToken })
            }
            // set the access token for the current user
            this.setState({token: accessToken});
        }
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        // Do something with the returned AuthResult.
        return true;
      }

    componentDidMount() {
        var loginThis = this;
        
        // uiConfig code 
        let uiConfig = {
            callbacks: {
                signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                loginThis.signInSuccessWithAuthResultCallback(authResult);
            }, 
              uiShown: function() {
                // The widget is rendered.
                // Hide the loader.
                //document.getElementById('loader').style.display = 'none';
              }
            },
            // TODO: Change redirect url to schedule input form
            signInSuccessUrl: "test.html",
            signInOptions: [
              // Leave the lines as is for the providers you want to offer your users.
              firebase.auth.GoogleAuthProvider.PROVIDER_ID
            ]
          };
        let ui = new firebaseui.auth.AuthUI(firebase.auth());
        ui.start('#firebaseui-auth-container', uiConfig);
    }

    render() {
        return(
            <div id="firebaseui-auth-container"></div>
        );
    }
}

export default Login;
