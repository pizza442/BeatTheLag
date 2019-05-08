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
}
