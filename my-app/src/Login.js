import React, { Component } from 'react';
import firebase from 'firebase/app';

class Login extends Component {

    /**
     * Handles Google Sign in
     */
    signIn() {
        var provider = new firebase.auth.GoogleAuthProvider();

        // ONCE APP IS VERIFIED
        // Ask to for permission to to access user's Google calendar
        // See, edit, share, and permanently delete all the calendars on Google Calendar 
        //provider.addScope('https://www.googleapis.com/auth/calendar');

        firebase.auth().signInWithRedirect(provider)
    }

    render() {
        return (
            <div className="content">
                <div className="buttons">
                    <button id="login-btn" className="btn" onClick={() => this.signIn()}>Sign in with Google</button>
                </div>
            </div>
        );
    }
}

export default Login;