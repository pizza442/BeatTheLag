import React, { Component } from 'react';
import gapi from 'gapi-client';
import { Schedule } from './Schedule';

class Calendar extends Component {


    /**
     * 
     * https://developers.google.com/api-client-library/javascript/start/start-js#option-2-use-gapiclientrequest
     */
    start() {
        //
        //var authorization = `Bearer ${this.props.accessToken}`;

        // 2. Initialize the JavaScript client library.
        gapi.client.init({
            'apiKey': 'AIzaSyDGFApTkLg7HaIRjBrATMk3z-INzvUsIis',
            // clientId and scope are optional if auth is not required.
            'clientId': '214643886468-sgfv4su0p5i39r61n9o1b3e3dpurhkd2.apps.googleusercontent.com',
            'scope': 'calendar',
        }).then(function () {
            // 3. Initialize and make the API request.

            console.log('Sending request to insert events...');
            return this.sendRequest();
        });
    }

    authenticate() {
        return gapi.auth2.getAuthInstance()
            .signIn({ scope: "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events" })
            .then(function () { console.log("Sign-in successful"); },
                function (err) { console.error("Error signing in", err); });
    }

    loadClient() {
        gapi.client.setApiKey("AIzaSyDGFApTkLg7HaIRjBrATMk3z-INzvUsIis");
        return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest")
            .then(function () { console.log("GAPI client loaded for API"); },
                function (err) { console.error("Error loading GAPI client for API", err); });
    }

    // Make sure the client is loaded and sign-in is complete before calling this method.
    execute() {
        gapi.client.calendar.events.insert({
            "calendarId": "primary",
            "sendNotifications": true,
            "resource": {
                "summary": "BeatTheLag Sleep Schedule",
                "description": "Sleep during this time to prevent jetlag!",
                "end": {
                    "dateTime": "2019-06-05T17:00:00-07:00"
                },
                "start": {
                    "dateTime": "2019-06-05T09:00:00-07:00"
                }
            }
        })
            .then(function (response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
            },
                function (err) { console.error("Execute error", err); });
    }

    componentDidMount() {
        //console.log('Setting token...');
        //gapi.client.setToken(this.accessToken);

        // 1. Load the JavaScript client library.
        //console.log('Initializing JavaScript client library...');
        //gapi.load('client', this.start());

        /**
         * Sample JavaScript code for calendar.events.insert
         * See instructions for running APIs Explorer code samples locally:
         * https://developers.google.com/explorer-help/guides/code_samples#javascript
         */
        gapi.load("client:auth2", function () {
            gapi.auth2.init({ client_id: "214643886468-gb9th8uf2rdmpmlnrvq8d65c8r6sp3fa.apps.googleusercontent.com" });

            //gapi.auth2.init({ client_id: "214643886468-sgfv4su0p5i39r61n9o1b3e3dpurhkd2.apps.googleusercontent.com" });
        });

        //this.authenticate().then(loadClient);
        //this.execute();

    }

    sendRequest() {
        return gapi.client.calendar.events.insert({
            "calendarId": "primary",
            "sendNotifications": true,
            "resource": {
                "summary": "BeatTheLag Sleep Schedule",
                "description": "Sleep during this time to prevent jetlag!",
                "end": {
                    "dateTime": "2019-06-05T17:00:00-07:00"
                },
                "start": {
                    "dateTime": "2019-06-05T09:00:00-07:00"
                }
            }
        })
            .then(function (response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
            },
                function (err) {
                    console.error("Execute error", err);
                });
    }

    request() {
        // Refer to the JavaScript quickstart on how to setup the environment:
        // https://developers.google.com/calendar/quickstart/js
        // Change the scope to 'https://www.googleapis.com/auth/calendar' and delete any
        // stored credentials.

        var event = {
            "calendarId": "primary",
            "sendNotifications": true,
            "resource": {
                "summary": "BeatTheLag Sleep Schedule",
                "description": "Sleep during this time to prevent jetlag!",
                "end": {
                    "dateTime": "2019-06-05T09:00:00-07:00"
                },
                "start": {
                    "dateTime": "2019-06-05T17:00:00-07:00"
                }
            }
        };

        // arguments for request to insert events into user's primary calendar
        // maybe add authorization: 
        var args = {
            method: 'POST',
            path: 'https://www.googleapis.com/calendar/v3/calendars/primary/events',

        };


        /*var request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': event
        });

        request.execute(function (event) {
            //appendPre('Event created: ' + event.htmlLink);
        });*/
    }

    render() {
        //<button onClick ={this.authenticate().then(this.loadClient)} > authorize and load </button>

        return (
            <div>Calendar Component
                
                <button onClick ={this.execute()} > execute </button>
            </div>
        );
    }
}

export default Calendar;

//start()


//console.log('JavaScript client library loaded');
/*
  gapi.load('client', {
    callback: function() {
      // Handle gapi.client initialization.
      initGapiClient();
    },
    onerror: function() {
      // Handle loading error.
      alert('gapi.client failed to load!');
    },
    timeout: 5000, // 5 seconds.
    ontimeout: function() {
      // Handle timeout.
      alert('gapi.client could not load in a timely manner!');
    }
  });
*/