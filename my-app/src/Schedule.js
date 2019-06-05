"use strict";
/**
 * Mohammed Shakeel Khan & Sandy
 * Creates a schedule object that contains the users flight data, and regular sleep pattern.
 */
exports.__esModule = true;
var Schedule = /** @class */ (function () {
    function Schedule(DepartureTimeZone, DepartureDate, ArrivalTimeZone, ArrivalDate, NormalSleepTime, NormalWakeTime) {
        this.DepartureTimeZone = DepartureTimeZone;
        this.DepartureDate = DepartureDate;
        this.ArrivalTimeZone = ArrivalTimeZone;
        this.ArrivalDate = ArrivalDate;
        this.NormalSleepTime = NormalSleepTime;
        this.NormalWakeTime = NormalWakeTime;
        this.totalDays = Math.abs(parseInt(this.DepartureTimeZone.substring(5)) - parseInt(this.ArrivalTimeZone.substring(5)));
        //2D array, where [i][0] is start time, [i][1] is end time
        this.calendar = [];
        for (var i = 0; i < this.totalDays; i++) {
            this.calendar.push([]);
        }
        this.timeZoneMap = new Map();
    }
    Schedule.prototype.create = function () {
        //let dayDiff: number = Math.abs(this.DepartureDay - this.ArrivalDay);
        //let totalDays: number = this.DepartureDate - this.ArriveDate; //Shouldn't this be "time zone difference" instead?
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
        var sleepingLength = Math.abs(this.NormalWakeTime.getHours() - this.NormalSleepTime.getHours()); //Don't know if we're going to need this
        var startTime = this.NormalSleepTime.getHours();
        var endTime = this.NormalWakeTime.getHours();
        if (this.ArrivalTimeZone - this.DepartureTimeZone > 0) {
            for (var i = 0; i < this.totalDays; i++) {
                if (this.calendar[i][0] < 0) {
                    startTime = 25;
                }
                if (this.calendar[i][1] < 0) {
                    endTime = 25;
                }
                this.calendar.push(startTime--);
                this.calendar.push(endTime--);
            }
        }
        else if (this.ArrivalTimeZone - this.DepartureTimeZone < 0) {
            for (var i = 0; i < this.totalDays; i++) {
                if (this.calendar[i][0] > 24) {
                    startTime = 0;
                }
                if (this.calendar[i][1] > 24) {
                    endTime = 0;
                }
                this.calendar.push(startTime++);
                this.calendar.push(endTime++);
            }
        }
        else {
            alert("You don't need this page what are you doing, you ugly");
        }
        // Should we return the JSON array?
    };

    Schedule.prototype.test = function () {    
    };

    // return date string that gonna be used in the event
    // function work in testing, but when using return it won't work
    Schedule.prototype.calculateStartMonth = function () {
        let startDay = new Date(this.DepartureDate);
        startDay.setDate(startDay.getDate() - this.totalDays);
    };

    //returns JSON... I guess.
    //put the forloops here caouse I don't know
    Schedule.prototype.packageJSON = function () {
        let result = Array();
        for ( let i = 0; i < this.calendar.length; i++) {
            var event = {
                "start": {
                    "dateTime": "2019-05-24T09:00:00-07:00" // can we put variable here 
                },
                "end": {
                    "dateTime": "2019-05-30T09:00:00-07:00"
                }
            } ;
            result.push(event);
        }
        return result;
    };
    return Schedule;
}());
exports.Schedule = Schedule;
