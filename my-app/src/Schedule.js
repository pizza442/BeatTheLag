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
                 
                
                
    }
}