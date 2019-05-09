/**
 * Mohammed Shakeel Khan & Sandy
 * Creates a schedule object that contains the users flight data, and regular sleep pattern.
 */

export class Schedule {

    constructor (DepartureLocation, DepartureTime, DepartureDate,
                 ArrivalLocation, ArrivalTime, ArriveDate,
                 NormalSleepTime, NormalWakeTime) {

        this.DepartureLocation = DepartureLocation;
        this.DepartureTime = DepartureTime;
        this.DepartureDate = DepartureDate;

        this.ArrivalLocation = ArrivalLocation;
        this.ArrivalTime = ArrivalTime;
        this.ArriveDate = ArriveDate;

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
        let totalDays = this.DepartureDate - this.ArriveDate; //Shouldn't this be "time zone difference" instead?
        
        let sleepingLength = this.NormalWakeTime - this.NormalSleepTime; //Don't know if we're going to need this
        
        //Might want to put this in the constructor depending on how many times
        //this is called after initial construction.
        for (let i = 0; i < totalDays; i++) {
            this.calendar.push([]);
        }

        let startTime = this.NormalSleepTime;
        let endTime = this.NormalWakeTime;


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
            alert("You don't need this page what are you doing, you fool");
        }


    }
}
