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


    constructor (DepartureTimeZone, DepartureTime, DepartureDate,
                 ArrivalTimeZone,
                 NormalSleepTime, NormalWakeTime) {

        this.DepartureTimeZone = DepartureTimeZone;
        this.DepartureTime = DepartureTime;
        this.DepartureDate = DepartureDate;

        this.ArrivalTimeZone = ArrivalTimeZone;

        this.NormalSleepTime = NormalSleepTime;
        this.NormalWakeTime = NormalWakeTime;

        this.totalDays = Math.abs(parseInt(this.DepartureTimeZone.substring(3)) - parseInt(this.ArrivalTimeZone.substring(3)));
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

        let sleepingLength: number = Math.abs(this.NormalWakeTime.getHours() - this.NormalSleepTime.getHours()); //Don't know if we're going to need this

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

    calculateStartMonth(): number {
        let startDay: number;
        let startMonth: number;
        startDay = this.DepartureDay - this.totalDays;
        if (startDay <= 0) {
            startDay = Math.abs(startDay) - 1;
            if (startDay == 0) {
                startDay += 1;
            }
        }
        return 0;
    }
    
    //returns JSON... I guess.
    packageJSON(): any {

        let result = {
            "start": {
                "dateTime": "2019-05-24T09:00:00-07:00",
            },
            "end": {
                "dateTime": "2019-05-30T09:00:00-07:00",
            }

        }
        return result;
    }
}
