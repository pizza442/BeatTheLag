"use strict";
/**
 * Mohammed Shakeel Khan & Sandy
 * Creates a schedule object that contains the users flight data, and regular sleep pattern.
 */
exports.__esModule = true;
var Schedule = /** @class */ (function () {
    function Schedule(DepartureTimeZone, DepartureTime, DepartureDate, ArrivalTimeZone, NormalSleepTime, NormalWakeTime) {
        this.DepartureTimeZone = DepartureTimeZone;
        this.DepartureTime = DepartureTime;
        this.DepartureDate = DepartureDate;
        this.ArrivalTimeZone = ArrivalTimeZone;
        this.NormalSleepTime = NormalSleepTime;
        this.NormalWakeTime = NormalWakeTime;
        this.totalDays = Math.abs(parseInt(this.DepartureTimeZone.substring(4)) - parseInt(this.ArrivalTimeZone.substring(4)));
        //2D array, where [i][0] is start time, [i][1] is end time
        this.calendar = [];
        for (var i = 0; i < this.totalDays; i++) {
            this.calendar.push([]);
        }
        this.timeZoneMap = new Map();
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
        var sleepingLength = Math.abs(this.NormalWakeTime.getHours() - this.NormalSleepTime.getHours()); //Don't know if we're going to need this
        //Might want to put this in the constructor depending on how many times
        //this is called after initial construction.
        //Doesn't account for:
        //  *Months with 31 days.
        //  *Months with < 30 days.
        // if (monthDiff > 0) {
        //     for (let i = 0; i < monthDiff; i++) {
        //         this.totalDays += 30;
        //     }
        // }
        // for (let i = 0; i < this.totalDays; i++) {
        //     this.calendar.push([]);
        // }
        var startTime = this.NormalSleepTime.getHours();
        var endTime = this.NormalWakeTime.getHours();
        if (this.totalDays > 0) {
            for (var i = 0; i < this.totalDays; i++) {
                if (this.calendar[i][0] < 0) {
                    startTime = 25;
                }
                if (this.calendar[i][1] < 0) {
                    endTime = 25;
                }
                this.calendar[i][0] = startTime--;
                this.calendar[i][1] = endTime--;
            }
        }
        else if (this.totalDays < 0) {
            for (var i = 0; i < this.totalDays; i++) {
                if (this.calendar[i][0] > 24) {
                    startTime = 0;
                }
                if (this.calendar[i][1] > 24) {
                    endTime = 0;
                }
                this.calendar[i][0] = startTime++;
                this.calendar[i][1] = endTime++;
            }
        }
        else {
            alert("You don't need this page what are you doing, you ugly");
        }
        // Should we return the JSON array?
    };
    Schedule.prototype.test = function () {
        console.log("it's connected. Ali looks like Elmer FUdd");
    };
    Schedule.prototype.calculateStartDate = function () {
        var startDay = new Date(this.DepartureDate);
        startDay.setDate(startDay.getDate() - this.totalDays);
        return startDay;
    };
    Schedule.prototype.translateDatetoString = function () {
        var date = this.calculateStartDate();
        var dateArray = Array();
        for (var i = 0; i < this.totalDays; i++) {
            var month = (date.getMonth() + 1).toString();
            var day = date.getDate().toString();
            var year = date.getFullYear().toString();
            var dateStr = year + "-" + month + "-" + day;
            dateArray.push(dateStr);
            date.setDate(date.getDate() + 1);
        }
        return dateArray; // array format: [first date, second date... late date (should be departure date)]
    };
    //returns JSON... I guess.
    Schedule.prototype.packageJSON = function () {
        var result = Array();
        var date = this.translateDatetoString();
        for (var i = 0; i < this.calendar.length; i++) {
            var event = {
                "start": {
                    "dateTime": date[i] + this.calendar[i][0] // can we put variable here 
                },
                "end": {
                    "dateTime": date[i] + this.calendar[i][1]
                }
            };
            result.push(event);
        }
        return result;
    };
    return Schedule;
}());
exports.Schedule = Schedule;
