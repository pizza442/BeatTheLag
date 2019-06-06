/**
 * Mohammed Shakeel Khan & Sandy
 * Creates a schedule object that contains the users flight data, and regular sleep pattern.
 */

export class Schedule {

    private DepartureTimeZone: string;
    private DepartureTime: Date; //Mean't to be the time. use .getHours() and .getMinutes().
    private DepartureDate: Date; //Date use .getDate().
    private DepartureMonth: number;
    private DepartureDay: number;
    private DepartureYear: number;

    private ArrivalTimeZone: string;

    private NormalSleepTime: Date;
    private NormalWakeTime: Date;

    private totalDays: number;

    private calendar: number[][];
    private timeZoneMap: Map<string, any[]>;


    constructor (DepartureTimeZone, DepartureDate,
                 ArrivalTimeZone,
                 NormalSleepTime, NormalWakeTime) {

        this.DepartureTimeZone = DepartureTimeZone;
        this.DepartureDate = DepartureDate;

        this.ArrivalTimeZone = ArrivalTimeZone;
        
        this.NormalSleepTime = NormalSleepTime;
        this.NormalWakeTime = NormalWakeTime;

        this.totalDays = Math.abs(parseInt(this.DepartureTimeZone.substring(4)) - parseInt(this.ArrivalTimeZone.substring(4)));
        //2D array, where [i][0] is start time, [i][1] is end time
        this.calendar = [];
        for (let i = 0; i < this.totalDays; i++) {
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

    create() {
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

        let startTime = this.NormalSleepTime.getHours();
        let endTime = this.NormalWakeTime.getHours();

        if (this.totalDays > 0) {
            for (let i = 0; i < this.totalDays; i++) {
                if (this.calendar[i][0] < 0) {
                    startTime = 25;
                }
                if (this.calendar[i][1] < 0) {
                    endTime = 25;
                }
                this.calendar[i][0] = startTime--;
                this.calendar[i][1] = endTime--;
            }
        } else if (this.totalDays < 0) {
            for (let i = 0; i < this.totalDays; i++) {
                if (this.calendar[i][0] > 24) {
                    startTime = 0;
                }
                if (this.calendar[i][1] > 24) {
                    endTime = 0;
                }
                this.calendar[i][0] = startTime++;
                this.calendar[i][1] = endTime++;
            }
        } else {
            alert("You don't need this page what are you doing, you ugly");
        }
        // Should we return the JSON array?
    }

    test(): any {
        console.log("it's connected. Ali looks like Elmer FUdd");
    }

    // return the date that shold be the start date of the sechedule
    calculateStartDate(): any {
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
            let month = (date.getMonth()+1).toString();
            let day = date.getDate();
            let year = date.getFullYear().toString();
            
            let dateStr = year + "-" + month + "-" + day.toString();
            let tmrStr = year + "-" + month + "-" + (parseInt(day) + 1).toString();
            
            let output = {
                "sleepDate": dateStr,
                "wakeDate": tmrStr
            };
            dateArray.push(output);
            date.setDate(date.getDate()+1); 
        }
        return dateArray; // array format: [first date, second date... late date (should be departure date)]
    }

    //returns JSON... I guess.
    packageJSON(): any {
        let result = Array();
        let date = this.translateDatetoString(); 
        for ( let i = 0; i < this.calendar.length; i++) {
            var event = {
                "start": {
                    "dateTime": date[i]["sleepDate"] + "T" + this.calendar[i][0] // can we put variable here 
                },
                "end": {
                    "dateTime": date[i]["wakeDate"] + "T" + this.calendar[i][0] 
                }
            } ;
            result.push(event);
        }
        return result;
    }
}
