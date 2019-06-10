"use strict";
/**
 * Mohammed Shakeel Khan & Sandy
 * Creates a schedule object that contains the users flight data, and regular sleep pattern.
 */
exports.__esModule = true;
var Schedule = /** @class */ (function () {
    function Schedule(DepartureTimeZone, DepartureDate, ArrivalTimeZone, NormalSleepTime, NormalWakeTime) {
        this.DepartureTimeZone = DepartureTimeZone;
        this.DepartureDate = DepartureDate;
        this.ArrivalTimeZone = ArrivalTimeZone;
        this.NormalSleepTime = NormalSleepTime;
        this.NormalWakeTime = NormalWakeTime;
        this.totalDaysNoAbs = parseInt(this.DepartureTimeZone.substring(4)) - parseInt(this.ArrivalTimeZone.substring(4));
        this.totalDays = Math.abs(this.totalDaysNoAbs);
        //2D array, where [i][0] is start time, [i][1] is end time
        this.calendar = [];
        for (var i = 0; i < this.totalDays; i++) {
            this.calendar.push([]);
        }
        // totalDays = DepartureDate - ArriveDate
        // sleepingLength =  NormalWakeTime - NormalSleepTime
        // length of schedule array should be totalDays
        // secheduleStartTime = NormalSleepTime
        // if (totalDays > 0) {
        //    User will sleep earlier and earlier: 11 -> 10 -> 9
        // } else if (totalDays < 0) {
        //    User will sleep earlier and earlier: 11 -> 12 -> 1
        // } else {
        //   "You don't need this page what are you doing"
        // }
    }
    Schedule.prototype.create = function () {
        //let dayDiff: number = Math.abs(this.DepartureDay - this.ArrivalDay);
        //let totalDays: number = this.DepartureDate - this.ArriveDate; //Shouldn't this be "time zone difference" instead?
        //Might want to put this in the constructor depending on how many times
        //this is called after initial construction.
        var startTime = parseInt(this.NormalSleepTime.substring(0, 2));
        var endTime = parseInt(this.NormalWakeTime.substring(0, 2));
        if (this.totalDaysNoAbs > 0) {
            for (var i = 0; i < this.totalDays; i++) {
                this.calendar[i][0] = startTime--;
                this.calendar[i][1] = endTime--;
                if (this.calendar[i][0] < 0) {
                    this.calendar[i][0] = 24;
                }
                if (this.calendar[i][1] < 0) {
                    this.calendar[i][1] = 24;
                }
            }
        }
        else if (this.totalDaysNoAbs < 0) {
            for (var i = 0; i < this.totalDays; i++) {
                this.calendar[i][0] = startTime++;
                this.calendar[i][1] = endTime++;
                if (this.calendar[i][0] >= 24) {
                    this.calendar[i][0] = 0;
                }
                if (this.calendar[i][1] >= 24) {
                    this.calendar[i][1] = 0;
                }
            }
        }
        else {
            alert("You don't need this page what are you doing, you ugly");
        }
        // Should we return the JSON array?
    };
    // return the date that shold be the start date of the sechedule
    Schedule.prototype.calculateStartDate = function () {
        //changed to .getDate() because it was recieving TYPE errors.
        var startDay = new Date(this.DepartureDate);
        startDay.setDate(startDay.getDate() - this.totalDays + 1);
        return startDay;
    };
    // return array of object with format:
    // {
    //      "sleepDate": "2019-04-02",
    //      "wakeDate": "2019-04-03"
    // }
    Schedule.prototype.translateDatetoString = function () {
        var date = this.calculateStartDate();
        var dateArray = Array();
        for (var i = 0; i < this.totalDays; i++) {
            var month = this.addZero(parseInt(date.getMonth()) + 1);
            var day = date.getDate();
            var year = date.getFullYear().toString();
            var dateStr = year + "-" + month + "-" + this.addZero(parseInt(day));
            // handling adding date for different month
            var dateForTmr = new Date(dateStr);
            dateForTmr.setDate(dateForTmr.getDate() + 2);
            var tmrMonth = this.addZero(dateForTmr.getMonth() + 1);
            var tmrDay = dateForTmr.getDate();
            var tmrYear = dateForTmr.getFullYear().toString();
            var tmrStr = tmrYear + "-" + tmrMonth + "-" + this.addZero(tmrDay);
            var output = {
                "sleepDate": dateStr,
                "wakeDate": tmrStr
            };
            dateArray.push(output);
            date.setDate(date.getDate() + 1);
        }
        return dateArray; // array format: [first date, second date... late date (should be departure date)]
    };
    // return string for number 
    // if absolute valur of number is smaller than 10, will add a 0 in front of it 
    Schedule.prototype.addZero = function (num) {
        var result = "";
        var input = Math.abs(num);
        if (input < 10) {
            result = "0" + input.toString();
        }
        else {
            result = input.toString();
        }
        return result;
    };
    // return string that repsent date in the format what google api want
    Schedule.prototype.getWhatGoogleApiNeed = function (date, hour, minute, timeZone) {
        return date + "T" + hour + minute + ":00" + timeZone + ":00";
    };
    // return string that represent time zone 
    // for example: "+09" or "-10"
    Schedule.prototype.makeTimeZone = function (timeZoneStr) {
        var result = "";
        if (timeZoneStr < 0) {
            result = "-" + this.addZero(timeZoneStr);
        }
        else {
            result = "+" + this.addZero(timeZoneStr);
        }
        return result;
    };
    //returns JSON... I guess.
    Schedule.prototype.packageJSON = function () {
        var result = Array();
        var date = this.translateDatetoString();
        this.create();
        for (var i = 0; i < this.calendar.length; i++) {
            var sleepHour = this.calendar[i][0];
            var wakeHour = this.calendar[i][1];
            var sleepHourStr = this.addZero(sleepHour);
            var wakeHourStr = this.addZero(wakeHour);
            var timeZone = this.makeTimeZone(parseInt(this.DepartureTimeZone.substring(4)));
            var event = {
                "start": {
                    "dateTime": this.getWhatGoogleApiNeed(date[i]["sleepDate"], sleepHourStr, this.NormalSleepTime.substr(2), timeZone)
                },
                "end": {
                    "dateTime": this.getWhatGoogleApiNeed(date[i]["wakeDate"], wakeHourStr, this.NormalWakeTime.substr(2), timeZone)
                }
            };
            result.push(event);
        }
        return result;
    };
    return Schedule;
}());
exports.Schedule = Schedule;
var Event = /** @class */ (function () {
    function Event(startTime, endTime) {
        this.start = {
            "dateTime": startTime
        },
            this.end = {
                "dateTime": endTime
            };
    }
    Event.prototype.eventJSON = function () {
        return JSON.stringify(this);
    };
    return Event;
}());
exports.Event = Event;
