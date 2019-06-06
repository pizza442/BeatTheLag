"use strict";
exports.__esModule = true;
var Calendar = /** @class */ (function () {
    function Calendar(accessToken, userId) {
        this.accessToken = accessToken;
        this.userId = userId;
        this.scopes = "https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.settings.readonly";
    }
    Calendar.prototype.testApi = function () {
    };
    return Calendar;
}());
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
exports["default"] = Calendar;
