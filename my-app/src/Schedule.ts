/**
 * Mohammed Shakeel Khan & Sandy
 * Creates a schedule object that contains the users flight data, and regular sleep pattern.
 */

export class Schedule {

    private DepartureTimeZone: string;
    private DepartureDate: Date; //Date use .getDate().

    private ArrivalTimeZone: string;

    private NormalSleepTime: string;
    private NormalWakeTime: string;

    private totalDaysNoAbs: number;
    private totalDays: number;

    private calendar: number[][];
    private calendarString: string[][];

    constructor (DepartureTimeZone, DepartureDate,
                 ArrivalTimeZone,
                 NormalSleepTime, NormalWakeTime) {

        this.DepartureTimeZone = DepartureTimeZone;
        this.DepartureDate = DepartureDate;

        this.ArrivalTimeZone = ArrivalTimeZone;
        
        this.NormalSleepTime = NormalSleepTime;
        this.NormalWakeTime = NormalWakeTime;

        this.totalDaysNoAbs = parseInt(this.DepartureTimeZone.substring(4)) - parseInt(this.ArrivalTimeZone.substring(4));
        this.totalDays = Math.abs(this.totalDaysNoAbs);

        //2D array, where [i][0] is start time, [i][1] is end time
        this.calendar = [];
        this.calendarString = [];
        for (let i = 0; i < this.totalDays; i++) {
            this.calendar.push([]);
            this.calendarString.push([]);
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

    create() {
        //let dayDiff: number = Math.abs(this.DepartureDay - this.ArrivalDay);
        //let totalDays: number = this.DepartureDate - this.ArriveDate; //Shouldn't this be "time zone difference" instead?
        //Might want to put this in the constructor depending on how many times
        //this is called after initial construction.

        let startTime = parseInt(this.NormalSleepTime.substring(0,2));
        let endTime = parseInt(this.NormalWakeTime.substring(0,2));

        if (this.totalDaysNoAbs > 0) {
            for (let i = 0; i < this.totalDays; i++) {
                this.calendar[i][0] = startTime--;
                this.calendar[i][1] = endTime--;
                
                if (this.calendar[i][0] < 0) {
                    this.calendar[i][0] = 24;
                }
                if (this.calendar[i][1] < 0) {
                    this.calendar[i][1] = 24;
                }
            }
        } else if (this.totalDaysNoAbs < 0) {
            for (let i = 0; i < this.totalDays; i++) {
                this.calendar[i][0] = startTime++;
                this.calendar[i][1] = endTime++;

                if (this.calendar[i][0] >= 24) {
                    this.calendar[i][0] = 0;
                }
                if (this.calendar[i][1] >= 24) {
                    this.calendar[i][1] = 0;
                }
            }
        } else {
            alert("You don't need this page what are you doing, you ugly");
        }
        // Should we return the JSON array?
    }

    // return the date that shold be the start date of the sechedule
    calculateStartDate(): any {
        //changed to .getDate() because it was recieving TYPE errors.
        let startDay = new Date(this.DepartureDate);
        startDay.setDate(startDay.getDate() - this.totalDays + 1);
        return startDay;
    }

    // return array of object with format:
    // {
    //      "sleepDate": "2019-04-02",
    //      "wakeDate": "2019-04-03"
    // }
    translateDatetoString(): any {
        let date = this.calculateStartDate();
        let dateArray = Array();
        for(let i = 0; i < this.totalDays; i++ ) {
            let month = this.addZero(parseInt(date.getMonth())+1);
            let day = date.getDate();
            let year = date.getFullYear().toString();
            
            let dateStr = year + "-" + month + "-" + this.addZero(parseInt(day));

            // handling adding date for different month
            let dateForTmr = new Date(dateStr);     
            dateForTmr.setDate(dateForTmr.getDate() + 2); 
            
            let tmrMonth = this.addZero(dateForTmr.getMonth() + 1);         
            let tmrDay = dateForTmr.getDate();
            let tmrYear = dateForTmr.getFullYear().toString();
            let tmrStr = tmrYear + "-" + tmrMonth + "-" + this.addZero(tmrDay);
            
            let output = {
                "sleepDate": dateStr,
                "wakeDate": tmrStr
            };
            dateArray.push(output);
            date.setDate(date.getDate()+1); 

        }
        return dateArray; // array format: [first date, second date... late date (should be departure date)]
    }

    // return string for number 
    // if absolute valur of number is smaller than 10, will add a 0 in front of it 
    addZero(num): any {
        let result = "";
        let input = Math.abs(num);
        if (input < 10) {
            result = "0" + input.toString(); 
        } else {
            result = input.toString(); 
        }
        return result;
    }

    // return string that repsent date in the format what google api want
    getWhatGoogleApiNeed(date,hour, minute, timeZone): any {
        return date + "T" + hour + minute + ":00"+ timeZone + ":00";
    }

    // return string that represent time zone 
    // for example: "+09" or "-10"
    makeTimeZone(timeZoneStr) {
        let result = ""
        if(timeZoneStr < 0) {
            result = "-" + this.addZero(timeZoneStr);
        } else {
            result = "+" + this.addZero(timeZoneStr);
        }
        return result;
    }

    //returns JSON... I guess.
    packageJSON(): any {
        let result = Array();
        let date = this.translateDatetoString(); 
        this.create();
        for ( let i = 0; i < this.calendar.length; i++) {
            let sleepHour = this.calendar[i][0];
            let wakeHour = this.calendar[i][1];
            
            let sleepHourStr = this.addZero(sleepHour);
            let wakeHourStr = this.addZero(wakeHour);
            let timeZone = this.makeTimeZone(parseInt(this.DepartureTimeZone.substring(4))); 

            var event = {
                "start": {
                    "dateTime": this.getWhatGoogleApiNeed(date[i]["sleepDate"], sleepHourStr, this.NormalSleepTime.substr(2), timeZone)
                },
                "end": {
                    "dateTime": this.getWhatGoogleApiNeed(date[i]["wakeDate"], wakeHourStr, this.NormalWakeTime.substr(2), timeZone)
                },
            } ;
            result.push(event);
            this.calendarString[i][0] = date[i]["sleepDate"] + " " + sleepHourStr + this.NormalSleepTime.substr(2);
            this.calendarString[i][1] = date[i]["wakeDate"] + " " + wakeHourStr + this.NormalWakeTime.substr(2);
        }
        return result;
    }

    getCalendar(): any {
        return this.calendarString;
    }
}

export class Event {
    private start: Object;
    private end: Object;

    constructor (startTime: string, endTime: string) {
        this.start = {
            "dateTime" : startTime
        },
        this.end = {
            "dateTime": endTime
        }
    } 

    eventJSON(): string {
        return JSON.stringify(this);
    }
}