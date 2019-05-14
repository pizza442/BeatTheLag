import React, { Component } from 'react';
import firebase from 'firebase/app';
import firebaseui from 'firebaseui';

class Login extends Component {

    /**
     * Handles Google Sign in
     * If sign in is successfull, (TODO) redirects to schedule input form 
     * 
     * Uses code from Google's documentation https://firebase.google.com/docs/auth/web/firebaseui?authuser=0
     */
    signIn() {
        // uiConfig code 
        let uiConfig = {
            callbacks: {
              signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                // User successfully signed in.
                // Return type determines whether we continue the redirect automatically
                // or whether we leave that to developer to handle.
                return true;
              },
              uiShown: function() {
                // The widget is rendered.
                // Hide the loader.
                //document.getElementById('loader').style.display = 'none';
              }
            },
            // TODO: Change redirect url to schedule input form
            signInSuccessUrl: '<url-to-redirect-to-on-success>',
            signInOptions: [
              // Leave the lines as is for the providers you want to offer your users.
              firebase.auth.GoogleAuthProvider.PROVIDER_ID
            ]
          };
        let ui = new firebaseui.auth.AuthUI(firebase.auth());
        ui.start('#firebaseui-auth-container', uiConfig);
    }

    render() {
        this.signIn();
        return(
            <div id="firebaseui-auth-container"></div>
        );
    }
}

export default Login;