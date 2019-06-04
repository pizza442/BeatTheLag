import React, { Component } from 'react';
import gapi from 'gapi-client';

class Calendar extends Component {


    start() {
        console.log('Initializing JavaScript client library...');
        // 2. Initialize the JavaScript client library.
        gapi.client.init({
            'apiKey': 'AIzaSyDGFApTkLg7HaIRjBrATMk3z-INzvUsIis',
            // clientId and scope are optional if auth is not required.
            'clientId': '214643886468-sgfv4su0p5i39r61n9o1b3e3dpurhkd2.apps.googleusercontent.com',
            'scope': 'calendar',
        }).then(function () {
            // 3. Initialize and make the API request.
            return gapi.client.request({
                'path': 'https://www.googleapis.com/calendar/v3/',
            })
        }).then(function (response) {
            console.log(response.result);
        }, function (reason) {
            console.log('Error: ' + reason.result.error.message);
        });
    }

    componentDidMount() {
        // 1. Load the JavaScript client library.
        gapi.load('client', this.start());
    }

    addEvents() {
        // Refer to the JavaScript quickstart on how to setup the environment:
        // https://developers.google.com/calendar/quickstart/js
        // Change the scope to 'https://www.googleapis.com/auth/calendar' and delete any
        // stored credentials.

        var event = {
            'summary': 'BeatTheLag Test',
            'description': 'An event added by BeatTheLag',
            'start': {
                'dateTime': '2019-06-05T09:00:00-07:00',
                'timeZone': 'America/Los_Angeles'
            },
            'end': {
                'dateTime': '2019-06-05T17:00:00-07:00',
                'timeZone': 'America/Los_Angeles'
            },
            'attendees': [
                { 'email': 'vanelyruiz@gmail.com' }
            ],
            'reminders': {
                'useDefault': false,
                'overrides': [
                    { 'method': 'popup', 'minutes': 10 }
                ]
            }
        };

        var request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': event
        });

        request.execute(function (event) {
            //appendPre('Event created: ' + event.htmlLink);
        });
    }

    render() {



        return (
            <div>Calendar Component</div>
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