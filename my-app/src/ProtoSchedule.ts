/**
 * Mohammed Shakeel Khan & Sandy
 * Creates a schedule object that contains the users flight data, and regular sleep pattern.
 */

export class Schedule {

    private DepartureLocation: string;
    private DepartureTime: Date; //Mean't to be the time. use .getHours() and .getMinutes().
    private DepartureDate: Date; //Date use .getDate().
    private DepartureMonth: number;
    private DepartureDay: number;
    private DepartureYear: number;

    private ArrivalLocation: string;
    private ArrivalTime: Date; //Mean't to be the time. use .getHours() and .getMinutes().
    private ArrivalDate: Date; //Date use .getDate().
    private ArrivalMonth?: number;
    private ArrivalDay?: number;
    private ArrivalYear?: number;

    private NormalSleepTime: Date;
    private NormalWakeTime: Date;

    private calendar: number[][];
    
    constructor (DepartureLocation, DepartureTime, DepartureDate,
                 ArrivalLocation, ArrivalTime, ArriveDate,
                 NormalSleepTime, NormalWakeTime) {

        this.DepartureLocation = DepartureLocation;
        this.DepartureTime = DepartureTime;
        this.DepartureDate = DepartureDate;

        this.ArrivalLocation = ArrivalLocation;
        this.ArrivalTime = ArrivalTime;
        this.ArrivalDate = ArriveDate;

        this.NormalSleepTime = NormalSleepTime;
        this.NormalWakeTime = NormalWakeTime;

        //2D array, where [i][0] is start time, [i][1] is end time
        this.calendar = [];

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
        let monthDiff: number = Math.abs(this.DepartureMonth - this.ArrivalMonth);
        let dayDiff: number = Math.abs(this.DepartureDay - this.ArrivalDay);
        let totalDays: number = dayDiff;
        //let totalDays: number = this.DepartureDate - this.ArriveDate; //Shouldn't this be "time zone difference" instead?

        let sleepingLength: number = Math.abs(this.NormalWakeTime.getHours() - this.NormalSleepTime.getHours()); //Don't know if we're going to need this

        //Might want to put this in the constructor depending on how many times
        //this is called after initial construction.
        
        //Doesn't account for:
        //  *Months with 31 days.
        //  *Months with < 30 days.
        if (monthDiff > 0) {
            for (let i = 0; i < monthDiff; i++) {
                totalDays += 30;
            }
        }
        
        for (let i = 0; i < totalDays; i++) {
            this.calendar.push([]);
        }

        let startTime = this.NormalSleepTime.getHours();
        let endTime = this.NormalWakeTime.getHours(); //Change to numbers if Ali does it as expected.

        if (totalDays > 0) {
            for (let i = 0; i < totalDays; i++) {
                this.calendar[i][0] = startTime--;
                this.calendar[i][1] = endTime--;
            }
        } else if (totalDays < 0) {
            for (let i = 0; i < totalDays; i++) {
                this.calendar[i][0] = startTime++;
                this.calendar[i][1] = endTime++;
            }
        } else {
            alert("You don't need this page what are you doing, you ugly");
        }
        // Should we return the JSON array?

    }

    packageJSON(): JSON {
        
        
        return this.packageJSON(); //Placeholder
    }
}
