import React, { Component } from 'react';
import firebase from 'firebase/app';
import {Schedule} from './Schedule';

class Calendar {
    private scopes: string;

    constructor(private accessToken: string,
                private userId: string) {
        this.scopes = "https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.settings.readonly";
    }

    testApi() {

    }

}

/*
class Calendar extends Component {
    constructor(props) {
        super(props);
        //this.state{};
    }

    render() {

        return({

        })
    }
}
*/
export default Calendar;